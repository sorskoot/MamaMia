import { quat2, vec3 } from "gl-matrix";
import { Object as WLObject  } from "@wonderlandengine/api";

 /**
 * @param {WLObject} object
 * @param {WLObject} newParent
 */
export function reparentKeepTransform (object, newParent) {
    let newParentTransformWorld = [];
    quat2.identity(newParentTransformWorld);
    let newParentScalingWorld = [1, 1, 1];

    if (newParent) {
        newParentTransformWorld = newParent.transformWorld;
        newParentScalingWorld = newParent.scalingWorld;
    }

    let localTransform = getLocalTransform(object.transformWorld, newParentTransformWorld);

    object.transformLocal.set(localTransform);

    let newScale = new Float32Array(3);
    vec3.divide(newScale, object.scalingLocal, newParentScalingWorld);
    object.resetScaling();
    object.scale(newScale);

    object.parent = newParent;

    object.setDirty();
}

export function getLocalTransform(transform, parentTransform) {
    let localTransform = [];

    quat2.conjugate(localTransform, parentTransform);
    quat2.mul(localTransform, localTransform, transform);

    return localTransform;
}