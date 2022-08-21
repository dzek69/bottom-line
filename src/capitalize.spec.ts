import { capitalize } from "./capitalize.js";

describe("capitalize", () => {
    it("capitalizes first letter", () => {
        const string = "abcd";
        capitalize(string).must.equal("Abcd");
    });

    it("doesn't touch other characters by default", function() {
        const string = "aBcD";
        capitalize(string).must.equal("ABcD");
    });

    it("converts other to small caps if reqested", function() {
        const string = "aBcD";
        capitalize(string, true).must.equal("Abcd");
    });
});
