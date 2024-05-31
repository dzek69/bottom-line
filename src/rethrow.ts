/**
 * Throws given value.
 * @param {*} e
 */
const rethrow = (e: unknown) => {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw e;
};

export {
    rethrow,
};
