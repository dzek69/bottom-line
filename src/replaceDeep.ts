/**
 * Replaces all occurrences of `search` with `value` in `source` object/array. Comparison is done with `Object.is`.
 * If `source` is exactly the `search` a `value` will be returned. It does not do a substring replacements.
 *
 * It mutates the `source` object/array!
 *
 * TypeScript users: This is way too dynamic to type properly, therefore, typing assumes the most basic form of
 * replacement where search and value are of the same type. If that's not the case for you - you'll have to typecast.
 *
 * @param source - source object/array/value
 * @param search - value to search for
 * @param value - value to replace with
 */
const replaceDeep = <T>(source: T, search: unknown, value: unknown): T => {
    if (Object.is(source, search)) {
        return value as T;
    }

    if (source == null) {
        return source;
    }

    if (typeof source === "object") {
        if (Array.isArray(source)) {
            for (let i = 0; i < source.length; i++) {
                // eslint-disable-next-line no-param-reassign,@typescript-eslint/no-unsafe-assignment
                source[i] = replaceDeep(source[i], search, value);
            }
            return source;
        }

        return Object.keys(source).reduce<Record<string, unknown>>((acc, key) => {
            // eslint-disable-next-line no-param-reassign
            acc[key] = replaceDeep((source as Record<string, unknown>)[key], search, value);
            return acc;
        }, {}) as T;
    }

    return source;
};

export {
    replaceDeep,
};
