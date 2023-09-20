import Food from "./food";
import Snake from "./snake";
import { initBoard } from './board';
import { CELL_SIZE, WORDS } from "./config";

export class SnakeGame {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    gridSize: number;
    snake: Snake;
    direction: string;
    food: Food;
    public id?: NodeJS.Timeout;
    callback: any;
  
    constructor(canvas: HTMLCanvasElement, callback: any) {
      const ctx = canvas.getContext("2d")!;
      this.canvas = canvas;
      this.ctx = ctx;
      this.gridSize = canvas.width / CELL_SIZE;
      this.snake = new Snake(ctx, this.gridSize);
      this.direction = "right";
      this.food = new Food(this.gridSize, ctx);  
      this.callback = callback;
    }
  
    public init() {
        this.addEventListeners();
        initBoard(this.ctx, CELL_SIZE, this.gridSize)
        this.food.randomizePosition(0) 
        this.direction = "right";
        this.snake = new Snake(this.ctx, this.gridSize);

        return this.startGameLoop();
    }

    update(): void {
      if (this.snake.eat(this.food)) {
        this.snake.move(this.direction, this.food.getPosition());
        this.food.randomizePosition(this.snake.getSize(), this.snake.body)
      } else { 
        this.snake.move(this.direction);
      }

      if (this.snake.checkCollision()) {
        this.stopGame('lose');
      }

      if(this.snake.body.length - 1 === WORDS.length) {
        this.stopGame('win')
      }
    }
  
    changeDirection(newDirection: string): void {
        this.direction = newDirection 
    }
  
    startGameLoop(): void {
      const id =  setInterval(() => {
        this.update();
      }, 200);
      this.id = id;
    }
  
    addEventListeners(): void {
      document.addEventListener("keydown", (event) => {
        switch (event.key) {
          case "ArrowUp":
            if (this.direction !== "down") this.changeDirection("up");
            break;
          case "ArrowDown":
            if (this.direction !== "up") this.changeDirection("down");
            break;
          case "ArrowLeft":
            if (this.direction !== "right") this.changeDirection("left");
            break;
          case "ArrowRight":
            if (this.direction !== "left") this.changeDirection("right");
            break;
        }
      });
    }

    stopGame(status: 'start' | 'lose' | 'end' | 'win'): void {
      clearInterval(this.id);
      this.callback(status);
    }

    public getStatus () {
        return this.id;
    }
  }
  
  export default SnakeGame;
  