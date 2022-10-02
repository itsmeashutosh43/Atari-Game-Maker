import { position } from "../objects/iposition";
import { Size } from "../objects/isize";
import { IDrawable } from "../../view/idrawable";
import { ExternalController } from "../../controller/ExternalController/externalController";
import { SoundBehavior } from "../../../sound-effects/SoundBehaviors/soundBehavior";
import { Behavior } from "../../controller/MovementBehaviors/positionBehavior";
import { Effect } from "../../controller/MovementBehaviors/ieffects";
import { Attack } from "../components/iattack";
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
  get_move_behavior(): Behavior;
  get_external_controller(): ExternalController;
  get_background_sound(): SoundBehavior;
  get_selectedId(): string;
  get_CollissionGroup(): string;
  get_initialMovement(): string;
  get_gravity(): boolean;
  get_moveRight(): boolean;
  get_moveLeft(): boolean;
  get_moveUp(): boolean;
  get_moveDown(): boolean;
  get_playerMove(): boolean;
  get_keybinds(): string;
  get_interactions(id: string): Effect;
  get_attacker(): Attack;
  get_affected_by_bullets(): boolean;
  i_am_dead(): void;
  am_i_dead(): boolean;

  set_affected_by_bullets(b: boolean): void;
  set_drawable(drawable: IDrawable): void;
  set_size(size: Size): void;
  set_position(position: position): void;
  set_id(id: string): void;
  set_background_sound(backgroundSound: SoundBehavior): void;
  set_selectedId(id: string): void;
  set_CollissionGroup(collisionId: string): void;
  set_initialMovement(initialMovement: string): void;
  set_gravity(gravityOn: boolean): void;
  set_moveRight(canMove: boolean): void;
  set_moveLeft(canMove: boolean): void;
  set_moveUp(canMove: boolean): void;
  set_moveDown(canMove: boolean): void;
  set_playerMove(canMove: boolean): void;
  set_move_behavior(moveBehavior: Behavior): void;
  set_keyBinds(keybind: string): void;
  set_external_controller(externalController: ExternalController): void;
  set_interactions(collisionId: string, effect: Effect): void;
  set_attack(c: string): void;
  set_attacker(attack: Attack): void;
}
