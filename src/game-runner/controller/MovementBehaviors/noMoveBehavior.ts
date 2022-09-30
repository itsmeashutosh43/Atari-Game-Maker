import { Behavior } from "./positionBehavior";
import { IModel } from "../../model/interfaces/imodel";
import { position } from "../../model/objects/iposition";
import { Effect } from "./ieffects";
export class NoMoveBehavior implements Behavior, Effect {
  dx: number = 2;
  dy: number = 2;
  reverse: boolean;

  do(model: IModel) {
    this.move(model);
  }

  move(model: IModel) {}

  reverseX() {}

  reverseY() {}
}
