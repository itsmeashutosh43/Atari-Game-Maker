import { IModel } from "./interfaces/imodel";
import { position } from "./objects/iposition";
import { Size } from "./objects/isize";
import { Observables } from "./interfaces/observable";
import { IDrawable } from "../view/idrawable";
import { RectangleSize } from "./objects/rectangleSize";
import { defaultImageDrawable } from "../view/imageDrawable";
import { appendToSpriteList } from "./components/addToSpriteList";
import { Drawable } from "../drawables/drawable";
export class GameModel implements Observables, IModel {
  drawable: IDrawable;
  position: position;
  size: Size;
  id: string;
  observables: IModel[];

  constructor(id?: string) {
    this.drawable = new defaultImageDrawable("");
    this.position = { x: 150, y: 150 };
    this.size = new RectangleSize(50, 50);
    this.id = id;
    this.observables = [];
  }

  clone(drawable: IDrawable, position: position, size: Size, id: string) {
    let o = new GameModel();

    o.set_drawable(drawable);
    o.set_position(position);
    o.set_size(size);
    o.set_id(id);
    return o;
  }

  add(obs: IModel): void {
    this.observables.push(obs);
  }
  remove(obs: IModel): void {
    /*
    let count: number = 0;
    this.observables.forEach((obs) => {
        if(id == obs.get_drawable().get_source()){
          this.observables.
        }
    });
    */
  }

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

  set_size(size: Size): void {
    this.size = size;
  }

  updateSelectedSpriteList(): void {
    const idList: string[] = [];

    this.observables.forEach((obs) => {
      console.log(obs.get_drawable().get_source());
      idList.push(obs.get_drawable().get_source());
    });
    appendToSpriteList(idList);
  }
}
