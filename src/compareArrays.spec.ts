import { compareArrays } from "./compareArrays.js";

describe("compareArrays", () => {
    it("should mark items that are only in a or b", async () => {
        compareArrays([1, 2, 3], [4, 5, 6]).must.eql({
            onlyA: [1, 2, 3],
            onlyB: [4, 5, 6],
            both: [],
        });
    });

    it("should mark items that exists in both arrays", async () => {
        compareArrays([1, 2, 3], [3, 4, 5]).must.eql({
            onlyA: [1, 2],
            onlyB: [4, 5],
            both: [3],
        });
    });

    it("should not return duplicates if given", async () => {
        compareArrays([1, 1, 2, 3, 3], [3, 4, 5]).must.eql({
            onlyA: [1, 2],
            onlyB: [4, 5],
            both: [3],
        });
        compareArrays([1, 2, 3, 3], [3, 3, 4, 5]).must.eql({
            onlyA: [1, 2],
            onlyB: [4, 5],
            both: [3],
        });
        compareArrays([1, 2, 3, 3], [3, 3, 3, 4, 5]).must.eql({
            onlyA: [1, 2],
            onlyB: [4, 5],
            both: [3],
        });
    });
});

