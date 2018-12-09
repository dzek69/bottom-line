const fs = require("fs-extra");

const main = async () => {
    const allFiles = await fs.readdir(".");
    const files = allFiles.filter((name) => {
        return name.endsWith(".js");
    });
    await Promise.all(files.map(name => fs.remove(name)));
    console.info(files.length, "files removed.");
};
main();
