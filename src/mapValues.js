const map = (source, fn) => {
    const keys = Object.keys(source);

    return keys.reduce((result, key) => {
        const value = fn(source[key], key);
        if (value !== map.REMOVE) {
            result[key] = fn(source[key], key);
        }
        return result;
    }, Array.isArray(source) ? [] : {});
};
map.REMOVE = {};

module.exports = map;
