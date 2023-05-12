import { unique } from "./unique.js";

interface ComparePropsOptions {
    missingEqualsUndefined?: boolean;
}

/**
 * Compare two objects and return an array of the properties that are different.
 * By default, if first object doesn't have a property at all and second object has it defined as `undefined` it will be
 * considered as a difference. To change this behavior set `missingEqualsUndefined` option to `true`.
 * @param a - first object
 * @param b - second object
 * @param options - options
 * @returns an array of the properties that are different
 * @example compareProps({ a: 1, b: 2 }, { a: 1, b: 3 }) // ["b"]
 */
const compareProps = <T extends Record<string, unknown>>(
    a: T, b: T, { missingEqualsUndefined }: ComparePropsOptions = {},
): string[] => {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    const allKeys = unique([...aKeys, ...bKeys]);
    return allKeys.filter((key) => {
        return !Object.is(a[key], b[key]) || (!missingEqualsUndefined && key in a !== key in b);
    });
};

export {
    compareProps,
};
export type {
    ComparePropsOptions,
};
