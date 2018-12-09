/**
 * Returns true if passed argument seems to be empty.
 * Primitives (excluding string) are always empty (even truthy).
 * Only empty strings are considered empty.
 * Objects are considered empty when doesn't have any enumerable & own property.
 * Arrays and array-like objects are considered empty when length value is 0.
 * Map, Set and -like objects are considered empty when size value is 0.
 *
 * @param {*} obj - source value
 * @example isEmpty({}) // true
 * @example isEmpty(100) // true
 * @example isEmpty([]) // true
 * @example isEmpty([1]) // false
 * @example isEmpty({ length: 5 }) // false
 * @example isEmpty({ length: 0 }) // true
 * @example isEmpty({ size: 0 }) // true
 * @returns {boolean} - is value considered empty
 */
const isEmpty = obj => {
    if (typeof obj === "string") {
        return !obj.length;
    }
    if (typeof obj !== "object" || obj === null) {
        return true;
    }
    if (Array.isArray(obj)) {
        return !Object.keys(obj).length;
    }
    if ("length" in obj) {
        return !obj.length;
    }
    if ("size" in obj) {
        return !obj.size;
    }
    return !Object.keys(obj).length;
};

export default isEmpty;
