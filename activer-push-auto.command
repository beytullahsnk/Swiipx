#!/bin/bash
#
# Double-cliquez ce fichier UNE SEULE FOIS.
#
# Il installe une tâche macOS qui vérifie toutes les 2 minutes si un nouvel
# article attend d'être envoyé sur GitHub, et le pousse tout seul.
# Après ça, vous n'avez plus jamais à double-cliquer push-swiipx.command.
#
# Pour désactiver plus tard : relancez ce fichier, il proposera de désinstaller.

cd "$(dirname "$0")" || exit 1
REPO="$(pwd)"
LABEL="fr.swiipx.autopush"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"

echo "=========================================="
echo "  Push automatique des articles Swiipx"
echo "=========================================="
echo ""
echo "Dossier du site : $REPO"
echo ""

# ── Déjà installé ? on propose de retirer ──────────────────────────────────
if [ -f "$PLIST" ]; then
  echo "Le push automatique est DÉJÀ ACTIVÉ."
  echo ""
  read -r -p "Voulez-vous le désactiver ? (o/N) " reponse
  if [ "$reponse" = "o" ] || [ "$reponse" = "O" ]; then
    launchctl unload "$PLIST" 2>/dev/null
    rm -f "$PLIST"
    echo ""
    echo "🛑 Push automatique désactivé."
  else
    echo ""
    echo "Rien n'a été changé, il reste actif."
  fi
  echo ""
  echo "Vous pouvez fermer cette fenêtre."
  exit 0
fi

# ── Vérifications avant installation ───────────────────────────────────────
if [ ! -d "$REPO/.git" ]; then
  echo "❌ Ce dossier n'est pas un dépôt git. Installation annulée."
  echo ""
  echo "Vous pouvez fermer cette fenêtre."
  exit 1
fi

chmod +x "$REPO/auto-push-swiipx.sh" 2>/dev/null
if [ ! -x "$REPO/auto-push-swiipx.sh" ]; then
  echo "❌ auto-push-swiipx.sh est introuvable ou non exécutable."
  echo ""
  echo "Vous pouvez fermer cette fenêtre."
  exit 1
fi

# ── Génération de la tâche ─────────────────────────────────────────────────
# Le chemin du dépôt est écrit au moment de l'installation plutôt que codé en
# dur : si vous déplacez le dossier un jour, il suffit de relancer ce fichier.
mkdir -p "$HOME/Library/LaunchAgents"
cat > "$PLIST" <<PLISTEOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>$LABEL</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>$REPO/auto-push-swiipx.sh</string>
    </array>
    <key>StartInterval</key>
    <integer>120</integer>
    <key>RunAtLoad</key>
    <true/>
    <key>StandardErrorPath</key>
    <string>$HOME/Library/Logs/swiipx-autopush-erreurs.log</string>
</dict>
</plist>
PLISTEOF

launchctl unload "$PLIST" 2>/dev/null
if launchctl load "$PLIST" 2>/dev/null; then
  echo "✅ Push automatique ACTIVÉ."
  echo ""
  echo "À partir de maintenant :"
  echo "  • toutes les 2 minutes, le Mac vérifie s'il y a un article à envoyer"
  echo "  • s'il y en a un, il le pousse sur GitHub et le site se redéploie"
  echo "  • une notification vous prévient à chaque envoi"
  echo ""
  echo "Journal détaillé : ~/Library/Logs/swiipx-autopush.log"
  echo ""
  echo "Il ne reste qu'une chose à faire à chaque nouvel article :"
  echo "soumettre son URL dans Google Search Console."
else
  echo "⚠️  L'installation a échoué. Le fichier a été créé ici :"
  echo "    $PLIST"
  echo "    Essayez : launchctl load \"$PLIST\""
fi

echo ""
echo "Vous pouvez fermer cette fenêtre."
