class Foodclass{
    constructor(){
      this.foodStock = 0;
      this.fedTime = 0;  
      this.image = loadImage("Milk.png");
    }
    getFoodStock(){
     return this.foodStock;
    }
    updateFoodStock(FS){
     this.foodStock = FS;
    }
    deductFood (){
     if(this.foodStock > 0 ){
        this.foodStock = this.foodStock - 1;
     }
    }
    Bedroom(){
        background(bedroom,1000,1000);
        imageMode(CENTER);
    }
    Garden(){
        background(garden,1000,1000);
        imageMode(CENTER);
    }
    Washroom(){
        background(washroom,1000,1000);
        imageMode(CENTER);
    }
     display(){
       var x = 80,y=100;

       imageMode(CENTER);
       image(this.image,720,220,70,70);

       if(this.foodStock!=0){
           for(var i = 0; i < this.foodStock; i++){
               if(i % 10 === 0){
                   x = 80;
                   y = y + 50;
               }
            image(this.image,x,y,50,50);
            x = x + 30;
           }
       }
   }
   
}