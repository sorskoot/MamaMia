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

import { Grabbable } from './interactions/grabbable';
import { Grabber } from './interactions/grabber';
import { SnapZone } from './interactions/snapZone';
import { Test } from './test';

WL.registerComponent(Grabber);
WL.registerComponent(Grabbable);
WL.registerComponent(SnapZone);
WL.registerComponent(Test);
