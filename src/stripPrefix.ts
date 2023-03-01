/**
 * Strip a prefix from a string.
 * @param {string} from - string to strip prefix from
 * @param {string} prefix - prefix to strip
 */
const stripPrefix = (from: string, prefix: string): string => {
    if (from.startsWith(prefix)) {
        return from.slice(prefix.length);
    }
    return from;
};

export {
    stripPrefix,
};
