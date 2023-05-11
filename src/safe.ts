function safe<T>(fn: () => T): T | undefined;
function safe<T, Y>(fn: () => T, def: Y): T | Y;

/* eslint-disable max-len */
/**
 * Safely execute a function, return its return value or default value if the function throws.
 * @param fn - function to run
 * @param def - default value
 *
 * @example
 * safe(() => JSON.parse(unknownString), null); // if unknownString is not a valid JSON, null will be returned
 * safe(() => trySomethingComplicated(), defaultValue); // if trySomethingComplicated throws, defaultValue will be returned
 */
function safe<T, Y>(fn: () => T, def?: Y) { // eslint-disable-line func-style
    /* eslint-enable max-len */
    try {
        return fn();
    }
    catch {
        return def;
    }
}

export { safe };
