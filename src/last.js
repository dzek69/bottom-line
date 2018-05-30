/**
 * Gets last element of an array. Will crash on non-array like values.
 *
 * @param {Array} array - source array
 * @example last([1, 2]) // 2
 * @example last([1]) // 1
 * @example last([]) // undefined
 * @returns {*} - last element of an array or undefined
 */
const last = array => array[array.length - 1];

module.exports = last;
