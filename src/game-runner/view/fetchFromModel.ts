import { KeyboardController } from "../controller/ExternalController/keyboardController";
import { MouseController } from "../controller/ExternalController/mouseController";
import { NoController } from "../controller/ExternalController/noController";
import { MoveHorizontal } from "../controller/MovementBehaviors/moveHorizontal";
import { MoveVertical } from "../controller/MovementBehaviors/moveVertical";
import { NoMoveBehavior } from "../controller/MovementBehaviors/noMoveBehavior";
import { GameModel } from "../model/gameModel";
import { IModel } from "../model/interfaces/imodel";

export class fetchFromModel {
	static updateFormFieldsFromModel(model: GameModel): void {
		// Appearance menu
		// TODO: use view constants for accessing these
		(<HTMLInputElement>document.getElementById("xPosition")).value = "" + model.get_position().x;
		(<HTMLInputElement>document.getElementById("yPosition")).value = "" + model.get_position().y;
		(<HTMLInputElement>document.getElementById("spriteWidth")).value = "" + model.get_size().getWidth();
		(<HTMLInputElement>document.getElementById("spriteHeight")).value = "" + model.get_size().getHeight();

		// Behavior menu
		// Translate move_behavior instance to correct name on form
		const modelMoveBehavior = model.get_move_behavior();
		if (modelMoveBehavior instanceof NoMoveBehavior) {
			(<HTMLInputElement>document.getElementById("moveBehavior")).value = "noMoveBehavior";
		} else if (modelMoveBehavior instanceof MoveHorizontal) {
			// Can determine whether its dx is negative or positive, but will this work in the builder?
			(<HTMLInputElement>document.getElementById("moveBehavior")).value = "rightMoveBehavior";
		} else if (modelMoveBehavior instanceof MoveVertical) {
			// Likewise with dy
		} 
		// Translate player move scheme to correct name on form
		// TODO: verify this works. Relies on implementation of view->controller affecting externalcontroller
		const modelPlayerMove = model.get_external_controller();
		if (modelPlayerMove instanceof NoController) {
			(<HTMLInputElement>document.getElementById("playerMoveEnabled")).checked = false;
			document.getElementById("playerMoveOptions").style.display = "none";
		} else {
			(<HTMLInputElement>document.getElementById("playerMoveEnabled")).checked = true;
			document.getElementById("playerMoveOptions").style.display = "block";
			if (modelPlayerMove instanceof KeyboardController) {
				(<HTMLInputElement>document.getElementById("playerMoveBehavior")).value = "wasdSpace";
			} else if (modelPlayerMove instanceof MouseController) {
				(<HTMLInputElement>document.getElementById("playerMoveBehavior")).value = "mouseLMB";
			}
		}
		
		const collisionGroupTag = model.get_CollissionGroup();
		(<HTMLInputElement>document.getElementById("collisionGroupTag")).value = (collisionGroupTag == undefined ? "" : collisionGroupTag);
		(<HTMLInputElement>document.getElementById("hasGravity")).checked = model.get_gravity();

		// Interactions menu
		// Model does not have interactions functionality

	}
}