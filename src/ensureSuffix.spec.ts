import { ensureSuffix } from "./ensureSuffix.js";

describe("ensure suffix", function() {
    it("adds suffix to a string", function() {
        ensureSuffix("hello world", ".").must.equal("hello world.");
    });

    it("doesn't add suffix if already present", function() {
        ensureSuffix("hello world.", ".").must.equal("hello world.");
    });
});
