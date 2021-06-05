const sortBy = <T>(prop: keyof T, asc = true, def = null) => (a: T, b: T) => {
    if (a[prop] === b[prop]) {
        return 0;
    }
    // @ts-expect-error We don't care about types here
    if ((a[prop] ?? def) > (b[prop] ?? def)) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return asc ? 1 : -1;
    }
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return asc ? -1 : 1;
};

export {
    sortBy,
};
