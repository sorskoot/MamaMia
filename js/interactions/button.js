import { CollisionComponent, Component } from '@wonderlandengine/api';
import { EventEmitterComponent } from '../core/eventEmitter';

/**
 * This is a button component that can be used create a button in VR
 * @event pressed - This event is triggered when the button is pressed.
 * @event released - This event is triggered when the button is released.
 */
export class Button extends EventEmitterComponent {
    static TypeName = 'button';
    static Properties = {
        buttonTop: { type: WL.Type.Object },
        collisionObject: { type: WL.Type.Object },
        pressDepth: { type: WL.Type.Float, default: 0.01 },
    }

    /**
     * This is the collision object that is used to detect if the button is pressed.
     * The collission needs to be set to group 3, for index finger interactions.
     * @type {CollisionComponent}
     */
    #collisionComponent;
    
    #originalY = 0;
    start() {
        if (!this.buttonTop) {
            console.warn("No button top set for button");
        }
        
        this.#originalY = this.buttonTop.getTranslationLocal([])[1];

        if (this.collisionObject) {
            this.#collisionComponent = this.collisionObject.getComponent(CollisionComponent);
            
        } else {
            console.warn("No collision object set for button");
        }
    }

    update(dt) {
        let colliding = this.#collisionComponent.queryOverlaps();

        if (colliding.length > 0 && !this.isPressed) {
            this.isPressed = true;  
            
            this.buttonTop.setTranslationLocal([0, this.#originalY-this.pressDepth, 0]);            
            this.emit('pressed', this);
        } else if (colliding.length === 0 && this.isPressed) {
            this.isPressed = false;
            this.buttonTop.setTranslationLocal([0, this.#originalY, 0]);
            this.emit('released', this);
        };


    }

};