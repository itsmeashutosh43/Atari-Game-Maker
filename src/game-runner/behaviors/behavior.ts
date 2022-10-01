import { Cooridnates } from "../drawables/drawable";
//import { Entity } from "../entities/entity";

export enum DIRECTION {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  UP = "UP",
  DOWN = "DOWN",
  TOPLEFT = "TOPLEFT",
  TOPRIGHT = "TOPRIGHT",
  BOTTOMLEFT = "BOTTOMLEFT",
  BOTTOMRIGHT = "BOTTOMRIGHT",
  NOWHERE = "NOWHERE",
}

export abstract class Behavior {
  executionComplete: Boolean;
  dir: DIRECTION = DIRECTION.NOWHERE;
  //abstract execute(e: Entity): void;
  abstract resetBehavior(): void;
}

export class DoNothing extends Behavior {
  //execute(e: Entity): void { }
  resetBehavior(): void {}
}

export class SetPosition extends Behavior {
  coords: Cooridnates;
  constructor(coords: Cooridnates) {
    super();
    this.executionComplete = false;
    this.coords = coords;
  }

  resetBehavior(): void {
    this.executionComplete = true;
  }
  /*
    execute(e: Entity): void {
        if (this.executionComplete)
            return;
        e.shape.origin = { x: this.coords.x, y: this.coords.y }
        this.resetBehavior()
    }
    */
}

export class Move extends Behavior {
  displacement: number;
  traveled: number;
  speed: number;
  dir: DIRECTION;

  constructor(displacement: number, dir: DIRECTION, speed?: number) {
    super();

    this.displacement = displacement;
    this.traveled = 0;
    this.dir = dir;
    this.speed = speed ? speed : 1;
    this.executionComplete = false;
  }

  resetBehavior(): void {
    this.executionComplete = true;
    this.traveled = 0;
  }
  /*
    execute(e: Entity): void {
        if (this.executionComplete)
            return

        if (this.traveled >= this.displacement) {
            this.resetBehavior();
            return
        }

        this.traveled += this.speed;

        switch (this.dir) {
            case DIRECTION.LEFT:
                e.shape.origin.x -= this.speed;
                break;

            case DIRECTION.RIGHT:
                e.shape.origin.x += this.speed;
                break;

            case DIRECTION.UP:
                e.shape.origin.y -= this.speed;
                break;

            case DIRECTION.DOWN:
                e.shape.origin.y += this.speed;
                break;

            case DIRECTION.TOPLEFT:
                e.shape.origin.x -= this.speed;
                e.shape.origin.y -= this.speed;
                break;

            case DIRECTION.TOPRIGHT:
                e.shape.origin.x += this.speed;
                e.shape.origin.y -= this.speed;
                break;

            case DIRECTION.BOTTOMLEFT:
                e.shape.origin.x -= this.speed;
                e.shape.origin.y += this.speed;
                break;

            case DIRECTION.BOTTOMRIGHT:
                e.shape.origin.x += this.speed;
                e.shape.origin.y += this.speed;
                break;
        }
    }
    */
}
