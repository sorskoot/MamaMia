import {Component} from '@wonderlandengine/api';

export class GrabPoint extends Component {
    static TypeName = 'grab-point';
    static Properties = {
        canGrabWithLeft: {type: WL.Type.Bool, default: true},
        canGrabWithRight: {type: WL.Type.Bool, default: true},
        handPose: {type: WL.Type.String, default: 'grab'}
    }
};