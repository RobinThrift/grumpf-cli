/// <reference path="../node_modules/immutable/dist/immutable.d.ts" />
/// <reference path="../typings/tsd.d.ts" />
import { Map } from 'immutable';
export declare function loadPlugins(plugins: Map<string, Object>): Immutable.Iterable<string, Plugin>;
