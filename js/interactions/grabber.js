import { CollisionComponent } from '@wonderlandengine/api';
import { ControllerBase } from './controllerBase';
import { Grabbable } from './grabbable';

export class Grabber extends ControllerBase {
    static TypeName = 'grabber';
    static Properties = Object.assign({}, ControllerBase.Properties,{
        collisionObject: {type: WL.Type.Object}
    });

    /** @type {CollisionComponent} collision component for the hand */
    _collision = null;

    // equipGrabbableOnStart //Equip the grabbable on start
    
    /** @type {Grabbable} The grabbable that is currently held */
    currentlyHeld = null;

    constructor() {
        super();
    }
    
    start(){        
        if(!this.collisionObject){
            console.error('Grabber: collision is missing');
        }
        this._collision = this.collisionObject.getComponent('collision');
        if(!this._collision){
            console.error('Grabber: collision component is missing');
        }
        super.start();
    };

    onTriggerPressed(event) {                
        let collisions = this._collision.queryOverlaps();
        if(collisions.length > 0){            
            //todo: check if there's anyting in the collisions list that is grabbable
            let grabbable = collisions[0].object.getComponent('grabbable');
            if(grabbable){
                grabbable.grab(this);
                this.currentlyHeld = grabbable;
            }
        }
    }

    onTriggerReleased(event) {        
        if(this.currentlyHeld){            
            this.currentlyHeld.drop(this);
            this.currentlyHeld = null;
        }
    }
};