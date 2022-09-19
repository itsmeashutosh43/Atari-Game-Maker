import { Entity } from "./entity";
import { CANVAS } from "../..";
import { ENTITIES } from "../..";
import { Block, BoundingBox, Circle } from "../drawables/drawable";
import { Behavior, DIRECTION, DoNothing, Move, SetPosition } from "../behaviors/behavior";

// Singleton
export default class Collision {

    private constructor() { };

    private static instance: Collision = undefined;

    static getInstance(): Collision {
        if (!this.instance) {
            this.instance = new Collision();
        }
        return this.instance;
    }

    withOtherEntities(currEntity: Entity): boolean {

        let colliding = false;

        ENTITIES.filter((entity) => (entity !== currEntity)).forEach((otherEntity) => {
            if (this.isColliding(currEntity.shape.getBoundingBox(),
                otherEntity.shape.getBoundingBox())) {

                if (!otherEntity.isColliding) {
                    otherEntity.isColliding = true;
                }

                if (!currEntity.isColliding) {
                    currEntity.isColliding = true;
                }

                if (currEntity.isColliding && otherEntity.isColliding)
                    colliding = true;
            }
        });

        return colliding;
    }

    withCanvas(e: Entity): boolean {
        const boundingBox = e.shape.getBoundingBox();
        if (boundingBox.up <= 0
            || boundingBox.left <= 0
            || boundingBox.right >= CANVAS.width
            || boundingBox.down >= CANVAS.height) {
            e.isColliding = true;
            return true;
        }
        return false;
    };

    private isColliding(b1: BoundingBox, b2: BoundingBox): boolean {
        return this.isCollidingFromLeft(b1, b2) || this.isCollidingFromRight(b1, b2)
            || this.isCollidingFromBottom(b1, b2) || this.isCollidingFromTop(b1, b2);
    }


    private isCollidingFromRight(b1: BoundingBox, b2: BoundingBox): boolean {
        return this.isXAligned(b1, b2)
            && b1.right >= b2.left && b1.right <= b2.right;
    }

    private isCollidingFromLeft(b1: BoundingBox, b2: BoundingBox): boolean {
        return this.isXAligned(b1, b2)
            && b1.left - b2.right <= 0 && b1.left - b2.left >= 0;
    }

    private isCollidingFromTop(b1: BoundingBox, b2: BoundingBox): boolean {
        return this.isYAligned(b1, b2)
            && b1.up <= b2.down && b1.up >= b2.up
    }

    private isCollidingFromBottom(b1: BoundingBox, b2: BoundingBox): boolean {
        return this.isYAligned(b1, b2)
            && b1.down >= b2.up && b2.down >= b1.down;
    }


    private isXAligned(b1: BoundingBox, b2: BoundingBox): boolean {
        return b1.down >= b2.up && b1.down <= b2.down ||
            b1.up <= b2.up && b1.down >= b2.down ||
            b1.up >= b2.up && b1.up <= b2.down;
    }

    private isYAligned(b1: BoundingBox, b2: BoundingBox): boolean {
        return b1.right >= b2.left && b1.right <= b2.right ||
            b1.left <= b2.left && b1.right >= b2.right ||
            b1.left < b2.right && b1.left >= b2.left;
    }

}

// Collision Behavior
export const randomMove = (): Move => {
    const directions = Object.values(DIRECTION);
    const randomDir = directions[Math.floor(Math.random() * directions.length)];
    return new Move(Math.floor(Math.random() * 100), randomDir, Math.random() * 10);
}

export const dontReact = (b: Behavior): Behavior => {
    return b;
}

export const setDisplayOff = (b:Behavior,e: Entity): void => {
    e.display = false;
}

export const reflect = (behavior: Behavior,entity:Entity): Behavior => {

    if (behavior instanceof DoNothing || behavior instanceof SetPosition)
        return behavior;

    const move = <Move>behavior;
    let bbox = entity.shape.getBoundingBox()
    switch (move.dir) {
        case DIRECTION.LEFT:
            return new Move(move.displacement, DIRECTION.RIGHT, move.speed);
        case DIRECTION.RIGHT:
            return new Move(move.displacement, DIRECTION.LEFT, move.speed);
        case DIRECTION.UP:
            return new Move(move.displacement, DIRECTION.DOWN, move.speed);
        case DIRECTION.DOWN:
            return new Move(move.displacement, DIRECTION.UP, move.speed);
        case DIRECTION.TOPLEFT:
            if (bbox.left <= 0)
                return new Move(move.displacement,DIRECTION.TOPRIGHT);
            else
                return new Move(move.displacement, DIRECTION.BOTTOMLEFT, move.speed);
        case DIRECTION.TOPRIGHT:
            if (bbox.right >= CANVAS.width)
                return new Move(move.displacement,DIRECTION.TOPLEFT);
            else
                return new Move(move.displacement, DIRECTION.BOTTOMRIGHT, move.speed);
        case DIRECTION.BOTTOMLEFT:
            if (bbox.left <= 0)
                return new Move(move.displacement,DIRECTION.BOTTOMRIGHT);
            else
                return new Move(move.displacement, DIRECTION.TOPLEFT, move.speed);
        case DIRECTION.BOTTOMRIGHT:
            if (bbox.right >= CANVAS.width)
                return new Move(move.displacement,DIRECTION.BOTTOMLEFT);
            else
                return new Move(move.displacement, DIRECTION.TOPRIGHT, move.speed);
        case DIRECTION.NOWHERE:
            return;
    }
}
export const bounce = (behavior: Behavior,entity:Entity): Behavior => {

    if (behavior instanceof DoNothing || behavior instanceof SetPosition)
        return behavior;

    const move = <Move>behavior;
    switch (move.dir) {
        case DIRECTION.LEFT:
            entity.unitVectors.invI();
            return new Move(move.displacement, DIRECTION.RIGHT, move.speed);
        case DIRECTION.RIGHT:
            entity.unitVectors.invI();
            return new Move(move.displacement, DIRECTION.LEFT, move.speed);
        case DIRECTION.UP:
            entity.unitVectors.invJ();
            return new Move(move.displacement, DIRECTION.DOWN, move.speed);
        case DIRECTION.DOWN:
            entity.unitVectors.invJ();
            return new Move(move.displacement, DIRECTION.UP, move.speed);
        case DIRECTION.TOPLEFT:
            entity.unitVectors.invI();
            return new Move(move.displacement, DIRECTION.BOTTOMLEFT, move.speed);
        case DIRECTION.TOPRIGHT:
            entity.unitVectors.invI();
            return new Move(move.displacement, DIRECTION.BOTTOMRIGHT, move.speed);
        case DIRECTION.BOTTOMLEFT:
            entity.unitVectors.invI();
            return new Move(move.displacement, DIRECTION.TOPLEFT, move.speed);
        case DIRECTION.BOTTOMRIGHT:
            entity.unitVectors.invI();
            return new Move(move.displacement, DIRECTION.TOPRIGHT, move.speed);
        case DIRECTION.NOWHERE:
            return;
    }
}