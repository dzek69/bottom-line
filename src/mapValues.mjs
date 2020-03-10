/**
 * Should return new value basing on property name and value. Optionally may return exported REMOVE object to filter out
 * property from the object.
 *
 * @callback mapValuesFn
 * @param {*} value - property value
 * @param {string} key - property name
 * @example function fn(value, key) { return value * 5; } // all properties will be multiplied
 * @example function fn(value, key) {
 *   if (key === "name") {
 *     return REMOVE;
 *   }
 *   return value.toUpperCase();
 * }
 * // will upper case all properties and filter out `name` property
 * @returns {*}
 */

/**
 * Value that denotes that property should be removed
 *
 * @type {Object}
 */
const REMOVE = {};

/**
 * Iterates through object properties returning object with same properties but modified values. Optionally some
 * properties may be filtered out on returned object.
 *
 * @param {Object|Array} source - source object
 * @param {mapValuesFn} fn - map function callback that will return new value of a property
 * @example mapValues({ a: 1, b: 2 }, x => x * 2) // will return { a: 1, b: 4 }
 * @example mapValues({ a: 1, b: 2 }, () => REMOVE) // will return {}
 * @returns {Object|Array}
 */
const mapValues = (source, fn) => {
    const keys = Object.keys(source);

    return keys.reduce((result, key) => {
        const value = fn(source[key], key);
        if (value !== REMOVE) {
            result[key] = value; // eslint-disable-line no-param-reassign
        }
        return result;
    }, Array.isArray(source) ? [] : {});
};

export default mapValues;
export {
    REMOVE,
};

