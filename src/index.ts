import { GameModel } from "./game-runner/model/gameModel";
import { CanvasLayout } from "./game-runner/view/canvas";
import {saveBtn, loadBtn, startBtn, stopBtn, changeBackgroundSoundBtn, changeBackgroundBtn, spriteSelection,selectedSpriteList, propertys, spriteList} from "./game-maker/util/view-const"
import {initAssets} from "./game-runner/view/intitlization"
import { Controller } from "./game-runner/controller/controller";
let gamemodel: GameModel = new GameModel();

const layout = new CanvasLayout("gamewindow", gamemodel);

// initialize form controllers.
// initialize some other controllers

setInterval(() => gamemodel.notify(), 1000 / 60);
let control: Controller = new Controller(gamemodel);

initAssets(spriteList,spriteSelection,control);
