// TODO verify & maybe fix typings when object is an Array

/**
 * Returns new object with copied all properties without these specified.
 *
 * @param {Object} object - source object
 * @param {Array.<string>} props - properties to skip
 * @example
 * omit({ name: "Jack", age: 69 }, ["age", "title"]);
 * // { name: "Jack" }
 * @example
 * omit(["hello", "world"], [0]);
 * // { 1: "world" }
 * @returns {Object} - new object without given properties
 */
const omit = <T extends object, K extends keyof T>(
    object: T | null, props: K[],
): T extends null ? { [key: string]: never } : Omit<T, K> => {
    if (!object || (typeof object !== "object" && typeof object !== "function")) {
        // @ts-expect-error TS can't handle implementation of dynamic return types yet
        return {};
    }

    if (!Array.isArray(props) || !props.length) {
        // @ts-expect-error TS can't handle implementation of dynamic return types yet
        return {
            ...object,
        };
    }

    const useProps = props.map(String);

    const result = {};
    for (const key in object) {
        if (!useProps.includes(key)) {
            (result as T)[key] = object[key];
        }
    }
    // @ts-expect-error TS can't handle implementation of dynamic return types yet
    return result;
};

export { omit };
