import { GameModel } from "../model/gameModel";
import { IModel } from "../model/interfaces/imodel";
import { position } from "../model/objects/iposition";
import { Size } from "../model/objects/isize";
import { BoundingBox } from "../model/objects/isize";

export class CanvasLayout {
  canvasId: string;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  model: GameModel;

  private static instance: CanvasRenderingContext2D;

  lastX: number = -1;
  lastY: number = -1;

  constructor(canvasId: string, model: GameModel) {
    this.canvasId = canvasId;
    this.model = model;
    this.canvas = <HTMLCanvasElement>document.getElementById(this.canvasId);
    CanvasLayout.instance = <CanvasRenderingContext2D>(
      this.canvas.getContext("2d")
    );

    this.canvas.onmousemove = (event: MouseEvent) => {
      if (event.button ^ event.buttons) {
        this.handleDragEvent(event);
      }
    };

    this.canvas.onmouseup = (event: MouseEvent) => {
      this.lastX = this.lastY = -1;
    };
  }

  public static getInstance(): CanvasRenderingContext2D {
    return CanvasLayout.instance;
  }

  handleDragEvent(event: MouseEvent) {
    console.log("Called");
    let x: number, y: number, dx: number, dy: number;
    ({ x, y } = { x: event.offsetX, y: event.offsetY });
    [dx, dy] = [x - this.lastX, y - this.lastY];
    if (this.lastX == -1) {
      dx = dy = 0;
    }

    let hover: IModel = this.model.observables.filter((e) =>
      this.isWithin(e, x, y, dx, dy)
    )[0];
    if (hover) {
      console.log("Test");
      let newPos: position = {
        x: hover.get_position().x + dx,
        y: hover.get_position().y + dy,
      };
      hover.set_position(newPos);

      this.clearScreen();
      this.lastX = x;
      this.lastY = y;
    }
  }

  isWithin(
    model: IModel,
    x: number,
    y: number,
    dx: number,
    dy: number
  ): boolean {
    const dimention: Size = model.get_size();
    const position: position = model.get_position();

    let box: BoundingBox = dimention.getBoundingBox(position);

    return x < box.right && x > box.left && y > box.down && y < box.up;
  }

  getCanvasWidth(): number {
    return this.canvas.width;
  }

  getCanvasHeight(): number {
    return this.canvas.height;
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  clearScreen(): void {
    CanvasLayout.getInstance().clearRect(
      0,
      0,
      this.getCanvasWidth(),
      this.getCanvasHeight()
    );
  }

  clearScreenArea(x: number, y: number, w: number, h: number): void {
    CanvasLayout.getInstance().clearRect(x, y, x + w, x + h);
  }
}
