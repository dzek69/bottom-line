/**
 * Inserts given separator between all array elements
 *
 * @param {Array} source - source array to put new elements between
 * @param {*} separator - separator to inset
 * @returns {Array} - new array with separator items added or same array if there isn't enough items to put separator
 */
const insertSeparator = (source, separator) => {
    if (!Array.isArray(source)) {
        throw new TypeError("Source must be an array");
    }
    if (source.length <= 1) {
        return source;
    }
    const result = [...source];
    for (let i = result.length - 1; i > 0; i--) {
        result.splice(i, 0, separator);
    }
    return result;
};

export default insertSeparator;
