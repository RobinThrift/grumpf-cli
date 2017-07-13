///<reference path="../typings/tsd.d.ts" />
///<reference path="../node_modules/immutable/dist/immutable.d.ts" />
///<reference path="../node_modules/grumpf/dist/parser.d.ts" />
import * as program from 'commander';

const DEFAULTS = {
    config: '.grumpfrc',
    out: 'grumpf.json',
    cwd: undefined
};

export function cli(cwd: string, args: string[]) {
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

import {join} from 'path';
import {assign} from 'lodash';
import {loadConfig} from './configLoader';
import glob = require('glob');
// import {parse} from 'grumpf';
function grumpf(args) {
    let {cwd, config, files} = args;
    if (config.indexOf('/')) { // not first char
        config = join(cwd, config);
    }

    loadConfig(config)
        .then((c) => {
            config = assign({}, c, DEFAULTS);
            glob(files || config.files, {cwd}, (err, files) => {
                if (err) { throw err; }
                console.log(files);
            });
        });
}

// function writeFiles() {

// }
