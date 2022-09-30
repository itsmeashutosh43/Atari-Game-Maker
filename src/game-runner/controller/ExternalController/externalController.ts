import { IModel } from "../../model/interfaces/imodel";
import { MovementDirection } from "./movement_direction";

export interface ExternalController {
  register(): void;
  getMovement(model: IModel): MovementDirection;
}
