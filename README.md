# Nuit du Code MMI26 - Jeu de Poses

Un jeu interactif basé sur la détection de poses corporelles avec p5.js et ml5.js.

## Caractéristiques

- 🎮 **3 thèmes alternants** : Chaque thème alterne toutes les 10 secondes
- 🎨 **Thèmes personnalisés** : 
  - Thème 1 : Plage (orange)
  - Thème 2 : Nature (vert)
  - Thème 3 : Route (noir asphalte)
- 🎵 **Musique de fond** : Gerudo Valley de The Legend of Zelda
- 📷 **Détection de pose** : Utilise ml5.js pour détecter les poses corporelles
- 🎯 **Validation de poses** : Validez des poses spécifiques pour progresser

## Déploiement

### GitHub Pages

Ce projet est configuré pour se déployer automatiquement sur **GitHub Pages** à chaque push sur la branche `main`.

1. **Activez GitHub Pages** :
   - Allez sur les paramètres de votre repo
   - Section "Pages"
   - Sélectionnez "Deploy from a branch"
   - Branche: `gh-pages`

2. **Le site sera accessible à** :
   ```
   https://Huzeyfe-ckr.github.io/nuitducodemmi26/
   ```

### Déployer sur un autre site

#### Option 1 : Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Option 2 : Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir .
```

#### Option 3 : Serveur personnel
Copiez tous les fichiers du repo sur votre serveur web.

## Installation locale

1. Clonez le repo :
   ```bash
   git clone https://github.com/Huzeyfe-ckr/nuitducodemmi26.git
   ```

2. Ouvrez `index.html` dans un navigateur moderne (Chrome, Firefox, Edge)

## Fichiers importants

- `main.js` - Boucle de jeu principale
- `assets.js` - Gestion des thèmes et des assets
- `background.js` - Rendu des arrière-plans
- `move.js` - Contrôle du joueur
- `video.js` - Configuration de la webcam
- `poseValidation.js` - Validation des poses

## Assets

- `assets/1/` - Thème 1 (plage)
- `assets/2/` - Thème 2 (nature)
- `assets/3/` - Thème 3 (route)
- `assets/son/` - Musique de fond

## Dépendances

- [p5.js](https://p5js.org/) - Framework graphique
- [p5play](https://p5play.org/) - Moteur physique
- [ml5.js](https://ml5js.org/) - Détection de poses IA
- [q5.js](https://q5js.org/) - Alternative légère à p5.js
