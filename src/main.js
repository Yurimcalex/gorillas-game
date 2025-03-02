import './style.css';

// The state of the game
let state = {};

// The main canvas element and its drawing context
const canvas = document.getElementById('game');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

newGame();


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
  ctx.save();
  // Flip coordinate system upside down
  ctx.translate(0, window.innerHeight);
  ctx.scale(1, -1);
  // Draw scene
  drawBackground();
  drawBackgroundBuildings();
  drawBuildings();
  drawGorilla(1);
  drawGorilla(2);
  drawBomb();
  // Restore transformation
  ctx.restore();
}


function generateBackgroundBulding(index) {
  const previousBuilding = state.backgroundBuildings[index - 1];
  const x = previousBuilding
    ? previousBuilding.x + previousBuilding.width + 4
    : -30;
  const minWidth = 60;
  const maxWidth = 110;
  const width = minWidth + Math.random() * (maxWidth - minWidth);
  const minHeight = 80;
  const maxHeight = 350;
  const height = minWidth + Math.random() * (maxHeight - minHeight);
  state.backgroundBuildings.push({ x, width, height }); 
}

function generateBuilding(index) {
  const previousBuilding = state.buildings[index - 1];
  const x = previousBuilding
    ? previousBuilding.x + previousBuilding.width + 4
    : 0;
  const minWidth = 80;
  const maxWidth = 130;
  const width = minWidth + Math.random() * (maxWidth - minWidth);
  
  const platformWithGorilla = index === 1 || index === 6;

  const minHeight = 40;
  const maxHeight = 300;
  const minHeightGorilla = 30;
  const maxHeightGorilla = 150;

  const height = platformWithGorilla
    ? minHeightGorilla + Math.random() * (maxHeightGorilla - minHeightGorilla)
    : minHeight + Math.random() * (maxHeight - minHeight);
  // Generate an array of booleans to show if the light is on or off in a room
  const lightsOn = [];
  for (let i = 0; i < 50; i += 1) {
    const light = Math.random() <= 0.33 ? true : false;
    lightsOn.push(light);
  }
  state.buildings.push({ x, width, height, lightsOn });
}

function initializeBombPosition() {
  // body...
}


// Draw functions
function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
  gradient.addColorStop(1, '#F8BA85');
  gradient.addColorStop(0, '#FFC28E');
  // Draw sky
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  // Draw Moon
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.beginPath();
  ctx.arc(300, 350, 60, 0, 2 * Math.PI);
  ctx.fill();
}

function drawGorilla(player) {
  ctx.save();
  const building = player === 1
    ? state.buildings[1]
    : state.buildings[state.buildings.length - 2];

  ctx.translate(building.x + building.width / 2, building.height);

  // drawGorillaBody();
  // drawGorillaLeftArm(player);
  // drawGorillaRightArm(player);
  // drawGorillaFace(player);

  ctx.restore();
}

function drawBomb() {
  // body...
}

function drawBackgroundBuildings() {
  state.backgroundBuildings.forEach((building) => {
    ctx.fillStyle = '#947285';
    ctx.fillRect(building.x, 0, building.width, building.height);
  });
}

function drawBuildings() {
  state.buildings.forEach((building) => {
    // Draw a building
    ctx.fillStyle = '#4A3C68';
    ctx.fillRect(building.x, 0, building.width, building.height);
    // Draw windows
    const windowWidth = 10;
    const windowHeight = 12;
    const gap = 15;
    
    const numberOfFloors = Math.ceil(
      (building.height - gap) / (windowHeight + gap)
    );

    const numberOfRoomsPerFloor= Math.floor(
      (building.width - gap) / (windowWidth + gap)
    );

    for (let floor = 0; floor < numberOfFloors; floor += 1) {
      for (let room = 0; room < numberOfRoomsPerFloor; room += 1) {
        if (building.lightsOn[floor * numberOfRoomsPerFloor + room]) {
          ctx.save();

          ctx.translate(building.x + gap, building.height - gap);
          ctx.scale(1, -1);

          const x = room * (windowWidth + gap);
          const y = floor * (windowHeight + gap);

          ctx.fillStyle = '#EBB6A2';
          ctx.fillRect(x, y, windowWidth, windowWidth);

          ctx.restore();
        }
      }
    }
  });
}


// Event handlers
function throwBomb() {

}

function animate(timestamp) {
  
}