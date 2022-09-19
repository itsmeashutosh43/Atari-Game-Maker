import { clearAllForm, createForm } from "./game-maker/form-editor";
import { refreshSpriteList } from "./game-maker/form-list";
import { GameVariable } from "./game-maker/game-variable";
import { actType, actionbtn, updatebtn, saveBtn, loadBtn, readBtn, bgType } from "./game-maker/util/form-const";
import { Entity} from "./game-runner/entities/entity";
import CanvasLayout, { CANVAS_BG_IMAGES } from "./game-runner/utils/canvas-layout";
import { loadFIle, saveToFile } from "./game-maker/save-to-file";
import Collision from "./game-runner/entities/collision-checker";
import { FileParser } from "./game-runner/utils/game-parser";


const layout = new CanvasLayout();

export const COLLISION = Collision.getInstance();
export const CANVAS = layout.canvas;
export const CTX = <CanvasRenderingContext2D>CANVAS.getContext("2d");
export let ENTITIES: Entity[] = [];
export let GAME_VAR: GameVariable = new GameVariable();
export let fileContent: string;


export const setGameVar = (gameVar: GameVariable): void => {
  GAME_VAR = gameVar;
}


layout.updateBackground(CANVAS_BG_IMAGES.CLIFF);
let file_parser:FileParser = new FileParser()
file_parser.readFile()
file_parser.printFile()


const loop = (): void => {
  layout.clearCanvas();
  ENTITIES.forEach((e) => { e.update() })
  requestAnimationFrame(() => loop());
}


const main = (): void => {

  refreshSpriteList(GAME_VAR);
  actionbtn.addEventListener("click", function(){
    let aType = actType.value
    clearAllForm();
    createForm(aType, GAME_VAR);
  })
  updatebtn.addEventListener("click", function(){
    ENTITIES = [];
    ENTITIES = GAME_VAR.generateEntityList();
    console.log(ENTITIES);
  })
  saveBtn.addEventListener("click",function(){
    saveToFile(bgType.value,GAME_VAR);
  })
  bgType.addEventListener("change",function(){
    layout.updateBackground(bgType.value);
  })

  loadBtn.addEventListener("change",function(){
    
  })

  
  loadBtn.onchange = async () => {
    if(loadBtn.files.length != 0){
      readBtn.disabled = false;
    }else{
      readBtn.disabled = true;
    }
    fileContent = await loadBtn.files[0].text();
  }

  readBtn.addEventListener("click", function(){
    let loadContent = loadFIle(fileContent);
    bgType.value = loadContent[0];
    GAME_VAR = loadContent[1];
    layout.updateBackground(bgType.value);
    refreshSpriteList(GAME_VAR);
    console.log(GAME_VAR.getNPSprites()[0].color);
  })

  loop();

}


main();