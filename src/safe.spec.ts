import { safe } from "./safe.js";

describe("safe", () => {
    it("returns value from a function if it doesn't throw", () => {
        const result = safe(() => 5);
        result.must.equal(5);
    });

    it("returns undefined if function throws and no default value is given", () => {
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        const result = safe(() => {
            throw new Error("Boo");
        });
        (result === undefined).must.be.true();
    });

    it("returns given default value if function throws", () => {
        const result = safe(() => {
            throw new Error("Boo");
        }, 15);
        result.must.equal(15);
    });

    it("returns undefined if function throws and default value is undefined", () => {
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        const result = safe(() => {
            throw new Error("Boo");
        }, undefined);
        (result === undefined).must.be.true();
    });

    it("returns value from function if it doesn't throw and default is given", () => {
        const result = safe(() => 5, 15);
        result.must.equal(5);
    });

    it("doesn't unwrap promises", () => {
        const result = safe(() => Promise.resolve(5));
        result.must.be.instanceof(Promise);
    });

    it("doesn't 'work' with promises", () => {
        const result = safe(async () => {
            throw new Error("Boo!!!");
        });
        result.must.be.instanceof(Promise);

        // prevent unhandled rejection warning
        result.catch(() => null);
    });
});
