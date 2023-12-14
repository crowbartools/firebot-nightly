const path = require('path');
const { randomBytes } = require('crypto');
const { appendFileSync, readFileSync } = require('fs');

const root = path.resolve(__dirname, '../../');

const outfile = process.argv.slice(2).join(' ');
const output = (key, value) => {
    let data = "";
    if (/[\r\n]/.test(value)) {
        const delimiter = randomBytes(32).toString('base64');
        data = `${key}<<${delimiter}\n${value}\n${delimiter}`
    } else {
        data = `${key}=${value}`
    }

    appendFileSync(outfile, data + '\n', { encoding: 'utf-8' });
}

// deduce version for nightly
const packagePath = path.resolve(root, './package.json');
const package = JSON.parse(readFileSync(packagePath, 'utf-8'));
const curDate = new Date();
const year = curDate.getFullYear().toString().slice(-2);
const month = ("0" + (curDate.getMonth() + 1)).slice(-2);
const day = ('0' + curDate.getDate()).slice(-2);
const nightlyversion = `${package.version}-nightly.${year}.${month}.${day}`;
output('version', nightlyversion);

// build patch-notes
const commits = readFileSync(path.resolve(root, './commits.txt'));
output('patchnotes',
    readFileSync(path.resolve(__dirname, './patch-notes-template.md'), 'utf-8')
        .replace(/\{(\d+)\}/g, (val, match) => {
            if (match === 0 || match === '0') {
                return nightlyversion;
            } else {
                return commits
            }
        })
);


