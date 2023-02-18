import {Component} from '@wonderlandengine/api';

export class ToppingComponent extends Component {
    static TypeName = 'topping-component';
    static Properties = {
        ToppingUncooked: {type: WL.Type.String, default: ''},
        needsToBeDropped: {type: WL.Type.Bool, default: true},
    }
    start() {
        let image = new Image();
        image.src = this.ToppingUncooked; 
        image.onload = () =>  this.toppingImage = image;  
    }

    update(dt) {
    }

};