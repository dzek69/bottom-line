import { pick as _pick } from "lodash";

import { pick } from "./pick.js";

describe("pick", () => {
    it("returns empty object when source is not given, behaves like lodash", () => {
        caseundefined: {
            const value = pick(undefined, ["name", "count"]);
            value.must.eql({});

            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
            const _value = _pick(undefined, ["name", "count"]);
            _value.must.eql({});
        }

        casenull: {
            const value = pick(null, ["name", "count"]);
            value.must.eql({});

            const _value = _pick(null, ["name", "count"]);
            _value.must.eql({});
        }
    });

    it("returns empty object when properties to copy are not given, behaves like lodash", () => {
        const source = {
            title: "Master od disaster",
            count: 1,
        };

        caseundefined: {
            const value = pick(source);
            value.must.eql({});

            const _value = _pick(source);
            _value.must.eql({});
        }

        caseempty: {
            const value = pick(source, []);
            value.must.eql({});

            const _value = _pick(source, []);
            _value.must.eql({});
        }
    });

    it("returns empty object when source is primitive, behaves like lodash", () => {
        number: {
            const value = pick(2, ["title"]);
            value.must.eql({});

            const _value = _pick(2, ["title"]);
            _value.must.eql({});
        }

        string: {
            const value = pick("two", ["title"]);
            value.must.eql({});

            const _value = _pick("two", ["title"]);
            _value.must.eql({});
        }
    });

    it("returns new object with expected properties, ignores not defined properties, behaves like lodash", () => {
        const source = {
            a: 5,
            b: "string",
            c: undefined,
            d: 0,
            e: null,
            f: false,
        };

        const value = pick(source, ["a", "b", "c", "d", "e", "f", "g"]);
        value.must.eql({
            a: 5,
            b: "string",
            c: undefined,
            d: 0,
            e: null,
            f: false,
        });
        value.must.not.equal(source);

        const _value = _pick(source, ["a", "b", "c", "d", "e", "f", "g"]);
        _value.must.eql({
            a: 5,
            b: "string",
            c: undefined,
            d: 0,
            e: null,
            f: false,
        });
        _value.must.not.equal(source);
    });

    it("returns new object when source is function, behaves like lodash", () => {
        const source = () => {};
        source.title = "ABCD";

        const value = pick(source, ["title"]);
        value.must.eql({
            title: "ABCD",
        });

        const _value = _pick(source, ["title"]);
        _value.must.eql({
            title: "ABCD",
        });
    });

    it("returns inherited properties, behaves like lodash", () => {
        const Test = function() {};
        Test.prototype.count = 1;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const testInstance = new Test();
        testInstance.length = 2;

        const value = pick(testInstance, ["count", "length"]);
        value.must.eql({
            count: 1,
            length: 2,
        });

        const _value = _pick(testInstance, ["count", "length"]);
        _value.must.eql({
            count: 1,
            length: 2,
        });
    });

    it("returns non-enumerable properties, behaves like lodash", () => {
        const source = {};
        Object.defineProperty(source, "count", {
            enumerable: false,
            value: 23,
        });

        const value = pick(source, ["count"]);
        value.must.eql({
            count: 23,
        });

        const _value = _pick(source, ["count"]);
        _value.must.eql({
            count: 23,
        });
    });

    it("returns object when array is given as source, behaves like lodash", () => {
        const source = ["a", "b", "c"];

        const value = pick(source, [0, "2", 15, "xxx"]);
        value.must.eql({
            0: "a",
            2: "c",
        });

        const _value = _pick(source, [0, "2", 15, "xxx"]);
        _value.must.eql({
            0: "a",
            2: "c",
        });
    });
});
