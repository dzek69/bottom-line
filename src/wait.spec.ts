import { wait } from "./wait.js";

describe("wait", () => {
    it("returns a promise", () => {
        wait(0).must.be.instanceof(Promise);
    });

    it("waits given time", async () => {
        const start1 = Date.now();
        await wait(5);
        const end1 = Date.now();
        (end1 - start1).must.be.gte(5);

        const start2 = Date.now();
        await wait(100);
        const end2 = Date.now();
        (end2 - start2).must.be.gte(100);
    });

    // @TODO does not block test
});
