import bulletController from './bulletController.js';
import player from './player.js';

export default class playerController {
    constructor(canvas, playerBulletController) {
        this.bulletOnPlayer = 0;
        this.bulletOnBox = 0;
        this.playerBulletController = playerBulletController;
        this.canvas = canvas;
        this.bulletController = new bulletController(canvas, 10, "red", true);
        this.player = new player(canvas, this.bulletController);
    }
    draw(ctx) {
        this.player.draw(ctx);
    }
}