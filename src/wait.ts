/**
 * Returns a promise that resolves after given time
 * @param {number} timeMs - time to wait
 * @returns {Promise<void>}
 */
const wait = (timeMs = 0) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => { resolve(); }, timeMs);
    });
};
wait.sync = (timeMs = 0) => {
    const s = Date.now();
    // eslint-disable-next-line no-empty
    while (Date.now() - s < timeMs) {}
};

export {
    wait,
};
