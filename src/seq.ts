import { createError } from "better-custom-error";

const AllFailedError = createError("AllFailedError");

const fail = function() {
    return Promise.reject(new TypeError("At least one function must be provided."));
};

type Fn<T> = () => T;
type Args<T> = Fn<T>[] | [Fn<T>[]];

const run = <T>(list: Fn<T>[]): Promise<T> => {
    if (!list.length) {
        return fail();
    }

    const promises = [...list];

    return new Promise((resolve, reject) => {
        let promise: Promise<T | undefined> = Promise.resolve(undefined);

        const errors: Error[] = [];

        const doTry = function(error?: Error) {
            if (error) {
                errors.push(error);
            }
            const fn = promises.shift();
            if (typeof fn !== "function") {
                const finalError = new AllFailedError("Every function had thrown.", {
                    errors,
                });
                reject(finalError);
            }
            promise = (promise.then(fn).then(resolve, doTry)) as unknown as Promise<T>;
        };

        doTry();
    });
};

const seq = <T>(...args: Args<T>) => {
    if (args.length === 1) {
        return run(Array.isArray(args[0]) ? args[0] : [args[0]]);
    }
    return run(args as Fn<T>[]);
};

export { seq, AllFailedError };
