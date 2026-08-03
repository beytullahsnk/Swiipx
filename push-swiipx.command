#!/bin/bash
# Double-cliquez ce fichier pour envoyer les nouveaux articles de blog sur GitHub.
# Le déploiement du site se lance automatiquement ensuite.
cd "$(dirname "$0")" || exit 1
echo "== Envoi des articles Swiipx sur GitHub =="
echo ""
git push origin HEAD
code=$?
echo ""
if [ $code -eq 0 ]; then
  echo "✅ Poussé avec succès. Le site va se redéployer."
else
  echo "⚠️  Échec du push (code $code). Vérifiez votre connexion / vos identifiants GitHub."
fi
echo ""
echo "Vous pouvez fermer cette fenêtre."
