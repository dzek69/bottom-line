import { stripSuffix } from "./stripSuffix.js";

describe("strip suffix", function() {
    it("should strip suffix if string has it", function() {
        stripSuffix("abc", "c").must.equal("ab");
        stripSuffix("hello world", "world").must.equal("hello ");
    });

    it("should keep the string as it is when string don't have specified suffix", function() {
        stripSuffix("abc", "b").must.equal("abc");
        stripSuffix("hello world", "hello").must.equal("hello world");
    });
});
