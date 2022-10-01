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
import { SoundBehavior } from "../../sound-effects/SoundBehaviors/soundBehavior";
import { NoSoundBehavior } from "../../sound-effects/SoundBehaviors/noSoundBehavior";
import { MODE } from "../..";
import { NoMoveBehavior } from "../controller/MovementBehaviors/noMoveBehavior";
import { NoController } from "../controller/ExternalController/noController";
import { Colission } from "../controller/colission_detector/colission";
export class GameModel implements Observables, IModel {
  drawable: IDrawable;
  position: position;
  size: Size;
  id: string;
  observables: IModel[];
  moveBehavior: MoveBehavior;
  externalController: ExternalController;
  selectedId: string;
  gravity: boolean;
  collisionId: string;
  initialMovement:string;
  moveLeft: boolean
  moveRight: boolean
  moveUp: boolean
  moveDown: boolean
  count: number = 0;
  dead: boolean = false;

  backgroundSound: SoundBehavior;

  constructor(id?: string) {
    this.drawable = new defaultImageDrawable("");
    this.position = { x: 150, y: 150 };
    this.size = new RectangleSize(50, 50);
    this.id = id;
    this.observables = [];
    this.moveBehavior = new NoMoveBehavior();
    this.externalController = new NoController();
    this.backgroundSound = new NoSoundBehavior();
  }

  clone(drawable: IDrawable, position: position, size: Size, id: string) {
    let o = new GameModel();

    o.set_drawable(drawable);
    o.set_position(position);
    o.set_size(size);
    o.set_id(id);
    return o;
  }

  i_am_dead(): void {
    this.dead = true;
  }

  am_i_dead(): boolean {
    return this.dead;
  }

  add(obs: IModel): void {
    obs.set_selectedId(obs.get_id() + this.count++);
    this.observables.push(obs);
  }
  remove(obs: IModel): void {}

  notify(mode: MODE): void {
    this.observables.forEach((obs) => {
      if (!obs.am_i_dead())
        obs.get_drawable().draw(obs.get_size(), obs.get_position());
    });

    // register to external events

    // move only in mode == game

    if (mode == MODE.GAME) {
      this.observables.forEach((obs) => {
        if (!obs.am_i_dead()) this.get_move_behavior().move(obs);
      });

      this.observables.forEach((obs1) => {
        if (!obs1.am_i_dead()) {
          this.observables.forEach((obs2) => {
            if (!obs2.am_i_dead()) {
              if (obs1 != obs2) {
                Colission.checkColissionAndHandleEffect(obs1, obs2);
              }
            }
          });
        }
      });
    }
  }

  get_background_sound(): SoundBehavior {
    return this.backgroundSound;
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

  get_selectedId(): string {
    return this.selectedId;
  }
  get_initialMovement(): string {
    return this.initialMovement;
  }

  get_gravity(): boolean {
    return this.gravity
  }


  get_moveDown(): boolean {
    return this.moveUp
  }

  get_moveRight(): boolean {
    return this.moveRight
  }
  get_moveUp(): boolean {
    return this.moveUp
  }
  get_moveLeft(): boolean {
    return this.moveLeft
  }

  get_CollissionGroup(): string {
    return this.collisionId;
  }

  set_drawable(drawable: IDrawable): void {
    this.drawable = drawable;
  }

  set_selectedId(id: string): void {
    this.selectedId = id;
  }
  set_position(position: position): void {
    this.position = position;
  }
  set_id(id: string): void {
    this.id = id;
  }

  set_gravity(gravityOn: boolean): void {
    this.gravity = gravityOn
  }

  set_CollissionGroup(collisionId: string): void {
    this.collisionId = collisionId
  }

  set_initialMovement(initialMovement: string): void {
    this.initialMovement = initialMovement;
  }

  set_background_sound(backgroundSound: SoundBehavior): void {
    this.backgroundSound = backgroundSound;
  }

  set_size(size: Size): void {
    this.size = size;
  }

  set_move_behavior(moveBehavior: MoveBehavior): void {
    this.moveBehavior = moveBehavior;
  }

  set_moveDown(canMove:boolean): void {
     this.moveDown = canMove
  }

  set_moveRight(canMove:boolean): void{
    this.moveRight = canMove
  }
  set_moveUp(canMove:boolean): void {
    this.moveUp = canMove
  }
  set_moveLeft(canMove:boolean): void {
    this.moveLeft = canMove
  }
  set_external_controller(externalController: ExternalController): void {
    this.externalController = externalController;
  }

  updateSelectedSpriteList(): void {
    const idList: string[] = [];

    this.observables.forEach((obs) => {
      idList.push(obs.get_drawable().get_source());
    });
    appendToSpriteList(idList);
  }
}
