import {Component} from '@wonderlandengine/api';

export class ToppingComponent extends Component {
    static TypeName = 'topping-component';
    static Properties = {
        ToppingUncooked: {type: WL.Type.Material},
        needsToBeDropped: {type: WL.Type.Bool, default: true},
    }

    init() {
    }

    start() {
    }

    update(dt) {
    }

};