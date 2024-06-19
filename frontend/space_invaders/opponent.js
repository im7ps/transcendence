export default class opponent {

    rightPressed2 = false;
    leftPressed2 = false;
    shootPressed2 = false;

    constructor(canvas, bulletController){
        this.canvas = canvas;
        this.width = 55;
        this.height = 44;
        this.bulletController = bulletController;
        this.x = 300 - (this.width / 2);
        this.y = 10;

        this.speed = 3;
        this.health = 10;
    
        this.image = new Image();
        this.image.src = `./space_invaders/images/player2.png`;
        document.addEventListener("keydown", (event) => this.keydown(event));
        document.addEventListener("keyup", (event) => this.keyup(event));
    }
    draw(ctx){

        
        this.move();
        this.wallCollision();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        if (this.shootPressed2) {
            //console.log(this.bulletController);
            this.bulletController.shoot(this.x + this.width / 2, this.y + this.height, -4, 10); // Usa this.bulletController
        }
        this.bulletController.draw(ctx);
    }
    wallCollision(){
        if(this.x <= 0)
            this.x = 0;
        if(this.x >= this.canvas.width - this.width)
        this.x = this.canvas.width - this.width;            
    }
    collideDetection() {
        // Implementazione della logica di rilevamento delle collisioni dell'avversario
        // Puoi inserire qui la logica per controllare le collisioni con i proiettili dei giocatori
    }
    move() {
            if(this.rightPressed2)
                this.x += this.speed;
            else if (this.leftPressed2)
                this.x -= this.speed;
        }
    
    keydown = (event) => {
        if(event.code == "ArrowRight")
            this.rightPressed2 = true;
        if(event.code == "ArrowLeft")
            this.leftPressed2 = true;
        if(event.code == "ArrowDown")
            this.shootPressed2 = true;

    }
    keyup(event) {
        // Aggiorna lo stato dei tasti quando vengono rilasciati
        if (event.code == "ArrowRight")
            this.rightPressed2 = false;
        if (event.code == "ArrowLeft")
            this.leftPressed2 = false;
        if(event.code == "ArrowDown")
            this.shootPressed2 = false;
    }
    collideWith(sprite) {
        if (
          this.x + this.width > sprite.x &&
          this.x < sprite.x + sprite.width &&
          this.y + this.height > sprite.y &&
          this.y < sprite.y + sprite.height
        ) {
          return true;
        } else {
          return false;
        }
    }
}