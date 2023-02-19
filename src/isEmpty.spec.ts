import { isEmpty as _isEmpty } from "lodash";

import { isEmpty } from "./isEmpty.js";

const emptyMap = new Map();
const filledMap = new Map();
filledMap.set("x", "x");

const emptySet = new Set();
const filledSet = new Set();
filledSet.add("x");

const emptyString = "";
const filledString = "abc";

const emptyArray = [];
const holeyArray = [,]; // eslint-disable-line no-sparse-arrays
const filledArray = [1];

let emptyArgs;
(function() { emptyArgs = arguments; })(); // eslint-disable-line prefer-rest-params
let filledArgs;
(function() { filledArgs = arguments; })(1, 2, 3); // eslint-disable-line prefer-rest-params

const emptyBuffer = Buffer.from("");
const filledBuffer = Buffer.from("abc");

const emptyObject = {};
const filledObject = { a: 5 };
const nonEnumObject = {};
Object.defineProperty(nonEnumObject, "prop", { enumerable: false, value: 666 });

const SomeElement = function() {};
SomeElement.prototype.prop = 5;
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const inheritedObject = new SomeElement();

const emptyTypedArray = new Uint8Array();
const filledTypedArray = new Uint8Array(1);
filledTypedArray[0] = 69;

describe("isEmpty", () => {
    it("works with Maps, behaves like lodash", () => {
        isEmpty(emptyMap).must.be.true();
        _isEmpty(emptyMap).must.be.true();

        isEmpty(filledMap).must.be.false();
        _isEmpty(filledMap).must.be.false();
    });

    it("works with Sets, behaves like lodash", () => {
        isEmpty(emptySet).must.be.true();
        _isEmpty(emptySet).must.be.true();

        isEmpty(filledSet).must.be.false();
        _isEmpty(filledSet).must.be.false();
    });

    it("works with strings, behaves like lodash", () => {
        isEmpty(emptyString).must.be.true();
        _isEmpty(emptyString).must.be.true();

        isEmpty(filledString).must.be.false();
        _isEmpty(filledString).must.be.false();
    });

    it("works with arrays, behaves like lodash except for holey arrays", () => {
        isEmpty(emptyArray).must.be.true();
        _isEmpty(emptyArray).must.be.true();

        isEmpty(filledArray).must.be.false();
        _isEmpty(filledArray).must.be.false();

        isEmpty(holeyArray).must.be.true();
        _isEmpty(holeyArray).must.be.false();
    });

    it("works with arguments, behaves like lodash", () => {
        isEmpty(emptyArgs).must.be.true();
        _isEmpty(emptyArgs).must.be.true();

        isEmpty(filledArgs).must.be.false();
        _isEmpty(filledArgs).must.be.false();
    });

    it("works with Buffers, behaves like lodash", () => {
        isEmpty(emptyBuffer).must.be.true();
        _isEmpty(emptyBuffer).must.be.true();

        isEmpty(filledBuffer).must.be.false();
        _isEmpty(filledBuffer).must.be.false();
    });

    it("works with objects, behaves like lodash", () => {
        isEmpty(emptyObject).must.be.true();
        _isEmpty(emptyObject).must.be.true();

        isEmpty(filledObject).must.be.false();
        _isEmpty({ a: 555, b: 666 }).must.be.false();

        isEmpty(nonEnumObject).must.be.true();
        _isEmpty(nonEnumObject).must.be.true();

        isEmpty(inheritedObject).must.be.true();
        _isEmpty(inheritedObject).must.be.true();
    });

    it("works with typed arrays, behaves like lodash", () => {
        isEmpty(emptyTypedArray).must.be.true();
        _isEmpty(emptyTypedArray).must.be.true();

        isEmpty(filledTypedArray).must.be.false();
        _isEmpty(filledTypedArray).must.be.false();
    });

    it("returns true for nil values", function() {
        isEmpty(null).must.be.true();
        isEmpty(undefined).must.be.true();
    });

    it("throws on primitives", () => {
        (() => isEmpty(0)).must.throw();
        (() => isEmpty(100)).must.throw();
        (() => isEmpty(true)).must.throw();
        (() => isEmpty(false)).must.throw();
        (() => isEmpty(Infinity)).must.throw();
        (() => isEmpty(NaN)).must.throw();
        (() => isEmpty(() => {})).must.throw();
    });
});
