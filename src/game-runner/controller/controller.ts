import { GameModel } from "../model/gameModel";
import { RectangleSize } from "../model/objects/rectangleSize";
import { defaultImageDrawable } from "../view/imageDrawable";
import { layout } from "../..";
import { MusicBehavior } from "../../sound-effects/SoundBehaviors/MusicBehavior";
import { tmpdir } from "os";
import { Size } from "../model/objects/isize";
import { position } from "../model/objects/iposition";
import { gameCanvas } from "../../game-maker/util/view-const";

import { IModel } from "../model/interfaces/imodel";
import { fetchFromModel } from "../view/fetchFromModel";
import { KeyboardController } from "./ExternalController/keyboardController";
import { MouseController } from "./ExternalController/mouseController";

export class Controller {
  model: GameModel;
  clicked_id: string;
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

  // Handles clicks on sprite divs in the bottom view
  handleClickSpriteList(id: string, uniq_id: string) {
    this.clicked_id = uniq_id;

    // TODO: change this. This is really, really hacky
    const spriteHTMLElement = document.getElementsByName(uniq_id)[0];
    //console.log(spriteHTMLElement);
    if (
      document.getElementById("otherSpriteInteractionHelperText").style
        .display == "block"
    ) {
      console.log(`${id} selected: ${spriteHTMLElement}`);
      document.getElementById(
        "otherSpriteInteractionHelperText"
      ).style.display = "none";
    } else {
      // Arrow function body wrapped with {} implicitly tries to return, which is bad for filter
      fetchFromModel.updateFormFieldsFromModel(
        <GameModel>(
          this.model.observables.filter(
            (obs: GameModel) => obs.get_selectedId() == this.clicked_id
          )[0]
        )
      );
    }
  }

  handleSetSize(xval: number, yval: number) {
    layout.clearScreen();
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        obs.set_size(new RectangleSize(xval, yval));
      });
  }

  handleGetSize(): Size {
    let tmp: Size;
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        tmp = obs.get_size();
      });
    return tmp;
  }

  handleSetPostion(xPos: number, yPos: number) {
    layout.clearScreen();

    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        obs.set_position({ x: xPos, y: yPos });
      });
  }

  handleGetPostion(): position {
    let tmp: position;
    console.log(this.model.observables);
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        tmp = obs.get_position();
      });
    return tmp;
  }

  handleSetGravity(isGravity: boolean) {
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        obs.set_gravity(isGravity);
      });
  }

  handleGetGravity() {
    let tmp;
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        tmp = obs.get_gravity();
      });
    return tmp;
  }
  handleGetPlayerCanMove(canMove: boolean): void {
    let tmp;
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        tmp = obs.get_gravity();
      });
    return tmp;
  }

  handleSetPlayerCanMove(canMove: boolean): void {
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        obs.set_playerMove(canMove);
      });
  }
  handleSetCollissionGroup(collisionId: string): void {
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        obs.set_CollissionGroup(collisionId);
      });
  }

  handlegetCollissionGroup(): void {
    let tmp;
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        tmp = obs.get_CollissionGroup();
      });

    return tmp;
  }

  handleSetInitialMovement(initialMovement: string): void {
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        obs.set_initialMovement(initialMovement);
      });
  }

  handlegetInitialMovement(): void {
    let tmp;
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        tmp = obs.get_initialMovement();
      });

    return tmp;
  }

  handleGetCanMoveRight(): void {
    let tmp;
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        tmp = obs.get_moveRight();
      });

    return tmp;
  }

  handleGetCanMoveLeft(): void {
    let tmp;
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        tmp = obs.get_moveLeft();
      });

    return tmp;
  }

  handleGetCanMoveUp(): void {
    let tmp;
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        tmp = obs.get_moveUp();
      });

    return tmp;
  }

  handleGetCanMoveDown(): void {
    console.log("Move down");
    let tmp;
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        tmp = obs.get_moveDown();
      });

    return tmp;
  }

  handleSetCanMoveRight(canMove: boolean): void {
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        obs.set_moveRight(canMove);
      });
  }

  handlePlayerMoveInput(externalInput: string): void {
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        switch (externalInput) {
          case "wasdSpace":
            console.log("Setting a new keyboard controller");
            obs.set_external_controller(new KeyboardController());
            console.log(obs);
            break;
          case "mouseLMB":
            obs.set_external_controller(new MouseController());
            break;
        }
        console.log(externalInput);
      });
  }

  set_game_background(sound: string): void {
    console.log(sound);

    this.model.set_background_sound(
      new MusicBehavior(`./src/sound-effects/${sound}.mp3`)
    );
  }

  handleSetCanMoveLeft(canMove: boolean): void {
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        obs.set_moveLeft(canMove);
      });
  }

  handleSetCanMoveUp(canMove: boolean): void {
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        obs.set_moveUp(canMove);
      });
  }

  handleSetCanMoveDown(canMove: boolean): void {
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        obs.set_moveDown(canMove);
      });
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
    console.log(image);
    gameCanvas.style.background = image;
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
}
