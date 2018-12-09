const isObject = value => (typeof value === "object" || typeof value === "function") && value !== null;

/**
 * Updates the value at given path of given object. It mutates the object. If path is not found then objects are created
 * "on the way". If non-objects are found, they are replaced with new plain objects. If primitives are used as source
 * they are ignored and returned value is empty object with updated value at given path.
 *
 * @param {Object} source - source object to mutate
 * @param {string|Array<string>} path - path where value should be stored, written as dot-separated property names or
 * array with property names. Use Array when your keys includes dots.
 * @param {*} value - value to be set
 * @example set(object, "deep.property", value)
 * @example set(object, ["deep", "property"], value)
 * @example set({}, "deep[0].property", value)
 * // will create this structure:
 * { "deep[0]": { "property": value }}
 * @example set({}, "items.0", value)
 * // will create object, not array
 * { "items": { "0": value }}
 * @return {Object} - given object or new object if source was primitive
 */
const set = (source, path, value) => {
    const pathParts = typeof path === "string" ? path.split(".") : path;
    const len = pathParts.length;

    const result = isObject(source) ? source : {};
    let current = result;
    for (let i = 0; i < len; i++) {
        const isLast = i === len - 1;
        const key = pathParts[i];
        if (isLast) {
            current[key] = value;
            return result;
        }
        if (!isObject(current[key])) {
            current[key] = {};
        }
        current = current[key];
    }
    return result;
};

module.exports = set;
