import { isModuleDeclaration } from "typescript";
import { GameModel } from "../model/gameModel";
import { ImageDrawable } from "../view/imageDrawable";


export class Controller {
  model: GameModel;
  constructor(model: GameModel) {
    this.model = model;
  }

  handleSpriteSelection(id: string,) {
    /*
    This will handle the sprite that is being clicked. This should delegate to a
    function that initializes and draws the sprite to the screen with default 
    parameters. As well as adding the sprite to the created sprites list.
    */
    let spriteModel: GameModel = new GameModel()
    let drawable = new ImageDrawable(id)
    spriteModel.set_drawable(drawable)
    this.model.add(spriteModel)

  }

  handleClickSpriteList(id: string) {
   /*
    this will handle the sprite that is being clicked in the sprite list.
    When this is clicked a properties tab should appear which will allow the user to 
    customize the properties of the sprite. 


    This one is still up for debate however we could use this function to set onchangeEvent for each of those propertys
    eliminating the need for the confirm button to send all the parameters and a need for giant if/switch statements 
    making it easier to scale in the future and making the game dynamic so
    
    for example if you set the size to 40 the user dosen't have to click confirm to see the change in size.

   */
  }

  handleClickPropertyConfirm(id:string){
    /* Depending on the implementation of the above function  it can do one of two things/
    1.
    This should delegate to setter functions that belong to the sprite in order to updates its values
    and redraw to the screen. IE setting collission group and redefining properties should be done here.

    2. This function closes the properties tab and then deletes the sprite and redraws/appends to the saves list and or map.
    */
  }

  handleBackGroundChange(image:string){
    //this one will just handle the background image and update the list of dictionarys in the model. which will be used
    //for saving and loading.
  }

  handleMainGameMusicChange(song:string){
    //this one will display the audio to the game on repeat update the list of dictionarys in the model which will be used
    //for saving and loading.
  }

 
  handleSaveEvent(){
    //these should save the list and or map of objects storing the entire game
  }

  handleLoadEvent(){
    //i wonder what this one is gonna do?!??!?!
  }
}
