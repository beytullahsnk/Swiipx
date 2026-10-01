#!/bin/bash
#
# Pousse automatiquement sur GitHub les articles écrits en local.
#
# Pourquoi ce script existe : les articles sont rédigés par des tâches
# programmées (Claude Cowork, lundi, mercredi et vendredi) depuis un
# environnement isolé qui n'a aucun accès réseau à github.com. Le commit se
# fait, mais pas le push. Ce script tourne sur le Mac, où le réseau et les
# identifiants GitHub sont disponibles, et se charge de l'envoi.
#
# Une fois sur GitHub, la suite est automatique : Vercel redéploie le site,
# puis l'action « Indexation » prévient Bing (IndexNow) et renvoie le sitemap
# à Google Search Console (.github/workflows/indexnow.yml).
#
# Installé comme tâche périodique, toutes les 2 minutes, par
# « activer-push-auto.command ».
#
# Variables utiles aux tests : SWIIPX_AUTOPUSH_LOG (journal),
# SWIIPX_AUTOPUSH_SANS_NOTIF=1 (aucune notification macOS).

REPO="$(cd "$(dirname "$0")" && pwd)"
LOG="${SWIIPX_AUTOPUSH_LOG:-$HOME/Library/Logs/swiipx-autopush.log}"
mkdir -p "$(dirname "$LOG")"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG"; }
notifier() {
  [ -n "$SWIIPX_AUTOPUSH_SANS_NOTIF" ] && return
  command -v osascript >/dev/null && osascript -e "display notification \"$1\" with title \"Swiipx\"" 2>/dev/null
}

cd "$REPO" || { log "ERREUR : dossier introuvable ($REPO)"; exit 1; }

# Ne rien tenter si un merge / rebase / cherry-pick est en cours : pousser au
# milieu d'une opération inachevée enverrait un état incohérent.
if [ -d .git/rebase-merge ] || [ -d .git/rebase-apply ] || \
   [ -f .git/MERGE_HEAD ] || [ -f .git/CHERRY_PICK_HEAD ]; then
  log "Opération git en cours, on ne touche à rien."
  exit 0
fi

# ── Verrous périmés ─────────────────────────────────────────────────────────
# L'environnement isolé en laisse derrière lui, et ils bloquent toute commande
# git ultérieure, y compris le commit de l'article suivant. Le 18 septembre,
# un refs/heads/main.lock oublié a bloqué les commits pendant trois jours ; le
# 30, l'article a dû être commité à la main. Tous les verrous de plus de
# 5 minutes sont donc retirés, mais seulement si aucun git ne tourne : un
# verrou récent ou tenu par un processus vivant n'est jamais touché.
if ! pgrep -x git >/dev/null 2>&1; then
  PERIMES="$(find .git -name '*.lock' -mmin +5 2>/dev/null)"
  if [ -n "$PERIMES" ]; then
    echo "$PERIMES" | while read -r verrou; do rm -f "$verrou"; done
    log "Verrous périmés retirés : $(echo "$PERIMES" | tr '\n' ' ')"
  fi
fi

BRANCHE="$(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
if [ -z "$BRANCHE" ] || [ "$BRANCHE" = "HEAD" ]; then
  log "ERREUR : pas de branche courante."
  exit 1
fi

# ── Article écrit mais jamais commité ───────────────────────────────────────
# Si la tâche de rédaction n'a pas pu commiter, l'article reste en attente
# dans les fichiers. On le publie, mais uniquement si TOUT indique un nouvel
# article du générateur, et rien d'autre :
#   1. seuls les fichiers que le générateur modifie ont changé ;
#   2. seo-data.ts déclare au moins un article qui n'existait pas ;
#   3. aucun de ces fichiers n'a bougé depuis 10 minutes (rédaction terminée) ;
#   4. le code compile (TypeScript), sinon le site ne se construirait pas.
# Une retouche d'un article existant, ou un travail en cours ailleurs dans le
# dépôt, n'est donc jamais publié à la place de son auteur.
ARTICLES='app/blog/[slug]/articles.ts'
SEO='app/blog/[slug]/seo-data.ts'
AUTORISES="$ARTICLES
$SEO
app/blog/[slug]/related.ts
app/blog/page.tsx
public/llms.txt"

MODIFIES="$(git status --porcelain --untracked-files=all | sed 's/^...//')"
if [ -n "$MODIFIES" ]; then
  HORS="$(echo "$MODIFIES" | grep -vxF "$AUTORISES")"
  NOUVEAUX="$(git diff -U0 -- "$SEO" | grep -E "^\+  '[a-z0-9-]+': \{" | sed -E "s/^\+  '([a-z0-9-]+)'.*/\1/" | tr '\n' ' ' | sed 's/ *$//')"
  RECENT="$(echo "$MODIFIES" | while read -r f; do [ -e "$f" ] && find "$f" -mmin -10 2>/dev/null; done | head -1)"

  if [ -z "$HORS" ] && [ -n "$NOUVEAUX" ] && [ -z "$RECENT" ]; then
    # Node n'est pas dans le PATH des tâches macOS : on le cherche là où nvm
    # et Homebrew l'installent.
    NODE_DIR=""
    for d in "$HOME"/.nvm/versions/node/*/bin /opt/homebrew/bin /usr/local/bin; do
      [ -x "$d/node" ] && NODE_DIR="$d"
    done
    VERIFIE="non"
    if [ -n "$NODE_DIR" ] && [ -x node_modules/.bin/tsc ]; then
      if PATH="$NODE_DIR:$PATH" node_modules/.bin/tsc --noEmit >> "$LOG" 2>&1; then
        VERIFIE="oui"
      else
        log "⚠️ Article en attente ($NOUVEAUX) : le code ne compile pas, publication bloquée."
        notifier "Article en attente non publié : erreur dans le code. Voir swiipx-autopush.log."
        exit 0
      fi
    fi
    echo "$MODIFIES" | while read -r f; do git add -- "$f"; done
    if git commit -q -m "Publication automatique : $NOUVEAUX" >> "$LOG" 2>&1; then
      log "Article resté non commité, publié automatiquement : $NOUVEAUX (vérification TypeScript : $VERIFIE)"
    else
      log "⚠️ Le commit automatique de $NOUVEAUX a échoué."
    fi
  fi
fi

# ── Envoi sur GitHub ────────────────────────────────────────────────────────
AVANCE="$(git rev-list --count "@{u}..HEAD" 2>/dev/null)"
if [ -z "$AVANCE" ]; then
  log "Pas de branche distante configurée pour $BRANCHE."
  exit 0
fi
[ "$AVANCE" -eq 0 ] && exit 0   # rien à faire, cas le plus fréquent : silence

log "$AVANCE commit(s) à pousser sur $BRANCHE :"
git log --oneline "@{u}..HEAD" >> "$LOG" 2>&1

if git push origin HEAD >> "$LOG" 2>&1; then
  log "✅ Push réussi : le site se redéploie, puis Bing et Google sont prévenus."
  # Sans notification, un push silencieux passe inaperçu et on ne sait pas si
  # l'article est en ligne.
  notifier "Article envoyé sur GitHub : le site se redéploie."
else
  log "⚠️ Échec du push. Nouvelle tentative au prochain passage."
  notifier "Échec du push GitHub. Voir swiipx-autopush.log."
fi
