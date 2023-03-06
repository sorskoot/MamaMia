/**
 * This is the entry point of your standalone application.
 *
 * You should register the component you need here, e.g,
 *
 * ```
 * import { MyComponent } from './my-component.js';
 *
 * WL.registerComponent(MyComponent);
 * ```
 */

/* Register all default components. */
import '@wonderlandengine/components';
import '@wonderlandengine/components/player-height';
import { GameManagementComponent } from './game/components/game-management-component';
import { PizzaComponent } from './game/components/pizza-component';
import { ToppingComponent } from './game/components/topping-component';
import { Button } from './interactions/button';

import { Grabbable } from './interactions/grabbable';
import { Grabber } from './interactions/grabber';
import { GrabPoint } from './interactions/grabPoint';
import { HandPoser } from './interactions/handPoser';
import { InteractableBase } from './interactions/interactableBase';
import { SnapZone } from './interactions/snapZone';
import { Test } from './test';

WL.registerComponent(Grabber);
WL.registerComponent(Grabbable);
WL.registerComponent(SnapZone);
WL.registerComponent(GrabPoint);
WL.registerComponent(Test);
WL.registerComponent(HandPoser);
WL.registerComponent(PizzaComponent);
WL.registerComponent(ToppingComponent);
WL.registerComponent(GameManagementComponent);
WL.registerComponent(InteractableBase);
WL.registerComponent(Button);
