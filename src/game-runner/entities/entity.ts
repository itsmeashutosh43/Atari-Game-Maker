import { Behavior, DoNothing } from "../behaviors/behavior";
import { Shape } from "../drawables/drawable";
import BehaviorQueue from "../utils/behavior-q";
import { CTX } from "../..";
import { UserEvent } from "../user-events/user-event";
import { COLLISION } from "../..";
import { setDisplayOff } from "./collision-checker";

export class unitVector{
    i : number;
    j : number;
    constructor(){
        this.i = 1;
        this.j = 1; 
    }
    get iVec(){
        return this.i;
    }
    get jVec(){
        return this.j;
    }
    invI(){
        this.i*=-1;
    }
    invJ(){
        this.j*=-1;
    }
}

export abstract class Entity {
    shape: Shape;
    isColliding: boolean;
    display: boolean;
    unitVectors:unitVector;
    behaviorOnCollision: (x?: Behavior , entity?:Entity) => Behavior | void;
    abstract init(): void;
    abstract update(): void;
}


export class NonPlayableEntity extends Entity {

    behaviorQueue: BehaviorQueue
    shape: Shape;
    soundPath: string;

    constructor(shape: Shape, soundPath: string, onCollision: (x?: Behavior, entity?: Entity) => Behavior | void, behaviors?: Behavior[]) {
        super();
        this.unitVectors = new unitVector()
        this.behaviorQueue = new BehaviorQueue(behaviors ? behaviors : [new DoNothing()]);
        this.behaviorOnCollision = onCollision;
        this.shape = shape;
        this.display = true;
        this.isColliding = false;
        this.soundPath = soundPath;
    }

    init(): void {
    }

    update(): void {

        this.isColliding = false;

        if (COLLISION.withCanvas(this) || COLLISION.withOtherEntities(this)) {
            let snd = new Audio(this.soundPath);
            snd.play();
            console.log(this.shape.color);
            this.updateBehavior();
            this.isColliding = false;
        }
        const currentBehavior = this.behaviorQueue.getCurrentBehavior();
        currentBehavior.execute(this);

        if (this.display)
            this.shape.draw(CTX);
    }

    private updateBehavior(): void {
        const currBehavior = this.behaviorQueue.popFirst();
        if (this.behaviorOnCollision != setDisplayOff) {
            const newBehavior = this.behaviorOnCollision(currBehavior,this);
            if (newBehavior instanceof Behavior) {
                this.behaviorQueue.appendFirst(newBehavior);
            }
        }
        else {
            this.behaviorOnCollision(currBehavior,this);
        }
    }
}

export class PlayableEntity extends Entity {

    userEvents: UserEvent[]

    constructor(shape: Shape, userEvents: UserEvent[]) {
        super();
        this.shape = shape;
        this.unitVectors = new unitVector()
        this.userEvents = userEvents;
        this.init();
    }

    init(): void {
        this.userEvents.forEach((userEvent) => {
            userEvent.attachEntity(this);
        })
    }
    update(): void {
        this.shape.draw(CTX);
    }

}
