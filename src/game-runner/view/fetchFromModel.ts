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
		console.log(model.get_move_behavior());
		// Translate move_behavior instance to correct name on form
		const modelMoveBehavior = model.get_move_behavior();
		if (modelMoveBehavior instanceof NoMoveBehavior) {
			(<HTMLInputElement>document.getElementById("moveBehavior")).value = "Still";
		} else if (modelMoveBehavior instanceof MoveHorizontal) {
			// Can determine whether its dx is negative or positive, but will this work in the builder?
			(<HTMLInputElement>document.getElementById("moveBehavior")).value = "Move Right";
		} else if (modelMoveBehavior instanceof MoveVertical) {
			// Likewise with dy
		} 
		// Translate player move scheme to correct name on form
		const modelPlayerMove = model.get_external_controller();
		// if (modelPlayerMove instanceof ) TODO
		(<HTMLInputElement>document.getElementById("collisionGroupTag")).value = "collision group tag"; // model does not have this functionality
		(<HTMLInputElement>document.getElementById("hasGravity")).checked = true; // model does not have this either

		// Interactions menu
		// Model does not have interactions functionality

	}
}