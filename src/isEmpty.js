const isEmpty = obj => {
    if (typeof obj === "string") {
        return !obj.length;
    }
    if (typeof obj !== "object" || obj === null) {
        return true;
    }
    if (Array.isArray(obj)) {
        return !Object.keys(obj).length;
    }
    if ("length" in obj) {
        return !obj.length;
    }
    if ("size" in obj) {
        return !obj.size;
    }
    return !Object.keys(obj).length;
};

module.exports = isEmpty;