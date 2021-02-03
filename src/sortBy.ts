type Source = Record<string, unknown>;

const sortBy = (prop: string, asc = true, def = null) => {
    return (a: Source, b: Source) => {
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
};

export {
    sortBy,
};
