import { IModel } from "../model/imodel";

export class Controller {
  model: IModel;
  constructor(model: IModel) {
    this.model = model;
  }

  handleClickPalette(id: string) {
    // this id uniquely identifies which object was clicked on palette
    // at this point we only know its shape
    // therefore we will init a model with all default parameters
  }

  handleClickGameCanvas(id: string) {
    // this id uniquely identifies which object was clicked on palette
    // we should be able to change its properties
    // we will use this.model.set_properties call
    // we will use id to identify the object in model.observables
  }

  handleClickPropertyCanvas(id: string) {
    // this should replicate the group of object we want to see on screen
    // change id to be an unique id
    // clone old model to create a new model
    // add the new model to observable list
  }
}
