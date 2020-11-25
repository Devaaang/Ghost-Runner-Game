var tower;
var gameState = "Play";

function preload () {
  towerImage = loadImage ("tower.png");
  doorImage = loadImage ("door.png");
  climberImage = loadImage ("climber.png");
  ghostImage = loadImage ("ghost-standing.png");
}

function setup () {
  createCanvas (600,600);
  tower = createSprite(300,300,600,600);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite (300,300);
  ghost.addImage (ghostImage);
  ghost.scale = 0.4;
  
  doorsGroup = new Group ();
  climberGroup = new Group ();
  
  invisibleBlockGroup = new Group ();
}

function draw () {
  background ("black");
  
  if (gameState === "Play") {
  if (tower.y >400) {
    tower.y = 300;
  }
  
  if(keyDown ("space")) {
    ghost.velocityY = -12;
  }
  ghost.velocityY = ghost.velocityY+0.8;
  
  
  if(keyDown ("left")) {
    ghost.x = ghost.x-3 ;
  }
  
  
  if(keyDown ("right")) {
    ghost.x = ghost.x+3;
  }
    
  spawnDoors();
    
  if (climberGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
    
    if (invisibleBlockGroup.isTouching(ghost)|| ghost.y>600 ) {
      ghost.destroy();
      gameState = "End";
    }
  drawSprites();
  }
  
  if (gameState === "End") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
    
  }
}

function spawnDoors () {
  if (frameCount % 240 === 0) {
    door = createSprite(Math.round(random(100,500)),0)
    door.addImage(doorImage);
    door.velocityY = 1;
    door.lifetime = 700;
    
    doorsGroup.add(door);
    
    climber = createSprite(door.x,door.y+50);
    climber.addImage(climberImage);
    climber.velocityY = 1;
    climber.lifetime = 700;
    
    invisibleBlock = createSprite(climber.x,climber.y+5,climber.width,2);
    invisibleBlock.velocityY = 1;
    invisibleBlock.visible = false;
    invisibleBlock.lifetime = 700;
    invisibleBlockGroup.add(invisibleBlock);
    
    ghost.depth = door.depth + 1;
    
    climberGroup.add(climber);
  }
}