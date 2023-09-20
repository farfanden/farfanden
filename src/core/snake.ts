import Food from "./food";
import { drawCell, drawImageCell } from './board';
import { CELL_SIZE, SNAKE_CELL } from "./config";

export type Point = { x: number, y: number, char?: string }

export default class Snake {
    public body: Point[] = [];
    private gridSize: number;
    private words: string;
    
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D,  gridSize: number) {
        this.gridSize = gridSize;
        this.body[0] = { x: 0, y: 2, char: '' };
        this.ctx = ctx;
        this.words = '';
    }

    private draw() {
        for (let i = 0; i < this.body.length; i++) {
            if( i === 0 ) {
                drawImageCell(this.ctx, CELL_SIZE, {...this.body[i], char: this.words[i - 1]})
            } else {
                drawCell(this.ctx, CELL_SIZE, {...this.body[i], char: this.words[i - 1]}, SNAKE_CELL)
            }
        }
    }

    private clearLastItem(item: Point) {
        drawCell(this.ctx, CELL_SIZE, item)
    }

    move(direction: string, newItem?: Point) {
        const newHead = {...this.body[0]};

        if (direction === "right") newHead.x++;
        if (direction === "left") newHead.x--;
        if (direction === "up") newHead.y--;
        if (direction === "down") newHead.y++;

        if(newItem) {
            this.body = [newHead, ...this.body];
            this.words += newItem.char
        } else { 
            this.clearLastItem(this.body[this.body.length - 1])
            this.body =  [newHead, ...this.body.slice(0,this.body.length - 1)]
        }

        this.draw()
    }

    checkCollision(): boolean {
        const headX = this.body[0].x;
        const headY = this.body[0].y;

        return headX < 0 || headX >=this.gridSize || headY < 0 || headY >= this.gridSize || this.checkSelfCollision();
    }

    private checkSelfCollision(): boolean {
        const head = this.body[0];
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }
        return false;
    }

    eat(food: Food): boolean {
        const head = this.body[0];
        return head.x === food.x && head.y === food.y;
    }

    getSize() {
        return this.body.length-1;
    }
}