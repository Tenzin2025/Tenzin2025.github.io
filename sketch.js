const blockWidth = 150;
const blockHeight = 20;
let currentBlock;

let blockDir;
let initialBlockSpeed; // Variable to store the initial block speed
let blockSpeed;
let dropCount = 0;
let score = 0;

let placedBlocks = [];
let gameMode; // Variable to store the selected game mode

let easyButton, mediumButton, hardButton;
let gameStarted = false; // Variable to track if the game has started

function setup() {
  createCanvas(350, 500);
  createButtons(); // Call function to create mode selection buttons
}

function draw() {
  if (gameStarted) {
    background(0, 128, 128);
    updateBlock();
    drawBlocks();
    displayScore();
  }
}

function keyReleased() {
  if (key === " " && gameStarted) {
    placeBlock();
  }
}

function createButtons() {
  easyButton = createButton('Easy');
  easyButton.position(50, height / 2);
  easyButton.mousePressed(function () {
    gameMode = "easy";
    startGame();
  });

  mediumButton = createButton('Medium');
  mediumButton.position(width / 2 - 50, height / 2);
  mediumButton.mousePressed(function () {
    gameMode = "medium";
    startGame();
  });

  hardButton = createButton('Hard');
  hardButton.position(width - 100, height / 2);
  hardButton.mousePressed(function () {
    gameMode = "hard";
    startGame();
  });
}

function startGame() {
  easyButton.remove();
  mediumButton.remove();
  hardButton.remove();
  switch (gameMode) {
    case "easy":
      blockSpeed = 1;
      break;
    case "medium":
      blockSpeed = 1.5;
      break;
    case "hard":
      blockSpeed = 2;
      break;
    default:
      blockSpeed = 1;
  }
  function keyReleased() {
  if (key === " " && gameStarted) {
    placeBlock();
    switch (gameMode) {
      case "easy":
        blockSpeed *= 1.25; 
        break;
      case "medium":
        blockSpeed *= 1.5; 
        break;
      case "hard":
        blockSpeed *= 1.75; 
        break;
    }
  }
}
  initialBlockSpeed = blockSpeed; // Store the initial block speed
  gameStarted = true; // Set gameStarted to true to start the game
  newGame(); // Start the game after choosing the mode
}

function newGame() {
  currentBlock = createVector(0, height - blockHeight, blockWidth);

  blockDir = 1;
  dropCount = 0;
  score = 0;
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

  if (newWidth < 0) {
    console.log("GAME OVER!");
    resetBlockSpeed(); // Reset block speed when game is over
    newGame();
    return;
  }

  placedBlocks.push(currentBlock);

  dropCount++;

  if (dropCount % 2 === 0) {
    blockSpeed += 0.5;
  }

  score++;
  newBlock(newWidth);
}

function newBlock(newWidth) {
  const blockStackHeight = (placedBlocks.length + 1) * blockHeight;
  currentBlock = createVector(0, height - blockStackHeight, newWidth);
}
function newBlock(newWidth) {
  const blockStackHeight = (placedBlocks.length + 1) * blockHeight;
  const randomX = random(0, width - newWidth); // Random x position within canvas width
  currentBlock = createVector(randomX, height - blockStackHeight, newWidth);
}
function displayScore() {
  textSize(30);
  fill(0);
  textAlign(CENTER, TOP);
  text("Score: " + score, width / 2, 10);
}

function resetBlockSpeed() {
  blockSpeed = initialBlockSpeed; 
}
