// TODO verify & maybe fix typings when object is an Array

/**
 * Returns new object with copied given properties from source object.
 *
 * @param {Object} object - source object
 * @param {Array.<string>} props - properties to copy
 * @example
 * pick({ name: "Jack", age: 69 }, ["age", "title"]);
 * // { age: 69 }
 * @example
 * pick(["hello", "world"], [0]);
 * // { 0: hello }
 * @returns {Object} - new object with given properties
 */
const pick = <T extends object, K extends keyof T>(
    object: T | null, props: K[],
): T extends null ? { [ key: string]: never } : Pick<T, K> => {
    if (
        !object
        || (typeof object !== "object" && typeof object !== "function")
        || !Array.isArray(props)
        || !props.length
    ) {
        // @ts-expect-error TS can't handle implementation of dynamic return types yet
        return {};
    }
    const result = {};
    props.forEach(property => {
        if (property in object) {
            (result as T)[property] = object[property];
        }
    });

    // @ts-expect-error TS can't handle implementation of dynamic return types yet
    return result;
};

export { pick };
