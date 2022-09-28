//this class handles the click event when someone clicks on our palette

abstract class IClickable {
  constructor() {
    //initialize with some comtroller object
  }
  abstract register(): void;
  abstract deregister(): void;
}

export class ClickablePalette extends IClickable {
  constructor() {
    super();
  }

  register() {
    // register its onclick, which inturn calls this.controller. handle click on palette with internal name + id to uniquely define the
    // shape that was clicked
  }

  deregister() {
    // deregister its onclick, we might need to deregister when the game is in play mode. Maybe?
  }
}

export class ClickableGameCanvas extends IClickable {
  constructor() {
    super();
  }

  register() {
    // register its onclick, which inturn calls this.controller. handle click on game canvas with internal name + id to uniquely define the
    // shape that was clicked
  }

  deregister() {
    // deregister its onclick, we might need to deregister when the game is in play mode. Maybe?
  }
}

export class ClickablePropertyBar extends IClickable {
  constructor() {
    super();
  }

  register() {
    // register its onclick, which inturn calls this.controller. handle click on propertyBar with internal name + id to uniquely define the
    // shape that was clicked
  }

  deregister() {
    // deregister its onclick, we might need to deregister when the game is in play mode. Maybe?
  }
}
