var dog, dogImg, happyDogImg, database, foodS, foodStock; 

function preload()
{
  dogImg = loadImage("images/Dog.png");
  happyDogImg = loadImage("images/happydog.png");
}

function setup() {
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  createCanvas(500, 500);
  
  dog = createSprite(250,300,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.3;  
}


function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }

  if(foodS === 0){
    strokeWeight(2);
    stroke("black");
    fill("yellow");
    textSize(25);
    text("Food is finished.",150,475);
  }

  drawSprites();
  strokeWeight(2);
  stroke("black");
  fill("gold");
  textSize(24);
  text("Food Remaining: " + foodS,150,150);
  fill("orange");
  textSize(20);
  text("Note: Press UP_ARROW Key to Feed Drago Milk!",20,25);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }else{
    x = x-1;
  }
  
  database.ref('/').update({
    Food:x
  })
}