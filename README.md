# Dogeify.js

[![Build Status](https://travis-ci.org/jozsefsallai/dogeify.svg?branch=master)](https://travis-ci.org/jozsefsallai/dogeify)
[![Dependency Status](https://david-dm.org/jozsefsallai/dogeify.svg)](https://david-dm.org/jozsefsallai/dogeify)

A Node module that converts everyday English into doge. This is the JavaScript version of the [Dogeify Ruby gem](https://github.com/mhuggins/dogeify).

**LIVE DEMO: https://sallai.me/examples/dogeify**

## Installation

Yarn:

```
yarn add dogeify-js
```

npm:

```
npm i dogeify-js
```

## Usage

You can use this module in your Node project or the CLI.

**Usage in a Node project:**

```js
const dogeify = require('dogeify-js');

const str = 'The quick brown fox jumps over the lazy dog. A cat is walking on the street';
console.log(dogeify(str)); // very fox. such doge. amaze. many cat. so street. wow.
```

You can also pass an array to convert to doge:

```js
const arr = [
  'The quick brown fox jumps over the lazy dog.',
  'A cat is walking on the street.'
];
console.log(dogeify.array(arr));
/* Returns:
  [
    'very fox. such doge. excite.',
    'so cat. very street. amaze.
  ]
*/
```

You can provide an array of words to exclude from the output:

```js
console.log(dogeify('I saw a dog and a cat.', {
  ignore: [ 'cat' ]
}));
// such doge. wow.
```

**Usage in the CLI:**

```
> dogeify The quick brown fox jumps over the lazy dog.
such fox. much doge. amaze.
```

**Will there ever be a browser version?** Right now, exporting the module to be used in the browser would be... pretty heavy. So, unless I (or someone else) can come up with a better solution for retrieving parts of speech in a browser-friendly mode, there will not be a browser version. Sorry!

## Contribution

Contribution is always welcome! Before submitting your pull request, make sure to create the appropriate unit tests and run them:
```
yarn test
# or
npm run test
```

Also make sure that your changes pass linting:
```
yarn lint
# or
npm run lint
```

## License

MIT.
