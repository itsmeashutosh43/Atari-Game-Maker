import { IModel } from "../../model/interfaces/imodel";
import { Effect } from "./ieffects";

export class Attach implements Effect {
  do(model: IModel, model1: IModel): void {
    model.set_position(model1.get_position());
  }
}
