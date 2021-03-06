interface Source { [key: string]: unknown }

const isObject = (value: unknown) => (typeof value === "object" || typeof value === "function") && value !== null;

const clone = (value: unknown[] | Source) => {
    if (Array.isArray(value)) {
        return [...value];
    }
    return { ...value };
};

const hasOnlyValidPathParts = (array: unknown[]) => {
    if (!array.length) {
        return false;
    }
    return array.every(item => {
        const type = typeof item;
        return (type === "string" && item !== "") || type === "number";
    });
};

type Path = number | string | (number | string)[];
const getPathParts = (path: Path) => {
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
const setImmutable = (source: Source, path: Path, value: unknown): Source | unknown => { // eslint-disable-line max-statements, max-len
    const pathParts = getPathParts(path);
    const isValidPath = hasOnlyValidPathParts(pathParts);
    if (!isValidPath) {
        throw new TypeError("Path must not be empty or contain empty parts");
    }
    const len = pathParts.length;

    const result = isObject(source) ? clone(source) : {};
    let current: Source | unknown = result;
    for (let i = 0; i < len; i++) {
        const isLast = i === len - 1;
        const key = pathParts[i];
        if (isLast) {
            (current as Source)[key] = value;
            return result;
        }
        if (!isObject((current as Source)[key])) { // @todo probably can be removed
            (current as Source)[key] = {};
        }
        else {
            (current as Source)[key] = clone((current as Source)[key] as Source | unknown[]);
        }
        current = (current as Source)[key];
    }
    return result;
};

export { setImmutable };
