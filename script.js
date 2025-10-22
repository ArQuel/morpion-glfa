// Variables du jeu
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let difficulty = "easy";
let scores = {
  player: 0,
  ai: 0,
  tie: 0,
};

// Combinaisons gagnantes
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Éléments DOM
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const resetBtn = document.getElementById("reset-btn");
const resetScoreBtn = document.getElementById("reset-score-btn");
const difficultyBtns = document.querySelectorAll(".difficulty-btn");
const playerScoreDisplay = document.getElementById("player-score");
const aiScoreDisplay = document.getElementById("ai-score");
const tieScoreDisplay = document.getElementById("tie-score");

// Initialisation
init();

function init() {
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });

  resetBtn.addEventListener("click", resetGame);
  resetScoreBtn.addEventListener("click", resetScore);

  difficultyBtns.forEach((btn) => {
    btn.addEventListener("click", handleDifficultyChange);
  });

  loadScores();
  updateScoreDisplay();

  // Initialiser avec un premier joueur aléatoire
  resetGame();
}

function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

  if (board[clickedCellIndex] !== "" || !gameActive || currentPlayer === "O") {
    return;
  }

  makeMove(clickedCellIndex, "X");

  if (gameActive && currentPlayer === "O") {
    // Délai pour rendre l'IA plus naturelle
    setTimeout(() => {
      aiMove();
    }, 500);
  }
}

function makeMove(index, player) {
  board[index] = player;
  const cell = cells[index];
  cell.textContent = player;
  cell.classList.add(player.toLowerCase());
  cell.classList.add("taken");

  checkResult();
}

function checkResult() {
  let roundWon = false;
  let winningCombination = null;

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      winningCombination = [a, b, c];
      break;
    }
  }

  if (roundWon) {
    const winner = currentPlayer;
    statusDisplay.textContent =
      winner === "X" ? "Vous avez gagné !" : "L'IA a gagné !";

    // Animer les cases gagnantes
    winningCombination.forEach((index) => {
      cells[index].classList.add("winner");
    });

    gameActive = false;

    // Mettre à jour le score
    if (winner === "X") {
      scores.player++;
    } else {
      scores.ai++;
    }
    saveScores();
    updateScoreDisplay();
    return;
  }

  // Vérifier l'égalité
  if (!board.includes("")) {
    statusDisplay.textContent = "Match nul !";
    gameActive = false;
    scores.tie++;
    saveScores();
    updateScoreDisplay();
    return;
  }

  // Changer de joueur
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent =
    currentPlayer === "X" ? "Votre tour ! (X)" : "Tour de l'IA... (O)";
}

function aiMove() {
  if (!gameActive) return;

  let move;

  switch (difficulty) {
    case "easy":
      move = getRandomMove();
      break;
    case "medium":
      move = getMediumMove();
      break;
    case "hard":
      move = getHardMove();
      break;
  }

  if (move !== null) {
    makeMove(move, "O");
  }
}

// IA Facile - Mouvements aléatoires
function getRandomMove() {
  const availableMoves = board
    .map((cell, index) => (cell === "" ? index : null))
    .filter((index) => index !== null);

  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

// IA Moyen - Stratégie basique
function getMediumMove() {
  // 1. Essayer de gagner
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] === "O" && board[b] === "O" && board[c] === "") return c;
    if (board[a] === "O" && board[c] === "O" && board[b] === "") return b;
    if (board[b] === "O" && board[c] === "O" && board[a] === "") return a;
  }

  // 2. Bloquer le joueur
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] === "X" && board[b] === "X" && board[c] === "") return c;
    if (board[a] === "X" && board[c] === "X" && board[b] === "") return b;
    if (board[b] === "X" && board[c] === "X" && board[a] === "") return a;
  }

  // 3. Prendre le centre si disponible
  if (board[4] === "") return 4;

  // 4. Prendre un coin
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter((index) => board[index] === "");
  if (availableCorners.length > 0) {
    return availableCorners[
      Math.floor(Math.random() * availableCorners.length)
    ];
  }

  // 5. Mouvement aléatoire
  return getRandomMove();
}

// IA Difficile - Algorithme Minimax
function getHardMove() {
  let bestScore = -Infinity;
  let bestMove = null;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "O";
      let score = minimax(board, 0, false);
      board[i] = "";

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

function minimax(board, depth, isMaximizing) {
  // Vérifier l'état du jeu
  const result = checkWinner();
  if (result !== null) {
    if (result === "O") return 10 - depth;
    if (result === "X") return depth - 10;
    return 0; // Égalité
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "X";
        let score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function checkWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (!board.includes("")) {
    return "tie";
  }

  return null;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  // Choisir aléatoirement qui commence
  currentPlayer = Math.random() < 0.5 ? "X" : "O";
  gameActive = true;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o", "taken", "winner");
  });

  if (currentPlayer === "X") {
    statusDisplay.textContent = "Votre tour ! (X)";
  } else {
    statusDisplay.textContent = "L'IA commence... (O)";
    // L'IA joue en premier
    setTimeout(() => {
      aiMove();
    }, 500);
  }
}

function resetScore() {
  scores = {
    player: 0,
    ai: 0,
    tie: 0,
  };
  saveScores();
  updateScoreDisplay();
}

function handleDifficultyChange(e) {
  difficultyBtns.forEach((btn) => btn.classList.remove("active"));
  e.target.classList.add("active");
  difficulty = e.target.getAttribute("data-difficulty");
  resetGame();
}

function saveScores() {
  localStorage.setItem("morpionScores", JSON.stringify(scores));
}

function loadScores() {
  const savedScores = localStorage.getItem("morpionScores");
  if (savedScores) {
    scores = JSON.parse(savedScores);
  }
}

function updateScoreDisplay() {
  playerScoreDisplay.textContent = scores.player;
  aiScoreDisplay.textContent = scores.ai;
  tieScoreDisplay.textContent = scores.tie;
}
