/**
 * Picks a random element from an array.
 * @param array - source array
 */
const sample = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)]!;
};

export {
    sample,
};
