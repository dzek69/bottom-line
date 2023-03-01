/**
 * Ensures that the given date value is a numeric timestamp.
 *
 * @example ensureTimestamp(123456789); // 123456789
 * @example ensureTimestamp(new Date(123456789)); // 123456789
 * @see {@link ensureDate}
 * @param {Date | number} date - date value
 */
const ensureTimestamp = (date: Date | number): number => {
    if (typeof date === "number") {
        return date;
    }
    return date.getTime();
};

export {
    ensureTimestamp,
};
