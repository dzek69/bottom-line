const { join } = require("path");
const fs = require("fs-extra");

const main = async () => {
    const allFiles = await fs.readdir("src");
    const files = allFiles.filter((name) => {
        return name.endsWith(".js") && !name.endsWith(".spec.js");
    });
    await Promise.all(files.map(name => fs.copy(join("src", name), name)));
    console.log(files.length, "files copied.");
};
main();