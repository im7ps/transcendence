import box from './box.js';
export default class boxController{
    boxes = [];
    
    constructor(canvas, x, y, boxes){
        this.boxes = boxes;
        this.canvas = canvas;
        this.box = new box(x, y);
    }
draw(ctx){
    this.drawBox(ctx);
    this.collideDetection();
}
// drawBox(ctx){
//     this.box.draw(ctx);
// }

collideDetection(){
    console.log("333");
    this.boxes.forEach(box => {
      if(this.playerBulletController.collideWithBox(box))
      {
        this.boxes.splice(this.boxes.indexOf(box), 1)
      }
  });
  this.boxes = this.boxes.filter((boxes) => boxes.length > 0)
  }

  collideWithBox() {
    return this.boxes.flat().some((box) => box.collideWith(box));
  }
  

}