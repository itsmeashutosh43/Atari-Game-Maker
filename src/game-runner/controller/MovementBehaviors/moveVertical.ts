import { IModel } from "../../model/interfaces/imodel";
import { position } from "../../model/objects/iposition";
import { Behavior } from "./positionBehavior";

export class MoveVertical implements Behavior {
  dy: number = 2;
  reverse: boolean = false;

  move(model: IModel) {
    let pos: position = model.get_position();
    let new_pos: position = { x: pos.x, y: pos.y + this.dy };
    model.set_position(new_pos);
    this.reverse = false;
  }

  reverseX() {
    if (this.reverse) {
      return;
    }
    this.reverse = true;
  }

  reverseY() {
    if (this.reverse) {
      return;
    }
    this.dy = -this.dy;
    this.reverse = true;
  }
}
