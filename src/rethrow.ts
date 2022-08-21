/**
 * Throws given value.
 * @param {*} e
 */
const rethrow = (e: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw e;
};

export {
    rethrow,
};
