import { Component, Object as WLObject} from '@wonderlandengine/api';
import { reparentKeepTransform } from '../helper';
import { Grabber } from './grabber';

// Maybe we can add an animation to this script as a hand pose for when it has grabbed the object.
// the gabber script can use that so change the hand pose when it has grabbed the object.
// also in combination with a transform to correctly position the grabbed object to the hand.

export class Grabbable extends Component {
    static TypeName = 'grabbable';
    static Properties = {
    }
    
    /** @type {WLObject} the original parent of the object */
    originalParent = null;
    
    /** @type {Grabber} the grabber that is currently holding this item */
    grabbedBy;        

    

    /** @param {Grabber} grabber that is grabbing the item */
    grab(grabber) {
        if(!this.originalParent){
            this.originalParent = this.object.parent;
        }
        this.grabbedBy = grabber;

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
    }

    IsBeingHeld(){
        return this.grabbedBy !== null;
    }
};