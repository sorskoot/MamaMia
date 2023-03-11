import {Component} from '@wonderlandengine/api';
import { Button } from '../../interactions/button';
import { PizzaComponent } from './pizza-component';
import { PizzaPoolComponent } from './pizza-pool-component';

export class PizzaSpawner extends Component {
    static TypeName = 'pizza-spawner';
    static Properties = {
        buttonObject: { type: WL.Type.Object },
        pizzaPoolObject: { type: WL.Type.Object },
    }
    
    /** @type {PizzaPoolComponent} */
    pizzaPool;

    /** @type {Button} */
    button;

    start() {
        if (!this.buttonObject) {
            console.warn("No button object set for pizza spawner");
        }
        this.button = this.buttonObject.getComponent(Button);
        
        if (!this.pizzaPoolObject) {
            console.warn("No pizza pool object set for pizza spawner");
        }

        this.pizzaPool = this.pizzaPoolObject.getComponent(PizzaPoolComponent);
        
        this.position = new Float32Array(3);
        this.object.getTranslationWorld(this.position);

        this.button.on('pressed', () => {
            let pizza = this.pizzaPool.spawn();
            if(pizza){
                pizza.parent = this.object;
                pizza.setTranslationWorld(this.position);
                setTimeout(() => {
                    pizza.getComponent(PizzaComponent).disableKinematic();                
                }, 25);
            }
        });
    }

};