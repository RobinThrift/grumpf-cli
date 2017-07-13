///<reference path='../node_modules/immutable/dist/Immutable.d.ts'/>
///<reference path='../typings/tsd.d.ts'/>
(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", 'q', 'fs', 'immutable', 'toml', 'js-yaml', 'lodash'], function (require, exports) {
    var q_1 = require('q');
    var fs_1 = require('fs');
    var rf = q_1.nfbind(fs_1.readFile);
    var immutable_1 = require('immutable');
    var ENDING = /[\w\-]+\.(.+)$/;
    function fileExtension(path) {
        var match = ENDING.exec(path);
        if (match) {
            return match[1].toLowerCase();
        }
        else {
            return '';
        }
    }
    var FILE_TYPE_HEADER = /^#\s*([a-z]+)\n/i;
    function fileHeader(contents) {
        var match = FILE_TYPE_HEADER.exec(contents);
        if (match) {
            return match[1].toLowerCase();
        }
        else {
            return '';
        }
    }
    function fileType(path, contents) {
        var ftype = fileExtension(path);
        if (!ftype) {
            ftype = fileHeader(contents);
        }
        return ftype;
    }
    function loadFile(path) {
        return rf(path, 'utf8');
    }
    function loadJSON(contents) {
        var res = { value: null, error: null };
        try {
            res.value = JSON.parse(contents);
        }
        catch (e) {
            res.error = e;
        }
        return res;
    }
    ///<reference path='./toml.d.ts'/>
    var toml = require('toml');
    function loadToml(contents) {
        var res = { value: undefined, error: null };
        try {
            res.value = toml.parse(contents);
        }
        catch (e) {
            res.error = e;
        }
        return res;
    }
    var js_yaml_1 = require('js-yaml');
    function loadYaml(contents) {
        var res = { value: undefined, error: null };
        try {
            res.value = js_yaml_1.safeLoad(contents);
        }
        catch (e) {
            res.error = e;
        }
        return res;
    }
    function parseFile(ending, contents) {
        contents = contents.replace(FILE_TYPE_HEADER, '');
        switch (ending) {
            case 'json':
                return loadJSON(contents);
                break;
            case 'toml':
                return loadToml(contents);
                break;
            case 'yaml':
            case 'yml':
                return loadYaml(contents);
                break;
            default:
                return new Error('Config Format not supported');
        }
    }
    var DEFAULTS = {
        enabled: true,
        files: [],
        plugins: immutable_1.Map()
    };
    var lodash_1 = require('lodash');
    function sanitizeConfig(dirty) {
        var clean = lodash_1.clone(DEFAULTS);
        lodash_1.forEach(dirty, function (value, key) {
            if (key === 'plugins') {
                clean.plugins = lodash_1.reduce(dirty.plugins, function (plugins, config, name) {
                    if (typeof config === 'boolean') {
                        config = {};
                    }
                    return plugins.set(name, config);
                }, clean.plugins);
            }
            else {
                clean[key] = value;
            }
        });
        return clean;
    }
    function loadConfig(path) {
        return q_1.Promise(function (resolve, reject) {
            loadFile(path)
                .then(function (contents) {
                var ftype = fileType(path, contents);
                if (!ftype) {
                    return reject(new Error('Can\'t determine file type'));
                }
                else {
                    var _a = parseFile(ftype, contents), value = _a.value, error = _a.error;
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(sanitizeConfig(value));
                    }
                }
            }, reject);
        });
    }
    exports.loadConfig = loadConfig;
});
