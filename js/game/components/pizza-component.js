import {Component, MeshComponent, Texture} from '@wonderlandengine/api';
import { SnapZone } from '../../interactions/snapZone';
import { MamaMia } from '../game';
import { ToppingComponent } from './topping-component';

export class PizzaComponent extends Component {
    static TypeName = 'pizza-component';
    static Properties = {
        SnapZoneObject: {type: WL.Type.Object},
        PizzaCenterObject: {type: WL.Type.Object},
        PizzaToppingURL: {type: WL.Type.String},
        
    }

    /** @type {SnapZone} Snapzone of the pizza to drop toppings in*/
    snapZone = null;

    /** @type {MeshComponent} */
    centerMesh = null;

    /** @type {HTMLImageElement[]} */
    layers = [];

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
                this.updateTextures(topping.toppingImage);
            }
        });

        this.snapZone.on('snapped', (grabbable) => {            
            let topping = grabbable.object.getComponent('topping-component');
            if(topping && topping.needsToBeDropped){
                this.updateTextures(topping.toppingImage);
                grabbable.reset();
                this.snapZone.reset();
            }
        });

        this.toppingMaterial = this.centerMesh.material.clone();        
        let image = new Image();
        image.src = this.PizzaToppingURL;
        image.width = 512;
        image.height = 512;
        image.onload = () => {          
            this.canvas = document.createElement("canvas");       
            this.canvas.width = 512;
            this.canvas.height = 512;
            this.ctx = this.canvas.getContext("2d");
            this.ctx.drawImage(image, 0, 0);
            this.toppingTexture = new WL.Texture(this.canvas);                                 
            this.toppingMaterial.diffuseTexture = this.toppingTexture;
            this.centerMesh.material = this.toppingMaterial;  
            this.updateTextures(image);                   
        };             
    }

    /**
     * @type {HTMLImageElement} toppingImage
     */
    updateTextures(toppingImage){
        this.layers.push(toppingImage);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);        
        for (let i = 0; i < this.layers.length; i++) {     
            this.ctx.drawImage(this.layers[i], 0, 0);
        }                
        //this.toppingTexture = new WL.Texture(this.canvas);   
        this.toppingTexture.update(); 
        // this.toppingMaterial.diffuseTexture = this.toppingTexture;
        // this.toppingMaterial.diffuseTexture.update();        
    }

    update(dt) {
    }

};