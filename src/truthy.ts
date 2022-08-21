/**
 * Returns true if value is truthy, useful with `Array.prototype.filter` and TypeScript (`[].filter(Boolean)` won't
 * filter out falsy values from the types)
 * @param {*} val - test value
 * @returns {boolean} - is value truthy
 */
const truthy = <T>(val: T | null | undefined | "" | false | 0): val is T => {
    return Boolean(val);
};

export {
    truthy,
};
