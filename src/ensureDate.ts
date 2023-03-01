/**
 * Ensure that the date value is a Date instance
 *
 * @example ensureDate(123456789); // Date(123456789)
 * @example ensureDate(new Date(123456789)); // Date(123456789) -- same instance as given
 * @see {@link ensureTimestamp}
 * @param {Date | number} date - date value
 */
const ensureDate = (date: Date | number): Date => {
    if (typeof date === "number") {
        return new Date(date);
    }
    return date;
};

export {
    ensureDate,
};
