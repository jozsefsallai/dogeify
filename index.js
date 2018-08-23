const Dogeify = require('./src/dogeify');

module.exports = (str, opts) => new Dogeify().init(str, opts);
module.exports.array = (arr, opts) => {
  const dogeify = new Dogeify();
  return arr.map(str => dogeify.init(str, opts));
};
