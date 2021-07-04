/**
 * Gets last element of an array.
 *
 * @param {Array} array - source array
 * @example last([1, 2]) // 2
 * @example last([1]) // 1
 * @example last([]) // undefined
 * @returns {*} - last element of an array or undefined
 */
const last = <T>(array: T[]): T | undefined => array[array.length - 1];

export { last };
