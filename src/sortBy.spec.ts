import { sortBy } from "./sortBy";

describe("sortBy", () => {
    const items = [
        {
            name: "Astra",
        },
        {
            name: "Zorro",
        },
        {
            name: "Ewelina",
        },
    ];

    it("must sort asc", () => {
        items.sort(sortBy("name")).must.eql([
            {
                name: "Astra",
            },
            {
                name: "Ewelina",
            },
            {
                name: "Zorro",
            },
        ]);
    });

    it("must sort desc", () => {
        items.sort(sortBy("name", false)).must.eql([
            {
                name: "Zorro",
            },
            {
                name: "Ewelina",
            },
            {
                name: "Astra",
            },
        ]);
    });

    it("must sort given property", () => {
        const sizes = [
            { size: 30 },
            { size: 90 },
            { size: 50 },
        ];
        sizes.sort(sortBy("size")).must.eql([
            { size: 30 },
            { size: 50 },
            { size: 90 },
        ]);
    });
});
