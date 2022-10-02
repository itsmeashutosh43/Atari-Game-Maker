import { GameModel } from "./game-runner/model/gameModel";
import { CanvasLayout } from "./game-runner/view/canvas";
import {
  saveBtn,
  loadBtn,
  startBtn,
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

const iconSize = 60;

let gamemodel: GameModel = new GameModel();

export const layout = new CanvasLayout("gamewindow", gamemodel);

// initialize form controllers.
// initialize some other controllers

export enum MODE {
  BUILD,
  GAME,
}

let mode: MODE = MODE.BUILD;

setInterval(() => {
  layout.clearScreen();
  gamemodel.notify(mode), 1000 / 60;
});
let control: Controller = new Controller(gamemodel);

initAssets(spriteList, spriteSelection, control);

userInterfaceListeners.addAllEventListeners();

const startButtonImage = document.getElementById("start") as HTMLImageElement;
startButtonImage.addEventListener("click", () => {
  if (mode == MODE.GAME) {
    mode = MODE.BUILD;
    startButtonImage.src = "./src/interface-icons/play.svg";
	startButtonImage.width = iconSize;
	startButtonImage.height = iconSize;
    gamemodel.get_background_sound().pause_sound();
    // TODO: de-register external events
  } else {
    // register to external events
    gamemodel.observables.forEach((obs) =>
      obs.get_external_controller().register()
    );
    // play music here
    gamemodel.get_background_sound().make_sound();
    gamemodel.get_external_controller().register();
    mode = MODE.GAME;
	console.log(startButtonImage.src);
    startButtonImage.src = "./src/interface-icons/stop.svg";
	startButtonImage.width = iconSize;
	startButtonImage.height = iconSize;
  }
});
