import { cap } from "./cap.js";

describe("cap", () => {
    it("caps too big values", () => {
        cap(200, 100).must.equal(100);
        cap(101, 100).must.equal(100);
        cap(100.0001, 100).must.equal(100);
    });

    it("leaves not big values", () => {
        cap(100, 100).must.equal(100);
        cap(99.999, 100).must.equal(99.999);
    });

    it("caps too small values", () => {
        cap(-100, 100, 5).must.equal(5);
        cap(4, 100, 5).must.equal(5);
    });

    it("leaves not too small values", () => {
        cap(6, 100, 5).must.equal(6);
        cap(5, 100, 5).must.equal(5);
        cap(23, 100, 5).must.equal(23);
    });

    it("throws when max expected value is lower than min expected value", () => {
        (() => cap(6.4, 5, 7)).must.throw();
    });

    it("allows the same min and max value", function() {
        (() => cap(5, 5, 5)).must.not.throw();
        cap(5, 5, 5).must.equal(5);
        cap(4, 5, 5).must.equal(5);
        cap(6, 5, 5).must.equal(5);
    });
});
