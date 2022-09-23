import { pull } from "./pull.js";

describe("pull", function() {
    it("should remove all given values", function() {
        const source = [1, 2, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 2];
        const result = pull(source, 1);
        (source === result).must.be.true();

        result.includes(1).must.be.false();
        result.must.eql([2, 2, 2, 2, 2, 2, 2, 2]);
    });

    it("should be able to clear the array", function() {
        const source = [1, 2, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 2];
        const result = pull(source, 1, 2);
        (source === result).must.be.true();
        result.must.have.length(0);
    });

    it("should remove NaNs", function() {
        const source = [1, NaN, 3];
        pull(source, NaN);
        source.must.eql([1, 3]);
    });

    it("should remove nothing", function() {
        const source = [1, NaN, 3, undefined];
        pull(source);
        source.must.eql([1, NaN, 3, undefined]);
    });

    it("should remove null or undefined or referenced objects", function() {
        const obj = {};
        const source = [1, undefined, 2, null, 3, obj, 4, {}];
        pull(source, obj, null, undefined);
        source.must.eql([1, 2, 3, 4, {}]);
    });

    it("should work with sparse arrays, removing holes when requested to remove undefined", function() {
        // eslint-disable-next-line no-sparse-arrays
        const source = [1, , 3, , 5];
        pull(source, undefined);
        source.must.eql([1, 3, 5]);
    });

    it("should work with sparse arrays, keeping holes when requested", function() {
        // eslint-disable-next-line no-sparse-arrays
        const source = [1, , 3, , 5];
        pull(source, null);
        // eslint-disable-next-line no-sparse-arrays
        source.must.eql([1, ,3, , 5]);
        ("1" in source).must.be.false();
    });
});
