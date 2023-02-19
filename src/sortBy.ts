/**
 * Returns a function that can be used as a callback to `.sort()` method. Returned function will sort array by given
 * property.
 * @param {string} propertyName - name of the property to sort by
 * @param {boolean} [asc=true] - should sort be ascending?
 * @param {*} defaultValue - value to use when property is not defined in one of the objects
 */
const sortBy = <T>(propertyName: keyof T, asc = true, defaultValue: unknown = null) => (a: T, b: T) => {
    if (a[propertyName] === b[propertyName]) {
        return 0;
    }
    // @ts-expect-error We don't care about types here, it's for runtime pure JS too
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if ((a[propertyName] ?? defaultValue) > (b[propertyName] ?? defaultValue)) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return asc ? 1 : -1;
    }
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return asc ? -1 : 1;
};

export {
    sortBy,
};
