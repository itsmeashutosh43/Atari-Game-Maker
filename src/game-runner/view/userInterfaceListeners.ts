import { Block } from "../drawables/drawable";
import { viewControl } from "./intitlization";

export class userInterfaceListeners {
	static addAllEventListeners(): void {
		this.addFormTabListeners();
		this.addObjectConfigListeners();
		this.addBehaviorConfigListeners();
		this.addInteractionConfigListeners();
		this.addSettingsConfigListeners();
	}

	private static addFormTabListeners(): void {
		// TODO: needs some logic to restrict changing tabs unless an object is selected
		//       clicking the first three buttons should just display the blank menu
		// TODO: should populate each tab with correct values from model
		//       this population should happen automatically when an object is selected, then they'll be visible when a tab is selected

		// Object appearance config tab
		document.getElementById("objectConfigButton").addEventListener("click", () => {
			["behaviorConfigMenu", "interactionsConfigMenu", "settingsConfigMenu", "blankConfigMenu"].forEach(menu => {
				document.getElementById(menu).style.display = "none";
			});
			document.getElementById("objectConfigMenu").style.display = "block";
		});

		// Object behavior config tab
		document.getElementById("behaviorConfigButton").addEventListener("click", () => {
			["objectConfigMenu", "interactionsConfigMenu", "settingsConfigMenu", "blankConfigMenu"].forEach(menu => {
				document.getElementById(menu).style.display = "none";
			});
			document.getElementById("behaviorConfigMenu").style.display = "block";
		});

		// Object interactions config tab
		document.getElementById("interactionsConfigButton").addEventListener("click", () => {
			["objectConfigMenu", "behaviorConfigMenu", "settingsConfigMenu", "blankConfigMenu"].forEach(menu => {
				document.getElementById(menu).style.display = "none";
			});
			document.getElementById("interactionsConfigMenu").style.display = "block";
		});

		// Game settings config tab -- always selectable, not dependent on selected object
		document.getElementById("settingsConfigButton").addEventListener("click", () => {
			["objectConfigMenu", "behaviorConfigMenu", "interactionsConfigMenu", "blankConfigMenu"].forEach(menu => {
				document.getElementById(menu).style.display = "none";
			});
			document.getElementById("settingsConfigMenu").style.display = "block";
		});
	}

	private static addObjectConfigListeners(): void {
		// X position field
		document.getElementById("xPosition").addEventListener("input", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).value;
			let store = viewControl.handleGetPostion();
			viewControl.handleSetPostion(parseInt(newValue),store.y)
		});

		// Y position field
		document.getElementById("yPosition").addEventListener("input", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).value;
		
			let store = viewControl.handleGetPostion();
			viewControl.handleSetPostion(store.x,parseInt(newValue))
		});

		// Width field
		document.getElementById("spriteWidth").addEventListener("input", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).value;
			let store = viewControl.handleGetSize();
			
			viewControl.handleSetSize(parseInt(newValue),store.getHeight())
		});

		// Height field
		document.getElementById("spriteHeight").addEventListener("input", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).value;
			let store = viewControl.handleGetSize();
			
			viewControl.handleSetSize(store.getWidth(),parseInt(newValue))
		});
	}

	private static addBehaviorConfigListeners(): void {
		// Movement behavior
		document.getElementById("moveBehavior").addEventListener("change", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).value;
			
			viewControl.handleSetInitialMovement(newValue);
		});

		// Player movement enabled checkbox
		document.getElementById("playerMoveEnabled").addEventListener("change", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).checked;
			if (newValue) {
				document.getElementById("playerMoveOptions").style.display = "block";
			} else {
				document.getElementById("playerMoveOptions").style.display = "none";
			}
		});

		// Player movement control scheme
		document.getElementById("playerMoveBehavior").addEventListener("change", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).value;
			console.log(newValue); // your logic goes here
		});

		// Player movement in each orthogonal direction checkboxes
		document.getElementById("playerMoveRight").addEventListener("change", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).checked;
			viewControl.handleSetCanMoveRight(newValue)
		});

		document.getElementById("playerMoveLeft").addEventListener("change", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).checked;
			viewControl.handleSetCanMoveLeft(newValue)
		});

		document.getElementById("playerMoveUp").addEventListener("change", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).checked;
			viewControl.handleSetCanMoveUp(newValue)
		});

		document.getElementById("playerMoveDown").addEventListener("change", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).checked;
			viewControl.handleSetCanMoveDown(newValue)
		});

		// Collision group tag
		document.getElementById("collisionGroupTag").addEventListener("input", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).value;
			viewControl.handleSetCollissionGroup(newValue);
		});

		// Gravity toggle
		document.getElementById("hasGravity").addEventListener("change", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).checked;
			viewControl.handleSetGravity(newValue)
		});
	}

	private static addInteractionConfigListeners(): void {
		// TODO: this one will be complicated, since there will be n sets of fields, 
		// but this would be the logic if there was just one interaction per sprite
		// Event choice (collides with, etc.)
		document.getElementById("eventChoice").addEventListener("change", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).value;
			console.log(newValue); // your logic goes here
		});

		// TODO: 
		// Other sprite
		document.getElementById("otherSpriteInteractionButton").addEventListener("click", () => {
			document.getElementById("otherSpriteInteractionHelperText").style.display = "block";
		});

		// Self effect choice
		document.getElementById("selfEffect").addEventListener("change", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).value;
			console.log(newValue); // your logic goes here
		});
	}

	private static addSettingsConfigListeners(): void {
		// Currently no fields in settings menu
	}
}