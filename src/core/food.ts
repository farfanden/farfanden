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
            let possibleFoodLocations = [];

            for (let row = 0; row < this.gridSize; row++) {
                for (let column = 0; column < this.gridSize; column++) {
                    let isLocationValid = snake.every(bodyPart => {
                        return row !== bodyPart.y || column !== bodyPart.x;
                    });
            
                    if (isLocationValid) {
                        possibleFoodLocations.push({ x: column, y: row });
                    }
                }
            }
            const newSpawnLoc = possibleFoodLocations[Math.floor(Math.random() * possibleFoodLocations.length -1)]
            this.x = newSpawnLoc.x;
            this.y = newSpawnLoc.x;
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