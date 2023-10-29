import { round } from "./round";

describe("round", () => {
    it("rounds the values without precision", async () => {
        round(1.23).must.equal(1);
        round(1.55).must.equal(2);
        round(1.5).must.equal(2);
        round(1.49999).must.equal(1);
    });

    it("rounds the values with precision", async () => {
        round(1.23, 1).must.equal(1.2);
        round(1.55, 1).must.equal(1.6);
        round(1.5, 1).must.equal(1.5);
        round(1.49999, 1).must.equal(1.5);

        round(1.5, 2).must.equal(1.5);
    });

    it("rounds the tricky values", async () => {
        round(0.1 + 0.2, 1).must.equal(0.3);
    });

    it("rounds with higher precision", async () => {
        round(1.2, 6).must.equal(1.2);
    });
});
