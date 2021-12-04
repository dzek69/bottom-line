import { wait } from "./wait.js";

const DEFAULT_MAX_BLOCK_TIME = 16; // a frame
const DEFAULT_WAIT_TIME = 1;

const mapAsync = async <T, Y>(
    context: readonly T[],
    callback: (item: T, key: number, array: readonly T[]) => Y,
    maxBlockTime = DEFAULT_MAX_BLOCK_TIME,
    waitTime = DEFAULT_WAIT_TIME,
): Promise<Y[]> => {
    let lastWaitMoment = Date.now();
    const result = [];

    const l = context.length;

    for (let i = 0; i < l; i++) {
        const item = context[i];
        // eslint-disable-next-line callback-return
        result.push(callback(item, i, context));
        if (Date.now() - lastWaitMoment >= maxBlockTime) {
            await wait(waitTime);
            lastWaitMoment = Date.now();
        }
    }

    return result;
};

export {
    mapAsync,
};
