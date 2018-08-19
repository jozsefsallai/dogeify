const Dogeify = require('./src/dogeify');

module.exports = (str) => new Dogeify().init(str);
module.exports.array = (arr) => {
  const dogeify = new Dogeify();
  return arr.map(str => dogeify.init(str));
};
