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
		// The "input" HTMLEvent is the one we want, not "change"
		// X position field
		document.getElementById("xPosition").addEventListener("input", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).value;
			console.log(newValue); // your logic goes here
		});

		// Y position field
		document.getElementById("yPosition").addEventListener("input", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).value;
			console.log(newValue); // your logic goes here
		});

		// Width field
		document.getElementById("spriteWidth").addEventListener("input", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).value;
			console.log(newValue); // your logic goes here
		});

		// Height field
		document.getElementById("spriteHeight").addEventListener("input", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).value;
			console.log(newValue); // your logic goes here
		});
	}

	private static addBehaviorConfigListeners(): void {
		// Movement behavior
		document.getElementById("moveBehavior").addEventListener("change", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).value;
			console.log(newValue); // your logic goes here
		});

		// Gravity toggle
		document.getElementById("hasGravity").addEventListener("change", (e) => {
			const newValue = (<HTMLInputElement>e.currentTarget).checked;
			console.log(newValue); // your logic goes here
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