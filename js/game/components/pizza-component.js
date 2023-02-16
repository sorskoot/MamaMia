import {Component, MeshComponent} from '@wonderlandengine/api';
import { SnapZone } from '../../interactions/snapZone';
import { ToppingComponent } from './topping-component';

export class PizzaComponent extends Component {
    static TypeName = 'pizza-component';
    static Properties = {
        SnapZoneObject: {type: WL.Type.Object},
        PizzaCenterObject: {type: WL.Type.Object},
    }

    /** @type {SnapZone} Snapzone of the pizza to drop toppings in*/
    snapZone = null;

    /** @type {MeshComponent} */
    centerMesh = null;

    start() {
        if(!this.SnapZoneObject){
            console.error("No snapzone object set for PizzaComponent");
        }
        this.snapZone = this.SnapZoneObject.getComponent('snap-zone');        

        if(!this.PizzaCenterObject){
            console.error("No pizza center object set for PizzaComponent");
        }
        this.centerMesh = this.PizzaCenterObject.getComponent('mesh');
               
        this.snapZone.on('enteredSnapZone', (grabbable) => {            
            let topping = grabbable.object.getComponent('topping-component');
            if(topping && !topping.needsToBeDropped && grabbable.IsBeingHeld()){
                this.centerMesh.material = topping.ToppingUncooked;
            }
        });

        this.snapZone.on('snapped', (grabbable) => {            
            let topping = grabbable.object.getComponent('topping-component');
            if(topping && topping.needsToBeDropped){
                this.centerMesh.material = topping.ToppingUncooked;
                grabbable.object.destroy();
            }
        });
    }

    update(dt) {
    }

};