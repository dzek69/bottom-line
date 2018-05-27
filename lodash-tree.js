// Sample script that counts imports of lodash method

const Module = require('module');

const originalRequire = Module.prototype.require;
const calls = [];
Module.prototype.require = function() {
    calls.push(arguments);
    return originalRequire.apply(this, arguments);
};

const pick = require("lodash/pick");

console.log(calls.length, pick);