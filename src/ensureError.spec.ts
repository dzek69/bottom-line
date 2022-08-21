import { ensureError } from "./ensureError.js";

describe("ensureError", () => {
    it("returns unmodified error if error given", () => {
        const e = new Error("Test");

        const result = ensureError(e);
        (e === result).must.be.true();
        result.message.must.equal("Test");
    });

    it("returns error on anything else than error", () => {
        const eNull = ensureError(null);
        eNull.must.be.instanceof(Error);
        eNull.message.must.equal("Expected error instance, got something else: null");

        const eUndefined = ensureError(undefined);
        eUndefined.must.be.instanceof(Error);
        eUndefined.message.must.equal("Expected error instance, got something else: undefined");

        const eNumber = ensureError(6);
        eNumber.must.be.instanceof(Error);
        eNumber.message.must.equal("Expected error instance, got something else: 6");

        const eFunction = ensureError(() => {});
        eFunction.must.be.instanceof(Error);
        eFunction.message.must.equal("Expected error instance, got something else: () => {}");
    });
});
