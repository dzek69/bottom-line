import { compareProps } from "./compareProps.js";

describe("compareProps", () => {
    it("shoud list all different props", () => {
        const a = { a: 1, b: 2 };
        const b = { a: 1, b: 3 };
        const result = compareProps(a, b);
        result.must.eql(["b"]);
    });

    it("should return empty array if there are no differences", () => {
        const a = { a: 1, b: 2 };
        const b = { a: 1, b: 2 };
        const result = compareProps(a, b);
        result.must.eql([]);
    });

    it("should ignore non-enumerable properties", () => {
        const a = { a: 1, b: 2 };
        const b = { a: 1, b: 2 };
        Object.defineProperty(a, "c", { value: 3, enumerable: false });
        Object.defineProperty(b, "c", { value: 4, enumerable: false });
        const result = compareProps(a, b);
        result.must.eql([]);
    });

    it("should work correctly when one property is missing on either side", () => {
        const a = { a: 1 };
        const b = {};
        const result = compareProps(a, b);
        result.must.eql(["a"]);

        const c = {};
        const d = { a: 1 };
        const result2 = compareProps(c, d);
        result2.must.eql(["a"]);
    });

    it("should work with empty objects", () => {
        const a = {};
        const b = {};
        const result = compareProps(a, b);
        result.must.eql([]);
    });

    it("should work with NaNs", () => {
        const a = { a: NaN };
        const b = { a: NaN };
        const result = compareProps(a, b);
        result.must.eql([]);
    });

    describe("when a has property defined as `undefined` and other has no property at all", () => {
        it("should return a difference ", () => {
            const a = { a: undefined };
            const b = {};
            const result = compareProps(a, b);
            result.must.eql(["a"]);
        });

        it("unless `missingEqualsUndefined` option is set to `true`", () => {
            const a = { a: undefined };
            const b = {};
            const result = compareProps(a, b, { missingEqualsUndefined: true });
            result.must.eql([]);
        });
    });
});
