import { vec3 } from "gl-matrix";

/**
 * Calculates the angle between two vectors in degrees.
 * @param {vec3} a 
 * @param {vec3} b 
 * @returns {vec3} angle in degrees per axis
 */
export function angleBetween(a, b) {

    // Project the vectors onto the x-axis by setting their y and z components to zero
    var aX = vec3.fromValues(a[0], 0, 0);
    var bX = vec3.fromValues(b[0], 0, 0);
    var angleX = vec3.angle(aX, bX);
    var angleXInDegrees = angleX * 180 / Math.PI;

    // Project the vectors onto the y-axis by setting their x and z components to zero
    var aY = vec3.fromValues(0, a[1], 0);
    var bY = vec3.fromValues(0, b[1], 0);
    var angleY = vec3.angle(aY, bY);
    var angleYInDegrees = angleY * 180 / Math.PI;

    // Project the vectors onto the z-axis by setting their x and y components to zero
    var aZ = vec3.fromValues(0, 0, a[2]);
    var bZ = vec3.fromValues(0, 0, b[2]);
    var angleZ = vec3.angle(aZ, bZ);
    var angleZInDegrees = angleZ * 180 / Math.PI;

    return vec3.fromValues(angleXInDegrees, angleYInDegrees, angleZInDegrees);
}