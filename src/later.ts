type Later<T> = {
    /**
     * The promise that will be resolved or rejected later.
     */
    promise: Promise<T>;
    /**
     * Promise resolver function
     */
    resolve: (result: T) => void;
    /**
     * Promise rejecter function
     */
    reject: (reason: Error) => void;
};

/**
 * Creates a promise that can be resolved or rejected from outside the promise.
 *
 * @example In this example someFunction will return a promise that's typed to return number and myDependency will
 * resolve it when it's ready.
 * ```
 * function someFunction() {
 *   const l = later<number>();
 *   myDependency.load(l);
 *   return l.promise;
 * }
 * ```
 */
const later = <T>(): Later<T> => {
    // @ts-expect-error This is expected - we fill the values later (no pun intended)
    const res: Later<T> = {};

    res.promise = new Promise((resolve, reject) => {
        res.resolve = resolve;
        res.reject = reject;
    });

    return res;
};

export type { Later };
export { later };
