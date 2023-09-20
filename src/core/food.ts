import { drawCell } from "./board";
import { CELL_SIZE, FOOD_CELL, WORDS } from "./config";
import { Point } from "./snake";

export default class Food {
    public x: number;
    public y: number;
    public char: string;
    public gridSize: number;
    private ctx: CanvasRenderingContext2D;

    constructor(gridSize: number, ctx: CanvasRenderingContext2D) {
        this.x = Math.floor(Math.random() * gridSize);
        this.y = Math.floor(Math.random() * gridSize);
        this.gridSize = gridSize;
        this.char = WORDS[0];
        this.ctx = ctx;
    }

    private draw() {
        drawCell(this.ctx, CELL_SIZE, { x: this.x, y: this.y }, FOOD_CELL)
    }

    randomizePosition(index: number, snake?: Point[]) {
        if(snake) {
            let colliding = true;

            let new_x, new_y; 
            
            while(colliding) {
                colliding = false;
                new_y = Math.floor(Math.random() * this.gridSize);
                new_x = Math.floor(Math.random() * this.gridSize);
            
                for (let box of snake) {
                    if (new_x == box.x && new_y == box.y) {
                        colliding = true;
                        break;
                    }
                }
            }
            
            this.x = new_x as number;
            this.y = new_y as number;
        } else {
            this.x = Math.floor(Math.random() * this.gridSize);
            this.y = Math.floor(Math.random() * this.gridSize);
        }
        
        this.char = WORDS[index];

        console.log('this.', this)
        this.draw();
    }

    getPosition() {
        return { x: this.x, y: this.y, char: this.char};
    }
}