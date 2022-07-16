import { wait } from "./wait.js";

describe("wait", () => {
    describe("async", () => {
        it("returns a promise", () => {
            wait(0).must.be.instanceof(Promise);
        });

        it("waits given time", async () => {
            const start1 = Date.now();
            await wait(5);
            const end1 = Date.now();
            (end1 - start1).must.be.gte(4);
            // Note: because some Date.now() rounding may occur, end - start may be actually less than the wait time

            const start2 = Date.now();
            await wait(100);
            const end2 = Date.now();
            (end2 - start2).must.be.gte(99);
            // Note: because some Date.now() rounding may occur, end - start may be actually less than the wait time
        });

        // @TODO does not block test
    });

    describe("sync", () => {
        it("doesn't return value", () => {
            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
            must(wait.sync(0)).be.equal(undefined);
        });

        it("waits given time", () => {
            const start1 = Date.now();
            wait.sync(5);
            const end1 = Date.now();
            (end1 - start1).must.be.gte(5);

            const start2 = Date.now();
            wait.sync(100);
            const end2 = Date.now();
            (end2 - start2).must.be.gte(100);
        });
    });
});
