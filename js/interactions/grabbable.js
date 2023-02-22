import { Component, Object as Object3D, Type } from '@wonderlandengine/api';
import { quat, quat2, vec3 } from 'gl-matrix';
import { getLocalTransform, reparentKeepTransform } from '../utils/helper';
import { Grabber } from './grabber';
import { GrabPoint } from './grabPoint';

// Maybe we can add an animation to this script as a hand pose for when it has grabbed the object.
// the gabber script can use that so change the hand pose when it has grabbed the object.
// also in combination with a transform to correctly position the grabbed object to the hand.

export class Grabbable extends Component {
    static TypeName = 'grabbable';
    static Properties = {
        grabPoint: { type: Type.Object, default: null },
        resets: {type: Type.Bool, default: false},
        resetTimeout: {type: Type.Int, default: 1500},
    }

    /** @type {Object3D} the original parent of the object */
    originalParent = null;

    /** @type {Grabber} the grabber that is currently holding this item */
    grabbedBy;

    /** @type {NodeJS.Timeout} timout reference */
    #timeout = null;

    start() {
        this.physx = this.object.getComponent('physx');
        
        if (this.physx) {
            this.originalKinematic = this.physx.kinematic;            
        }
        
        this.originalTransformWorld = vec3.clone(this.object.transformWorld);
        this.originalTransformLocal = vec3.clone(this.object.transformLocal);  
        this.originalParent = this.object.parent;
    }

    /** @param {Grabber} grabber that is grabbing the item */
    grab(grabber) {
       
        this.grabbedBy = grabber;

        if (this.physx) {
            this.physx.kinematic = true;
        }      
        reparentKeepTransform(this.object, grabber.object);

        // but if there's a grab point, we should use that instead
        if (this.grabPoint) {
            /** @type {GrabPoint} */
            let grabPoint = this.grabPoint.getComponent('grab-point');
            if (grabPoint) {
                this.object.transformLocal.set(quat2.invert(quat2.create(), grabPoint.object.transformLocal));
            }
        }

        if(this.#timeout){
            clearTimeout(this.#timeout);
            this.#timeout=null;
        }
        
    }

    /** @param {Grabber} grabber that dropped the item */
    drop(grabber) {
        if (this.grabbedBy !== grabber) {
            return; //this item is not grabbed by this grabber
        }
        this.grabbedBy = null;

        reparentKeepTransform(this.object, this.originalParent);
        this.object.transformLocal.set(this.originalTransformLocal);

        if (this.physx) {
            this.physx.kinematic = false;
        }
        if(this.resets){
            this.#timeout = setTimeout(() => {
                this.reset();
            }, this.resetTimeout);            
        }
    }

    /** Resets object back to its original position, and removes from being held */
    reset(){
        if (this.grabbedBy){
            this.grabbedBy.reset();
            this.grabbedBy = null;
        }
        if (this.physx) {
            this.physx.kinematic = this.originalKinematic;            
        }        

        this.object.parent = this.originalParent;
        this.object.resetTranslationRotation();
        this.object.transformWorld.set(this.originalTransformWorld);
        //this.object.transformLocal.set(this.originalTransformLocal);        
    }

    IsBeingHeld() {
        return this.grabbedBy !== null;
    }
};