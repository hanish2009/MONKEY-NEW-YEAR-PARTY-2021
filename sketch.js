var PLAY=1;
var END=0;
var gameState = PLAY;
var monkey , monkeyRunning;
var jungle,backgroundImage;
var stone,stoneImg;
var stoneGroup,bananaGroup;
var score;
var change;
var restart;


function preload(){
   backgroundImage = loadImage("jungle.jpg");
   stoneImg = loadImage("stone.png")
   bananaImg = loadImage("banana.png")   
  
   monkeyRunning = loadAnimation("Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  monkey = loadAnimation("Monkey_01.png","Monkey_02.png")
  
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  
}

function setup() {
createCanvas(700,400);
  jungle = createSprite(350,200,20,20);
  jungle.addImage(backgroundImage)
  jungle.scale=1

  monkey = createSprite(50,330,100,100)  
  monkey.addAnimation("running",monkeyRunning);
  monkey.scale=0.11
  monkey.debug = false 
  monkey.setCollider("rectangle",200 ,-40,50,600);


  invisible = createSprite(350,400,700,10)
  invisible.visible=false;
  
  gameOver = createSprite(350,100,100,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(350,200,100,100);
  restart.addImage(restartImg);

  gameOver.scale=1;
  restart.scale=1;
  
  gameOver.visible = true;
  restart.visible = true;
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  stone1Group = new Group();
  
  score=0;
  
    sound = loadSound("monkeypatas.mp3");

}

function draw() {  
  
  background("white")
  
  if(keyDown("space") && monkey.y >= 100) {
      monkey.velocityY = -12;
    }
  
        monkey.velocityY=monkey.velocityY+0.8;

  jungle.velocityX=-1
          if(jungle.x<400){
    jungle.x=jungle.width/2
  }  
  
   if(gameState === PLAY){
     
    jungle.velocityX=-1
          if(jungle.x<400){
    jungle.x=jungle.width/2
  }

     
     switch(score){
    case 10: monkey.scale=0.12;
           break;  
     case 20: monkey.scale=0.14;        
             break;  
     case 30: monkey.scale=0.16;
             break;
       
             
          default: break;
     }
     
     
     
     
  stroke("black");
  textSize(100);
  fill("white");
  text("Score:"+score,200,200);
     
     
          
     
     
     
     if(bananaGroup.isTouching(monkey)){
       sound.play();
       bananaGroup.destroyEach();
       score=score+5 ;

     }
     
     
      spawnBanana();
      spawnStone();
      spawnStone1();

     

    gameOver.visible = false;
    restart.visible = false;
     
     
}
     
      monkey.collide(invisible);
      if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      }
  
  
  
     if(stoneGroup.isTouching(monkey)){
        gameState = END;
    }
 if(stone1Group.isTouching(monkey)){
        gameState = END;
    }
  
  
  else if (gameState === END) {
    stoneGroup.setVelocityXEach(0);     
    stone1Group.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    stone1Group.setLifetimeEach(-1);
    
     gameOver.visible = true;
     restart.visible = true;

  }
  
  
    if(mousePressedOver(restart)){
      reset();
    }

  
  
  
drawSprites();
  
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,500,50);

  
}

function spawnBanana(){
  
  if(frameCount % 80 ===0 ){
    var banana = createSprite(600,250,40,10);
    banana.y=random(120,200);
    banana.addImage(bananaImg);
    banana.scale=0.05;
    banana.velocityX= -8;
    banana.lifetime=300;
    monkey.depth=banana.depth+1;
    bananaGroup.add(banana);
    
 }
}



function spawnStone() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
    var stone = createSprite(450,350,100,100);
    stone.addImage(stoneImg);
    stone.y=random(120,200);
    stone.scale = 0.2;
    stone.velocityX = -5;
    stoneGroup.add(stone);
    stone.debug=false
    stone.setCollider("rectangle",-100,0,10,400 );
 
 
  }
}

function spawnStone1() {
  //write code here to spawn the clouds
  if (frameCount % 410=== 0) {
    var stone1 = createSprite(450,350,100,100);
    stone1.addImage(stoneImg);
    stone1.scale = 0.2;
    stone1.velocityX = -5;
    stone1Group.add(stone1);
    stone1.debug=false
    stone1.setCollider("rectangle",-100,0,10,400 );
 
 
  }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
 
  stoneGroup.destroyEach();
  bananaGroup.destroyEach();
  stone1Group.destroyEach();

  monkey.scale=0.11;
  
  
  monkey.changeAnimation("running",monkeyRunning);
  
  score = 0;
  
}