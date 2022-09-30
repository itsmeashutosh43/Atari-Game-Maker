import { SoundBehavior } from "./soundBehavior";

export class NoSoundBehavior implements SoundBehavior {
  make_sound(): void {
    return;
  }
  pause_sound(): void {}
}
