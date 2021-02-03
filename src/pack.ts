import { match } from "./match.js";
import { sortBy } from "./sortBy.js";

interface Elem {
    size?: number;
}

const NOT_FOUND = -1;

const findBiggestFit = (pkg: Elem[], items: Elem[], limit: number) => {
    const pkgTotalSize = pkg.reduce((total, current) => { return total + (current.size ?? 0); }, 0);
    return items.findIndex(item => (item.size ?? 0) + pkgTotalSize <= limit);
};

// eslint-disable-next-line max-statements
const pack = (files: Elem[], packSize: number, sizeLimit: number) => {
    const { matched, unmatched } = match(files, item => (item.size ?? 0) > sizeLimit);

    const packed: Elem[][] = [];
    const rejected = matched;

    if (!unmatched.length) {
        return {
            rejected, packed,
        };
    }

    const sorted = unmatched.sort(
        // @ts-expect-error TypeScript weirdness here?
        sortBy("size", false, 0),
    );

    packed.push([]);

    let currentPackage = 0;
    while (sorted.length) {
        const idx = findBiggestFit(packed[currentPackage], sorted, sizeLimit);
        if (idx === NOT_FOUND) {
            packed.push([]);
            currentPackage++;
            continue;
        }

        packed[currentPackage].push(sorted[idx]);
        sorted.splice(idx, 1);

        if (sorted.length && packed[currentPackage].length >= packSize) {
            packed.push([]);
            currentPackage++;
        }
    }

    return {
        rejected, packed,
    };
};

export {
    pack,
};
