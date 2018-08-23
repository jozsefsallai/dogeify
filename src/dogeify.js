const pos = require('pos');

class Dogeify {
  constructor() {
    this.ADJECTIVES = 'so such very much many how'.split(' ');
    this.EMOTIONS = 'wow amaze excite'.split(' ');
    this.forbiddenPhrases = [
      're', 've', '/'
    ];
  };

  /**
   * getSentences()
   * Turns the provided string into an array of sentences
   * @param {String} str
   * @returns {Array}
   */
  getSentences(str) {
    const acceptedPunctuations = ['.', '!', '?'];
    if (!acceptedPunctuations.includes(str[str.length - 1])) {
      str += '.';
    }

    str = str
      .toLowerCase()
      .match(/[^.!?]+[.!?]+/g);
    if (str && str.length) {
      str = str.map(sentence => {
        if (sentence && sentence[0] === ' ') {
          return sentence.slice(1);
        }
        return sentence;
      });
    }
    return str;
  };

  /**
   * getNouns()
   * Returns an array of the nouns in a sentence
   * @param {String} sentence
   * @returns {Array}
   */
  getNouns(sentence) {
    const words = new pos.Lexer().lex(sentence);
    const tagger = new pos.Tagger();
    const taggedWords = tagger.tag(words);
    let nouns = [];
    taggedWords.forEach((word) => {
      if (word[1] === 'NN' || word[1] === 'NNS') {
        nouns.push(word[0]);
      }
    });

    if (this.ignore && this.ignore.length) {
      this.forbiddenPhrases = this.forbiddenPhrases.concat(this.ignore);
    }

    nouns = nouns.filter((noun) => {
      return !this.forbiddenPhrases.includes(noun);
    });

    return nouns;
  };

  /**
   * correctSpelling()
   * Replaces some common word parts into dogespeak
   * @param {String} word
   * @returns {String}
   */
  correctSpelling(word) {
    return word
      .replace(/er$/, 'ar')
      .replace('ph', 'f')
      .replace('cious', 'shus')
      .replace('stion', 'schun')
      .replace('tion', 'shun')
      .replace('doge', 'dog')
      .replace('dog', 'doge');
  };

  /**
   * getAdjective()
   * Returns a random adjective from the ADJECTIVES array
   * @returns {String}
   */
  getAdjective() {
    const idx = Math.floor(Math.random() * this.ADJECTIVES.length);
    return this.ADJECTIVES[idx];
  };

  /**
   * getEmotion()
   * Returns a random emotion from the EMOTIONS array
   * @returns {String}
   */
  getEmotion() {
    const idx = Math.floor(Math.random() * this.EMOTIONS.length);
    return this.EMOTIONS[idx];
  };

  /**
   * fixPhrases()
   * Converts the spelling of an array of words and turns them
   * into phrases
   * @param {Array} phrases
   * @returns {Array}
   */
  fixPhrases(phrases) {
    return phrases.map((phrase) => {
      let newPhrase = this.correctSpelling(phrase);
      newPhrase = `${this.getAdjective()} ${newPhrase}.`;
      return newPhrase;
    });
  };

  /**
   * init()
   * Initializes the dogeifying process
   * @param {String} str
   * @returns {String}
   */
  init(str, opts = {}) {
    if (opts) {
      Object.assign(this, opts);
    }

    let sentences = this.getSentences(str);
    if (!sentences) {
      sentences = [];
    }
    if (sentences.length) {
      sentences = sentences.map(sentence => {
        let nouns = this.getNouns(sentence);
        if (nouns && nouns.length) {
          nouns = this.fixPhrases(nouns);
        } else {
          nouns = [];
        }
        nouns.push(`${this.getEmotion()}.`);
        return nouns.join(' ');
      });
    } else {
      sentences.push(`${this.getEmotion()}.`);
    }

    return sentences.join(' ');
  };
};

module.exports = Dogeify;
