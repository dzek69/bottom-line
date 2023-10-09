import { replaceDeep } from "./replaceDeep";

describe("replaceDeep", () => {
    it("should replace given value in a deep object", () => {
        const source = [
            99,
            100,
            {
                favouriteBook: {
                    title: "The Ring of The Lord",
                    price: 100,
                },
                otherBooks: [
                    {
                        title: "Parry Hotter",
                        price: 50,
                        tag: "100",
                    },
                    {
                        title: "The Hobbyte 100",
                        price: [100],
                    },
                ],
            },
        ];

        must(replaceDeep(source, 100, 200)).eql([
            99,
            200,
            {
                favouriteBook: {
                    title: "The Ring of The Lord",
                    price: 200,
                },
                otherBooks: [
                    {
                        title: "Parry Hotter",
                        price: 50,
                        tag: "100",
                    },
                    {
                        title: "The Hobbyte 100",
                        price: [200],
                    },
                ],
            },
        ]);
    });

    it("should leave primitives as-is unless they equal to the search value", () => {
        must(replaceDeep(100, 200, 300)).equal(100);
        must(replaceDeep(200, 200, 300)).equal(300);
        must(replaceDeep("100", 200, 300)).equal("100");
        // ESLINT BUG:
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        must(replaceDeep(undefined, 200, 300)).equal(undefined);
        must(replaceDeep(null, 200, 300)).equal(null);
        must(replaceDeep(true, 200, 300)).equal(true);
        must(replaceDeep(666n, 200, 300)).equal(666n);
    });

    it("should work with nans", async () => {
        must(replaceDeep({
            a: NaN,
            b: 123,
        }, NaN, 300)).eql({
            a: 300,
            b: 123,
        });
    });
});
