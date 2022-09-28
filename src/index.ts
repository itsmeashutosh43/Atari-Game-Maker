import { GameModel } from "./game-runner/model/gameModel";
import { CanvasLayout } from "./game-runner/view/canvas";

let gamemodel: GameModel = new GameModel();

const layout = new CanvasLayout("gamewindow", gamemodel);

// initialize form controllers.
// initialize some other controllers

setInterval(() => gamemodel.notify(), 1000 / 60);
