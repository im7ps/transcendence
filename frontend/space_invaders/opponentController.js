import box from './box.js';
import bulletController from './bulletController.js';
import opponent from './opponent.js';

export default class opponentController {
    constructor(canvas, playerBulletController) {
        this.bulletOnPlayer = 0;
        this.bulletOnBox = 0;
        this.name = "Opponent";
        this.playerBulletController = playerBulletController;
        this.canvas = canvas;
        this.bulletController = new bulletController(canvas, 10, "red", true);
        this.opponent = new opponent(canvas, this.bulletController);
        // console.log(boxes[1]);
        // console.log(this.boxes);
    }
    draw(ctx) {
        this.opponent.draw(ctx);
    }
}