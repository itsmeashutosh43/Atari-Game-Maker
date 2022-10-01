import { Size } from "./isize";
import { position } from "./iposition";
import { BoundingBox } from "./isize";

export class RectangleSize implements Size {
  width: number;
  height: number;
  color: string;

  constructor(width: number, height: number, color?: string) {
    this.width = width;
    this.height = height;
    this.color = color;
  }
  getDimention(): Size {
    return this;
  }
  getBoundingBox(pos: position): BoundingBox {
    return {
      up: pos.y - this.height,
      down: pos.y + this.height,
      left: pos.x - this.width,
      right: pos.x + this.width,
    };
  }
  getColor(): string {
    return this.color;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }
}
