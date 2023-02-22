import { quat2, vec3 } from "gl-matrix";
import { Object as Object3D  } from "@wonderlandengine/api";

 /**
  * Reparents an object to a new parent while keeping its world transform.
  * @param {Object3D} object
  * @param {Object3D} newParent
  */
export function reparentKeepTransform (object, newParent) {
    let newParentTransformWorld = [];
    quat2.identity(newParentTransformWorld);    

    if (newParent) {
        newParentTransformWorld = newParent.transformWorld;        
    }

    let localTransform = getLocalTransform(object.transformWorld, newParentTransformWorld);

    object.transformLocal.set(localTransform);
    object.parent = newParent;
    object.setDirty();
}

/**
 * Calculates the local transform of an object based on its world transform and the world transform of its parent.  
 * @param {quat2} transform 
 * @param {quat2} parentTransform 
 * @returns {quat2} local transform 
 */
export function getLocalTransform(transform, parentTransform) {
    let localTransform = [];

    quat2.conjugate(localTransform, parentTransform);
    quat2.mul(localTransform, localTransform, transform);

    return localTransform;
}

/**
 * Recursively searches the children of an object for a child with a specific name.
 * @param {Object3D} object Object to search a child of
 * @param {string} name Name of the child to search for
 * @returns {Object3D} the child.
 */
export function getChildByName(object, name) {
    for (let child of object.children) {        
        if (child.name === name) {
            return child;
        }
        if(object.children.length > 0) {
            let result = getChildByName(child, name);
            if(result) {
                return result;
            }
        }
    }
}