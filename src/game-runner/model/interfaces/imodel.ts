import { position } from "../objects/iposition";
import { Size } from "../objects/isize";
import { IDrawable } from "../../view/idrawable";
import { MoveBehavior } from "../../controller/MovementBehaviors/moveBehavior";
import { ExternalController } from "../../controller/ExternalController/externalController";
import { SoundBehavior } from "../../../sound-effects/SoundBehaviors/soundBehavior";
import { Behavior } from "../../controller/MovementBehaviors/positionBehavior";
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
  get_CollissionGroup():string;
  get_initialMovement():string;
  get_gravity():boolean;
  i_am_dead(): void;
  am_i_dead(): boolean;

  set_drawable(drawable: IDrawable): void;
  set_size(size: Size): void;
  set_position(position: position): void;
  set_id(id: string): void;
  set_background_sound(backgroundSound: SoundBehavior): void;
  set_selectedId(id: string): void;
  set_CollissionGroup(collisionId: string):void;
  set_initialMovement(initialMovement:string):void;
  set_gravity(gravityOn: boolean):void;

  set_move_behavior(moveBehavior: Behavior): void;
  set_external_controller(externalController: ExternalController): void;
}
