const remove = (array, fn) => {
    const len = array.length;

    const idsToRemove = []; // not removing instantly to feed `fn` untouched array for each iteration, lodash does that
    const removedValues = [];

    for (let counter = 0; counter < len; counter++) {
        if (fn(array[counter], counter, array)) {
            idsToRemove.push(counter - idsToRemove.length);
            removedValues.push(array[counter]);
        }
    }

    idsToRemove.forEach(id => array.splice(id, 1));

    return removedValues;
};

export default remove;
