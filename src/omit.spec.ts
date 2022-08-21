import { omit as _omit } from "lodash";

import { omit } from "./omit.js";

describe("omit", () => {
    it("returns empty object when source is not given, behaves like lodash", () => {
        caseundefined: {
            const value = omit(undefined, ["name", "count"]);
            value.must.eql({});

            const _value = _omit(undefined, ["name", "count"]);
            _value.must.eql({});
        }

        casenull: {
            const value = omit(null, ["name", "count"]);
            value.must.eql({});

            const _value = _omit(null, ["name", "count"]);
            _value.must.eql({});
        }
    });

    it("returns cloned object when properties are not given, behaves like lodash", () => {
        const source = {
            title: "Master od disaster",
            count: 1,
        };

        caseundefined: {
            const value = omit(source);
            value.must.eql({
                title: "Master od disaster",
                count: 1,
            });

            const _value = _omit(source);
            _value.must.eql({
                title: "Master od disaster",
                count: 1,
            });
        }

        caseempty: {
            const value = omit(source, []);
            value.must.eql({
                title: "Master od disaster",
                count: 1,
            });

            const _value = _omit(source, []);
            _value.must.eql({
                title: "Master od disaster",
                count: 1,
            });
        }
    });

    it("returns empty object when source is number, behaves like lodash", () => {
        const value = omit(2, ["title"]);
        value.must.eql({});

        const _value = _omit(2, ["title"]);
        _value.must.eql({});
    });

    it("returns empty object when source is string, behaves NOT like lodash", () => {
        const value = omit("two", ["title"]);
        value.must.eql({});

        const _value = _omit("two", ["title"]);
        _value.must.eql({ 0: "t", 1: "w", 2: "o" });
    });

    it("returns new object when source is function, behaves like lodash", () => {
        const source = () => {};
        source.title = "ABCD";
        source.weight = "XXX";

        const value = omit(source, ["title"]);
        value.must.eql({
            weight: "XXX",
        });

        const _value = _omit(source, ["title"]);
        _value.must.eql({
            weight: "XXX",
        });
    });

    it("returns new object without given properties, behaves like lodash", () => {
        const source = {
            a: 5,
            b: "string",
            c: undefined,
            d: 0,
            e: null,
            f: false,
        };

        const value = omit(source, ["a", "d", "g"]);
        value.must.eql({
            b: "string",
            c: undefined,
            e: null,
            f: false,
        });
        value.must.not.equal(source);

        const _value = _omit(source, ["a", "d", "g"]);
        _value.must.eql({
            b: "string",
            c: undefined,
            e: null,
            f: false,
        });
        _value.must.not.equal(source);
    });

    it("returns inherited properties (as own), behaves like lodash", () => {
        const Test = function() {};
        Test.prototype.name = "xxx";

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const testInstance = new Test();
        testInstance.length = 100;

        const value = omit(testInstance, ["title"]);
        value.must.eql({
            name: "xxx",
            length: 100,
        });
        value.hasOwnProperty("name").must.be.true();
        value.hasOwnProperty("length").must.be.true();

        const _value = _omit(testInstance, ["title"]);
        _value.must.eql({
            name: "xxx",
            length: 100,
        });
        _value.hasOwnProperty("name").must.be.true();
        _value.hasOwnProperty("length").must.be.true();
    });

    it("skips non-enumerable properties, behaves like lodash", () => {
        const source = {
            aaa: 123,
            title: 666,
        };
        Object.defineProperty(source, "name", {
            enumerable: false,
            value: "test",
        });

        const value = omit(source, ["title"]);
        value.must.eql({
            aaa: 123,
        });
        ("name" in value).must.be.false();

        const _value = _omit(source, ["title"]);
        _value.must.eql({
            aaa: 123,
        });
        ("name" in _value).must.be.false();
    });

    it("returns object when array is given as source, behaves like lodash", () => {
        const source = ["a", "b", "c"];

        const value = omit(source, [0, "2", 15, "xxx"]);
        value.must.eql({
            1: "b",
        });

        const _value = _omit(source, [0, "2", 15, "xxx"]);
        _value.must.eql({
            1: "b",
        });
    });
});
