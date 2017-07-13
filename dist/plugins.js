(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", 'debug'], function (require, exports) {
    var debug = require('debug');
    var d = debug('grumpf:plugins');
    var SUFFIXES = ['', '-grumpf-plugin', '-grumpf'];
    function loadPlugins(plugins) {
        return plugins.map(function (config, name) {
            var plugin = null, found = false;
            SUFFIXES.forEach(function (suffix) {
                if (!found) {
                    try {
                        d("trying to require file: " + name + suffix);
                        plugin = require("" + name + suffix)(config);
                        found = true;
                    }
                    catch (e) {
                    }
                }
            });
            if (!found) {
                throw Error("Can't find plugin with name \"" + name + "\"");
            }
            else {
                return plugin;
            }
        });
    }
    exports.loadPlugins = loadPlugins;
});
