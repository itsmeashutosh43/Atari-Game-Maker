import { GameModel } from "../model/gameModel";
import { RectangleSize } from "../model/objects/rectangleSize";
import { defaultImageDrawable } from "../view/imageDrawable";
import { layout } from "../..";
import { MusicBehavior } from "../../sound-effects/SoundBehaviors/MusicBehavior";
import { Size } from "../model/objects/isize";
import { position } from "../model/objects/iposition";
import { gameCanvas } from "../../game-maker/util/view-const";
import { IModel } from "../model/interfaces/imodel";

import { fetchFromModel } from "../view/fetchFromModel";
import { KeyboardController } from "./ExternalController/keyboardController";
import { MouseController } from "./ExternalController/mouseController";
import { Effect } from "./MovementBehaviors/ieffects";
import { Death } from "./MovementBehaviors/death";
import { MoveVertical } from "./MovementBehaviors/moveVertical";
import { MoveHorizontal } from "./MovementBehaviors/moveHorizontal";
import { Block } from "./MovementBehaviors/block";
import { NoEffect } from "./MovementBehaviors/noEffect";
import { BulletAttack } from "../model/components/bulletsAttack";

export class Controller {
  model: GameModel;
  clicked_id: string;
  selected_id: string;
  interacting_vs_model: IModel;
  interacting_to_model: IModel;
  attacker: BulletAttack;

  constructor(model: GameModel) {
    this.model = model;
    let drawable = new defaultImageDrawable("./src/sprites/laserBlue01.png");

    this.attacker = new BulletAttack(
      drawable,
      "upMoveBehavior",
      "bullets",
      this.model.observables
    );

    this.model.set_attacker(this.attacker);
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
      console.log(
        "clicked id for add interaction",
        this.selected_id,
        this.clicked_id
      );

      this.interacting_to_model = this.model.observables.filter(
        (obs: GameModel) => obs.get_selectedId() == this.selected_id
      )[0]; // I am changing behavior of this object

      this.interacting_vs_model = this.model.observables.filter(
        (obs: GameModel) => obs.get_selectedId() == this.clicked_id
      )[0]; // when I collide with this

      // get colission group for the clicked this
      document.getElementById(
        "otherSpriteInteractionHelperText"
      ).style.display = "none";
    } else {
      // Arrow function body wrapped with {} implicitly tries to return, which is bad for filter
      this.selected_id = uniq_id;
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

  handleSetAttack(attack: string) {
    //lines of code draws to the GameCanvas

    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        switch (attack) {
          case "bullets":
            console.log("This is not affected by bullets");
            obs.set_affected_by_bullets(false);
            this.attacker.set_curr_model(obs);
            break;
          default:
            break;
        }
      });
  }

  handleSetAffected(check: boolean) {
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        if (check) {
          console.log("This is affected by bullets");
          obs.set_affected_by_bullets(true);
          obs.set_interactions("bullets", new Death());
        }
      });
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

  set_effect(effect: string): void {
    let gameEffect: Effect;

    switch (effect) {
      case "destroyEffect":
        gameEffect = new Death();
        break;
      case "moveUpEffect":
        gameEffect = new MoveVertical("up");
        break;
      case "moveLeftEffect":
        gameEffect = new MoveHorizontal("left");
        break;
      case "moveRightEffect":
        gameEffect = new MoveHorizontal("right");
        break;
      case "moveDownEffect":
        gameEffect = new MoveVertical("down");
        break;
      case "blockEffect":
        gameEffect = new Block();
        break;
      default:
        gameEffect = new NoEffect();
    }

    this.interacting_to_model.set_interactions(
      this.interacting_vs_model.get_CollissionGroup(),
      gameEffect
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

  handleBackGroundChange(image: string) {
    console.log(image);
    gameCanvas.style.background = image;
  }

  handleSetKeyBinds(keybinds: string) {
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        obs.set_keyBinds(keybinds);
      });
  }

  handleGetKeyBinds(): void {
    let tmp;
    this.model.observables
      .filter((obs) => obs.get_selectedId() == this.clicked_id)
      .forEach((obs) => {
        tmp = obs.get_keybinds();
      });

    return tmp;
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
