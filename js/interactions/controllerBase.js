//import WL from '@wonderlandengine/api';
import { Component } from '@wonderlandengine/api';
import { ControllerButtonInfo } from './classes/controllerButtonInfo';
import { ControllerButtonType } from './classes/controllerButtonTypes';

const handedness = ['left', 'right']

/**
 * Base class for VR controllers. This class should be extended to create specific functionality.
 * 
 * There are a couple of methods that can be overridden to add functionality:
 * @method onSelect - called when the select button is pressed
 * @method onUnselect - called when the select button is released
 * @method onTrigger - called when the trigger is pressed
 * @method onUntrigger - called when the trigger is released
 * 
 * @extends Component 
 */
export class ControllerBase extends Component {
    static TypeName = 'controllerBase';

    static Properties = {
        handedness: { type: WL.Type.Enum, values: ['Left', 'Right'], default: 'Left' }
    }
    
    /**
     * @type {ControllerButtonInfo[]}
     */
    buttonInfo;

    constructor() {
        super();
        this.buttonInfo = [];
        this.buttonInfo[ControllerButtonType.TRIGGER] = new ControllerButtonInfo();
        this.buttonInfo[ControllerButtonType.GRIP] = new ControllerButtonInfo();
        this.buttonInfo[ControllerButtonType.JOYSTICK] = new ControllerButtonInfo();
        this.buttonInfo[ControllerButtonType.BUTTONYB] = new ControllerButtonInfo();
        this.buttonInfo[ControllerButtonType.BUTTONXA] = new ControllerButtonInfo();
    }

    start() {
        WL.onXRSessionStart.push(this._onXRSessionStart.bind(this));
    }

    update() {
        this.buttonInfo.forEach(button => button.setPrevious());

        if (this._triggerStart) {
            this.buttonInfo[ControllerButtonType.TRIGGER].pressed = true;
        }
        if(this._triggerEnd){
            this.buttonInfo[ControllerButtonType.TRIGGER].pressed = false;
        }
        if(this.buttonInfo[ControllerButtonType.TRIGGER].isPressed()){
            this.onTriggerPressed();
        };
        
        if(this.buttonInfo[ControllerButtonType.TRIGGER].isReleased()){
            this.onTriggerReleased();
        };

        if(this._gripStart){
            this.buttonInfo[ControllerButtonType.GRIP].pressed = true;
        }
        if(this._gripEnd){
            this.buttonInfo[ControllerButtonType.GRIP].pressed = false;
        }

        // Reset button states
        this._triggerStart = false;
        this._triggerEnd = false;
        this._gripStart = false;
        this._gripEnd = false;
    }

    /** @param {XRSession} session */
    _onXRSessionStart(session) {

        session.addEventListener('inputsourceschange', this._handleOnInputSourcesChange.bind(this));

        session.addEventListener('selectstart', this._handleSelectStart.bind(this));
        session.addEventListener('selectend', this._handleSelectEnd.bind(this));

        session.addEventListener('squeezestart', this._handleSqueezeStart.bind(this));
        session.addEventListener('squeezeend', this._handleSqueezeEnd.bind(this));
    }

    /** @param {XRInputSourceEvent} event */
    _handleSelectStart(event) {
        if (event.inputSource.handedness === handedness[this.handedness]) {
            this._triggerStart = true;
        }
    }

    /** @param {XRInputSourceEvent} event */
    _handleSelectEnd(event) {
        if (event.inputSource.handedness === handedness[this.handedness]) {
            this._triggerEnd = true;
        }
    }

    /** @param {XRInputSourceEvent} event */
    _handleSqueezeStart(event) {
        if (event.inputSource.handedness === handedness[this.handedness]) {
            this._gripStart = true;
        }
    }

    /** @param {XRInputSourceEvent} event */
    _handleSqueezeEnd(event) {
        if (event.inputSource.handedness === handedness[this.handedness]) {
            this._gripEnd = true;
        }
    }

    /**
     * Handles changes on the input sources 
     * @param {XRInputSourceChangeEvent} event eventparameters
     * */
    _handleOnInputSourcesChange(event) {
        event.removed.forEach(inputSource => {
            if (inputSource.handedness === handedness[this.handedness]) {
                this._handleInputSourceRemoved(inputSource);
            }
        });

        event.added.forEach(inputSource => {
            if (inputSource.handedness === handedness[this.handedness]) {
                this._handleInputSourceAdded(inputSource);
            }
        });
    }

    /**
     * Handles the removal of an input source. Removes it from the internal variable. 
     * @param {XRInputSource} inputSource */
    _handleInputSourceRemoved(inputSource) {
        this.currentInputSource = null;        
    }

    /**
     * Handles the addition of an input source. Adds it to the internal variable. 
     * @param {XRInputSource} inputSource */
    _handleInputSourceAdded(inputSource) {
        this.currentInputSource = inputSource;
    }

    // Overridable methods

    /** @param {XRInputSourceEvent} event */
    onTriggerPressed(event) { }

    /** @param {XRInputSourceEvent} event */
    onTriggerReleased(event) { }

};