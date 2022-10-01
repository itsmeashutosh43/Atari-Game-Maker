import { IModel } from "../../model/interfaces/imodel";
import { ExternalController } from "./externalController";
import { MovementDirection } from "./movement_direction";
import { MovementDirectionEnabled } from "./movement_direction";

export class NoController implements ExternalController {
  movement_direction_enabled: MovementDirectionEnabled;
  constructor() {
    this.movement_direction_enabled = new MovementDirectionEnabled();
  }

  register(): void {}
  getMovement(model: IModel): MovementDirection {
    return new MovementDirection();
  }
  getMovementDirection(): MovementDirectionEnabled {
    return this.movement_direction_enabled;
  }
}
