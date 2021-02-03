import { pack } from "./pack";

describe("pack", () => {
    it("must limit pack by total size", () => { // @TODO split into smaller tests
        const files = [
            {
                size: 100,
                name: "one",
            },
            {
                size: 200,
                name: "two",
            },
            {
                size: 100,
                name: "three",
            },
        ];

        const { packed, rejected } = pack(files, 10, 250);

        rejected.must.have.length(0);
        packed.must.have.length(2);
        packed[0].must.eql([files[1]]);
        packed[1].must.eql([files[0], files[2]]);
    });

    it("must reject too big items", () => { // @TODO split into smaller tests
        const files = [
            {
                size: 400,
                name: "one",
            },
            {
                size: 200,
                name: "two",
            },
            {
                size: 500,
                name: "three",
            },
        ];

        const { packed, rejected } = pack(files, 10, 250);

        rejected.must.have.length(2);
        packed.must.have.length(1);

        rejected.must.eql([files[0], files[2]]);
        packed[0].must.eql([files[1]]);
    });

    it("limits pack by items limit", () => { // @TODO split into smaller tests
        const files = [
            {
                size: 10,
                name: "one",
            },
            {
                size: 10,
                name: "two",
            },
            {
                size: 10,
                name: "three",
            },
            {
                size: 200,
                name: "four",
            },
            {
                size: 30,
                name: "five",
            },
            {
                size: 30,
                name: "six",
            },
        ];

        const { packed, rejected } = pack(files, 3, 250);

        rejected.must.have.length(0);
        packed.must.have.length(2);

        packed[0].must.eql([files[3], files[4], files[0]]);
        packed[1].must.eql([files[5], files[1], files[2]]);
    });

    it("allows items without size", () => { // @TODO split into smaller tests
        const files = [
            {
                size: 10,
                name: "one",
            },
            {
                name: "two",
            },
            {
                size: 30,
                name: "three",
            },
        ];

        const { packed, rejected } = pack(files, 2, 250);

        rejected.must.have.length(0);
        packed.must.have.length(2);

        packed[0].must.eql([files[2], files[0]]);
        packed[1].must.eql([files[1]]);
    });
});
