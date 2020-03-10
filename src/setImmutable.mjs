const isObject = value => (typeof value === "object" || typeof value === "function") && value !== null;

const clone = value => {
    if (Array.isArray(value)) {
        return [...value];
    }
    return { ...value };
};

const hasOnlyValidPathParts = (array) => {
    if (!array.length) {
        return false;
    }
    return array.every(item => {
        const type = typeof item;
        return (type === "string" && item !== "") || type === "number";
    });
};

const getPathParts = (path) => {
    if (typeof path === "number") {
        return [String(path)];
    }
    if (typeof path === "string") {
        return path.split(".");
    }
    if (Array.isArray(path)) {
        return path;
    }
    throw new TypeError("Path must be a string, a number or an array of strings and numbers");
};

/**
 * Updates the value at given path of given object. It does not mutate the object but returns a new one. If path is not
 * found then objects are created "on the way". If non-objects are found, they are replaced with new plain objects. If
 * primitives are used as source they are ignored and returned value is empty object with updated value at given path.
 *
 * @param {Object} source - source object to mutate
 * @param {string|number|Array<string|number>} path - path where value should be stored, written as dot-separated
 * property names or array with property names. Use Array when your keys includes dots.
 * @param {*} value - value to be set
 * @example set(object, "deep.property", value)
 * @example set(object, ["deep", "property"], value)
 * @example set({}, "deep[0].property", value)
 * // will create this structure:
 * { "deep[0]": { "property": value }}
 * @example set({}, "items.0", value)
 * // will create object, not array
 * { "items": { "0": value }}
 * @returns {Object} - given object or new object if source was primitive
 */
const set = (source, path, value) => { // eslint-disable-line max-statements
    const pathParts = getPathParts(path);
    const isValidPath = hasOnlyValidPathParts(pathParts);
    if (!isValidPath) {
        throw new TypeError("Path must not be empty or contain empty parts");
    }
    const len = pathParts.length;

    const result = isObject(source) ? clone(source) : {};
    let current = result;
    for (let i = 0; i < len; i++) {
        const isLast = i === len - 1;
        const key = pathParts[i];
        if (isLast) {
            current[key] = value;
            return result;
        }
        if (!isObject(current[key])) { // @todo probaly can be removed
            current[key] = {};
        }
        else {
            current[key] = clone(current[key]);
        }
        current = current[key];
    }
    return result;
};

export default set;
