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
const omit = (object, props) => {
    if (!object || (typeof object !== "object" && typeof object !== "function")) {
        return {};
    }

    if (!Array.isArray(props) || !props.length) {
        return {
            ...object,
        };
    }

    const useProps = props.map(String);

    const result = {};
    for (const key in object) {
        if (useProps.indexOf(key) === -1) { // eslint-disable-line no-magic-numbers
            result[key] = object[key];
        }
    }
    return result;
};

export default omit;
