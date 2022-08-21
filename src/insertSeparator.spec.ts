import { insertSeparator } from "./insertSeparator.js";

describe("insertSeparator", () => {
    it("inserts value on array with data", () => {
        const source = [5, 6, 7];
        insertSeparator(source, "a").must.eql([5, "a", 6, "a", 7]);
        insertSeparator(source, "a").must.not.equal(source);
    });

    it("do nothing on array without data (returns source array)", () => {
        const source = [];
        insertSeparator(source, "a").must.equal(source);
        source.length.must.equal(0);
    });

    it("do nothing on array with single item (returns source array)", () => {
        const source = [1];
        insertSeparator(source, "a").must.equal(source);
        source.length.must.equal(1);
    });

    it("crashes on non-array", () => {
        (() => insertSeparator(null, "a")).must.throw();
        (() => insertSeparator(undefined, "a")).must.throw();
        (() => insertSeparator({}, "a")).must.throw();
        (() => insertSeparator(4, "a")).must.throw();
        (() => insertSeparator("4", "a")).must.throw();
    });
});
