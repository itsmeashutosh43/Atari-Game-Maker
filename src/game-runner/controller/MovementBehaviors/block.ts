import { IModel } from "../../model/interfaces/imodel";
import { Effect } from "./ieffects";
import { NoMoveBehavior } from "./noMoveBehavior";
import { SoundBehavior } from "../../../sound-effects/SoundBehaviors/soundBehavior";
import { MusicBehavior } from "../../../sound-effects/SoundBehaviors/MusicBehavior";

export class Block implements Effect {
  soundBehavior: SoundBehavior;
  constructor() {
    this.soundBehavior = new MusicBehavior("./src/sound-effects/collision.wav");
  }

  do(model: IModel): void {
    model.set_move_behavior(new NoMoveBehavior());
    this.soundBehavior.make_sound();
  }
}
