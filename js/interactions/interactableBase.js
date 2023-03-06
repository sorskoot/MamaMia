import { CollisionComponent, Object as Object3D } from "@wonderlandengine/api";
import { Type } from "@wonderlandengine/api/wonderland";
import { EventEmitterComponent } from "../core/eventEmitter";

/**
 * Base class for interactable objects.
 * @extends EventEmitterComponent 
 * @event Enter - When an object enters the zone
 * @event Leave - When an object leaves the zone
 */
export class InteractableBase extends EventEmitterComponent {
    static TypeName = 'interactable-base';
    static Properties = Object.assign({}, EventEmitterComponent.Properties, {
        collisionObject: { type: Type.Object },
    });

    /** @type {CollisionComponent} */
    #collision = null;

    /** @type {Object3D} */
    #objectInZone = null;

    constructor() {
        super();
    }

    start() {
        if (!this.collisionObject) {
            console.error('InteractableBase: collision is missing');
        }
        this.#collision = this.collisionObject.getComponent('collision');
        if (!this.#collision) {
            console.error('InteractableBase: collision component is missing');
        }
    }

    update() {
        let collisions = this.#collision.queryOverlaps();
        if (collisions.length > 0) {
            if (this.#objectInZone == null) {                
                this.#objectInZone = collisions[0].object;
                this.emit('Enter', this.#objectInZone);
                this.onEnter(this.#objectInZone);                
            }
        } else {
            if (this.#objectInZone != null) {                
                this.emit('Leave', this.#objectInZone);
                this.onLeave(this.#objectInZone);
                this.#objectInZone = null;
            }
        }
    }

    /**
     * When an object enters the zone. Override this method to implement custom behavior.
     * @param {Object3D} object 
     */
    onEnter(object) { }

    /**
     * When an object leaves the zone. Override this method to implement custom behavior.
     * @param {Object3D} object 
     */
    onLeave(object) { }
}