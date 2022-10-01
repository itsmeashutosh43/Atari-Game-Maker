import { IModel } from "../../model/interfaces/imodel";
import { SoundBehavior } from "../../../sound-effects/SoundBehaviors/soundBehavior";
import { MusicBehavior } from "../../../sound-effects/SoundBehaviors/MusicBehavior";

export interface Effect {
  do(model: IModel): void;
}
