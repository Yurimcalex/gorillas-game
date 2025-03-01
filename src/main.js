import './style.css';

// The state of the game
let state = {};

// The main canvas element and its drawing context
const canvas = document.getElementById('game');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');


function newGame() {
  // Reset the game state
  state = {
    phase: 'celebrating', // aiming | in flight | celebrating
    currentPlayer: 1,
    bomb: {
      x: undefined,
      y: undefined,
      rotation: 0,
      velocity: { x: 0, y: 0 },
    },

    // Buildings
    backgroundBuildings: [],
    buildings: [],
    blastHoldes: [],
  };

  // Generate background buildings
  for (let i = 0; i < 11; i += 1) {
    generateBackgroundBulding(i);
  }

  // Generate buildings
  for (let i = 0; i < 8; i += 1) {
    generateBuilding(i);
  }

  initializeBombPosition();

  draw();
}


function draw() {
  
}


function generateBackgroundBulding(index) {
  // body...
}

function generateBuilding(index) {
  // body...
}

function initializeBombPosition() {
  // body...
}


// Event handlers
function throwBomb() {

}

function animate(timestamp) {
  
}