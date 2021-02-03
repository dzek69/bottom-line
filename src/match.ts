type MatchCallback<T> = (x: T) => boolean;

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
