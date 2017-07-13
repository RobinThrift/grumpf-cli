///<reference path='../node_modules/immutable/dist/Immutable.d.ts'/>
///<reference path='../typings/tsd.d.ts'/>
import {Map} from 'immutable';
import * as debug from 'debug';
let d = debug('grumpf:plugins');

const SUFFIXES = ['', '-grumpf-plugin', '-grumpf'];
export function loadPlugins(plugins: Map<string, Object>) {
    return plugins.map((config, name) => {
        let plugin: Plugin = null,
            found = false;
        SUFFIXES.forEach((suffix) => {
            if (!found) {
                try {
                    d(`trying to require file: ${name}${suffix}`);
                    plugin = require(`${name}${suffix}`)(config);
                    found = true;
                } catch (e) {
                }
            }
        });
        if (!found) {
            throw Error(`Can\'t find plugin with name "${name}"`);
        } else {
            return plugin;
        }
    });
}
