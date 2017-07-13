import {expect} from 'chai';
import {exec} from 'child_process';
import {join} from 'path';
import {fixtureFilePath} from './helpers';
import assertDirEqual from 'assert-dir-equal';
import {partial} from 'lodash';

function execCmd(argString, cb) {
    exec(join(__dirname, `../dist/grumpf.js ${argString}`), {cwd: __dirname}, (err, stdout) => {
        if (err) { throw err; }
        cb(stdout);
    });
}

let outPath = partial(fixtureFilePath, 'cli');
let tmpPath = partial(fixtureFilePath, 'cli');

suite('Grumpf - CLI', () => {
    suiteSetup((done) => {
        exec(`chmod +x ${join(process.cwd(), 'dist/grumpf.js')}`, () => {
            done();
        });
    });

    test('version', (done) => {
        execCmd('--version', (stdout) => {
            expect(stdout).to.equal('1.0.0\n');
            done();
        });
    });

    test('basic usage', (done) => {
        execCmd('--config fixtures/basic.config.json', (stdout) => {
            console.log(stdout);
            assertDirEqual(outPath('out'), tmpPath('tmp'));
            done();
        });
    });
});
