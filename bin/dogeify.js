#!/usr/bin/env node
const Dogeify = require('../src/dogeify');
const dogeify = new Dogeify();

const [,, ...args] = process.argv;

if (!args.length) {
  console.log('Please provide the text you want to dogeify.');
  process.exit(1);
}

const fullString = args.join(' ');

console.log(dogeify.init(fullString));
process.exit(0);
