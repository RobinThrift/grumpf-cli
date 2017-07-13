(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", 'commander', 'path', 'lodash', './configLoader', 'glob'], function (require, exports) {
    ///<reference path="../typings/tsd.d.ts" />
    ///<reference path="../node_modules/immutable/dist/immutable.d.ts" />
    ///<reference path="../node_modules/grumpf/dist/parser.d.ts" />
    var program = require('commander');
    var DEFAULTS = {
        config: '.grumpfrc',
        out: 'grumpf.json',
        cwd: undefined
    };
    function cli(cwd, args) {
        program
            .version('1.0.0')
            .option('-c, --config <path>', 'Config File Path, defaults to .grumpfrc', DEFAULTS.config)
            .option('-o, --out <path>', 'Output path for the json file, defaults to grumpf.json', DEFAULTS.out)
            .option('--cwd <path>', 'Set CWD', cwd)
            .option('-f, --files <pattern>', 'Files to scan')
            .parse(args);
        DEFAULTS.cwd = cwd;
        grumpf(program);
    }
    exports.cli = cli;
    var path_1 = require('path');
    var lodash_1 = require('lodash');
    var configLoader_1 = require('./configLoader');
    var glob = require('glob');
    // import {parse} from 'grumpf';
    function grumpf(args) {
        var cwd = args.cwd, config = args.config, files = args.files;
        if (config.indexOf('/')) {
            config = path_1.join(cwd, config);
        }
        configLoader_1.loadConfig(config)
            .then(function (c) {
            config = lodash_1.assign({}, c, DEFAULTS);
            glob(files || config.files, { cwd: cwd }, function (err, files) {
                if (err) {
                    throw err;
                }
                console.log(files);
            });
        });
    }
});
// function writeFiles() {
// }
