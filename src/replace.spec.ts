import { replace } from "./replace.js";

describe("replace", () => {
    it("does a basic replace", () => {
        replace("Hello, %name%!", { "%name%": "John" }).must.equal("Hello, John!");
    });

    it("replaces multiple occurrences", () => {
        replace("Hello, %name%! Nice to meet you %name%!", { "%name%": "Jane" })
            .must.equal("Hello, Jane! Nice to meet you Jane!");
    });

    it("replaces multiple occurences of multiple variables", () => {
        replace("Hello, %name%, your age is %age%! Nice to meet you %age% yo %name%!",
            { "%name%": "Jane", "%age%": "30" },
        ).must.equal("Hello, Jane, your age is 30! Nice to meet you 30 yo Jane!");
    });

    it("doesn't break on regexp characters", () => {
        replace("Hello.", { ".": "!" }).must.equal("Hello!");
    });

    it("replaces nothing when empty object given", async () => {
        replace("Hello.", {}).must.equal("Hello.");
    });
});
