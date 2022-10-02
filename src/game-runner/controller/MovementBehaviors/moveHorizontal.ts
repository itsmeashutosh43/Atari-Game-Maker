import { IModel } from "../../model/interfaces/imodel";
import { position } from "../../model/objects/iposition";
import { Effect } from "./ieffects";
import { Behavior } from "./positionBehavior";
import { SoundBehavior } from "../../../sound-effects/SoundBehaviors/soundBehavior";
import { MusicBehavior } from "../../../sound-effects/SoundBehaviors/MusicBehavior";

export class MoveHorizontal implements Behavior, Effect {
  dx: number = 2;
  dy: number = 2;
  reverse: boolean = false;
  soundBehavior: SoundBehavior;
  constructor(move_direction: string) {
    if (move_direction == "left") {
      this.dx = -2;
    } else {
      this.dx = 2;
    }
    this.soundBehavior = new MusicBehavior("./src/sound-effects/collision.wav");
  }

  do(model: IModel, model1: IModel) {
    this.move(model);

    this.soundBehavior.make_sound();
  }

  move(model: IModel) {
    let pos: position = model.get_position();
    let new_pos: position = { x: pos.x + this.dx, y: pos.y };
    model.set_position(new_pos);
    this.reverse = false;
  }

  reverseX() {
    if (this.reverse) {
      return;
    }
    this.dx = -this.dx;
    this.reverse = true;
  }

  reverseY() {
    if (this.reverse) {
      return;
    }
    this.reverse = true;
  }
}
