import { Behavior } from "./positionBehavior";
import { IModel } from "../../model/interfaces/imodel";
import { position } from "../../model/objects/iposition";
export class NoMoveBehavior implements Behavior {
  dx: number = 2;
  dy: number = 2;

  move(model: IModel) {}

  reverseX() {}

  reverseY() {}
}
