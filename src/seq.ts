const fail = function() {
    return Promise.reject(new TypeError("At least one function must be provided."));
};

type Fn<T> = () => T;
type Args<T> = Fn<T>[] | [Fn<T>[]];

type EarlyBreaker = (e: unknown) => boolean;

const run = <T>(list: Fn<T>[], earlyBreaker?: EarlyBreaker): Promise<T> => {
    if (!list.length) {
        return fail();
    }

    const promises = [...list];

    return new Promise((resolve, reject) => {
        let promise: Promise<T | undefined> = Promise.resolve(undefined);

        const errors: Error[] = [];

        const doTry = function(error?: Error) {
            if (error !== undefined && earlyBreaker && earlyBreaker(error)) {
                reject(error);
                return;
            }

            if (error) {
                errors.push(error);
            }
            const fn = promises.shift();
            if (typeof fn !== "function") {
                const finalError = new Error("Every function had thrown.");
                // @ts-expect-error More details on error object are wanted
                finalError.details = { errors };
                reject(finalError);
            }
            promise = (promise.then(fn).then(resolve, doTry)) as unknown as Promise<T>;
        };

        doTry();
    });
};

/**
 * The same as {@link seq} but accepts a function that gets run after each error and using that erro decides if continue
 * to try next functions.
 *
 * @param {EarlyBreaker} earlyBreaker - function that decides about early breaking the sequential run
 * @param {...Args<unknown>[]} args - functions to run, you can either pass them as many arguments or just single
 * arguments with array
 * @returns {unknown} - whatever gets returned from given functions
 */
const seqEarlyBreak = <T>(earlyBreaker: EarlyBreaker | undefined, ...args: Args<T>) => {
    if (args.length === 1) {
        return run(Array.isArray(args[0]) ? args[0] : [args[0]], earlyBreaker);
    }
    return run(args as Fn<T>[], earlyBreaker);
};

/**
 * Runs given functions sequentially one by one, until any returns value. Supports async functions. Throws with new
 * Error when every function throws.
 *
 * @param {...Args<unknown>[]} args - functions to run, you can either pass them as many arguments or just single
 * arguments with array
 * @returns {unknown} - whatever gets returned from given functions
 */
const seq = <T>(...args: Args<T>) => {
    return seqEarlyBreak(undefined, ...args);
};

export { seq, seqEarlyBreak };
