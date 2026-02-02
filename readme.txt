# 🖼️ Image Swapper Pro

**Image Swapper Pro** est une extension Chrome minimaliste et puissante conçue pour les développeurs, les designers et les curieux. Elle permet de remplacer n'importe quelle image (balise `<img>`) ou élément avec un fond CSS (`background-image`) directement depuis votre navigateur en utilisant une simple URL.

## ✨ Fonctionnalités
- **Remplacement en un clic** : Intégration directe dans le menu contextuel (clic droit).
- **Support complet** : Fonctionne sur les images classiques, les images dans des liens et les fonds CSS.
- **Précision** : Cible l'élément exact sélectionné, même si l'image est imbriquée dans d'autres balises.
- **Léger & Rapide** : Aucune interface lourde, utilise les ressources natives de Chrome.

## 🚀 Installation (Mode Développeur)

Comme cette extension n'est pas encore sur le Chrome Web Store, voici comment l'installer manuellement :

1. **Téléchargez** ce dépôt en tant que fichier ZIP (ou clonez-le).
2. **Extrayez** les fichiers dans un dossier sur votre ordinateur.
3. Ouvrez Google Chrome et accédez à `chrome://extensions/`.
4. Activez le **Mode développeur** (interrupteur en haut à droite).
5. Cliquez sur **Charger l'extension décompressée**.
6. Sélectionnez le dossier contenant les fichiers de l'extension.

## 🛠️ Utilisation
1. Rendez-vous sur n'importe quel site web.
2. Faites un **clic droit** sur l'image que vous souhaitez modifier.
3. Sélectionnez **Remplacer l'image par une URL**.
4. Collez l'URL de votre nouvelle image dans la fenêtre qui s'affiche.
5. Validez ! L'image est remplacée instantanément.

## 📂 Structure du projet
- `manifest.json` : Configuration et permissions de l'extension.
- `background.js` : Gestion du menu contextuel et communication.
- `content.js` : Script injecté pour modifier le DOM de la page.
- `icon.png` : Identité visuelle de l'outil.