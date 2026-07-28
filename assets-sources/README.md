# Sources des visuels

Fichiers originaux fournis par les clients ou par le studio. **Ils ne sont pas
dans `public/`** : tout ce qui s'y trouve est servi publiquement par Next, or
ces originaux ne sont jamais affichés tels quels (près d'1 Mo pour 4 logos).

## logos-clients/

Logos transmis par les établissements équipés. Le fait qu'un client nous
transmette son logo vaut accord d'affichage.

Les versions utilisées sur le site sont dans `public/clients/`, générées à
partir d'ici : marges transparentes rognées, ramenées à 320x320 centré, ce qui
garantit que tous les logos occupent visuellement la même surface malgré des
cadrages d'origine très différents.

Pour ajouter un client :
1. déposer le logo original ici ;
2. le rogner / redimensionner en 320x320 dans `public/clients/` ;
3. ajouter une entrée avec le champ `logo` dans `app/data/clients.ts`.

Sans champ `logo`, le client n'est pas nommé sur le site : seul son secteur
d'activité apparaît dans la ligne « Et aussi ».
