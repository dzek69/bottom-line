/**
 * Wraps value in an array until the value is already an array
 * @param {*} value - value to be wrapped
 * @returns {Array}
 */
const ensureArray = <T>(value: T | T[]): T[] => {
    if (Array.isArray(value)) {
        return value;
    }
    return [value];
};

export { ensureArray };
