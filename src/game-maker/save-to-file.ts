import { Behavior, DIRECTION, Move, SetPosition } from "../game-runner/behaviors/behavior";
import { Block, Circle, Cooridnates, Shape } from "../game-runner/drawables/drawable";
import { KEYCODE, UserKeydownEvent } from "../game-runner/user-events/user-event";
import { GameVariable } from "./game-variable";
import { cCircle, cSquare, saveBtn } from "./util/form-const";


export function saveToFile(background: string, container: GameVariable){
    const store = {
        bg: background,
        spNames: container.getSpriteNames(), 
        spENames: container.getEventNames(), 
        pname: container.getpSpriteNames(),
        pENames: container.getuEventNames(),
        npSp: container.getNPSprites(),
        pSp: [container.getPSprite()],
        bh: container.getBehavior(),
        ue: container.getUEvents(),
        snd: container.getSoundList()
    }
    const data = JSON.stringify(store);

    const file = new Blob([data], { type: "json" })
    const fileRoute = window.URL.createObjectURL(file);
    const a = document.createElement('a');
    a.setAttribute('href', fileRoute);
    a.setAttribute('download', `game_editor_${getFormattedTime()}_game.json`);
    saveBtn.appendChild(a);
    a.click();
    saveBtn.removeChild(a);
}

export function getFormattedTime(): string {
    const now = new Date();
    return `${now.getMinutes()}_${now.getSeconds()}`;
}

export function loadFIle(f: string): [string, GameVariable]{

    let data = JSON.parse(f);
    let bg = data["bg"];
    let spNames = data["spNames"];
    let spENames = data["spENames"];
    let pname = data["pname"];
    let pENames = data["pENames"];
    //non-playable Sprite
    let nplaySprite = data["npSp"];
    //create a list of shape named npSp
    let npSp: Array<Shape> = [];
    nplaySprite.forEach((item: {color: string; width?: number; height?: number; origin: Cooridnates; type: string; radius?: number;}) => {
        let shapeType = item.type;
        if(shapeType == cCircle){
            npSp.push(new Circle(item.origin.x, item.origin.y, item.radius, item.color))
        }else if(shapeType == cSquare){
            npSp.push(new Block(item.origin.x, item.origin.y, item.width, item.height, item.color))
        }
    })
    //playable Sprite
    let playSprite = data["pSp"];
    //create a list of shape named pSp
    let pSp: Array<Shape> = [];
    if(playSprite[0] != null){
        playSprite.forEach((item: {color: string; width?: number; height?: number; origin: Cooridnates; type: string; radius?: number;}) => {
            let shapeType = item.type;
            if(shapeType == cCircle){
                pSp.push(new Circle(item.origin.x, item.origin.y, item.radius, item.color))
            }else if(shapeType == cSquare){
                pSp.push(new Block(item.origin.x, item.origin.y, item.width, item.height, item.color))
            }
        })
    }
    //behavior
    let behaviors = data["bh"];
    // create a list of behavior named bh
    let bh: Array<Array<Behavior>> = [];
 

    for(let i = 0 ; i < behaviors.length ; i++){
        let behavior_list = behaviors[i];
        let bhi: Array<Behavior> = [];
        if(behavior_list != undefined){
            for(let j = 0 ; j < behavior_list.length ; j++){
                let currB = behavior_list[j];
                if(currB != undefined){
                    if(currB.dir == "NOWHERE"){
                        bhi.push(new SetPosition({x:currB.coords.x,y:currB.coords.y}))
                    }
                    else{
                        bhi.push(new Move(currB.displacement,currB.dir,currB.speed))
                    }
                }
            }
        }
        
        bh.push(bhi);
    }
    //userevent
    let userevents = data["ue"];
    //create a list of KeyBoardEvents named ue
    let ue: UserKeydownEvent[] = [];
    for(let i = 0 ; i < userevents.length ;i++){
        let user_event = userevents[i];
        switch(user_event.behavior.dir){
            case DIRECTION.LEFT:
                ue.push(new UserKeydownEvent(new Move(9999,DIRECTION.LEFT,user_event.behavior.speed),KEYCODE.ARROWLEFT));
                break;
            case DIRECTION.RIGHT:
                ue.push(new UserKeydownEvent(new Move(9999,DIRECTION.RIGHT,user_event.behavior.speed),KEYCODE.ARROWRIGHT));
                break;
            case DIRECTION.DOWN:
                ue.push(new UserKeydownEvent(new Move(9999,DIRECTION.DOWN,user_event.behavior.speed),KEYCODE.ARROWDOWN));
                break;
            case DIRECTION.UP:
                ue.push(new UserKeydownEvent(new Move(9999,DIRECTION.UP,user_event.behavior.speed),KEYCODE.ARROWUP));
                break;
        }
    }
    let sndList = data["snd"];
    
    
    console.log(bg, new GameVariable(spNames,spENames,pname,pENames,npSp,pSp,bh,ue,sndList));

    //set background to the bg in the file

    return [bg, new GameVariable(spNames,spENames,pname,pENames,npSp,pSp,bh,ue,sndList)];
}

