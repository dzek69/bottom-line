/**
 * Modifies the array, removing specified value
 * @param array
 * @param valuesToPull
 */
const pull = <T>(array: T[], ...valuesToPull: T[]): T[] => {
    const len = array.length;
    for (let i = len - 1; i >= 0; i--) {
        if (valuesToPull.includes(array[i])) {
            array.splice(i, 1);
        }
    }
    return array;
};

export {
    pull,
};
