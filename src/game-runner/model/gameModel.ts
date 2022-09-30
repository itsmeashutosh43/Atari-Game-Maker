import { IModel } from "./interfaces/imodel";
import { position } from "./objects/iposition";
import { Size } from "./objects/isize";
import { Observables } from "./interfaces/observable";
import { IDrawable } from "../view/idrawable";
import { RectangleSize } from "./objects/rectangleSize";
import { defaultImageDrawable } from "../view/imageDrawable";
import { appendToSpriteList } from "./components/addToSpriteList";
import { Drawable } from "../drawables/drawable";
import { MoveBehavior } from "../controller/MovementBehaviors/moveBehavior";
import { ExternalController } from "../controller/ExternalController/externalController";
export class GameModel implements Observables, IModel {
  drawable: IDrawable;
  position: position;
  size: Size;
  id: string;
  observables: IModel[];
  moveBehavior: MoveBehavior;
  externalController: ExternalController;
  selectedId: string;
  

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

  get_move_behavior(): MoveBehavior {
    return this.moveBehavior;
  }
  get_external_controller(): ExternalController {
    return this.externalController;
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
  

  get_selectedId(): string{
    return this.selectedId;
  }

  set_drawable(drawable: IDrawable): void {
    this.drawable = drawable;
  }


  set_selectedId(id:string):void{
    this.selectedId = id
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

  set_move_behavior(moveBehavior: MoveBehavior): void {
    this.moveBehavior = moveBehavior;
  }
  set_external_controller(externalController: ExternalController): void {
    this.externalController = externalController;
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
