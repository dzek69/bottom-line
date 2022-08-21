import { coalesce } from "./coalesce.js";

describe("coalesce", () => {
    it("works with basic values", () => {
        coalesce(undefined, null, 69).must.equal(69);
        coalesce(null, null, undefined, 69, null).must.equal(69);
    });

    it("returns falsy values", () => {
        coalesce(undefined, null, false, 5).must.equal(false);
        coalesce(undefined, null, 0, 5).must.equal(0);
        coalesce(undefined, null, "", 5).must.equal("");
        coalesce(undefined, null, NaN, 5).must.be.nan();
    });

    it("returns null if no non-nil value is found", () => {
        (coalesce(null, undefined) === null).must.be.true();
    });

    it("returns null if no arguments are given", () => {
        (coalesce() === null).must.be.true();
    });
});
