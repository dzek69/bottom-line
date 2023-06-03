import { formatDate } from "./formatDate.js";

describe("dateFormat", () => {
    it("doesn't support %a and %A", async () => {
        (() => formatDate(new Date(2021, 0, 1), "%a")).must.throw();
        (() => formatDate(new Date(2021, 0, 1), "%A")).must.throw();
    });

    it("works with %d", async () => {
        formatDate(new Date(2021, 0, 1), "%d").must.equal("01");
    });

    it("works with %e", async () => {
        formatDate(new Date(2021, 0, 1), "%e").must.equal(" 1");
    });

    it("works with %j", async () => {
        formatDate(new Date(2021, 0, 1), "%j").must.equal("001");
        formatDate(new Date(2021, 1, 3), "%j").must.equal("034");
        formatDate(new Date(2021, 11, 31), "%j").must.equal("365");
        formatDate(new Date(2016, 11, 31), "%j").must.equal("366");
    });

    it("works with %u", async () => {
        formatDate(new Date(2023, 5, 1), "%u").must.equal("4");
        formatDate(new Date(2023, 5, 2), "%u").must.equal("5");
        formatDate(new Date(2023, 5, 3), "%u").must.equal("6");
        formatDate(new Date(2023, 5, 4), "%u").must.equal("7");
        formatDate(new Date(2023, 5, 5), "%u").must.equal("1");
        formatDate(new Date(2023, 5, 6), "%u").must.equal("2");
        formatDate(new Date(2023, 5, 7), "%u").must.equal("3");
    });

    it("works with %w", async () => {
        formatDate(new Date(2023, 5, 1), "%w").must.equal("4");
        formatDate(new Date(2023, 5, 2), "%w").must.equal("5");
        formatDate(new Date(2023, 5, 3), "%w").must.equal("6");
        formatDate(new Date(2023, 5, 4), "%w").must.equal("0");
        formatDate(new Date(2023, 5, 5), "%w").must.equal("1");
        formatDate(new Date(2023, 5, 6), "%w").must.equal("2");
        formatDate(new Date(2023, 5, 7), "%w").must.equal("3");
    });

    it("doesn't support %U, %V nor %W", async () => {
        (() => formatDate(new Date(2021, 0, 1), "%U")).must.throw();
        (() => formatDate(new Date(2021, 0, 1), "%V")).must.throw();
        (() => formatDate(new Date(2021, 0, 1), "%W")).must.throw();
    });

    it("doesn't work with %b, %B nor %h", async () => {
        (() => formatDate(new Date(2021, 0, 1), "%b")).must.throw();
        (() => formatDate(new Date(2021, 0, 1), "%B")).must.throw();
        (() => formatDate(new Date(2021, 0, 1), "%h")).must.throw();
    });

    it("works with %m", async () => {
        formatDate(new Date(2021, 0, 1), "%m").must.equal("01");
        formatDate(new Date(2021, 11, 1), "%m").must.equal("12");
    });

    it("doesn't work with %C, %g nor %G", async () => {
        (() => formatDate(new Date(2021, 0, 1), "%C")).must.throw();
        (() => formatDate(new Date(2021, 0, 1), "%g")).must.throw();
        (() => formatDate(new Date(2021, 0, 1), "%G")).must.throw();
    });

    it("works with %y", async () => {
        formatDate(new Date(2021, 0, 1), "%y").must.equal("21");
        formatDate(new Date(2033, 0, 1), "%y").must.equal("33");
    });

    it("works with %Y", async () => {
        formatDate(new Date(2021, 0, 1), "%Y").must.equal("2021");
        formatDate(new Date(2033, 0, 1), "%Y").must.equal("2033");
    });

    it("works with %H", async () => {
        formatDate(new Date(2021, 0, 1, 0), "%H").must.equal("00");
        formatDate(new Date(2021, 0, 1, 23), "%H").must.equal("23");
    });

    it("works with %k", async () => {
        formatDate(new Date(2021, 0, 1, 0), "%k").must.equal(" 0");
        formatDate(new Date(2021, 0, 1, 23), "%k").must.equal("23");
    });

    it("works with %I", async () => {
        formatDate(new Date(2021, 0, 1, 0), "%I").must.equal("12");
        formatDate(new Date(2021, 0, 1, 23), "%I").must.equal("11");
    });

    it("works with %l", async () => {
        formatDate(new Date(2021, 0, 1, 0), "%l").must.equal("12");
        formatDate(new Date(2021, 0, 1, 18), "%l").must.equal(" 6");
    });

    it("works with %M", async () => {
        formatDate(new Date(2021, 0, 1, 0, 0), "%M").must.equal("00");
        formatDate(new Date(2021, 0, 1, 0, 59), "%M").must.equal("59");
    });

    it("works with %p", async () => {
        formatDate(new Date(2021, 0, 1, 0), "%p").must.equal("AM");
        formatDate(new Date(2021, 0, 1, 3), "%p").must.equal("AM");
        formatDate(new Date(2021, 0, 1, 11), "%p").must.equal("AM");
        formatDate(new Date(2021, 0, 1, 12), "%p").must.equal("PM");
        formatDate(new Date(2021, 0, 1, 14), "%p").must.equal("PM");
    });

    it("works with %P", async () => {
        formatDate(new Date(2021, 0, 1, 0), "%P").must.equal("am");
        formatDate(new Date(2021, 0, 1, 3), "%P").must.equal("am");
        formatDate(new Date(2021, 0, 1, 11), "%P").must.equal("am");
        formatDate(new Date(2021, 0, 1, 12), "%P").must.equal("pm");
        formatDate(new Date(2021, 0, 1, 14), "%P").must.equal("pm");
    });

    it("works with %r", async () => {
        formatDate(new Date(2021, 0, 1, 0, 0), "%r").must.equal("12:00:00 AM");
        formatDate(new Date(2021, 0, 1, 3, 0), "%r").must.equal("03:00:00 AM");
        formatDate(new Date(2021, 0, 1, 11, 0), "%r").must.equal("11:00:00 AM");
        formatDate(new Date(2021, 0, 1, 12, 0), "%r").must.equal("12:00:00 PM");
        formatDate(new Date(2021, 0, 1, 14, 0), "%r").must.equal("02:00:00 PM");
    });

    it("works with %R", async () => {
        formatDate(new Date(2021, 0, 1, 0, 0), "%R").must.equal("00:00");
        formatDate(new Date(2021, 0, 1, 3, 0), "%R").must.equal("03:00");
        formatDate(new Date(2021, 0, 1, 11, 0), "%R").must.equal("11:00");
        formatDate(new Date(2021, 0, 1, 12, 0), "%R").must.equal("12:00");
        formatDate(new Date(2021, 0, 1, 14, 0), "%R").must.equal("14:00");
    });

    it("works with %S", async () => {
        formatDate(new Date(2021, 0, 1, 0, 0), "%S").must.equal("00");
        formatDate(new Date(2021, 0, 1, 3, 0, 23), "%S").must.equal("23");
        formatDate(new Date(2021, 0, 1, 11, 0, 44), "%S").must.equal("44");
    });

    it("works with %T", async () => {
        formatDate(new Date(2021, 0, 1, 0, 0), "%T").must.equal("00:00:00");
        formatDate(new Date(2021, 0, 1, 3, 0, 23), "%T").must.equal("03:00:23");
        formatDate(new Date(2021, 0, 1, 11, 0, 44), "%T").must.equal("11:00:44");
    });

    it("doesn't work with %X", async () => {
        (() => formatDate(new Date(2021, 0, 1, 0, 0), "%X")).must.throw();
    });

    it("doesn't work with %z and %Z", () => {
        (() => formatDate(new Date(2021, 0, 1, 0, 0), "%z")).must.throw();
        (() => formatDate(new Date(2021, 0, 1, 0, 0), "%Z")).must.throw();
    });

    it("doesn't work with %c", () => {
        (() => formatDate(new Date(2021, 0, 1, 0, 0), "%c")).must.throw();
    });

    it("doesn't work with %D and %x", () => {
        (() => formatDate(new Date(2021, 0, 1, 0, 0), "%D")).must.throw();
        (() => formatDate(new Date(2021, 0, 1, 0, 0), "%x")).must.throw();
    });

    it("works with %F", async () => {
        formatDate(new Date(2021, 0, 1), "%F").must.equal("2021-01-01");
        formatDate(new Date(2025, 4, 22), "%F").must.equal("2025-05-22");
    });

    it("works with %s", async () => {
        formatDate(new Date(2021, 0, 1), "%s").must.equal("1609455600");
        formatDate(new Date(2025, 4, 22), "%s").must.equal("1747864800");
        formatDate(1609455600000, "%s").must.equal("1609455600");
    });

    it("works with %n %t", async () => {
        formatDate(new Date(2021, 0, 1), "%n").must.equal("\n");
        formatDate(new Date(2021, 0, 1), "%t").must.equal("\t");
    });

    it("works with combined formats", async () => {
        formatDate(new Date(2021, 0, 1, 14, 0, 44), "%Y-%m-%d %H:%M:%S").must.equal("2021-01-01 14:00:44");
        formatDate(new Date(2021, 0, 1, 14, 0, 44), "I was born %S seconds after %H:%M")
            .must.equal("I was born 44 seconds after 14:00");
    });

    describe("edge cases", () => {
        it("should work with double %", async () => {
            formatDate(new Date(2021, 0, 1), "%%").must.equal("%");
            formatDate(new Date(2021, 0, 1), "%%%").must.equal("%%");
            formatDate(new Date(2021, 0, 1), "%%%%").must.equal("%%");

            formatDate(new Date(2021, 0, 1), "%%Y").must.equal("%Y");
            formatDate(new Date(2021, 0, 1), "%%%Y").must.equal("%2021");
            formatDate(new Date(2021, 0, 1), "%%%%Y").must.equal("%%Y");

            formatDate(new Date(2021, 0, 1), "% %%Y").must.equal("% %Y");
        });
    });
});
