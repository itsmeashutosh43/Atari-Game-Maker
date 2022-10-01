import { selectedSpriteList } from "../../../game-maker/util/view-const";
import { drawSpriteList } from "../../view/intitlization";
import { clearSelectedSpriteList } from "../../view/intitlization";
export function appendToSpriteList(images: string[]):void{
    clearSelectedSpriteList(selectedSpriteList)
    drawSpriteList(images,selectedSpriteList);
}