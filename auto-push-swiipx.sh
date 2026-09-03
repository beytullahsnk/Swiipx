#!/bin/bash
#
# Pousse automatiquement sur GitHub les commits d'articles créés en local.
#
# Pourquoi ce script existe : Claude rédige et commite les articles depuis un
# environnement isolé qui n'a aucun accès réseau à github.com. Le commit se fait
# donc, mais pas le push. Ce script tourne sur le Mac, où le réseau et les
# identifiants GitHub sont disponibles, et se charge de l'envoi.
#
# Installé comme tâche périodique par « activer-push-auto.command ».
# Ne commite jamais rien : il se contente de pousser ce qui existe déjà.

REPO="$(cd "$(dirname "$0")" && pwd)"
LOG="$HOME/Library/Logs/swiipx-autopush.log"
mkdir -p "$(dirname "$LOG")"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG"; }

cd "$REPO" || { log "ERREUR : dossier introuvable ($REPO)"; exit 1; }

# Ne rien tenter si un merge / rebase / cherry-pick est en cours : pousser au
# milieu d'une opération inachevée enverrait un état incohérent.
if [ -d .git/rebase-merge ] || [ -d .git/rebase-apply ] || \
   [ -f .git/MERGE_HEAD ] || [ -f .git/CHERRY_PICK_HEAD ]; then
  log "Opération git en cours, on ne touche à rien."
  exit 0
fi

# Verrous périmés : l'environnement isolé en laisse parfois derrière lui, et ils
# bloquent toute commande git ultérieure. On ne supprime que ceux de plus de
# 5 minutes, pour ne jamais casser une opération réellement en cours.
find .git -maxdepth 1 -name 'index.lock' -mmin +5 -delete 2>/dev/null
find .git -maxdepth 1 -name 'HEAD.lock' -mmin +5 -delete 2>/dev/null

BRANCHE="$(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
[ -z "$BRANCHE" ] && { log "ERREUR : pas de branche courante."; exit 1; }

# Combien de commits locaux ne sont pas encore sur origin ?
AVANCE="$(git rev-list --count "@{u}..HEAD" 2>/dev/null)"
if [ -z "$AVANCE" ]; then
  log "Pas de branche distante configurée pour $BRANCHE."
  exit 0
fi
[ "$AVANCE" -eq 0 ] && exit 0   # rien à faire, cas le plus fréquent : silence

log "$AVANCE commit(s) à pousser sur $BRANCHE :"
git log --oneline "@{u}..HEAD" >> "$LOG" 2>&1

if git push origin HEAD >> "$LOG" 2>&1; then
  log "✅ Push réussi — le redéploiement du site est lancé."
  # Notification macOS : sans elle, un push silencieux passe inaperçu et on ne
  # sait pas si l'article est en ligne.
  command -v osascript >/dev/null && osascript -e 'display notification "Article envoyé sur GitHub, le site se redéploie." with title "Swiipx"' 2>/dev/null
else
  log "⚠️ Échec du push. Nouvelle tentative au prochain passage."
  command -v osascript >/dev/null && osascript -e 'display notification "Échec du push GitHub. Voir swiipx-autopush.log." with title "Swiipx"' 2>/dev/null
fi
