import { CollisionComponent } from '@wonderlandengine/api';
import { ControllerBase } from './controllerBase';
import { Grabbable } from './grabbable';

export class Grabber extends ControllerBase {
    static TypeName = 'grabber';
    static Properties = Object.assign({}, ControllerBase.Properties,{
        handMeshObject: {type: WL.Type.Object, default:null},
        hideHandOnGrab: {type: WL.Type.Bool, default: true},
        handPoserObject: {type: WL.Type.Object, default:null},
        collisionObject: {type: WL.Type.Object},
        //- only on certain layers
        //- grab with trigger or grip

        hapticsOnPickup: {type: WL.Type.Bool, default: false},
        hapticsIntensity: {type: WL.Type.Float, default: 1.0},        
        hapticsDuration: {type: WL.Type.Float, default: 0.1}
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
        this.handPoser = this.handPoserObject.getComponent('hand-poser');
        super.start();
    };

    onTriggerPressed(event) {      
        if(this.handPoser)this.handPoser.setPose('grab');          
        let collisions = this._collision.queryOverlaps();
        if(collisions.length > 0){            
            //todo: check if there's anyting in the collisions list that is grabbable
            let grabbable = collisions[0].object.getComponent('grabbable');
            if(grabbable){
                if(this.hapticsOnPickup){
                    this.pulse();
                }
                grabbable.grab(this);
                this.currentlyHeld = grabbable;
            }
        }
    }

    onTriggerReleased(event) {     
        if(this.handPoser)this.handPoser.resetPose();             
        if(this.currentlyHeld){            
            this.currentlyHeld.drop(this);
            this.currentlyHeld = null;
        }
    }

    pulse() {        
        if (!this.currentInputSource || !this.currentInputSource.gamepad || !this.currentInputSource.gamepad.hapticActuators) { return; }
        let gamepad = this.currentInputSource.gamepad;
        let actuator = gamepad.hapticActuators[0];
        if (!actuator) return;
        actuator.pulse(this.hapticsIntensity, this.hapticsDuration * 1000);
    }

    reset(){
        this.currentlyHeld = null;
        if(this.handPoser)this.handPoser.resetPose();
    }
};