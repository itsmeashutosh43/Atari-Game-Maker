import { Behavior } from "./positionBehavior";
import { IModel } from "../../model/interfaces/imodel";
import { position } from "../../model/objects/iposition";
import { Effect } from "./ieffects";
import { SoundBehavior } from "../../../sound-effects/SoundBehaviors/soundBehavior";
import { MusicBehavior } from "../../../sound-effects/SoundBehaviors/MusicBehavior";

export class NoMoveBehavior implements Behavior, Effect {
  dx: number = 2;
  dy: number = 2;
  reverse: boolean;
  soundBehavior: SoundBehavior;
  constructor() {
    this.soundBehavior = new MusicBehavior("./src/sound-effects/collision.wav");
  }

  do(model: IModel) {
    this.move(model);
    this.soundBehavior.make_sound();
  }

  move(model: IModel) {}

  reverseX() {}

  reverseY() {}
}
