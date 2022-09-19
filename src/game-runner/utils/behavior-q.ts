import { Behavior } from "../behaviors/behavior";

export default class BehaviorQueue {

    private behaviors: Behavior[];
    private totalBehaviors: number;
    private currBehaviorIndex: number;

    constructor(behaviors: Behavior[]) {
        this.behaviors = behaviors;
        this.totalBehaviors = behaviors.length;
        this.currBehaviorIndex = 0;
    }

    getCurrentBehavior(): Behavior {
        const behavior = this.behaviors[this.currBehaviorIndex];

        if (behavior.executionComplete) {
            this.currBehaviorIndex = this.reachedEndOfQueue() ? 0 : this.currBehaviorIndex + 1;
            behavior.executionComplete = false;
        }

        return this.behaviors[this.currBehaviorIndex];
    }

    reachedEndOfQueue(): boolean {
        return this.currBehaviorIndex == this.totalBehaviors - 1;
    }

    appendFirst(newBehavior: Behavior) {
        this.behaviors.unshift(newBehavior);
    }

    popFirst(): Behavior {
        return this.behaviors.shift();
    }

    all(): Behavior[] {
        return this.behaviors;
    }
}

