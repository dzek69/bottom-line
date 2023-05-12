import { unique } from "./unique.js";

describe("unique", () => {
    it("returns unique values in array", () => {
        unique([1, 2, 3, 2, 1]).must.eql([1, 2, 3]);
        unique([{ a: true }, { a: true }]).must.eql([{ a: true }, { a: true }]);
        const a = { a: true };
        unique([a, a]).must.eql([a]);
    });
});
