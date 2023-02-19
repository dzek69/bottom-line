/**
 * Capitalize the first letter of a string.
 * @param {string} text - source string
 * @param {boolean} [restLowercase=false] - should the rest of the string be forced to lowercase?
 * @example capitalize("hello") // "Hello"
 * @example capitalize("hello my Friend", true) // "Hello my friend"
 * @example capitalize("hello my Friend", false) // "Hello my Friend"
 */
const capitalize = (text: string, restLowercase = false) => {
    const rest = restLowercase ? text.slice(1).toLowerCase() : text.slice(1);
    return text.charAt(0).toUpperCase() + rest;
};

export {
    capitalize,
};
