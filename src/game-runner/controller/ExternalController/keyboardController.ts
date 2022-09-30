import { IModel } from "../../model/interfaces/imodel";
import { position } from "../../model/objects/iposition";
import { ExternalController } from "./externalController";
import { MovementDirection } from "./movement_direction";

export class KeyboardController implements ExternalController {
  private left: boolean = false;
  private right: boolean = false;
  private up: boolean = false;
  private down: boolean = false;
  private static speed: number = 10;
  controlType: number;
  registered: boolean = false;
  constructor() {}
  register(): void {
    // you need to register in play mode
    if (this.registered) return;
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
    this.registered = true;
  }

  handleKeyUp = (e: KeyboardEvent): void => {
    if (e.code === "ArrowLeft" || e.code === "a") {
      this.left = false;
    } else if (e.code === "ArrowRight" || e.code === "d") {
      this.right = false;
    } else if (e.code === "ArrowUp" || e.code === "w") {
      this.up = false;
    } else if (e.code === "ArrowDown" || e.code === "s") {
      this.down = false;
    }
  };

  handleKeyDown = (e: KeyboardEvent): void => {
    console.log(e.code);
    if (e.code === "ArrowLeft" || e.code === "a") {
      this.left = true;
    } else if (e.code === "ArrowRight" || e.code === "d") {
      this.right = true;
    } else if (e.code === "ArrowUp" || e.code === "w") {
      this.up = true;
    } else if (e.code === "ArrowDown" || e.code === "s") {
      this.down = true;
    }
  };

  getMovement(model: IModel): MovementDirection {
    let dir: MovementDirection = new MovementDirection();
    let pos: position = model.get_position();
    let x: number = pos.x;
    let y: number = pos.y;

    if (this.left) {
      x -= KeyboardController.speed;
      this.left = false;
    } else if (this.right) {
      x += KeyboardController.speed;
      this.right = false;
    } else if (this.up) {
      y -= KeyboardController.speed;
      this.up = false;
    } else if (this.down) {
      y += KeyboardController.speed;
      this.down = false;
    }

    model.set_position({ x: x, y: y });

    return dir;
  }
}
