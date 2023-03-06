import { CollisionComponent, Type, Object as Object3D } from '@wonderlandengine/api/wonderland';
import { Grabbable } from './grabbable';
import { InteractableBase } from './interactableBase';


/**
 * Zone that can snap an object to it.
 * 
 * Emit the following events:
 * @event snapped - when an object is snapped to the zone
 * @event enteredSnapZone - when an object enters the snap zone
 * @event leftSnapZone - when an object leaves the snap zone
 * @extends InteractableBase
 */
export class SnapZone extends InteractableBase {
    static TypeName = 'snap-zone';
    static Properties = Object.assign({}, InteractableBase.Properties, {
        snapTargetObject: { type: Type.Object },
        locked: { type: Type.Bool, default: false },
        initialObject: { type: WL.Type.Object, default: null }
    })

    /** @type {Object3D} target to snap to */
    objectInZone = null;

    /** @type {Object3D} target to snap to */
    snapTarget = null;



    constructor() {
        super();
    }

    start() {
        super.start();

        if (!this.snapTargetObject) {
            this.snapTarget = this.object;
        } else {
            this.snapTarget = this.snapTargetObject;
        }

        if (this.initialObject) {
            //     this.snapToZone(this.initialObject);
        }
    }

  //  update(dt) {
        // if (this.locked) {
        //     return;
        // }

        // if (this.heldObject) {
        //     // if there's an object held by the snapzone, but the object itself is not, 
        //     // it should be removed from the snapzone
        //     if (this.heldObject.IsBeingHeld()) {
        //         this.heldObject = null;
        //     }
        // } else {
        //     let collisions = this._snapCollision.queryOverlaps();
        //     // TODO: add filtering on collision groups                         
        //     if (collisions.length > 0) {
        //         // object in zone
        //         this.snapToZone(collisions[0].object);
        //     } else {                
        //         if(this.objectInZone){
        //             this.emit('leftSnapZone', this.objectInZone);
        //             this.objectInZone = null;
        //         }
        //     }
        // }
   // }

    onEnter(object) {
        console.log('onEnter');
        this.snapToZone(object);
    }

    onLeave(object) {
        console.log('onLeave');
        if (this.objectInZone) {
            this.emit('leftSnapZone', this.objectInZone);
            this.objectInZone = null;
        }
    }

    /**
     * Possibly snap object to the current zone
     * @param {Object3D} collisionObject object
     */
    snapToZone(collisionObject) {
        /** @type {Grabbable} */
        let grabbable = collisionObject.getComponent('grabbable');
        if (grabbable) {
            if (!this.objectInZone) {
                this.objectInZone = grabbable;
                this.emit('enteredSnapZone', grabbable);
            }
            if (!grabbable.IsBeingHeld()) {
                this.heldObject = grabbable;
                if (this.heldObject.physx) {
                    this.heldObject.physx.kinematic = true;
                }
                grabbable.object.parent = this.object.parent;
                grabbable.object.resetTranslationRotation();
                let rotation = [];
                this.snapTarget.getTranslationWorld(rotation);
                grabbable.object.setTranslationWorld(rotation);
                grabbable.object.rotateObject(this.snapTarget.rotationLocal);
                this.emit('snapped', grabbable);
            }
        }
    }
    reset() {
        this.heldObject = null;
    }
};