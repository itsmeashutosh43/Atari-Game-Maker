import { position } from "../objects/iposition";
import { Size } from "../objects/isize";
import { IDrawable } from "../../view/idrawable";

export interface IModel {
  clone(
    drawable: IDrawable,
    position: position,
    size: Size,
    id: string
  ): IModel;
  get_drawable(): IDrawable;
  get_position(): position;
  get_size(): Size;
  get_id(): string;

  set_drawable(drawable: IDrawable): void;
  set_size(size: Size): void;
  set_position(position: position): void;
  set_id(id: string): void;
}
