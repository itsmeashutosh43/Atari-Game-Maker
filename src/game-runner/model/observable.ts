import { IModel } from "./imodel";

export interface Observables {
  add(obs: IModel): void;
  remove(obs: IModel): void;
  notify(): void;
}
