export default class CanvasLayout {
  canvas: HTMLCanvasElement;
  currImage: string;

  constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById("game");
  }

  clearCanvas() {
    return;
    this.canvas
      .getContext("2d")
      .clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  updateBackground(name: string) {
    this.canvas.setAttribute("style", `background: url('${name}');`);
  }

  //could add methods to add and draw sprites.
}

export enum CANVAS_BG_IMAGES {
  CLIFF = "./src/images/cliff.png",
  FROZEN = "./src/images/frozen.png",
  DISCO_BEAR = "./src/images/disco.png",
}
