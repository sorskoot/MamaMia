import { Component, registerComponent } from '@wonderlandengine/api';
import { reparentKeepTransform } from '../helper';
import { Grabbable } from './grabbable';

export class SnapZone extends Component {
    static TypeName = 'snap-zone';
    static Properties = {
        snapCollisionObject: { type: WL.Type.Object },
        snapTargetObject: { type: WL.Type.Object }
    }

    start() {
        if (!this.snapCollisionObject) {
            console.error('SnapZone: collision is missing');
        }
        this._snapCollision = this.snapCollisionObject.getComponent('collision');
        if (!this._snapCollision) {
            console.error('SnapZone: collision component is missing');
        }

        if (!this.snapTargetObject) {
            this.snapTarget = this.object;
        } else {
            this.snapTarget = this.snapTargetObject;
        }
    }

    update(dt) {

        if (this.heldObject) {
            if (this.heldObject.IsBeingHeld()) {
                this.heldObject = null;
            }
        } else {

            let collisions = this._snapCollision.queryOverlaps();
            if (collisions.length > 0) {
                /** @type {Grabbable} */
                let grabbable = collisions[0].object.getComponent('grabbable');
                if (grabbable && !grabbable.IsBeingHeld()) {
                    console.log('Enter Target');
                    this.heldObject = grabbable;
                    grabbable.object.parent = this.object.parent;
                    grabbable.object.resetTranslationRotation();
                    let x = []                 
                    this.snapTarget.getTranslationWorld(x);
                    grabbable.object.setTranslationWorld(x);
                    
                }
            }
        }
    }

};