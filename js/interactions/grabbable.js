import { Component, Object as Object3D } from '@wonderlandengine/api';
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
        grabPoint: { type: WL.Type.Object, default: null }
    }

    /** @type {Object3D} the original parent of the object */
    originalParent = null;

    /** @type {Grabber} the grabber that is currently holding this item */
    grabbedBy;

    start() {
        this.physx = this.object.getComponent('physx');
        
        if (this.physx) {
            this.originalKinematic = this.physx.kinematic;            
        }
        
        this.originalTransformWorld = this.object.transformWorld;
        this.originalTransformLocal = this.object.transformLocal;  
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
                this.object.transformLocal = quat2.invert(quat2.create(), grabPoint.object.transformLocal);;
            }
        }

        console.log(`grab by grabber ${grabber.object.name}`);
    }

    /** @param {Grabber} grabber that dropped the item */
    drop(grabber) {
        if (this.grabbedBy !== grabber) {
            return; //this item is not grabbed by this grabber
        }
        this.grabbedBy = null;

        reparentKeepTransform(this.object, this.originalParent);
        this.object.transformLocal = this.originalTransformLocal;

        if (this.physx) {
            this.physx.kinematic = false;
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
        this.object.transformWorld = this.originalTransformWorld;
        this.object.transformLocal = this.originalTransformLocal;        
    }

    IsBeingHeld() {
        return this.grabbedBy !== null;
    }
};