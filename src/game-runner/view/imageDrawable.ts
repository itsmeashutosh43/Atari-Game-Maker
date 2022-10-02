import { Size } from "../model/objects/isize";
import { position } from "../model/objects/iposition";
import { RectangleSize } from "../model/objects/rectangleSize";
import { CanvasLayout } from "./canvas";
export class defaultImageDrawable {
  source: string;

  constructor(source: string) {
    this.source = source;
  }
  draw(size: RectangleSize, pos: position): void {
    let width: number = size.width;
    let height: number = size.height;
    let image = document.createElement("img");
    image.src = this.source;
    CanvasLayout.getInstance().beginPath();
    CanvasLayout.getInstance().rect(
      pos.x,
      pos.y,
      size.getWidth(),
      size.getHeight()
    );
    CanvasLayout.getInstance().stroke();
    CanvasLayout.getInstance().drawImage(image, pos.x, pos.y, width, height);
  }

  get_source(): string {
    return this.source;
  }
}
