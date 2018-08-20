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

**Usage in the CLI:**

```
> dogeify The quick brown fox jumps over the lazy dog.
such fox. much doge. amaze.
```

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
