const blockWidth = 150;
const blockHeight = 20;
let currentBlock;

let blockDir;
let blockSpeed;
let dropCount = 0; 
let score = 0; 

let placedBlocks = [];

function setup() {
  createCanvas(350, 500);
  newGame();
}

function draw() {
  background(0, 128, 128);
  updateBlock();
  drawBlocks();
  displayScore(); 
}

function keyReleased() {
  if (key === " ") {
    placeBlock();
  }
}

function newGame() {
  currentBlock = createVector(0, height - blockHeight, blockWidth);

  blockDir = 1;
  blockSpeed = 2;

  placedBlocks = [];
}

function updateBlock() {
  currentBlock.x += blockDir * blockSpeed;

  if (currentBlock.x < 0) {
    blockDir = 1;
  }
  if (currentBlock.x + currentBlock.z > width) {
    blockDir = -1;
  }
}

function drawBlocks() {
  fill(155, 50, 400);
  rect(currentBlock.x, currentBlock.y, currentBlock.z, blockHeight);
  fill(255, 215, 0);
  for (let block of placedBlocks) {
    rect(block.x, block.y, block.z, blockHeight);
  }
}

function placeBlock() {
  const prevBlock = placedBlocks[placedBlocks.length - 1];
  let newWidth = blockWidth;

  if (prevBlock) {
    const leftEdge = max(prevBlock.x, currentBlock.x);
    const rightEdge = min(prevBlock.x + prevBlock.z, currentBlock.x + currentBlock.z);

    newWidth = rightEdge - leftEdge;

    currentBlock.x = leftEdge;
    currentBlock.z = newWidth;
  }
  
  if(newWidth < 0) {
    console.log("GAME OVER!");
    newGame();
    return;
  }

  placedBlocks.push(currentBlock);

  dropCount++;

  if (dropCount % 2 === 0) {
    blockSpeed += .5; 
  }

  score++; 
  newBlock(newWidth);
}

function newBlock(newWidth) {
  const blockStackHeight = (placedBlocks.length + 1) * blockHeight;
  currentBlock = createVector(0, height - blockStackHeight, newWidth);
}

function displayScore() {
  textSize(30);
  fill(0);
  textAlign(CENTER, TOP);
  text("Score: " + score, width / 2, 10);
}
