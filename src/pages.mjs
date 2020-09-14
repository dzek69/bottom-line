const DEFAULT_DISPLAY = 7;

// eslint-disable-next-line no-magic-numbers
const isEven = val => val % 2 === 0;

// eslint-disable-next-line max-lines-per-function, max-statements
const pages = (totalPages, display = DEFAULT_DISPLAY, current = 1) => {
    if (display < DEFAULT_DISPLAY) {
        throw new TypeError("Pages to display must be at least 7");
    }
    if (current < 1 || current > totalPages) {
        throw new TypeError("Current page must be between 1 and total pages");
    }

    let first = 1,
        last = totalPages,

        left = "..",
        right = "..";

    const list = [];

    if (display >= totalPages) {
        // eslint-disable-next-line max-statements-per-line
        first = null; last = null; left = null; right = null;

        for (let i = 1; i <= totalPages; i++) {
            list.push({
                type: "page",
                value: i,
                current: i === current,
            });
        }
    }
    else {
        // eslint-disable-next-line no-magic-numbers
        const spreadCount = display - 4; // exclude .., .., first, last
        // eslint-disable-next-line no-magic-numbers
        const halfSpread = Math.floor(spreadCount / 2);
        let spreadFrom = current - halfSpread;
        if (isEven(spreadCount)) {
            spreadFrom += 1;
        }
        let spreadTo = current + halfSpread;

        if (spreadFrom < 1) {
            const diff = 1 - spreadFrom;
            spreadFrom = 1;
            spreadTo += diff;
        }
        // eslint-disable-next-line no-magic-numbers
        if (spreadFrom <= 2) {
            left = null;
            spreadTo++;
        }
        if (spreadFrom === 1) {
            first = null;
            spreadTo++;
        }
        // eslint-disable-next-line no-magic-numbers
        if (left && first && spreadFrom === 3) {
            spreadFrom = 1;
            first = null;
            left = null;
        }

        if (spreadTo > totalPages) {
            const diff = (spreadTo - totalPages);
            spreadTo = totalPages;
            spreadFrom -= diff;
        }
        if (spreadTo >= totalPages - 1) {
            right = null;
            spreadFrom--;
        }
        if (spreadTo === totalPages) {
            last = null;
            spreadFrom--;
        }
        // eslint-disable-next-line no-magic-numbers
        if (right && last && spreadTo === totalPages - 2) {
            spreadTo = totalPages;
            last = null;
            right = null;
        }

        for (let i = spreadFrom; i <= spreadTo; i++) {
            list.push({
                type: "page",
                value: i,
                current: i === current,
            });
        }
    }

    if (left) {
        list.unshift({
            type: "hole",
        });
    }

    if (first) {
        list.unshift({
            type: "page",
            value: 1,
            current: current === 1,
        });
    }

    if (right) {
        list.push({
            type: "hole",
        });
    }

    if (last) {
        list.push({
            type: "page",
            value: totalPages,
            current: current === totalPages,
        });
    }

    const prev = current > 1 ? current - 1 : null;
    const next = current < totalPages ? current + 1 : null;

    return {
        list,
        prev,
        next,
    };
};

export default pages;
