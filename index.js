const Dogeify = require('./src/dogeify');

async function asyncForEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    await callback(arr[i], i, arr);
  }
}

module.exports = (str, opts) => new Dogeify().init(str, opts);
module.exports.array = async (arr, opts) => {
  return new Promise((resolve) => {
    const dogeify = new Dogeify();
    const result = [];

    asyncForEach(arr, async str => {
      result.push(await dogeify.init(str, opts));
    })
      .then(function () {
        return resolve(result);
      });
  });
};
