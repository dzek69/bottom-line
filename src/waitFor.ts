const DEFAULT_INTERVAL = 50;

type TTimeout = ReturnType<typeof setTimeout>;
type TInterval = ReturnType<typeof setInterval>;

/**
 * Runs the callback function every specified interval and returns a Promise that resolves when the callback returns
 * truthy value.
 * Pro-tip: Value returned from the callback is returned via resolved Promise. If you want to pass back falsy value then
 * wrap your potential return value with an object or array.
 * @param {function} fn - callback function
 * @param {number} interval - interval between checks
 * @param {number} timeout - optional timeout
 */
const waitFor = <T>(fn: () => T, interval = DEFAULT_INTERVAL, timeout = Infinity) => {
    return new Promise<T>((resolve, reject) => {
        let intervalTimer: TInterval, failTimer: TTimeout;

        if (isFinite(timeout)) {
            failTimer = setTimeout(() => {
                reject(new Error("[waitFor] Timeout"));
                clearInterval(intervalTimer);
            }, timeout);
        }

        intervalTimer = setInterval(() => {
            try {
                const result = fn();
                if (result) {
                    clearTimeout(failTimer);
                    clearInterval(intervalTimer);
                    resolve(result);
                }
            }
            catch (error: unknown) {
                clearTimeout(failTimer);
                clearInterval(intervalTimer);

                const e: Error & { details?: unknown } = new Error("[waitFor] check function threw an error");
                e.details = { error };
                reject(e);
            }
        }, interval);
    });
};

export { waitFor };
