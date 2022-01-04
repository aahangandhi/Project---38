PLAY=1;
END=0;
var gameState = PLAY;
var junge , jungleImage
var monkey , monkey_running 
var rock , rockImage , rockGroup
var banana , bananaImage , bananaGroup
var ground
var score = 0
var time

function preload(){
  monkey_running = loadAnimation("monkeyImages/sprite_0.png","monkeyImages/sprite_1.png","monkeyImages/sprite_2.png","monkeyImages/sprite_3.png","monkeyImages/sprite_4.png","monkeyImages/sprite_5.png","monkeyImages/sprite_6.png","monkeyImages/sprite_7.png","monkeyImages/sprite_8.png")
  
  bananaImage = loadImage("banana.png");
 
  rockImage = loadImage("obstacle.png");
  
  jungleImage = loadImage("jungle.jpg");
}
  
function setup() {
  createCanvas(600,600);
  
  jungle = createSprite(500,300);
  jungle.addAnimation("playingArea",jungleImage)
      
  monkey = createSprite(60,525)
  monkey.addAnimation("theMonkey",monkey_running);
  monkey.scale=0.2;
  monkey.debug = true;
  
  ground = createSprite(300,530,1200,1.2)
  ground.visible = false;
  
  bananaGroup = new Group();
  rockGroup = new Group();
  
//game = new Game();
//game.getState();
//  game.start();

  
}


function draw() {
  background("cyan");
  
  stroke("white");
  textSize(20);
  text("Score = "+score,350,50);
  
  stroke("black");
  textSize(20);
  time=Math.ceil(frameCount/frameRate());
  text("Survival Time = "+time,50,50)

  camera.position.x = 10;
  
  ground.velocityX=-3;
    if (ground.x < 0)
    {
      ground.x = ground.width/2;
    }
  
  jungle.velocityX=-3;
    if (jungle.x < 100)
    {
      jungle.x = jungle.width/2;
    }
  
  monkey.y=monkey.y+1
  monkey.collide(ground);
    if(keyDown("space")&& 
       monkey.y > 450&&
       gameState === PLAY)
    {
      monkey.velocityY = -20;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  var randomYPositionForBanana = Math.round(random(100,300));
    if(frameCount%80===0)
    {
      banana = createSprite(650,randomYPositionForBanana)
      banana.addImage("bananas",bananaImage)
      banana.scale=0.1;
      banana.velocityX=-3
      bananaGroup.add(banana);
      banana.lifetime = 700;
    }
  
    if(rockGroup.isTouching(monkey)&&
       gameState === PLAY &&
       monkey.scale === 0.2) 
    {
      monkey.scale = 0.1;
      rockGroup.destroyEach();
    }

    if (bananaGroup.isTouching(monkey))  
    {
      score = score + 1;
      bananaGroup.destroyEach();
      monkey.scale = 0.2
    }
  
  var randomXPositionForRock = Math.round(random(630,650));
    if(frameCount%300===0)
    {
      rock = createSprite(randomXPositionForRock,500)
      rock.addImage("rocks",rockImage);
      rock.scale=0.2;
      rock.velocityX=-3
      rockGroup.add(rock);
      rock.lifetime = 700;
    }    

    if (rockGroup.isTouching(monkey)&&
        gameState === PLAY &&
        monkey.scale === 0.1) 
    {
      gameState = END;
      World.allSprites.setVelocityEach(0,0);
    }
  
    if (gameState === END)
    {
      bananaGroup.destroyEach();
      rockGroup.destroyEach();
      monkey.destroy();
      ground.destroy();
      jungle.destroy();
      textSize(20);
      stroke("red");
      text("Game finished !",230,300);
      textSize(20);
      stroke("red");
      text("Your score is " + score,230,340);
      time = 0;
      textHider = createSprite(200,37,2000,80);
      textHider.shapeColor = "cyan";
    
     }
  
  drawSprites();
}
