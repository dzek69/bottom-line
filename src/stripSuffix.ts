/**
 * Strip a suffix from a string.
 *
 * @param {string} from - string to strip suffix from
 * @param {string} suffix - suffix to strip
 */
const stripSuffix = (from: string, suffix: string): string => {
    if (from.endsWith(suffix)) {
        return from.slice(0, -suffix.length);
    }
    return from;
};

export {
    stripSuffix,
};
