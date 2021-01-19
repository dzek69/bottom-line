import { makeArray } from "./makeArray";

describe("makeArray", () => {
    it("must return given value untouched if the value is an array", () => {
        singleValue: {
            const x = [5];
            const result = makeArray(x);
            result.must.be.an.array();
            result.must.have.length(1);
            result.must.equal(x);
            result.must.eql([5]);
        }

        noValue: {
            const x = [];
            const result = makeArray(x);
            result.must.be.an.array();
            result.must.have.length(0);
            result.must.equal(x);
        }

        manyValues: {
            const x = [1, "5"];
            const result = makeArray(x);
            result.must.be.an.array();
            result.must.have.length(2);
            result.must.equal(x);
            result.must.eql([1, "5"]);
        }

        arrayOfArrays: {
            const x = [[1], [2]];
            const result = makeArray(x);
            result.must.be.an.array();
            result.must.have.length(2);
            result.must.equal(x);
            result.must.eql([[1], [2]]);
        }
    });

    it("must arrarize object", () => {
        const y = { title: "dzek" };
        const result = makeArray(y);
        result.must.be.an.array();
        result.must.have.length(1);
        result[0].must.equal(y);
        result.must.eql([{ title: "dzek" }]);
    });

    it("must arrarize function", () => {
        const y = () => 5;

        const result = makeArray(y);
        result.must.be.an.array();
        result.must.have.length(1);
        result[0].must.equal(y);
        result.must.eql([y]);
    });

    it("must arrarize null", () => {
        const result = makeArray(null);
        result.must.be.an.array();
        result.must.have.length(1);
        result.must.eql([null]);
    });

    it("must arrarize string", () => {
        const result = makeArray("hey joe");
        result.must.be.an.array();
        result.must.have.length(1);
        result.must.eql(["hey joe"]);
    });

    it("must arrarize number", () => {
        const result = makeArray(123);
        result.must.be.an.array();
        result.must.have.length(1);
        result.must.eql([123]);
    });

    it("must arrarize NaN", () => {
        const result = makeArray(NaN);
        result.must.be.an.array();
        result.must.have.length(1);
        result.must.eql([NaN]);
    });
});
