import { sortProps } from "./sortProps.js";

describe("sort props", () => {
    it("can sort props ascending", () => {
        const sorted = sortProps({ b: 2, a: 1, z: 26 });
        Object.keys(sorted).must.eql(["a", "b", "z"]);
    });

    it("can sort props descending", () => {
        const sorted = sortProps({ b: 2, a: 1, z: 26 }, false);
        Object.keys(sorted).must.eql(["z", "b", "a"]);
    });

    it("doesn't modify original object", () => {
        const source = { b: 2, a: 1, z: 26 };
        const sorted = sortProps(source);
        Object.keys(source).must.eql(["b", "a", "z"]);
        Object.keys(sorted).must.eql(["a", "b", "z"]);
    });
});
