const removeDirectory = require("rmdir");

const rmdir = dir => new Promise((resolve, reject) => {
    removeDirectory(dir, (err) => {
        if (err && err.code !== "ENOENT") {
            reject(err);
            return;
        }
        resolve();
    });
});

module.exports = rmdir;
