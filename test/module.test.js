const dogeify = require('..');
const expect = require('chai').expect;

describe('Dogeify module', function () {
  describe('when passing a string', function () {
    beforeEach(function () {
      const str = 'The quick brown fox jumps over the lazy dog.';
      this.dogeified = dogeify(str);
    });

    it('should include only the nouns', function () {
      expect(this.dogeified).to.include('fox');
      expect(this.dogeified).to.include('doge');
      expect(this.dogeified).to.not.include('quick');
    });
    
    it('should be all lowercase', function () {
      expect(this.dogeified).to.eql(this.dogeified.toLowerCase());
    });

    it('should correct spelling', function () {
      expect(this.dogeified).to.not.include('dog.');
      expect(this.dogeified).to.include('doge');
    });
  });

  describe('when passing an array', function () {
    beforeEach(function () {
      this.arr = [
        'Hello world. My owner is a good boy.',
        'I saw a cat today on the street while going to the grocery store'
      ];

      this.dogeified = dogeify.array(this.arr);
    });

    it('should be the same length as the original array', function () {
      expect(this.dogeified).to.have.length(this.arr.length);
    });

    it('should dogeify', function () {
      this.dogeified.forEach(sentence => {
        expect(sentence).to.eql(sentence.toLowerCase());
      });
    });
  });
});
