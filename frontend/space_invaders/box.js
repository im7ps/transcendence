export default class box{
constructor(x, y){
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 44;
    this.health = 10;
    this.image = new Image();
    if(y > 300)
        this.image.src = `./space_invaders/images/fullbox.png`;
     else 
         this.image.src = `./space_invaders/images/fullbox2.png`;
}
draw(ctx){
    
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.changeBox(this.y);
}

changeBox(y){
    if(y > 300){
        if(this.health > 8){
            this.image.src = `./space_invaders/images/fullbox.png`;
        }
        else if(this.health > 6)
        {
            this.image.src = `./space_invaders/images/box1.png`;
        }
        else if( this.health > 4)
        {
            this.image.src = `./space_invaders/images/box2.png`;
        }
        else
        {
            this.image.src = `./space_invaders/images/box3.png`;
        }
    }
    if(y < 300){
        if(this.health > 8){
            this.image.src = `./space_invaders/images/fullbox2.png`;
        }
        else if(this.health > 6)
        {
            this.image.src = `./space_invaders/images/opponentBox1.png`;
        }
        else if( this.health > 4)
        {
            this.image.src = `./space_invaders/images/opponentBox2.png`;
        }
        else
        {
            this.image.src = `./space_invaders/images/opponentBox3.png`;
        }
    }
}
}