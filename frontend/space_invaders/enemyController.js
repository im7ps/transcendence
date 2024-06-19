import enemy from './enemy.js';
export default class enemyController{
    enemyMap= [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    enemyRows = [];
    constructor(canvas){
        this.canvas = canvas;
        this.createEnemies();
    }
    draw(ctx){
        this.drawEnemies(ctx);
    }

    drawEnemies(ctx){
        this.enemyRows.flat().forEach((enemy) => {
            enemy.draw(ctx);
    
    });
    }
    createEnemies(){
        this.enemyMap.forEach((row, rowIndex) => {
            this.enemyRows[rowIndex] = [];
            row.forEach((enemyNumber, enemyIndex) =>{
                if(enemyNumber > 0){
                    this.enemyRows[rowIndex].push(new enemy(enemyIndex* 55, rowIndex* 40, enemyNumber))
                }
            })
        })
    }
}