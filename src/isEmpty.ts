interface ObjectWithLength {
    length: number;
}

interface ObjectWithSize {
    size: number;
}

/**
 * Returns true if passed argument seems to be empty.
 * Nil values are empty.
 * Strings are considered empty when length is 0.
 * Other primitives will throw an error.
 * Objects are considered empty when doesn't have any enumerable & own property.
 * Arrays and array-like objects are considered empty when length value is 0.
 * Map, Set and -like objects are considered empty when size value is 0.
 *
 * @param {*} obj - source value
 * @example isEmpty({}) // true
 * @example isEmpty(100) // throws
 * @example isEmpty([]) // true
 * @example isEmpty([1]) // false
 * @example isEmpty({ length: 5 }) // false
 * @example isEmpty({ length: 0 }) // true
 * @example isEmpty({ size: 0 }) // true
 * @returns {boolean} - is value considered empty
 */
const isEmpty = (obj: unknown) => {
    if (typeof obj === "string") {
        return !obj.length;
    }
    if (obj == null) {
        return true;
    }
    if (typeof obj !== "object") {
        throw new TypeError("isEmpty cannot be used on primitives");
    }
    if (Array.isArray(obj)) {
        return !Object.keys(obj).length;
    }
    if ("length" in obj) {
        return !(obj as ObjectWithLength).length;
    }
    if ("size" in obj) {
        return !(obj as ObjectWithSize).size;
    }
    return !Object.keys(obj).length;
};

export { isEmpty };
