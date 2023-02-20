import { isNumericString } from "./isNumericString.js";

describe("isNumericString", function() {
    it("crashes on non-strings", function() {
        (() => isNumericString(1)).must.throw(TypeError);
        (() => isNumericString({})).must.throw(TypeError);
        (() => isNumericString([])).must.throw(TypeError);
        (() => isNumericString(true)).must.throw(TypeError);
        (() => isNumericString(() => null)).must.throw(TypeError);
        (() => isNumericString(null)).must.throw(TypeError);
        (() => isNumericString([1])).must.throw(TypeError);
        (() => isNumericString(NaN)).must.throw(TypeError);
    });

    it("returns true for basic numeric strings", function() {
        isNumericString("1").must.be.true();
        isNumericString("0").must.be.true();
        isNumericString("-1").must.be.true();
        isNumericString("123").must.be.true();
    });

    it("only allows floats when requested", function() {
        isNumericString("1.2", { allowFloats: true }).must.be.true();
        isNumericString("1.2", { allowFloats: false }).must.be.false();
        isNumericString("1.2").must.be.false();

        isNumericString(".2", { allowFloats: true }).must.be.true();
        isNumericString("2.", { allowFloats: true }).must.be.true();
    });

    it("only allow exponents when requested", function() {
        isNumericString("1e2", { allowExponents: true }).must.be.true();
        isNumericString("1e2", { allowExponents: false }).must.be.false();
        isNumericString("1e2").must.be.false();

        isNumericString("1e+2", { allowExponents: true }).must.be.true();
        isNumericString("1e-2", { allowExponents: true }).must.be.true();
        isNumericString("1e2", { allowExponents: true }).must.be.true();
        isNumericString("1E-2", { allowExponents: true }).must.be.true();
        isNumericString("1E+2", { allowExponents: true }).must.be.true();
        isNumericString("1E2", { allowExponents: true }).must.be.true();

        isNumericString("1e+2").must.be.false();
        isNumericString("1e-2").must.be.false();
        isNumericString("1e2").must.be.false();
        isNumericString("1E-2").must.be.false();
        isNumericString("1E+2").must.be.false();
        isNumericString("1E2").must.be.false();
    });

    it("only allows expotents with floats when requested", function() {
        isNumericString("1.3e2", { allowExponents: true, allowFloats: true }).must.be.true();
        isNumericString("1.3e2", { allowExponents: false, allowFloats: true }).must.be.false();
        isNumericString("1.3e2", { allowExponents: true, allowFloats: false }).must.be.false();

        isNumericString(".3e2", { allowExponents: true, allowFloats: true }).must.be.true();
    });

    it("returns false for non-numeric strings", function() {
        isNumericString("+5").must.be.false();
        isNumericString("a").must.be.false();
        isNumericString("1a").must.be.false();
        isNumericString("a1").must.be.false();
        isNumericString("1e").must.be.false();
        isNumericString("1e-+1").must.be.false();
        isNumericString("1e+-1").must.be.false();
        isNumericString("1e--1").must.be.false();
        isNumericString("1e++1").must.be.false();
        isNumericString("1e10e2").must.be.false();
        isNumericString("1.2.3").must.be.false();
        isNumericString("1.2e3.4").must.be.false();
        isNumericString("1.2e-3.4").must.be.false();
        isNumericString("1.2e+3.4").must.be.false();
        isNumericString("NaN").must.be.false();
        isNumericString("12e20-2").must.be.false();
        isNumericString("12e20+2").must.be.false();
        isNumericString("12+e202").must.be.false();
        isNumericString("12-e202").must.be.false();
        isNumericString("1+2e202").must.be.false();
        isNumericString("1-2e202").must.be.false();
    });

    it("allows NaN when requeted", function() {
        isNumericString("NaN", { allowNaN: true }).must.be.true();
        isNumericString("NaN", { allowNaN: false }).must.be.false();

        isNumericString("-NaN", { allowNaN: false }).must.be.false();
        isNumericString("+NaN", { allowNaN: false }).must.be.false();
    });

    it("allows positive and negative Infinity when requested", function() {
        isNumericString("Infinity", { allowInfinity: true }).must.be.true();
        isNumericString("Infinity", { allowInfinity: false }).must.be.false();
        isNumericString("-Infinity", { allowInfinity: true }).must.be.true();
        isNumericString("-Infinity", { allowInfinity: false }).must.be.false();

        // plus is still not allowed
        isNumericString("+Infinity", { allowInfinity: true }).must.be.false();
    });
});
