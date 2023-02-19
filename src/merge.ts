const UNSET = typeof Symbol !== "undefined" ? Symbol("UNSET") : {};

interface Merge {
    <A>(a: A): A;
    <A, B>(a: A, b: B): A & B;
    <A, B, C>(a: A, b: B, c: C): A & B & C;
    <A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D;
    <A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): A & B & C & D & E;
    <A, B, C, D, E, F>(a: A, b: B, c: C, d: D, e: E, f: F): A & B & C & D & E & F;
    <A, B, C, D, E, F, G>(a: A, b: B, c: C, d: D, e: E, f: F, g: G): A & B & C & D & E & F & G;
    <A, B, C, D, E, F, G, H>(a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H): A & B & C & D & E & F & G & H;
    <A, B extends object>(a: A, ...args: B[]): unknown;
    UNSET: typeof UNSET;
}

/**
 * Shallow merges given objects into new object. It does not mutate any object given. Allows removing properties as
 * well by assigning special `merge.UNSET` value.
 * @param {...object} args - input objects
 * @returns {*}
 */
const merge: Merge = <MergeCandidate extends object>(...args: MergeCandidate[]) => {
    const nonObjects = args.some(p => {
        const t = typeof p;
        return t === "string" || t === "number" || t === "symbol" || t === "boolean" || t === "function"
            || Array.isArray(p);
    });

    if (nonObjects) {
        throw new TypeError("Only objects are allowed");
    }

    const r: { [key: string]: unknown } = {};
    args.forEach((obj) => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        Object.entries(obj || {}).forEach(([key, value]) => {
            if (value === UNSET) {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete r[key];
                return;
            }
            r[key] = value;
        });
    });
    return r;
};
merge.UNSET = UNSET;

export {
    merge,
};
