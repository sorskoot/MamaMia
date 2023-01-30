export class ControllerButtonInfo{    
    constructor(){
        this.pressed = false;
        this.wasPressed = false;

        this.touched = false;
        this.wasTouched = false;

        this.value = 0;
        this.previousValue = 0;        
    }

    setPrevious(){
        this.wasPressed = this.pressed;
        this.wasTouched = this.touched;
        this.previousValue = this.value;
    }

    isPressed(){
        return this.pressed && !this.wasPressed;
    }
    isReleased(){
        return !this.pressed && this.wasPressed;
    }
    isTouched(){
        return this.touched !== this.wasTouched;
    }
    valueChanged(){
        return this.value !== this.previousValue;
    }
}