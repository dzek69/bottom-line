/**
 * Ensures given value is an instance of Error.
 *
 * This is for simple use cases only, for maximum flexibility use `@ezez/errors` package.
 * @example ensureError(new Error("test")); // returns given Error instance (not modified)
 * @example ensureError("test");
 * // ^ returns new Error instance with error message: "Expected error instance, got something else: test"
 * @example ensureError({});
 * // ^ returns new Error instance with error message: "Expected error instance, got something else: [object Object]"
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
