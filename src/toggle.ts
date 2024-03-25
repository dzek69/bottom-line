/**
 * Toggles an item in an array. If it exists, remove it. If it doesn't exist, add it.
 * If the array contains the given value more than once, this function will remove only one occurrence.
 *
 * @param array - source array
 * @param item - item to toggle
 */
const toggle = <T>(array: T[], item: T): T[] => {
    const index = array.findIndex((i) => Object.is(i, item));
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (index === -1) {
        array.push(item);
    }
    else {
        array.splice(index, 1);
    }
    return array;
};

export {
    toggle,
};
