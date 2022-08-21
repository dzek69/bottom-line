import { match } from "./match.js";

describe("match", () => {
    it("must match correctly", () => {
        const items = [1, 500, 3, 15, 200, -100];

        const { matched, unmatched } = match(items, (item) => item > 15);
        matched.must.eql([500, 200]);
        unmatched.must.eql([1, 3, 15, -100]);
    });
});
