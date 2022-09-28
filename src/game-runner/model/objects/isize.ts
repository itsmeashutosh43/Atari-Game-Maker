import { position } from "./iposition";

export interface BoundingBox {
  up: number;
  down: number;
  left: number;
  right: number;
}

export interface Size {
  getDimention(): Size;
  getBoundingBox(pos:position): BoundingBox;
  getColor(): string;
}
