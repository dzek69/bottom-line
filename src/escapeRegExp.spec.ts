import { escapeRegExp } from "./escapeRegExp.js";

describe("escapeRegExp", () => {
    it("it should escape dot", () => {
        const userName = ".";
        const regex = new RegExp(`^(maciek|${escapeRegExp(userName)})$`, "u");
        const result = regex.test("maciek");
        result.must.be.true();

        const result2 = regex.test("stefan");
        result2.must.be.false();

        const result3 = regex.test(",");
        result3.must.be.false();

        const result4 = regex.test(".");
        result4.must.be.true();

        const result5 = regex.test("...");
        result5.must.be.false();
    });

    it("should escape complex string", () => {
        const userName = "([{^|";
        const fn = () => new RegExp(`^(maciek|${escapeRegExp(userName)})$`, "u");
        fn.must.not.throw();

        const fnNoEscape = () => new RegExp(`^(maciek|${userName})$`, "u");
        fnNoEscape.must.throw();
    });

    // @TODO add tests for missing u flag, test if this flag changed anything in fn behavior
});
