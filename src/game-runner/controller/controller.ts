import { GameModel } from "../model/gameModel";
import { RectangleSize } from "../model/objects/rectangleSize";
import { defaultImageDrawable } from "../view/imageDrawable";
import { layout } from "../..";
import { MusicBehavior } from "../../sound-effects/SoundBehaviors/MusicBehavior";
import { tmpdir } from "os";
import { Size } from "../model/objects/isize";

export class Controller {
  model: GameModel;
  constructor(model: GameModel) {
    this.model = model;
  }

  handleSpriteSelection(id: string) {
    /*
    This will handle the sprite that is being clicked. This should delegate to a
    function that initializes and draws the sprite to the screen with default 
    parameters. As well as adding the sprite to the created sprites list.
    */

    //lines of code draws to the GameCanvas
    let nullspriteModel: GameModel = new GameModel(id);
    let drawable = new defaultImageDrawable(id);
    nullspriteModel.set_drawable(drawable);
    this.model.add(nullspriteModel);

    //this ca
    this.model.updateSelectedSpriteList();
  }

  handleClickSpriteList(id: string) {
    this.model.set_selectedId(id)

	const spriteHTMLElement = document.getElementById(`${event.target}`);
	// TODO: change this. This is really, really hacky
	if (document.getElementById("otherSpriteInteractionHelperText").style.display == 'block') {
		console.log(`${id} selected: ${spriteHTMLElement}`);
		document.getElementById("otherSpriteInteractionHelperText").style.display = 'none';
	}
  }

  handleSetSize(xval:number,yval:number){
    layout.clearScreen();
    this.model.observables
      .filter((obs) => obs.get_id() == this.model.get_selectedId())
      .forEach((obs) => {
        obs.set_size(new RectangleSize(xval,yval))
      });
  }

  handleGetSize(): Size{
    let tmp:Size;
    this.model.observables
      .filter((obs) => obs.get_id() == this.model.get_selectedId())
      .forEach((obs) => {
        
        tmp = obs.get_size()
      });
    return tmp
  }

  handleClickPropertyConfirm(id: string) {
    /* Depending on the implementation of the above function  it can do one of two things/
    1.
    This should delegate to setter functions that belong to the sprite in order to updates its values
    and redraw to the screen. IE setting collission group and redefining properties should be done here.

    2. This function closes the properties tab and then deletes the sprite and redraws/appends to the saves list and or map.
    */
  }

  handleBackGroundChange(image: string) {
    //this one will just handle the background image and update the list of dictionarys in the model. which will be used
    //for saving and loading.
  }

  handleMainGameMusicChange(song: string) {
    //this one will display the audio to the game on repeat update the list of dictionarys in the model which will be used
    //for saving and loading.
  }

  handleSaveEvent() {
    //these should save the list and or map of objects storing the entire game
  }

  handleLoadEvent() {
    //i wonder what this one is gonna do?!??!?!
  }


  getCorrectObservable(id: string): any{
    let tmp = null;
    return tmp;
  }
 
}
