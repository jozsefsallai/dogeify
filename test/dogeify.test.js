const expect = require('chai').expect;
const Dogeify = require('../src/dogeify');
const dogeify = new Dogeify();

describe('Dogeify class', async function () {
  before(async function () {
    await dogeify.fillNouns();
  });

  describe('#getSentences', function () {
    it('should return the correct sentences', function () {
      const text = 'This is an example text! It should return two sentences.';
      const sentences = dogeify.getSentences(text);
      expect(sentences).to.have.length(2);
      expect(sentences).to.eql([
        'this is an example text!',
        'it should return two sentences.'
      ]);
    });
  });

  describe('#isWordForbidden', function () {
    it('should return false for allowed word', function () {
      return expect(dogeify.isWordForbidden('hello')).to.be.false;
    });

    it('should return true for forbidden word', function () {
      return expect(dogeify.isWordForbidden('re')).to.be.true;
    });

    it('should return true for ignored word', function () {
      dogeify.ignore = [ 'hey' ];
      return expect(dogeify.isWordForbidden('hey')).to.be.true;
    });
  });

  describe('#getNouns', function () {
    it('should return the correct list of nouns', function () {
      const sentence = 'the quick brown fox jumped over the lazy dog, a cat also arrived';
      const expectedResult = [ 'brown', 'fox', 'dog', 'cat' ];
      const nouns = dogeify.getNouns(sentence);
      expect(nouns).to.eql(expectedResult);
    });

    it('should not contain forbidden phrases', function () {
      const sentence = "You're a good boy. You've chased the squirrel.";
      const expectedResult = [ 'good', 'boy', 'squirrel' ];
      const nouns = dogeify.getNouns(sentence);
      expect(nouns).to.not.include('re');
      expect(nouns).to.not.include('ve');
      expect(nouns).to.eql(expectedResult);
    });

    it('should not include /', function () {
      const sentence = 'I\'ve seen a dog/cat';
      const expectedResult = [ 'dog', 'cat' ];
      const nouns = dogeify.getNouns(sentence);
      expect(nouns).to.not.include('/');
      expect(nouns).to.eql(expectedResult);
    });

    it('should work for plural nouns too', function () {
      const sentence = 'I have seen dogs and cats.';
      const expectedResult = [ 'dogs', 'cats' ];
      const nouns = dogeify.getNouns(sentence);
      expect(nouns).to.eql(expectedResult);
    });
  });

  describe('#correctSpelling', function () {
    const testCases = [
      { original: 'super', expected: 'supar' },
      { original: 'epiphany', expected: 'epifany' },
      { original: 'delicious', expected: 'delishus' },
      { original: 'emotion', expected: 'emoshun' },
      { original: 'question', expected: 'queschun' },
      { original: 'dogs', expected: 'doges' },
      { original: 'doge', expected: 'doge' }
    ];

    testCases.forEach(test => {
      it(`should return ${test.expected} for ${test.original}`, function () {
        const output = dogeify.correctSpelling(test.original);
        expect(output).to.eql(test.expected);
      });
    });
  });

  describe('#fixPhrases', function () {
    it('should return the correct phrases', function () {
      const nouns = [ 'grandma', 'emotionless', 'dogs' ];
      const correctSpelling = [ 'grandma', 'emoshunless', 'doges' ];
      const phrases = dogeify.fixPhrases(nouns);
      phrases.forEach((phrase, idx) => {
        const adjective = phrase.split(' ')[0];
        const transformedNoun = phrase.split(' ')[1].slice(0, -1);
        expect(dogeify.ADJECTIVES).to.include(adjective);
        expect(transformedNoun).to.eql(correctSpelling[idx]);
      });
    });
  });

  describe('#fillNouns', async function () {
    const doge = new Dogeify();
    await doge.fillNouns();
    return expect(doge.allNouns).to.have.length.greaterThan(0);
  });

  describe('#init', function () {
    describe('when passing dot character', function () {
      it('should return only emotion', async function () {
        const dogeified = await dogeify.init('.');
        const dogeifiedArray = dogeified.split('.');
        expect(dogeifiedArray).to.have.length(2);
        expect(dogeifiedArray[1]).to.be.empty;
        expect(dogeify.EMOTIONS).to.include(dogeifiedArray[0]);
      });
    });

    describe('when passing ignore options', function () {
      it('should exclude the words from the phrases array', async function () {
        const dogeified = await dogeify.init('I saw a dog and a cat.', {
          ignore: [ 'cat' ]
        });
        return expect(dogeified).to.not.include('cat');
      });
    });
  });
});
