type MatchCallback<T> = (value: T) => boolean;

/**
 * A `Array.prototype.filter`-like function that splits the results into two groups - matched and unmatched
 * @param {Array} list - original array
 * @param {function} fn - function matching elements
 */
const match = <T>(list: T[], fn: MatchCallback<T>) => {
    const matched: T[] = [];
    const unmatched: T[] = [];
    list.forEach(item => {
        if (fn(item)) {
            matched.push(item);
            return;
        }
        unmatched.push(item);
    });

    return {
        matched,
        unmatched,
    };
};

export {
    match,
};
export type {
    MatchCallback,
};
