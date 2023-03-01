import { ensurePrefix } from "./ensurePrefix.js";

describe("ensure prefix", function() {
    it("adds prefix", function() {
        ensurePrefix("1234bbcc", "0x").must.equal("0x1234bbcc");
    });

    it("doesn't add prefix if already present", function() {
        ensurePrefix("0x1234bbcc", "0x").must.equal("0x1234bbcc");
    });
});
