import { samples } from "./samples.js";

/**
 * Shuffles an array, returning a new array.
 * @param array source array
 */
const shuffle = <T>(array: T[]): T[] => {
    return samples(array, array.length, true);
};

export {
    shuffle,
};
