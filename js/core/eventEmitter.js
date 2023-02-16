import { Component } from "@wonderlandengine/api";

export class EventEmitterComponent extends Component {
    constructor(){
        super();

        /** @type {Map<string, Function[]>} */
        this._listeners = new Map();
    }

    /**
     * Checks if the listener has the function already registered
     * @param {string} eventName 
     * @param {Function[]} listeners
     */
    _hasListener(eventName, listener){
        let listeners = this._listeners.get(eventName);
        if(listeners){
            return listeners.includes(listener);
        }
        return false;
    }

    /**
     * Adds the listener to the event
     * @param {string} eventName 
     * @param {Function} listener
     */
    on(eventName, listener){       
        if(this._hasListener(eventName, listener)){
            console.warn(`EventEmitterComponent: listener already registered for event ${eventName}`)
            return;
        }
        let listeners = this._listeners.get(eventName);
        (listeners = listeners || []).push(listener);
        this._listeners.set(eventName, listeners);
    }


    // For now it is not possible to remove listeners until I figure out how to do it properly
    // /**
    //  * Removes the listener from the event
    //  * @param {string} eventName 
    //  * @param {Function} listener
    //  */
    // removeListener(eventName, listener){        
    //     if(!this._hasListener(eventName, listener)){
    //         console.warn(`EventEmitterComponent: Can't remove listener, it's not registered for event ${eventName}`)
    //         return;
    //     }
    //     let listeners = this._listeners.get(eventName);
    //     let index = listeners.indexOf(listener);
    //     listeners.splice(index, 1);
    // }

    /**
     * Emits the event
     * @param {string} eventName
     * @param {...any} args
     */
    emit(eventName,...args){
        if(!this._listeners.has(eventName)){
            //console.warn(`EventEmitterComponent: Can't emit, no listeners registered for event ${eventName}`)
            return;
        }                    
        const functions = this._listeners.get(eventName);
        functions.forEach(listener => listener(...args));        
    }
}