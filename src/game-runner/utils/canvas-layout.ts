export default class CanvasLayout {
    canvas: HTMLCanvasElement;
    currImage: string;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("game");
    }

    clearCanvas() {
        this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updateBackground(name: string) {
        this.canvas.setAttribute("style", `background: url('${name}');`);
    }
}

export enum CANVAS_BG_IMAGES {
    CLIFF = "https://i.imgur.com/fIwPBZw.png",
    FROZEN = "https://i.imgur.com/t6cUFsI.png",
    DISCO_BEAR = "https://i.imgur.com/gDbubJF.png",
}