import { IModel } from "../../model/interfaces/imodel";
import {
  MovementDirection,
  MovementDirectionEnabled,
} from "./movement_direction";

export interface ExternalController {
  register(): void;
  getMovement(model: IModel): MovementDirection;
  getMovementDirection(): MovementDirectionEnabled;
}
