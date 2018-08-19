const expect = require('chai').expect;
const Dogeify = require('../src/dogeify');
const dogeify = new Dogeify();

describe('Dogeify class', function () {
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

  describe('#getNouns', function () {
    it('should return the correct list of nouns', function () {
      const sentence = 'the quick brown fox jumped over the lazy dog, a cat also arrived';
      const expectedResult = [ 'fox', 'dog', 'cat' ];
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
});
