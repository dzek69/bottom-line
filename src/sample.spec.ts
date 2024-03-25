// eslint-disable-next-line @typescript-eslint/no-shadow
import must from "must";

import { sample } from "./sample";

describe("sample", () => {
    it("should return any random item of an array", async () => {
        const array = [1, 2, 3, 4, 5];
        const pickSet = new Set<number>();
        for (let i = 0; i < 1000; i++) {
            const item = sample(array);
            must(array).include(item);
            pickSet.add(item);
        }
        must(pickSet.size).equal(5);
    });

    it("should work with 1 item array", async () => {
        const array = [1];
        for (let i = 0; i < 1000; i++) {
            const item = sample(array);
            must(item).equal(1);
        }
    });

    it("should work with 0 items array", async () => {
        const array: never[] = [];
        const item = sample(array);
        must(item).equal(undefined);
    });
});
