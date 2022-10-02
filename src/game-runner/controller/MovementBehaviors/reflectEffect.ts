import { Behavior } from "../../controller/MovementBehaviors/positionBehavior";
import { IModel } from "../../model/interfaces/imodel";
import { MoveBehavior } from "./moveBehavior";

export class ReflectEffect {
  do(model: IModel, model1: IModel): void {
    let behavior: Behavior = model.get_move_behavior();
    behavior.reverseX();
  }
}
