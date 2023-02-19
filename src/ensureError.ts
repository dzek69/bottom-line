/**
 * Ensures given value is an instance of Error.
 * @param {*} e - value to check
 * @returns Error - original error or new Error instance
 */
const ensureError = (e: unknown) => {
    if (e instanceof Error) {
        return e;
    }
    return new Error("Expected error instance, got something else: " + String(e));
};

export {
    ensureError,
};
