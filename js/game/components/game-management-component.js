import {Component} from '@wonderlandengine/api';
import { MamaMia } from '../game';

/**
 * Special class to get the Wonderland Engine to the main game state. 
 */
export class GameManagementComponent extends Component {
    static TypeName = 'game-management-component';    
    static Properties = {}

    init() {
        MamaMia.register(this.engine);
    }
};