const version = process.argv.slice(2).join(' ');
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const packagePath = path.resolve(__dirname, '../../package.json');
const package = JSON.parse(readFileSync(packagePath, 'utf-8'));
package.version = version;

writeFileSync(packagePath, JSON.stringify(package), 'utf-8');