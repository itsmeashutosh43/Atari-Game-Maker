import { CANVAS } from "../..";
import { cCircle, cSquare } from "../../game-maker/util/form-const";

export interface Cooridnates {
    x: number;
    y: number;
}


export interface BoundingBox {
    up: number,
    down: number,
    left: number,
    right: number,
}

export interface Drawable {
    draw(ctx: CanvasRenderingContext2D): void;
}

export abstract class Shape implements Drawable {
    origin: Cooridnates;
    color: string;
    
    type: string;

    static readonly DEFAULT_COLOR = "red";
    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract getBoundingBox(): BoundingBox;

    abstract getSize(): Array<number>;

    getPosX(): number{
        return this.origin.x;
    }

    getPosY(): number{
        return this.origin.y;
    }
    getType(): string{
        return this.type;
    }
    getColor(): string{
        return this.color;
    }
    
}

export class Circle extends Shape {

    private static readonly DEFAULT_RADIUS = 10;
    radius: number;

    constructor(x: number, y: number, r?: number, c?: string) {
        super();
        this.origin = { x: x, y: y }
        this.radius = r ? r : Circle.DEFAULT_RADIUS;
        this.color = c ? c : Shape.DEFAULT_COLOR;
        this.type = cCircle;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.origin.x, this.origin.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    getBoundingBox(): BoundingBox {
        return {
            up: this.origin.y - this.radius,
            down: this.origin.y + this.radius,
            left: this.origin.x - this.radius,
            right: this.origin.x + this.radius,
        };
    }

    getSize(): Array<number>{
        return [this.radius];
    }

}

export class Block extends Shape {

    private static readonly DEFAULT_HEIGHT = 20;
    private static readonly DEFAULT_WIDTH = 20;

    private height: number;
    private width: number;

    constructor(x: number, y: number, w?: number, h?: number, c?: string) {
        super();
        this.origin = { x: x, y: y }
        this.width = w ? w : Block.DEFAULT_WIDTH;
        this.height = h ? h : Block.DEFAULT_HEIGHT;
        this.color = c ? c : Shape.DEFAULT_COLOR;
        this.type = cSquare;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.origin.x, this.origin.y, this.width, this.height);
    }

    getBoundingBox(): BoundingBox {
        return {
            up: this.origin.y,
            down: this.origin.y + this.height,
            left: this.origin.x,
            right: this.origin.x + this.width,
        }
    }

    getSize(): Array<number>{
        return [this.height, this.width];
    }

}