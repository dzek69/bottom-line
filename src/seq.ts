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

const seqEarlyBreak = <T>(earlyBreaker: EarlyBreaker | undefined, ...args: Args<T>) => {
    if (args.length === 1) {
        return run(Array.isArray(args[0]) ? args[0] : [args[0]], earlyBreaker);
    }
    return run(args as Fn<T>[], earlyBreaker);
};

const seq = <T>(...args: Args<T>) => {
    return seqEarlyBreak(undefined, ...args);
};

export { seq, seqEarlyBreak };
