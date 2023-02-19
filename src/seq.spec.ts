import { seq, seqEarlyBreak } from "./seq.js";

describe("seq", () => {
    // @TODO more tests

    it("calls methods one by one", async () => {
        let firstCalled = false,
            secondCalled = false;
        const list = [
            () => {
                firstCalled = true;
                return Promise.resolve(1);
            },
            () => {
                secondCalled = true;
                return Promise.resolve(2);
            },
        ];

        const res = await seq(list);
        res.must.equal(1);
        firstCalled.must.equal(true);
        secondCalled.must.equal(false);
    });

    it("returns first resolved value", async () => {
        let firstCalled = false,
            secondCalled = false;
        const list = [
            () => {
                firstCalled = true;
                return Promise.reject(new Error("Nope"));
            },
            () => {
                secondCalled = true;
                return Promise.resolve(2);
            },
        ];

        const res = await seq(list);
        res.must.equal(2);
        firstCalled.must.equal(true);
        secondCalled.must.equal(true);
    });

    it("works with non-async functions", async () => {
        let firstCalled = false,
            secondCalled = false;
        const list = [
            () => {
                firstCalled = true;
                throw new Error("Nope");
            },
            () => {
                secondCalled = true;
                return 2;
            },
        ];

        const res = await seq(list);
        res.must.equal(2);
        firstCalled.must.equal(true);
        secondCalled.must.equal(true);
    });

    it("rejects if everything rejects", async () => {
        const list = [
            () => {
                throw new Error("Nope");
            },
            () => {
                throw new Error("Also nope");
            },
        ];

        let caught = false;
        try {
            await seq(list);
        }
        catch (e: unknown) {
            caught = true;
            e.must.be.instanceof(Error);
            if (e instanceof Error) {
                e.message.must.equal("Every function had thrown.");
                const errors = e.details?.errors as Error[];
                errors.must.be.an.array();
                errors.must.have.length(2);
                errors[0].must.be.instanceof(Error);
                errors[0].message.must.equal("Nope");
                errors[1].must.be.instanceof(Error);
                errors[1].message.must.equal("Also nope");
            }
        }

        caught.must.be.true();
    });

    it("rejects if no functions given", async () => {
        let caught = false;
        try {
            await seq();
        }
        catch (e: unknown) {
            caught = true;
            e.must.be.instanceof(TypeError);
            if (e instanceof TypeError) {
                e.message.must.equal("At least one function must be provided.");
            }
        }

        caught.must.be.true();
    });

    it("allows to break early on rejection", async () => {
        let firstCalled = false,
            secondCalled = false,
            thirdCalled = false;

        const list = [
            () => {
                firstCalled = true;
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject(1);
            },
            () => {
                secondCalled = true;
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject(2);
            },
            () => {
                thirdCalled = true;
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject(3);
            },
        ];

        let caught = false;
        try {
            await seqEarlyBreak((e: unknown) => {
                if (e === 2) {
                    return true;
                }
                return false;
            }, list);
        }
        catch (e: unknown) {
            caught = true;
            e.must.be.equal(2);

            firstCalled.must.be.true();
            secondCalled.must.be.true();
            thirdCalled.must.be.false();
        }

        caught.must.be.true();
    });
});
