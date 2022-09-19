import { setGameVar } from "../..";
import { GameVariable } from "../../game-maker/game-variable";

export class FileParser {
  filePath: String;
  data: any;
  gameVariable:GameVariable
  constructor(filePath?: string) {
    this.filePath = filePath;
    this.data ={};
    this.readFile = this.readFile.bind(this);
  }
  readFile(): void {
    let input = <HTMLInputElement>document.createElement("input");
    input.type = "file";
    input.onchange = async () => {
      let contents = await input.files[0].text();
      this.data = JSON.parse(contents);
      let background = this.data["bg"];
      let spriteNames = this.data["spNames"];
      let spriteEventNames = this.data["spENames"];
      let playableEntityName = this.data["pname"];
      let pENames = this.data["pENames"];
      let nonPlayableSprites = this.data["npsp"];
      let playableSprite = this.data["pSp"];
      let behaviors = this.data["bh"];
      let userEvents = this.data["ue"];
      let gvar =  new GameVariable(
        spriteNames,
        spriteEventNames,
        playableEntityName,
        pENames,
        nonPlayableSprites,
        playableSprite,
        behaviors,
        userEvents
      );
      setGameVar(gvar);
    };

    input.click();
  }

  printFile() {
    console.log(this.parseFile());
  }
  parseFile() {
    let background = this.data["bg"];
    let spriteNames = this.data["spNames"];
    let spriteEventNames = this.data["spENames"];
    let PlayableEntityName = this.data["pname"];
    let pENames = this.data["pENames"];
    let nonPlayableSprites = this.data["npsp"];
    let playableSprite = this.data["pSp"];
    let behaviors = this.data["bh"];
    let userEvents = this.data["ue"];
    let x = {
      background: background,
      spriteNames: spriteNames,
      spriteEventNames: spriteEventNames,
      PlayableEntityName: PlayableEntityName,
      pENames: pENames,
      nonPlayableSprites: nonPlayableSprites,
      playableSprite: playableSprite,
      behaviors: behaviors,
      userEvents: userEvents,
    };
    console.log(x);
  }
}
