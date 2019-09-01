#!/usr/bin/env node
const Dogeify = require('../src/dogeify');
const dogeify = new Dogeify();

const [,, ...args] = process.argv;

if (!args.length) {
  console.log('Please provide the text you want to dogeify.');
  process.exit(1);
}

const fullString = args.join(' ');

dogeify.init(fullString)
  .then(result => {
    console.log(result);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
