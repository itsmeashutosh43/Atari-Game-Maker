import { IModel } from "../../model/interfaces/imodel";

export interface Effect {
  do(model: IModel): void;
}
