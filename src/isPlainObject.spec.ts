import { isPlainObject } from "./isPlainObject.js";

describe("isPlainObject", function() {
    it("rejects anything non object-like", function() {
        isPlainObject(null).must.be.false();
        isPlainObject(5).must.be.false();
        isPlainObject(() => ({})).must.be.false();
        isPlainObject(false).must.be.false();
        isPlainObject(new URL("https://ezez.dev")).must.be.false();
        isPlainObject([]).must.be.false();

        // eslint-disable-next-line @typescript-eslint/no-extraneous-class
        class X {}
        isPlainObject(X).must.be.false();
    });

    it("accepts plain objects", function() {
        isPlainObject({}).must.be.true();
        isPlainObject({ some: "data" }).must.be.true();
        isPlainObject({ some: function fn() {} }).must.be.true();
        isPlainObject(Object.create(null)).must.be.true();
        isPlainObject({ constructor: () => null }).must.be.true();
    });

    it("shouldn't accept any instances", function() {
        // eslint-disable-next-line @typescript-eslint/no-extraneous-class
        class X {}
        isPlainObject(new X()).must.be.false();

        // eslint-disable-next-line func-style
        function MyObject() {}
        // @ts-expect-error we don't care
        isPlainObject(new MyObject()).must.be.false();
    });
});
