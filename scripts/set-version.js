const version = process.argv.slice(2).join(' ');
const { readFileSync, writeFileSync } = require('fs');

const packagePath = path.resolve(__dirname, '../package.json');
package.version = version;
const package = JSON.parse(readFileSync(packagePath, 'utf-8'));

writeFileSync(packagePath, JSON.stringify(package), 'utf-8');