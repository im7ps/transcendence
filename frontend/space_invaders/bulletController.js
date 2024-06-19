import Bullet from "./Bullet.js";
//import box from "./box.js";

export default class bulletController {

  bullets = [];
  timeTillNextBulletAllowed = 0;
  

  constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled) {
    this.canvas = canvas;
    this.maxBulletsAtATime = maxBulletsAtATime;
    this.bulletColor = bulletColor;
    this.soundEnabled = soundEnabled;
    this.bulletCount = 0;
      

    this.shootSound = new Audio("space_invaders/sounds/shoot.wav");
    this.shootSound.volume = 0.1;
  }

  draw(ctx) {
    this.bullets = this.bullets.filter(
        bullet => bullet.y + bullet.height > 0 && bullet.y <= this.canvas.height
    );

    // Controlla le collisioni con il giocatore
    this.bullets.forEach(bullet => {
        // if (this.checkCollision(bullet, this.player)) {
        //     // Esegui un'azione quando c'è una collisione tra un proiettile e il giocatore
        //     // Ad esempio, puoi chiamare una funzione nel giocatore per gestire la collisione
        //     this.player.handleBulletCollision();
        // } else {
            bullet.draw(ctx);
            
        
       // }
    });

    if (this.timeTillNextBulletAllowed > 0) {
        this.timeTillNextBulletAllowed--;
    }
}

// shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
//     if (
//         this.timeTillNextBulletAllowed <= 0 &&
//         this.bullets.length < this.maxBulletsAtATime
//     ) {
//         //const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
//        // this.bullets.push(bullet);
//         console.log(this.bullets);
//         this.playShootSound();
//         this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
//     }
// }

  shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
    if (
        this.timeTillNextBulletAllowed <= 0 &&
        this.bullets.length < this.maxBulletsAtATime
    ) {
      
        const  proiettili = new Bullet(this.canvas, x, y, velocity, "red");
        this.bulletCount++;
		// aggiungere modo per tenere conto dei proiettili sparati per le statistiche giocatore STEPIS
        this.bullets.push(proiettili);
        //console.log(this.bullets);

        console.log(this.bulletCount + " sparalo");
        this.playShootSound(); // Riproduci il suono ogni volta che viene sparato un proiettile
        this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
    }
  
}

playShootSound() {
    if (this.soundEnabled) {
        
        this.shootSound.currentTime = 0;
        this.shootSound.play();
    }
  }
}
