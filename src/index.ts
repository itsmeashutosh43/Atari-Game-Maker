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
import { initAssets, viewControl } from "./game-runner/view/intitlization";
import { Controller } from "./game-runner/controller/controller";
import { userInterfaceListeners } from "./game-runner/view/userInterfaceListeners";
import { IModel } from "./game-runner/model/interfaces/imodel";
let savedGames: Map<string, IModel[]> = new Map<string, IModel[]>();

const iconSize = 50;

let gamemodel: GameModel = new GameModel();

export const layout = new CanvasLayout("gamewindow", gamemodel);

// initialize form controllers.
// initialize some other controllers

export enum MODE {
  BUILD,
  GAME,
}

let mode: MODE = MODE.BUILD;

let loop = () => {
  layout.clearScreen();

  gamemodel.notify(mode);
  window.requestAnimationFrame(loop);
};
loop();
let control: Controller = new Controller(gamemodel);

initAssets(spriteList, spriteSelection, control);

userInterfaceListeners.addAllEventListeners();

const startButtonImage = document.getElementById("start") as HTMLImageElement;
startButtonImage.addEventListener("click", () => {
  if (mode == MODE.GAME) {
    mode = MODE.BUILD;

    let loadedGame = savedGames.get("last_game");
    gamemodel.observables = loadedGame;
    startButtonImage.src = "./src/interface-icons/play.svg";
    startButtonImage.width = iconSize;
    startButtonImage.height = iconSize;
    gamemodel.get_background_sound().pause_sound();
    viewControl.showBuilderElements();
    // TODO: de-register external events
  } else {
    // register to external events
    gamemodel.observables.forEach((obs) =>
      obs.get_external_controller().register()
    );
    gamemodel.attack.register();
    // play music here
    gamemodel.get_background_sound().make_sound();
    gamemodel.get_external_controller().register();
    mode = MODE.GAME;
    savedGames.set("last_game", gamemodel.save());
    startButtonImage.src = "./src/interface-icons/stop.svg";
    startButtonImage.width = iconSize;
    startButtonImage.height = iconSize;
    viewControl.hideBuilderElements();
  }
});
