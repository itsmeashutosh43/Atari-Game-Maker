import { IModel } from "../../model/interfaces/imodel";
import { ExternalController } from "./externalController";
import { MovementDirection } from "./movement_direction";

export class NoController implements ExternalController {
  register(): void {}
  getMovement(model: IModel): MovementDirection {
    return new MovementDirection();
  }
}
