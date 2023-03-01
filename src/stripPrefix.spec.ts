import { stripPrefix } from "./stripPrefix.js";

describe("strip prefix", function() {
    it("should strip prefix if string has it", function() {
        stripPrefix("abc", "a").must.equal("bc");
        stripPrefix("hello world", "hello").must.equal(" world");
    });

    it("should keep the string as it is when string don't have specified prefix", function() {
        stripPrefix("abc", "b").must.equal("abc");
        stripPrefix("hello world", "world").must.equal("hello world");
    });
});
