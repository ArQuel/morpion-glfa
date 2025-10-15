# 🎮 Jeu de Morpion (Tic-Tac-Toe)

Un jeu de morpion interactif avec trois niveaux de difficulté et une interface moderne.

## 🎯 Fonctionnalités

- **3 Niveaux de difficulté**:

  - 🟢 **Facile**: L'IA fait des mouvements aléatoires
  - 🟡 **Moyen**: L'IA utilise une stratégie basique (bloque, essaie de gagner, prend le centre et les coins)
  - 🔴 **Difficile**: L'IA utilise l'algorithme Minimax (imbattable)

- **Système de score**: Les scores sont sauvegardés automatiquement dans le navigateur
- **Interface moderne**: Design responsive avec animations fluides
- **Expérience utilisateur**: Feedback visuel pour les coups gagnants et animations

## 🚀 Comment jouer

1. Ouvrez le fichier `index.html` dans votre navigateur web
2. Choisissez votre niveau de difficulté
3. Cliquez sur une case pour placer votre symbole (X)
4. L'IA jouera automatiquement avec le symbole (O)
5. Le premier à aligner 3 symboles (horizontalement, verticalement ou en diagonale) gagne!

## 📁 Structure du projet

```
morpion/
├── index.html      # Structure HTML du jeu
├── style.css       # Styles et animations
├── script.js       # Logique du jeu et IA
└── README.md       # Ce fichier
```

## 🛠️ Technologies utilisées

- HTML5
- CSS3 (Gradients, Flexbox, Grid, Animations)
- JavaScript (ES6+)
- LocalStorage pour la persistance des scores

## 🎨 Design

- Interface moderne avec dégradés colorés
- Animations fluides pour les interactions
- Design responsive pour mobile et desktop
- Feedback visuel clair pour l'état du jeu

## 🤖 Intelligence Artificielle

### Niveau Facile

Mouvements complètement aléatoires parmi les cases disponibles.

### Niveau Moyen

Stratégie en plusieurs étapes:

1. Essayer de gagner si possible
2. Bloquer le joueur s'il est sur le point de gagner
3. Prendre le centre si disponible
4. Prendre un coin si disponible
5. Sinon, mouvement aléatoire

### Niveau Difficile

Utilise l'algorithme Minimax qui:

- Évalue tous les coups possibles jusqu'à la fin de la partie
- Choisit le coup optimal qui maximise les chances de victoire
- Est pratiquement imbattable (meilleur résultat possible: match nul)

## 💾 Sauvegarde des scores

Les scores sont automatiquement sauvegardés dans le LocalStorage du navigateur et persistent entre les sessions.

Amusez-vous bien! 🎉

