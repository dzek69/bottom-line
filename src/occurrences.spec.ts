import { occurrences } from "./occurrences.js";

describe("occurrences", function() {
    it("returns zero for empty search string", function() {
        occurrences("test string", "").must.equal(0);
    });

    it("returns count of occurences for typical use cases", function() {
        occurrences("hello beautiful world, hello bees and hello sun", "hello").must.equal(3);
        occurrences("hello beautiful world, hello bees and hello sun", "o").must.equal(4);
    });

    it("allows counting overlaps too", function() {
        occurrences("aaaa", "aa", { overlap: true }).must.equal(3);
        occurrences("aaaa", "aa", { overlap: false }).must.equal(2);

        occurrences("aaaaaa", "aa", { overlap: true }).must.equal(5);
        occurrences("aaaaaa", "aa", { overlap: false }).must.equal(3);
    });
});
