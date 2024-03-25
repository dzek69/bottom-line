// eslint-disable-next-line @typescript-eslint/no-shadow
import must from "must";

import { shuffle } from "./shuffle";

describe("shuffle", () => {
    it("should shuffle the array", async () => {
        for (let i = 0; i < 100; i++) {
            {
                const elements = [1, 2, 3];

                const result = shuffle(elements);
                must(result).have.length(3);

                for (const item of result) {
                    must(elements).include(item);
                }
                must([...new Set(result)]).have.length(3);
            }
        }
    });

    it("should shuffle the array with duplicates", async () => {
        for (let i = 0; i < 100; i++) {
            {
                const elements = [1, 2, 2, 3];

                const result = shuffle(elements);
                must(result).have.length(4);

                for (const item of result) {
                    must(elements).include(item);
                }
                must([...new Set(result)]).have.length(3);
                must(result.filter(r => r === 2).length).equal(2);
            }
        }
    });
});
