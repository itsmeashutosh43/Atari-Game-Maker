import { IModel } from "../../model/interfaces/imodel";
import { position } from "../../model/objects/iposition";
import { ExternalController } from "./externalController";
import {
  MovementDirection,
  MovementDirectionEnabled,
} from "./movement_direction";

export class MouseController implements ExternalController {
  private left: boolean = false;
  private right: boolean = false;
  private up: boolean = false;
  private down: boolean = false;
  private static speed: number = 50;
  controlType: number;
  registered: boolean = false;
  movement_direction_enabled: MovementDirectionEnabled;
  constructor() {
    this.movement_direction_enabled = new MovementDirectionEnabled();
  }
  register(): void {
    if (this.registered) return;
    document.addEventListener("mousedown", this.handleKeyDown);
    document.addEventListener("mouseup", this.handleKeyUp);
    //document.addEventListener("contextmenu", this.contextKeyPressed);
    this.registered = true;
  }
  // contextKeyPressed = (e:MouseEvent):void=>{
  //     if(this.right){
  //         this.right = false;
  //     }
  //     else{
  //         this.right = true;
  //     }

  // }
  handleKeyUp = (e: MouseEvent): void => {
    // for now our controller can be either up down or right left
    this.up = false;
  };

  handleKeyDown = (e: KeyboardEvent): void => {
    this.up = true;
  };

  getMovement(model: IModel): MovementDirection {
    let dir: MovementDirection = new MovementDirection();
    let pos: position = model.get_position();
    let x: number = pos.x;
    let y: number = pos.y;

    if (this.left) {
      x -= MouseController.speed;
      this.left = false;
    } else if (this.right) {
      x += MouseController.speed;
      this.right = false;
    } else if (this.up) {
      y -= MouseController.speed;
      this.up = false;
    } else if (this.down) {
      y += MouseController.speed;
      this.down = false;
    }

    model.set_position({ x: x, y: y });

    return dir;
  }

  getMovementDirection(): MovementDirectionEnabled {
    return this.movement_direction_enabled;
  }
}
