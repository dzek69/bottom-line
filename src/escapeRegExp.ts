/**
 * Escapes a string to be used in a regular expression.
 * From: https://stackoverflow.com/a/3561711
 * @param string - string to escape
 * @example ```typescript
 * const badName = "([{^|";
 * const regex = new RegExp(`^(maciek|${escapeRegExp(badName)})$`); // won't crash
 * regex.test(badName); // true
 * ```
 */
const escapeRegExp = (string: string) => {
    return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
};

export {
    escapeRegExp,
};
