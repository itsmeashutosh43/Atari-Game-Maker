import { IModel } from "../../model/interfaces/imodel";
import { position } from "../../model/objects/iposition";

export interface Behavior {
  move(model: IModel): void;
  reverseX(): void;
  reverseY(): void;
}
