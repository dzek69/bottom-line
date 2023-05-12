import { compareArrays } from "./compareArrays.js";

describe("compareArrays", () => {
    it("should mark items that are only in a or b", () => {
        compareArrays([1, 2, 3], [4, 5, 6]).must.eql({
            onlyA: [1, 2, 3],
            onlyB: [4, 5, 6],
            both: [],
        });
    });

    it("should mark items that exists in both arrays", () => {
        compareArrays([1, 2, 3], [3, 4, 5]).must.eql({
            onlyA: [1, 2],
            onlyB: [4, 5],
            both: [3],
        });
    });

    it("should not return duplicates if given", () => {
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

    describe("should work with NaNs", () => {
        it("with NaN on A only", () => {
            compareArrays([NaN], []).must.eql({
                onlyA: [NaN],
                onlyB: [],
                both: [],
            });
        });

        it("with NaN on B only", () => {
            compareArrays([], [NaN]).must.eql({
                onlyA: [],
                onlyB: [NaN],
                both: [],
            });
        });

        it("with NaN on both", () => {
            compareArrays([NaN], [NaN]).must.eql({
                onlyA: [],
                onlyB: [],
                both: [NaN],
            });
        });
    });
});

