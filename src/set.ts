/**
 * Source object to mutate.
 *
 * @see {@link set}.
 */
interface Source { [key: string]: unknown }

const isObject = (value: unknown) => (typeof value === "object" || typeof value === "function") && value !== null;

/**
 * Updates the value at given path of given object. It mutates the object. If path is not found then objects are created
 * "on the way". If non-objects are found, they are replaced with new plain objects. If primitives are used as source
 * they are ignored and returned value is empty object with updated value at given path.
 *
 * This is still too dynamic in nature to get full TypeScript support. Properties are not typed, return type is unknown.
 * If you are okay with NOT mutating the object but get new one instead it is recommended to use `immutable-assign`
 * package instead.
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
 * @returns {Object} - given object or new object if source was primitive
 */
const set = (source: Source, path: string | string[], value: unknown): Source | unknown => { // eslint-disable-line @typescript-eslint/no-redundant-type-constituents,max-len
    const pathParts = typeof path === "string" ? path.split(".") : path;
    const len = pathParts.length;

    const result = isObject(source) ? source : {};
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    let current: Source | unknown = result;
    for (let i = 0; i < len; i++) {
        const isLast = i === len - 1;
        const key = pathParts[i]!;
        if (isLast) {
            (current as Source)[key] = value;
            return result;
        }
        if (!isObject((current as Source)[key])) {
            (current as Source)[key] = {};
        }
        current = (current as Source)[key];
    }
    return result;
};

export { set };

export type {
    Source as SetSource,
};
