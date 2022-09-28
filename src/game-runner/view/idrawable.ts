import { Size } from "../model/objects/isize";
import { position } from "../model/objects/iposition";

export interface IDrawable {
  draw(size: Size, pos: position): void;
}
