#!/usr/bin/env node
(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", './cli'], function (require, exports) {
    var cli_1 = require('./cli');
    cli_1.cli(process.cwd(), process.argv);
});
