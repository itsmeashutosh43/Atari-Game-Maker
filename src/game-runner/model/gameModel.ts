import { IModel } from "./imodel";
import { position } from "./objects/iposition";
import { Size } from "./objects/isize";
import { Observables } from "./observable";
import { IDrawable } from "../view/idrawable";
import { CircleDrawable } from "../view/circleDrawable";
import { RectangleSize } from "./objects/rectangleSize";
import { ImageDrawable } from "../view/imageDrawable";

export class GameModel implements Observables, IModel {
  drawable: IDrawable;
  position: position;
  size: Size;
  id: string;
  observables: IModel[];

  constructor(){
    this.drawable = new ImageDrawable("")
    this.position = {x: 50, y: 50}
    this.size = new RectangleSize(50,50)
    this.observables =  []
  }

  add(obs: IModel): void {
    this.observables.push(obs);
  }
  remove(obs: IModel): void {}
  
  notify(): void {
    this.observables.forEach((obs) => {
      obs.get_drawable().draw(obs.get_size(), obs.get_position());
    });
  }
  get_drawable(): IDrawable {
    return this.drawable;
  }
  get_position(): position {
    return this.position;
  }
  get_size(): Size {
    return this.size;
  }
  get_id(): string {
    return this.id;
  }

  set_drawable(drawable: IDrawable): void {
    this.drawable = drawable;
  }
  set_position(position: position): void {
    this.position = position;
  }
  set_id(id: string): void {
    this.id = id;
  }
}
