/**
 * Sorts the properties of an object alphabetically, ascending or descending.
 * REMEMBER: In theory JS engines do not guarantee the order of object properties. In practice most popular engines do.
 * @param object - source object
 * @param asc - sort ascending?
 * @example sortProps({ b: 2, a: 1, z: 26 }) // { a: 1, b: 2, z: 26 }
 */
const sortProps = <T extends Record<string, unknown>>(object: T, asc = true): T => {
    const sorted: Record<string, unknown> = {};
    const keys = Object.keys(object);
    if (asc) { keys.sort(); }
    else { keys.sort().reverse(); }
    for (const key of keys) {
        sorted[key] = object[key];
    }
    return sorted as T;
};

export {
    sortProps,
};
