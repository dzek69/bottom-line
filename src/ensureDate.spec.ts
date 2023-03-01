import { ensureDate } from "./ensureDate.js";

describe("ensureDate", function() {
    it("should convert timestamps to date instances", function() {
        ensureDate(123456789).must.be.instanceOf(Date);
        ensureDate(123456789).getTime().must.equal(123456789);
    });

    it("should return the same date instance", function() {
        const date = new Date(123456789);
        ensureDate(date).must.equal(date);
    });
});
