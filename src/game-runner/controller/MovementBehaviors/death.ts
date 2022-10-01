import { IModel } from "../../model/interfaces/imodel";
import { Effect } from "./ieffects";
import { SoundBehavior } from "../../../sound-effects/SoundBehaviors/soundBehavior";
import { MusicBehavior } from "../../../sound-effects/SoundBehaviors/MusicBehavior";

export class Death implements Effect {
  soundBehavior: SoundBehavior;
  constructor() {
    this.soundBehavior = new MusicBehavior("./src/sound-effects/collision.wav");
  }

  do(model: IModel): void {
    model.i_am_dead();

    this.soundBehavior.make_sound();
  }
}
