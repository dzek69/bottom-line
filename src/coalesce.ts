/**
 * Returns first non-nil (not undefined, not null) value from given arguments.
 *
 * @param {...*} args - values
 * @example coalesce(null, undefined, void 1, 5); // returns 5 (mind the `void`)
 * @example coalesce(0, null, 6, undefined); // returns 0
 * @example coalesce(undefined); // returns null
 * @example coalesce(); // returns null
 * @returns {*|null} first non-nil value or null
 */
const coalesce = <T>(...args: T[]): NonNullable<T> | null => {
    for (let i = 0; i < args.length; i++) {
        const item = args[i];
        if (item != null) {
            return item;
        }
    }
    return null;
};

export { coalesce };
