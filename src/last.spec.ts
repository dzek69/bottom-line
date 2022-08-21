import { last as _last } from "lodash";

import { last } from "./last.js";

const array = [1, 2];
const holeyArray = [,]; // eslint-disable-line no-sparse-arrays
const holeyArray2 = Array(2);
holeyArray2[0] = 1;
const holeyArray3 = Array(2);
holeyArray3[1] = 1;

const arrayLike = { 0: 0, 1: 1, length: 2 };
const string = "elo";
const object = {};

const emptyMap = new Map();
const filledMap = new Map();
filledMap.set("x", "x");

const emptySet = new Set();
const filledSet = new Set();
filledSet.add("x");

describe("last", () => {
    it("returns last element of typical array, behaves like lodash", () => {
        last(array).must.equal(2);
        _last(array).must.equal(2);
    });

    it("returns last element of holey array, behaves like lodash", () => {
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        (last(holeyArray) === undefined).must.be.true();
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        (_last(holeyArray) === undefined).must.be.true();

        (last(holeyArray2) === undefined).must.be.true();
        (_last(holeyArray2) === undefined).must.be.true();

        last(holeyArray3).must.equal(1);
        _last(holeyArray3).must.equal(1);
    });

    it("returns last element of array-like object, behaves like lodash", () => {
        last(arrayLike).must.equal(1);
        _last(arrayLike).must.equal(1);
    });

    it("returns undefined for standard object, behaves like lodash", () => {
        (last(object) === undefined).must.be.true();
        (_last(object) === undefined).must.be.true();
    });

    it("returns last char of a string, behaves like lodash", () => {
        last(string).must.equal("o");
        _last(string).must.equal("o");
    });

    it("crashes on nil values, behaves NOT like lodash", () => {
        (() => last(null)).must.throw();
        (_last(null) === undefined).must.be.true();

        (() => last()).must.throw();
        (_last() === undefined).must.be.true();
    });

    it("returns undefined for other values, behaves like lodash", () => {
        (last(NaN) === undefined).must.be.true();
        (_last(NaN) === undefined).must.be.true();
        (last(1) === undefined).must.be.true();
        (_last(1) === undefined).must.be.true();
        (last(0) === undefined).must.be.true();
        (_last(0) === undefined).must.be.true();
        (last(true) === undefined).must.be.true();
        (_last(true) === undefined).must.be.true();
        (last(false) === undefined).must.be.true();
        (_last(false) === undefined).must.be.true();
        (last(Infinity) === undefined).must.be.true();
        (_last(Infinity) === undefined).must.be.true();
        (last(emptyMap) === undefined).must.be.true();
        (_last(emptyMap) === undefined).must.be.true();
        (last(filledMap) === undefined).must.be.true();
        (_last(filledMap) === undefined).must.be.true();
        (last(emptySet) === undefined).must.be.true();
        (_last(emptySet) === undefined).must.be.true();
        (last(filledSet) === undefined).must.be.true();
        (_last(filledSet) === undefined).must.be.true();
    });
});
