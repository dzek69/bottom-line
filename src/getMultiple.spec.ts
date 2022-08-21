import { getMultiple } from "./getMultiple.js";

const testObject = {
    product: {
        title: "abc",
        nothing: undefined,
    },
};

describe("getMultiple", () => {
    it("returns first property that exist, with mixed selectors", () => {
        const value = getMultiple(testObject, 123, ["product", "xxx"], "product.title");
        value.must.equal("abc");
    });

    it("returns first property that exist even if value is undefined", () => {
        const value = getMultiple(testObject, 123, ["product", "nothing"], "product.title");
        (value === undefined).must.be.true();
    });

    it("returns default value when nothing exists", () => {
        const value = getMultiple(testObject, 123, ["product", "name"], "product.price");
        value.must.equal(123);
    });
});
