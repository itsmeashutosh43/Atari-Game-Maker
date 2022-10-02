import { ReflectEffect } from "../../controller/MovementBehaviors/reflectEffect";
import { IDrawable } from "../../view/idrawable";
import { GameModel } from "../gameModel";
import { IModel } from "../interfaces/imodel";
import { Attack } from "./iattack";

export class BulletAttack implements Attack {
  draw: IDrawable;
  movement: string;
  collision_group: string;
  activate: boolean = false;
  observables: IModel[];
  count: number = 10;
  curr_model: IModel;
  constructor(
    draw: IDrawable,
    movement: string,
    collision_group: string,
    observables: IModel[]
  ) {
    // this should be destroyed with colissions with any
    this.movement = movement;
    this.draw = draw;
    this.collision_group = collision_group;
    this.observables = observables;
  }

  set_curr_model(model: IModel) {
    this.curr_model = model;
  }

  handleKeyUp = (e: KeyboardEvent): void => {
    console.log("handling key down");
    if (e.code == "Space") {
      this.check_for_attack();
    }
  };
  handleKeyboardUp(e: KeyboardEvent): void {
    if (e.code == "Space") {
      // /this.activate = false;
    }
  }
  set_properties(): void {
    // this should be same as click model, specially the position properties{
  }
  check_for_attack(): void {
    //this is a looper being called from the top model when the game is being played
    this.build_attacker();
  }
  build_attacker(): void {
    if (this.count == 0) {
      return;
    }

    this.count -= 1;
    console.log("Creating new bullets");
    let nullspriteModel: GameModel = new GameModel();
    nullspriteModel.set_drawable(this.draw);
    nullspriteModel.set_initialMovement("upMoveBehavior");
    nullspriteModel.set_CollissionGroup("bullets");
    nullspriteModel.set_position(this.curr_model.get_position());
    nullspriteModel.set_interactions("boundary", new ReflectEffect());
    this.observables.push(nullspriteModel);
    this.activate = false;
    // add this to the full game observables here

    // only needs movement , position and drawable
  } // this build the object on each space button click and add this to the attacker queue; dont populate observables;
  register(): void {
    console.log("Registered keyboard event");
    document.addEventListener("keydown", this.handleKeyUp);
    document.addEventListener("keyup", this.handleKeyboardUp);
  } // register the keyboard event
}
