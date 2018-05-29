const get = require("./get");

const DEFAULT = {};
const getMultiple = (source, defaultValue, ... paths) => {
    const length = paths.length;
    for (let i = 0; i < length; i++) {
        const properties = paths[i];
        const result = get(source, properties, DEFAULT);
        if (result !== DEFAULT) {
            return result;
        }
    }
    return defaultValue;
};

module.exports = getMultiple;
