import { Size } from "./isize";
import { position } from "./iposition";
import { BoundingBox } from "./isize";

export class CircleSize implements Size {
  radius: number;
  color: string;
  constructor(radius: number, e: number, color: string) {
    this.radius = radius;
    this.color = color;
  }
  getDimention(): Size {
    return this;
  }
  getBoundingBox(pos: position): BoundingBox {
    return {
      up: pos.y - this.radius,
      down: pos.y + this.radius,
      left: pos.x - this.radius,
      right: pos.x + this.radius,
    };
  }
  getColor(): string {
    return this.color;
  }
}
