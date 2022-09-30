import { IModel } from "./imodel";
import { MODE } from "../../..";

export interface Observables {
  add(obs: IModel): void;
  remove(obs: IModel): void;
  notify(mode: MODE): void;
}
