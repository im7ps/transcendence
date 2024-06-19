export default class enemy {
    constructor(x, y, ImageNumber){
        this.x = x;
        this.y = y;

        this.width = 44;
        this.height = 44;

        this.image = new Image();
        this.image.src = `./images/enemy${ImageNumber}.png`;
    }
    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}