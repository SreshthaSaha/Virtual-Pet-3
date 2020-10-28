var dog, happyDog;
var dogIMG,happyDogIMG,sadDogIMG;
var database;
var foodS, foodStock;
var milkImage;
var feedPet,addFood;
var fedTime;
var milk;
var bedroom,garden,washroom;
var readingGameState,changingGameState;
var bg;

function preload(){
   dogIMG = loadImage("Dog.png")
   happyDogIMG = loadImage("happydog.png")
   milkImage = loadImage("Milk.png");
   bedroom = loadImage("Bed Room.png");
   garden = loadImage("Garden.png");
   washroom = loadImage("Wash Room.png");
   sadDogIMG = loadImage("Lazy.png");
}
function setup() {
  createCanvas(1000,500);

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  readingGameState = database.ref('gamestate');
  readingGameState.on("value",function(data){
    gamestate=data.val();
  });
   milk = new Foodclass();

  dog = createSprite(450,300,50,50);
  dog.addImage(dogIMG); 
  dog.scale = 0.2; 

  feedPet=createButton("Feed the dog");
  feedPet.position(700,95);
  feedPet.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {  
  background(46,189,37);
  
  fedTime=database.ref('fedTime');
  fedTime.on("value",function(data){
    fedTime=data.val();
  });

  fill("black");
  textSize(20);
  // text("Food Remaining : " + foodS , 300,200);
  // text("NOTE : Press UP_ARROW key to feed Drago the milk",300,30);

  if(fedTime>=12){
    text("fedTime = "+fedTime%12+"pm",350,30);
   }else if(fedTime === 0){
     text("Last Fed : 12 AM ",350,30);
   }else{
     text("Last Fed : " + fedTime + "AM",350,30);
   }
   currentTime = hour();//new Date().getHours();
   console.log(currentTime);
   if(currentTime===(fedTime+1)){
     update("Playing");
     milk.Garden();
   }else if(currentTime ===(fedTime+2)){
     update("Sleeping");
     milk.Bedroom();
   }else if(currentTime > fedTime+2 && currentTime<=fedTime+4){
     update("Bathing");
     milk.Washroom();
   }else{
    update("hungry");
    milk.display();
  }
   if(gamestate !== "hungry"){
    feedPet.hide();
    addFood.hide();
    dog.remove();
   }else{
    feedPet.show();
    addFood.show();
    dog.addImage(sadDogIMG);
   }
  
  drawSprites();
  //add styles here
 
}
function readStock(data){
  foodS = data.val();
  milk.updateFoodStock(foodS);
}
function writeStock(x){
    if(x<=0){
      x = 0;
    }else{
      x = x - 1;
    } 
  database.ref('/').update({
     Food:x
  })
}
function feedDog(){
  dog.addImage(happyDogIMG);

  milk.updateFoodStock(milk.getFoodStock()-1);
  database.ref('/').update({
    Food: milk.getFoodStock(),
    fedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
  })
}
function update(state){
  database.ref('/').update({
    gamestate:state
  });
}



