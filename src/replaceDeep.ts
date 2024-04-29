import { replaceDeepByFn } from "./replaceDeepByFn.js";

type Options = {
    /**
     * If true, the source objects and arrays will be mutated. Default is false.
     */
    mutate?: boolean;
    /**
     * If true, the function will go into instances for replacement. Otherwise, it will only replace properties of plain
     * objects. Default is false.
     * Warning: This option requires `mutate` to be enabled, because we can't clone instances.
     */
    replaceInstancesProps?: boolean;
};

/**
 * Replaces all occurrences of `search` with `value` in `source` object/array. Comparison is done with `Object.is`.
 * If `source` is exactly the `search` a `value` will be returned. It does not do a substring replacements.
 *
 * Warnings:
 * - By default, it does not mutate the `source`/deep objects/arrays, but it can be enabled with `mutate` option.
 * - By default, it does not go into instances for replacement, only plain objects.
 * - If your instances are cross-referenced, you may end up in an infinite loop.
 *
 * TypeScript users: This is way too dynamic to type properly, therefore, typing assumes the most basic form of
 * replacement where search and value are of the same type. If that's not the case for you - you'll have to typecast.
 *
 * @param source - source object/array/value
 * @param search - value to search for
 * @param value - value to replace with
 * @param options - optional options
 */
const replaceDeep = <T>(source: T, search: unknown, value: unknown, options?: Options): T => {
    return replaceDeepByFn(source, (v) => Object.is(v, search), () => value, options);
};

export {
    replaceDeep,
};
