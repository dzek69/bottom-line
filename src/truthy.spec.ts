import { truthy } from "./truthy.js";

describe("truthy", function() {
    it("returns true on truthy values", function() {
        truthy(true).must.be.true();
        truthy(() => {}).must.be.true();
        truthy(1).must.be.true();
        truthy("a").must.be.true();
        truthy([]).must.be.true();
        truthy({}).must.be.true();
    });

    it("returns false on falsy values", function() {
        truthy(false).must.be.false();
        truthy(null).must.be.false();
        truthy(0).must.be.false();
        truthy("").must.be.false();
        truthy(NaN).must.be.false();
        truthy(undefined).must.be.false();
    });
});
