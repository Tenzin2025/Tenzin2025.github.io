const blockWidth= 250;
const blockHeight= 30;
let currentBlock;

let blockDir;
let blockSpeed;

let placedBlocks= [];

function setup() {
  createCanvas(600, 600);
  
  newGame();
}

function draw() {
  background(220);
  updateBlock();
  drawBlocks();
}

function keyReleased() {
  if(key === " ") {
    placeBlock();
  }
}

function newGame() {
  currentBlock = createVector(0, height-blockHeight, blockWidth);
  
  blockDir = 1;
  blockSpeed = 2;
  
  placedBlocks = [];
}


function updateBlock() {
  currentBlock.x += blockDir * blockSpeed;
  
  if(currentBlock.x <0) {
    blockDir = 1;
  }
  if(currentBlock.x +currentBlock.z > width) {
    blockDir=-1;
  }
}
function drawBlocks() {
  rect(currentBlock.x, currentBlock.y, currentBlock.z, blockHeight);
}

function placeBlock() {
  placedBlocks.push(currentBlock);
  
  newBlock();
}

function newBlock() {
  const blockStackHeight= (placedBlocks.length + 1) * blockHeight;
  currentBlock = createVector(0, height - blockStackHeight, blockWidth);
}
