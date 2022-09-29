//import {randomMove, reflect } from "../game-runner/entities/collision-checker";
import { Shape } from "../game-runner/drawables/drawable";
//import { Entity, NonPlayableEntity, PlayableEntity } from "../game-runner/entities/entity";
import { UserKeydownEvent } from "../game-runner/user-events/user-event";
import { refreshSpriteList } from "./form-list";
import { Behavior } from "../game-runner/behaviors/behavior";


export class GameVariable{

    private spriteNames: Array<string>;
    private pspriteNames: Array<string>;
    private spriteEventNames: Array<Array<string>>;
    private pspriteEvents: Array<string>;
    private npSprites: Array<Shape>;
    private pSprites: Array<Shape>;
    private behaviors: Array<Array<Behavior>>;
    private userEvents:Array<UserKeydownEvent>;
    private soundList: Array<string>;

    constructor(
        spNames?: Array<string>, 
        spENames?: Array<Array<string>>, 
        pname?: Array<string>,
        pENames?: Array<string>,
        npSp?: Array<Shape>,
        pSp?: Array<Shape>,
        bh?: Array<Array<Behavior>>,
        ue?: Array<UserKeydownEvent>,
        snd?: Array<string>
    ){
        this.spriteNames = spNames ? spNames: [];
        this.spriteEventNames = spENames ? spENames: [];
        this.pspriteNames = pname ? pname: [];
        this.pspriteEvents = pENames ? pENames: [];
        this.npSprites = npSp ? npSp: [];
        this.pSprites = pSp ? pSp: [];
        this.behaviors = bh ? bh: [];
        this.userEvents = ue ? ue: [];
        this.soundList = snd ? snd: [];
    }

    //add non-playable sprite
    addNPSprite(name: string, sprite: Shape, cType: string, sound: string){
        this.spriteNames.push(name+"-NP"+ cType);
        this.npSprites.push(sprite);
        this.soundList.push(sound);
        refreshSpriteList(this);
    }

    saveNPSprite(index: number, name: string, sprite: Shape, cType: string, sound: string){
        this.spriteNames[index] = name+"-NP"+cType;
        this.npSprites[index] = sprite;
        this.soundList[index] = sound;
        refreshSpriteList(this);
    }

    // remove item from sprite list
    removeSprite(index: number){
        this.spriteNames.splice(index, 1);
        this.spriteEventNames.splice(index, 1);
        this.npSprites.splice(index,1);
        this.soundList.splice(index,1);
        if(index < this.behaviors.length){
            this.behaviors.splice(index,1);
        }
    }

    //add non-playable sprite
    createPSprite(name: string, sprite: Shape){
        if(this.pspriteNames == undefined){
            this.pspriteNames.push(name+"-P");
            this.pSprites.push(sprite);
        }else{
            this.pspriteNames[0] = name+"-P";
            this.pSprites[0] = sprite;
        }
        refreshSpriteList(this);
    }

    savePSprite(name: string, sprite: Shape){
        this.pspriteNames[0] = name+"-P";
        this.pSprites[0] = sprite;
        refreshSpriteList(this);
    }

    // remove item from sprite list
    removePSprite(){
        this.pspriteNames = [];
        this.pspriteEvents = [];
        this.pSprites = [];
        this.userEvents = [];
    }

    addEventList(){
        this.behaviors.push([]);
    }

    addBehavior(index: number, name: string, b: Behavior){
        if(this.spriteEventNames[index] == undefined){
            let newEventList = [name];
            this.spriteEventNames[index] = newEventList;
            let newBehaviorList = [b];
            this.behaviors[index] = newBehaviorList;
        }else{
            let newEventList = this.spriteEventNames[index];
            newEventList.push(name);
            this.spriteEventNames[index] = newEventList;
            let newBehaviorList = this.behaviors[index];
            newBehaviorList.push(b);
            this.behaviors[index] = newBehaviorList;
        }
    }

    editBehavior(index: number, bIndex: number, name: string, b: Behavior){
        this.spriteEventNames[index][bIndex] = name;
        this.behaviors[index][bIndex] = b;
    }

    // remove event from event list
    removeEvent(index: number, itemIndex: number){
        this.spriteEventNames[index].splice(itemIndex,1);
        this.behaviors[index].splice(itemIndex,1);
    }


    addUserEvent(name: string,ue: UserKeydownEvent){
        this.pspriteEvents.push(name);
        this.userEvents.push(ue);
    }
    editUserEvent(index: number, ue: UserKeydownEvent){
        this.userEvents[index] = ue;
    }
    // remove event from event list
    removeUEvent(itemIndex: number){
        this.pspriteEvents.splice(itemIndex,1);
        this.userEvents.splice(itemIndex,1);
    }
    /*
    generateEntityList(): Array<Entity> {
        let eList: Array<Entity> = []
        if(this.pSprites.length != 0){
            let pEntity = new PlayableEntity(this.pSprites[0],this.userEvents);
            eList.push(pEntity);
        }
        let npIndex = 0;
        for(let i = 0; i < this.spriteNames.length; i++){
            if(this.spriteNames[i].includes("-C")){
                let npEntity = new NonPlayableEntity(this.npSprites[npIndex], this.soundList[npIndex],reflect,this.behaviors[npIndex]);
                
                eList.push(npEntity);
                npIndex += 1;
            }
            else if(this.spriteNames[i].includes("-R")){
                let npEntity = new NonPlayableEntity(this.npSprites[npIndex], this.soundList[npIndex],randomMove,this.behaviors[npIndex]);
                eList.push(npEntity);
                npIndex += 1;
            }   
            
        }
        return eList;
    }
    */

    getpSpriteNames(): Array<string>{
        return this.pspriteNames;
    }
    getuEventNames(): Array<string>{
        return this.pspriteEvents;
    }
    getUEvents(): Array<any>{
        return this.userEvents;
    }
    getSpriteNames(): Array<string>{
        return this.spriteNames;
    }
    getEventNames(): Array<Array<string>>{
        return this.spriteEventNames;
    }
    getPSprite(){
        return this.pSprites[0];
    }
    getNPSprites(){
        return this.npSprites;
    }
    getBehavior(){
        return this.behaviors;
    }
    getSoundList(){
        return this.soundList;
    }


}
