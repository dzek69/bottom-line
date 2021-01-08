import { pages } from "./pages";

// @TODO add some edge case tests for even amount of pages to display
// maybe test cases for odd number of pages?

describe("pages", () => {
    it("throws when pages to display is less than 7", () => {
        (() => pages(100, 6, 1)).must.throw();
        (() => pages(100, 7, 1)).must.not.throw();
    });

    it("throws when current page is incorrect", () => {
        (() => pages(100, 6, 0)).must.throw();
        (() => pages(100, 6, -1)).must.throw();
        (() => pages(100, 7, 100)).must.not.throw();
    });

    it("generates simple listing when pages to display is bigger than total pages", () => {
        const result = pages(3, 7, 1);
        result.list.must.eql([
            {
                type: "page",
                value: 1,
                current: true,
            },
            {
                type: "page",
                value: 2,
                current: false,
            },
            {
                type: "page",
                value: 3,
                current: false,
            },
        ]);
    });

    it("generates simple listing when pages to display equal as total pages", () => {
        const result = pages(7, 7, 3);
        result.list.must.eql([
            {
                type: "page",
                value: 1,
                current: false,
            },
            {
                type: "page",
                value: 2,
                current: false,
            },
            {
                type: "page",
                value: 3,
                current: true,
            },
            {
                type: "page",
                value: 4,
                current: false,
            },
            {
                type: "page",
                value: 5,
                current: false,
            },
            {
                type: "page",
                value: 6,
                current: false,
            },
            {
                type: "page",
                value: 7,
                current: false,
            },
        ]);
    });

    it(
        "spreads the pages and adds first, last, and holes to the list when there is a lot more pages than to display",
        () => {
            const result = pages(100, 7, 50);
            result.list.must.eql([
                {
                    type: "page",
                    value: 1,
                    current: false,
                },
                {
                    type: "hole",
                },
                {
                    type: "page",
                    value: 49,
                    current: false,
                },
                {
                    type: "page",
                    value: 50,
                    current: true,
                },
                {
                    type: "page",
                    value: 51,
                    current: false,
                },
                {
                    type: "hole",
                },
                {
                    type: "page",
                    value: 100,
                    current: false,
                },
            ]);
        },
    );

    it("handles situations where current page is first or close to first, removing the need for left hole", () => {
        first: { // 1, 2, 3, 4, 5, .., 100
            const result = pages(100, 7, 1);
            result.list.must.eql([
                {
                    type: "page",
                    value: 1,
                    current: true,
                },
                {
                    type: "page",
                    value: 2,
                    current: false,
                },
                {
                    type: "page",
                    value: 3,
                    current: false,
                },
                {
                    type: "page",
                    value: 4,
                    current: false,
                },
                {
                    type: "page",
                    value: 5,
                    current: false,
                },
                {
                    type: "hole",
                },
                {
                    type: "page",
                    value: 100,
                    current: false,
                },
            ]);
        }

        second: { // 1, 2, 3, 4, 5, .., 100
            const result = pages(100, 7, 2);
            result.list.must.eql([
                {
                    type: "page",
                    value: 1,
                    current: false,
                },
                {
                    type: "page",
                    value: 2,
                    current: true,
                },
                {
                    type: "page",
                    value: 3,
                    current: false,
                },
                {
                    type: "page",
                    value: 4,
                    current: false,
                },
                {
                    type: "page",
                    value: 5,
                    current: false,
                },
                {
                    type: "hole",
                },
                {
                    type: "page",
                    value: 100,
                    current: false,
                },
            ]);
        }

        third: { // 1, 2, 3, 4, 5, .., 100
            const result = pages(100, 7, 3);
            result.list.must.eql([
                {
                    type: "page",
                    value: 1,
                    current: false,
                },
                {
                    type: "page",
                    value: 2,
                    current: false,
                },
                {
                    type: "page",
                    value: 3,
                    current: true,
                },
                {
                    type: "page",
                    value: 4,
                    current: false,
                },
                {
                    type: "page",
                    value: 5,
                    current: false,
                },
                {
                    type: "hole",
                },
                {
                    type: "page",
                    value: 100,
                    current: false,
                },
            ]);
        }

        fourth: { // 1, .., 3, 4, 5, .., 100 -- doesn't make sense, so .. should still be 2
            const result = pages(100, 7, 4);
            result.list.must.eql([
                {
                    type: "page",
                    value: 1,
                    current: false,
                },
                {
                    type: "page",
                    value: 2,
                    current: false,
                },
                {
                    type: "page",
                    value: 3,
                    current: false,
                },
                {
                    type: "page",
                    value: 4,
                    current: true,
                },
                {
                    type: "page",
                    value: 5,
                    current: false,
                },
                {
                    type: "hole",
                },
                {
                    type: "page",
                    value: 100,
                    current: false,
                },
            ]);
        }
    });

    it("handles situations where current page is close to first, but left hole is needed", () => {
        const result = pages(100, 7, 5);
        result.list.must.eql([
            {
                type: "page",
                value: 1,
                current: false,
            },
            {
                type: "hole",
            },
            {
                type: "page",
                value: 4,
                current: false,
            },
            {
                type: "page",
                value: 5,
                current: true,
            },
            {
                type: "page",
                value: 6,
                current: false,
            },
            {
                type: "hole",
            },
            {
                type: "page",
                value: 100,
                current: false,
            },
        ]);
    });

    it("handles situations where current page is first or close to first, removing the need for right hole", () => {
        last: { // 1, ..., 96, 97, 98, 99, 100
            const result = pages(100, 7, 100);
            result.list.must.eql([
                {
                    type: "page",
                    value: 1,
                    current: false,
                },
                {
                    type: "hole",
                },
                {
                    type: "page",
                    value: 96,
                    current: false,
                },
                {
                    type: "page",
                    value: 97,
                    current: false,
                },
                {
                    type: "page",
                    value: 98,
                    current: false,
                },
                {
                    type: "page",
                    value: 99,
                    current: false,
                },
                {
                    type: "page",
                    value: 100,
                    current: true,
                },
            ]);
        }

        secondFromLast: { // 1, ..., 96, 97, 98, 99, 100
            const result = pages(100, 7, 99);
            result.list.must.eql([
                {
                    type: "page",
                    value: 1,
                    current: false,
                },
                {
                    type: "hole",
                },
                {
                    type: "page",
                    value: 96,
                    current: false,
                },
                {
                    type: "page",
                    value: 97,
                    current: false,
                },
                {
                    type: "page",
                    value: 98,
                    current: false,
                },
                {
                    type: "page",
                    value: 99,
                    current: true,
                },
                {
                    type: "page",
                    value: 100,
                    current: false,
                },
            ]);
        }

        thirdFromLast: { // 1, ..., 96, 97, 98, 99, 100
            const result = pages(100, 7, 98);
            result.list.must.eql([
                {
                    type: "page",
                    value: 1,
                    current: false,
                },
                {
                    type: "hole",
                },
                {
                    type: "page",
                    value: 96,
                    current: false,
                },
                {
                    type: "page",
                    value: 97,
                    current: false,
                },
                {
                    type: "page",
                    value: 98,
                    current: true,
                },
                {
                    type: "page",
                    value: 99,
                    current: false,
                },
                {
                    type: "page",
                    value: 100,
                    current: false,
                },
            ]);
        }

        fourthFromLast: { // 1, .., 96, 97, 98, .., 100 -- doesn't make sense, so .. should still be 99
            const result = pages(100, 7, 97);
            result.list.must.eql([
                {
                    type: "page",
                    value: 1,
                    current: false,
                },
                {
                    type: "hole",
                },
                {
                    type: "page",
                    value: 96,
                    current: false,
                },
                {
                    type: "page",
                    value: 97,
                    current: true,
                },
                {
                    type: "page",
                    value: 98,
                    current: false,
                },
                {
                    type: "page",
                    value: 99,
                    current: false,
                },
                {
                    type: "page",
                    value: 100,
                    current: false,
                },
            ]);
        }
    });

    it("handles situations where current page is close to last, but right hole is needed", () => {
        const result = pages(100, 7, 96);
        result.list.must.eql([
            {
                type: "page",
                value: 1,
                current: false,
            },
            {
                type: "hole",
            },
            {
                type: "page",
                value: 95,
                current: false,
            },
            {
                type: "page",
                value: 96,
                current: true,
            },
            {
                type: "page",
                value: 97,
                current: false,
            },
            {
                type: "hole",
            },
            {
                type: "page",
                value: 100,
                current: false,
            },
        ]);
    });
});
