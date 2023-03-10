import {Component, Object as Object3D} from '@wonderlandengine/api';
import { PizzaComponent } from './pizza-component';

export class PizzaPoolComponent extends Component {
    static TypeName = 'pizza-pool-component';
    static Properties = {
    }
   
    /**
     * This is the array of pizzas that are available to be spawned.
     * @type {Object3D[]>} 
     */
    pizzasInPool = [];

    /**
     * This is the array of pizzas that are currently in use.
     * @type {Object3D[]>} 
     */
    pizzasOutPool = [];

    /**
     * Wonderland method triggered when the component is started by the runtime, or activated.
     */
    start() {
        this.pizzasInPool.push(... this.object.children);
        let pizzaComponent = this.object.children[0].getComponent(PizzaComponent);
        
        // move completely out of sight
        this.object.setTranslationWorld([0,-10000,0])
    }

    /**
     * Resets all the pizzas back into pool.
     */
    reset(){

    }

    /**
     * Spawns a pizza from the pool.
     * @returns {Object3D} The pizza that was spawned.
     */
    spawn(){
        let pizza = this.pizzasInPool.pop();
        if(pizza){            
            this.pizzasOutPool.push(pizza);
            pizza.resetTranslationRotation();            
            return pizza;
        }
    }

     /** 
      * Return object to pool
      * @param {Object3D} pizza - The pizza to return to the pool.
      */
     despawn(pizza) {
        let idx = this.pizzasOutPool.indexOf(pizza);
        if(idx === -1){
            // pizza is not found, so we can't despawn it
            return;
        }
        this.pizzasOutPool.splice(idx, 1);
        this.pizzasInPool.push(pizza);
        pizza.resetTranslationRotation();
        let pizzaComponent = pizza.getComponent(PizzaComponent);
        pizzaComponent.reset();
    }
};