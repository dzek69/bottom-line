/**
 * Removes values from array using function as predicate. Returns removed values.
 *
 * @param {Array} array
 * @param {function} fn
 * @returns {Array}
 */
const remove = <T>(array: T[], fn: (elem: T, num: number, list: T[]) => boolean): T[] => {
    const len = array.length;

    const idsToRemove = []; // not removing instantly to feed `fn` untouched array for each iteration, lodash does that
    const removedValues = [];

    for (let counter = 0; counter < len; counter++) {
        if (fn(array[counter]!, counter, array)) {
            idsToRemove.push(counter - idsToRemove.length);
            removedValues.push(array[counter]!);
        }
    }

    idsToRemove.forEach(id => array.splice(id, 1));

    return removedValues;
};

export { remove };
