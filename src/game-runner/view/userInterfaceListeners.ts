export class userInterfaceListeners {
	static addFormEventListeners(): void {
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
}