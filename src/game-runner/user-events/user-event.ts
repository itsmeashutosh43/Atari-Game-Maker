import { Behavior } from "../behaviors/behavior";
import { Entity } from "../entities/entity";

export enum KEYCODE {
    ARROWLEFT = "ArrowLeft",
    ARROWRIGHT = "ArrowRight",
    ARROWUP = "ArrowUp",
    ARROWDOWN = "ArrowDown"
}

export abstract class UserEvent {
    behavior: Behavior;
    entity: Entity;
    abstract handler(e: KeyboardEvent): void;
    abstract attachEntity(entity: Entity): void;
    abstract attachBehavior(behavior: Behavior): void;
}

export class UserKeydownEvent implements UserEvent {

    behavior: Behavior;
    entity: Entity;
    keyCode: KEYCODE;

    constructor(b: Behavior, keyCode: KEYCODE) {
        this.attachBehavior(b);
        this.keyCode = keyCode;
        this.handler = this.handler.bind(this);
        document.addEventListener("keydown", this.handler);
    }

    handler(e: KeyboardEvent): void {
        e.preventDefault();
        
        if (e.key == this.keyCode){
            this.behavior.execute(this.entity);
        }
    }

    attachBehavior(behavior: Behavior) {
        this.behavior = behavior;
    }

    attachEntity(entity: Entity) {
        this.entity = entity;
    }
}