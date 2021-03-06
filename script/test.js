#!/usr/bin/env node
const sh = require('./sh');

sh.rm('./test.new/out');
const mochaOptions = [
  '-t 10000',
  '--require ./node_modules/babel-register',
  '--require ./test/init.js',
  // '--recursive ./test.new/src',
  '$(find test/ -regex \'.*.test.js$\')',
  '-R spec'
];
const mochaOption = mochaOptions.join(' ');

if (process.argv.includes('--coverage')) {
  sh.exec(`NODE_ENV=coverage ./node_modules/.bin/nyc ./node_modules/mocha/bin/_mocha ${mochaOption}`);
} else {
  sh.exec(`./node_modules/.bin/mocha ${mochaOption}`);
}
