import get from "./get.mjs";

const DEFAULT = {};
/**
 * Returns first found value at given list of paths of given object. Will return and stop at undefined if found. If
 * nothing is found then default value (required to pass) will be returned.
 *
 * @param {Object} source - source object to search in
 * @param {*} defaultValue - default value to return if nothing is found
 * @param {...string|Array.<string>} paths - paths defined as dot-separated properties names or array of properties name
 * @see {@link get} - for base usage example with single path only
 * @example getMultiple(obj, 5, "details.error.message", ["error", "message"], "errorMessage")
 * // will look for obj.details.error.message - if path does not exist
 * // will look for obj.error.message - if not defined
 * // will look for obj.errorMessage - if not defined
 * // will return 5
 * @returns {*} - found value or default value
 */
const getMultiple = (source, defaultValue, ...paths) => {
    const length = paths.length;
    for (let i = 0; i < length; i++) {
        const properties = paths[i];
        const result = get(source, properties, DEFAULT);
        if (result !== DEFAULT) {
            return result;
        }
    }
    return defaultValue;
};

export default getMultiple;
