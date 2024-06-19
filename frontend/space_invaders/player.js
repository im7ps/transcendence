export default class player{

    rightPressed1 = false;
    leftPressed1 = false;
    shootPressed1 = false;

    constructor(canvas, bulletController){
        this.canvas = canvas;
        this.width = 55;
        this.height = 44;
        this.bulletController = bulletController;
        this.x = 300 - (this.width / 2);
        this.y = 550;

        this.speed = 3;
        this.health = 10;
    
		this.shots_fired = 0;

        this.image = new Image();
        this.image.src = `./space_invaders/images/player1.png`;
        document.addEventListener("keydown", (event) => this.keydown(event));
        document.addEventListener("keyup", (event) => this.keyup(event));
    }
    draw(ctx){

        
        this.move();
        this.wallCollision();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        if (this.shootPressed1) {
            this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10); // Usa this.bulletController
        }
        this.bulletController.draw(ctx);
    }
    wallCollision(){
        if(this.x <= 0)
            this.x = 0;
        if(this.x >= this.canvas.width - this.width)
            this.x = this.canvas.width - this.width;
    }
    move() {
            if(this.rightPressed1)
                this.x += this.speed;
            else if (this.leftPressed1)
                this.x -= this.speed;
    }
    keydown = (event) => {
        if(event.code == "KeyA")
            this.leftPressed1 = true
        if(event.code == "KeyD")
            this.rightPressed1 = true;
        if(event.code == "Space")
            this.shootPressed1 = true;  
    }
    keyup(event) {
        // Aggiorna lo stato dei tasti quando vengono rilasciati
        if (event.code == "KeyD")
            this.rightPressed1 = false;
        if (event.code == "KeyA")
            this.leftPressed1 = false;
        if(event.code == "Space")
            this.shootPressed1 = false;
    }
}