import { GameModel } from "./game-runner/model/gameModel";
import { CanvasLayout } from "./game-runner/view/canvas";
import {
  saveBtn,
  loadBtn,
  startBtn,
  stopBtn,
  changeBackgroundSoundBtn,
  changeBackgroundBtn,
  spriteSelection,
  selectedSpriteList,
  propertys,
  spriteList,
} from "./game-maker/util/view-const";
import { initAssets } from "./game-runner/view/intitlization";
import { Controller } from "./game-runner/controller/controller";
import { userInterfaceListeners } from "./game-runner/view/userInterfaceListeners";

let gamemodel: GameModel = new GameModel();

export const layout = new CanvasLayout("gamewindow", gamemodel);

// initialize form controllers.
// initialize some other controllers

export enum MODE {
  BUILD,
  GAME,
}

let mode: MODE = MODE.BUILD;

setInterval(() => gamemodel.notify(mode), 1000 / 60);
let control: Controller = new Controller(gamemodel);

initAssets(spriteList, spriteSelection, control);

userInterfaceListeners.addAllEventListeners();
const gameStartButton: HTMLButtonElement = document.getElementById(
  "start"
) as HTMLButtonElement;

gameStartButton.addEventListener("click", () => {
  if (mode == MODE.GAME) {
    mode = MODE.BUILD;
    gameStartButton.innerHTML = "play";
    gamemodel.get_background_sound().pause_sound();
    // TODO: de-register external events
  } else {
    // register to external events
    // play music here
    gamemodel.get_background_sound().make_sound();
    gamemodel.get_external_controller().register();
    mode = MODE.GAME;
    gameStartButton.innerHTML = "build";
  }
});
