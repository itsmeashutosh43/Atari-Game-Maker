import { SoundBehavior } from "./soundBehavior";

export class MusicBehavior implements SoundBehavior {
  src: string;
  audio: HTMLAudioElement;
  constructor(src: string) {
    this.src = src;
    this.audio = new Audio(this.src);
  }
  make_sound(): void {
    this.audio.play();
  }
  pause_sound(): void {
    this.audio.pause();
  }
}
