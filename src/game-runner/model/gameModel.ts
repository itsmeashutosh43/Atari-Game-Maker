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
import { MoveVertical } from "../controller/MovementBehaviors/moveVertical";
import { MoveHorizontal } from "../controller/MovementBehaviors/moveHorizontal";
import { Effect } from "../controller/MovementBehaviors/ieffects";
import { NoEffect } from "../controller/MovementBehaviors/noEffect";
import { Attack } from "./components/iattack";
import { NoAttack } from "./components/noAttack";
import { Death } from "../controller/MovementBehaviors/death";
import { ReflectEffect } from "../controller/MovementBehaviors/reflectEffect";

export class GameModel implements Observables, IModel {
  drawable: IDrawable;
  position: position;
  size: Size;
  id: string;
  observables: IModel[];
  moveBehavior: MoveBehavior;
  externalController: ExternalController;
  interactions: Map<string, Effect>;
  selectedId: string;
  gravity: boolean;
  collisionId: string;
  initialMovement: string;
  moveLeft: boolean;
  moveRight: boolean;
  moveUp: boolean;
  moveDown: boolean;
  canPlayerMove: boolean;
  count: number = 0;
  dead: boolean = false;
  keybindSet: string;
  attack: Attack;
  game_counter: number = 0;
  affected_by_bullets: boolean = true;

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
    this.collisionId = id; // at the beginning each thing is it own colission group
    this.interactions = new Map<string, Effect>();
    this.attack = new NoAttack();
    this.set_interactions("boundary", new ReflectEffect());
  }

  clone(obs: IModel): IModel {
    let o = new GameModel();
    o.set_drawable(obs.get_drawable());
    o.set_position(obs.get_position());
    o.set_size(obs.get_size());
    o.set_id(obs.get_id());
    o.set_move_behavior(obs.get_move_behavior());
    o.interactions.forEach((v, k) => {
      o.set_interactions(k, v);
    });
    o.set_selectedId(o.get_selectedId());
    o.set_CollissionGroup(o.get_CollissionGroup());
    o.set_affected_by_bullets(o.get_affected_by_bullets());
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
      this.game_counter++;

      if (this.game_counter + (1 % 10) == 0) {
        this.observables = this.observables.filter((e) => !e.am_i_dead());
      }
      this.observables.forEach((obs) => {
        if (!obs.am_i_dead()) {
          obs.get_move_behavior().move(obs);
          obs.get_external_controller().getMovement(obs);
        }
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
    return this.gravity;
  }

  get_moveDown(): boolean {
    return this.moveUp;
  }

  get_playerMove(): boolean {
    return this.canPlayerMove;
  }

  get_moveRight(): boolean {
    return this.moveRight;
  }
  get_moveUp(): boolean {
    return this.moveUp;
  }
  get_moveLeft(): boolean {
    return this.moveLeft;
  }

  get_CollissionGroup(): string {
    return this.collisionId;
  }

  get_keybinds(): string {
    return this.keybindSet;
  }

  get_attacker(): Attack {
    return this.attack;
  }
  get_affected_by_bullets(): boolean {
    return this.affected_by_bullets;
  }
  set_affected_by_bullets(b: boolean): void {
    this.affected_by_bullets = b;
  }
  set_attack(c: string): void {
    c;
  }

  set_keyBinds(keybind: string): void {
    this.keybindSet = keybind;
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
    this.gravity = gravityOn;
  }

  set_playerMove(canMove: boolean): void {
    this.canPlayerMove = canMove;
  }

  set_CollissionGroup(collisionId: string): void {
    this.set_interactions(collisionId, new ReflectEffect());
    this.collisionId = collisionId;
  }

  set_interactions(collisionId: string, effect: Effect) {
    this.interactions.set(collisionId, effect);
  }

  get_interactions(collisionId: string): Effect {
    return this.interactions.get(collisionId) || new NoEffect();
  }

  set_initialMovement(initialMovement: string): void {
    console.log("setting movements", initialMovement);
    switch (initialMovement) {
      case "downMoveBehavior":
        this.set_move_behavior(new MoveVertical("down"));
        break;
      case "upMoveBehavior":
        this.set_move_behavior(new MoveVertical("up"));
        break;
      case "rightMoveBehavior":
        this.set_move_behavior(new MoveHorizontal("right"));
        break;
      case "leftMoveBehavior":
        this.set_move_behavior(new MoveHorizontal("left"));
        break;
      default:
        this.set_move_behavior(new NoMoveBehavior());
    }
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

  set_moveDown(canMove: boolean): void {
    this.externalController.getMovementDirection().down = canMove;
    console.log(this);
    this.moveDown = canMove;
  }

  set_moveRight(canMove: boolean): void {
    // these are for the external controllers
    this.externalController.getMovementDirection().right = canMove;
    this.moveRight = canMove;
  }
  set_moveUp(canMove: boolean): void {
    this.externalController.getMovementDirection().up = canMove;
    // these are for the external controllers
    this.moveUp = canMove;
  }
  set_moveLeft(canMove: boolean): void {
    // these are for the external controllers

    this.externalController.getMovementDirection().left = canMove;
    this.moveLeft = canMove;
  }
  set_external_controller(externalController: ExternalController): void {
    this.externalController = externalController;
  }

  set_attacker(attack: Attack): void {
    this.attack = attack;
  }

  updateSelectedSpriteList(): void {
    const idList: string[] = [];

    this.observables
      .filter((obs) => !obs.am_i_dead())
      .forEach((obs) => {
        idList.push(obs.get_drawable().get_source());
      });
    console.log(`idList: ${idList}`);
    appendToSpriteList(idList);
  }
}
