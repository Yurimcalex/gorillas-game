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
  state = {};
  draw();
}


function draw() {
  
}


// Event handlers
function throwBomb() {

}

function animate(timestamp) {
  
}