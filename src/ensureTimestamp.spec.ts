import { ensureTimestamp } from "./ensureTimestamp.js";

describe("ensure timestamp", function() {
    it("returns number if number given", function() {
        ensureTimestamp(123456789).must.equal(123456789);
    });

    it("returns number if date given", function() {
        ensureTimestamp(new Date(123456789)).must.equal(123456789);
    });
});
