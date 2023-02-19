/**
 * Checks if given value is a plain object. Plain object should be an object that's not an instance of anything.
 * @param value - value to test
 */
const isPlainObject = (value: unknown) => Boolean(
    value
    && typeof value === "object"
    && (
        value.constructor === Object // default constructor
        || !("constructor" in value) // no constructor
        || Object.getOwnPropertyNames(value).includes("constructor") // constructor is set by user
    ),
);

export {
    isPlainObject,
};

