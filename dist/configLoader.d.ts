/// <reference path="../node_modules/immutable/dist/immutable.d.ts" />
/// <reference path="../typings/tsd.d.ts" />
import { Promise } from 'q';
import { Map } from 'immutable';
export declare type Config = {
    enabled: boolean;
    files: string[];
    plugins: Map<string, Object>;
};
export declare function loadConfig(path: any): Promise<{}>;
