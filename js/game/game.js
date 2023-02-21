import { onXRSessionEnd, onXRSessionStart } from "@wonderlandengine/api";
import { Subject } from "rxjs";

const GameState = Object.freeze({
    "INIT": 0,
    "TITLE": 1,
    "PLAYING": 2,
    "GAMEOVER": 3,
    "PAUSED": 4    
});

class Game
{   
    /** @type {Subject<bool>} observable containing if the game is running in VR or not*/ 
    isInVRSubject;
    
    /** @type {Subject<GameState>} observable containing the gamestate*/ 
    gameStateSubject;

    constructor()
    {
        this.isInVRSubject = new Subject();      
        this.gameStateSubject = new Subject();

        onXRSessionStart.push(()=>this.#setIsInVR(true));
        onXRSessionEnd.push(()=>this.#setIsInVR(false));
    }

    #isInVR = false;
    #setIsInVR(value) {
        this.#isInVR = value;
        this.isInVRSubject.next(value);
    }
    
    #gameState = GameState.INIT;
    #setGameState(value) {
        this.#gameState = value;
        this.gameStateSubject.next(value);
    }    
}

export const MamaMia = new Game();