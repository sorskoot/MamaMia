import { Component, Object as Object3D} from '@wonderlandengine/api';
import { reparentKeepTransform } from '../utils/helper';
import { Grabber } from './grabber';

// Maybe we can add an animation to this script as a hand pose for when it has grabbed the object.
// the gabber script can use that so change the hand pose when it has grabbed the object.
// also in combination with a transform to correctly position the grabbed object to the hand.

export class Grabbable extends Component {
    static TypeName = 'grabbable';
    static Properties = {
    }
    
    /** @type {Object3D} the original parent of the object */
    originalParent = null;
    
    /** @type {Grabber} the grabber that is currently holding this item */
    grabbedBy;        

    start(){
        this.physx = this.object.getComponent('physx');              
    }

    /** @param {Grabber} grabber that is grabbing the item */
    grab(grabber) {
        if(!this.originalParent){
            this.originalParent = this.object.parent;
        }
        this.grabbedBy = grabber;

        if(this.physx){
            this.physx.kinematic = true;
        }
        reparentKeepTransform(this.object, grabber.object);
        console.log(`grab by grabber ${grabber.object.name}`);
    }

    /** @param {Grabber} grabber that dropped the item */
    drop(grabber){        
        if(this.grabbedBy !== grabber){
            return; //this item is not grabbed by this grabber
        }
        this.grabbedBy = null;
        console.log(`drop by grabber ${grabber.object.name}`);
        reparentKeepTransform(this.object, this.originalParent);
        if(this.physx){
            this.physx.kinematic = false;
        }
    }

    IsBeingHeld(){
        return this.grabbedBy !== null;
    }
};