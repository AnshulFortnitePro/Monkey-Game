
var monkey , monkey_running, monkeyCollide
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var SurvivalTime;
var invisibleGround;

var gameState = PLAY;
var PLAY = 1;
var END = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
  monkeyCollide = loadImage("sprite_1.png");
 
}



function setup() {
   createCanvas(600, 300);
  
   monkey = createSprite(80, 245, 20, 20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale = 0.1;
  
  ground = createSprite(300, 280, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
 invisibleGround = createSprite(300, 280, 900, 10);
 invisibleGround.visible = false;
  
   FoodGroup = new Group();
   obstacleGroup = new Group();
}


function draw() {
  background("cyan");
   
 
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 100, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  SurvivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ SurvivalTime, 450, 50);
    obstacles();
    bananas(); 
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  
    
  if(keyDown("space") && monkey.y >= 235) {
      monkey.velocityY = -13; 
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  

  
  
  
  if(monkey.isTouching(FoodGroup)){
    score = score+1;
    FoodGroup.destroyEach();
  }
  
  if(monkey.isTouching(obstacleGroup)){
   
    
 

    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);     
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    SurvivalTime = 0;
  }
 
    
    


  
    if (keyDown("r")){
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
    
    }
  
  
     
   
  
 
  
  monkey.collide(invisibleGround);
  drawSprites();
}

function bananas(){
  if (frameCount % 80 === 0){
    
    banana = createSprite(320,150, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;        
    banana.lifetime = 220;
    banana.velocityX =-(4+score/100); 
    FoodGroup.add(banana);
  

    
  }
  

  
}

function obstacles(){
  if (frameCount % 200 === 0){
    
    obstacle = createSprite(300,253,50,50);
    obstacle.addAnimation("rock", obstaceImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.velocityX = -(4 + score/100);
    obstacle.scale = 0.1 ;
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}


