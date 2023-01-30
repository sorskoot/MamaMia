import {Component} from '@wonderlandengine/api';
import { SnapZone } from './interactions/snapZone';

export class Test extends Component {
    static TypeName = 'test';
    static Properties = {
        targetSnapZone: {type: WL.Type.Object},
        material: {type: WL.Type.Material},
        material2: {type: WL.Type.Material},
        material3: {type: WL.Type.Material}
    }

    init() {
    }

    start() {
        /** @type {SnapZone} */
        this.SnapZone = this.targetSnapZone.getComponent('snap-zone');
        this.SnapZone.on('snapped',  () =>  this.mesh.material = this.material3);
        this.SnapZone.on('enteredSnapZone', () =>  this.mesh.material = this.material);
        this.SnapZone.on('leftSnapZone', () =>  this.mesh.material = this.material2);
        this.mesh = this.object.getComponent('mesh')
    }

    

    update(dt) {
    }

};