const copy = array => {
    return array.map(item => {
        if (Array.isArray(item)) {
            return [...item];
        }
        if (item == null) {
            return item;
        }
        if (typeof item === "function") {
            return item;
        }
        if (typeof item === "object") {
            return {
                ...item,
            };
        }
        return item;
    });
};

const createSpy = (origFn) => {
    const fn = function(...args) {
        fn.__spy.calls.push(copy(args));
        return origFn.apply(this, args); // eslint-disable-line no-invalid-this
    };

    fn.__spy = {
        calls: [],
        reset: function() {
            this.calls.length = 0;
        },
    };

    return fn;
};

export default createSpy;
