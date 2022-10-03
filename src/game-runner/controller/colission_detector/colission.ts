import { layout } from "../../..";
import { BoundingBox } from "../../drawables/drawable";
import { IModel } from "../../model/interfaces/imodel";
import { Death } from "../MovementBehaviors/death";
import { ReflectEffect } from "../MovementBehaviors/reflectEffect";

export class Colission {
  public static checkColissionAndHandleEffect(model1: IModel, model2: IModel) {
    if (
      Colission.isCollidingWithCanvas(
        model1.get_size().getBoundingBox(model1.get_position())
      )
    ) {
      model1.get_interactions("boundary").do(model1, model1);
    } else if (
      Colission.isCollidingWithCanvas(
        model2.get_size().getBoundingBox(model2.get_position())
      )
    ) {
      model2.get_interactions("boundary").do(model2, model2);
    } else if (
      Colission.isColliding(
        model1.get_size().getBoundingBox(model1.get_position()),
        model2.get_size().getBoundingBox(model2.get_position())
      )
    ) {
      // get all effects and do something!
      console.log("Colission detected");

      model1.get_interactions(model2.get_CollissionGroup()).do(model1, model2);
      model2.get_interactions(model1.get_CollissionGroup()).do(model2, model1);
    }
  }

  static isCollidingWithCanvas(boundingBox: BoundingBox): boolean {
    if (
      boundingBox.up <= 0 ||
      boundingBox.left <= 0 ||
      boundingBox.right >= layout.getCanvasWidth() ||
      boundingBox.down >= layout.getCanvasHeight()
    ) {
      return true;
    }
    return false;
  }

  static isColliding(b1: BoundingBox, b2: BoundingBox): boolean {
    return (
      Colission.isCollidingFromLeft(b1, b2) ||
      Colission.isCollidingFromRight(b1, b2) ||
      Colission.isCollidingFromBottom(b1, b2) ||
      Colission.isCollidingFromTop(b1, b2)
    );
  }

  private static isCollidingFromRight(
    b1: BoundingBox,
    b2: BoundingBox
  ): boolean {
    return (
      this.isXAligned(b1, b2) && b1.right >= b2.left && b1.right <= b2.right
    );
  }

  private static isCollidingFromLeft(
    b1: BoundingBox,
    b2: BoundingBox
  ): boolean {
    return (
      this.isXAligned(b1, b2) &&
      b1.left - b2.right <= 0 &&
      b1.left - b2.left >= 0
    );
  }

  private static isCollidingFromTop(b1: BoundingBox, b2: BoundingBox): boolean {
    return this.isYAligned(b1, b2) && b1.up <= b2.down && b1.up >= b2.up;
  }

  private static isCollidingFromBottom(
    b1: BoundingBox,
    b2: BoundingBox
  ): boolean {
    return this.isYAligned(b1, b2) && b1.down >= b2.up && b2.down >= b1.down;
  }

  private static isXAligned(b1: BoundingBox, b2: BoundingBox): boolean {
    return (
      (b1.down >= b2.up && b1.down <= b2.down) ||
      (b1.up <= b2.up && b1.down >= b2.down) ||
      (b1.up >= b2.up && b1.up <= b2.down)
    );
  }

  private static isYAligned(b1: BoundingBox, b2: BoundingBox): boolean {
    return (
      (b1.right >= b2.left && b1.right <= b2.right) ||
      (b1.left <= b2.left && b1.right >= b2.right) ||
      (b1.left < b2.right && b1.left >= b2.left)
    );
  }
}
