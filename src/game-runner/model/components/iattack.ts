import { IModel } from "../interfaces/imodel";
export interface Attack {
  set_properties(): void; // this should be same as click model, specially the position properties
  build_attacker(model: IModel): void; // this build the object on each space button click and add this to the attacker queue; dont populate observables;
  register(): void; // register the keyboard event
  check_for_attack(): void;
  set_curr_model(model: IModel): void;
}
