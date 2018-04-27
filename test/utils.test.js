var utils = require('../utils.js');
var expect = require('chai').expect;

var testData = {
  simple_string: {
    source: 'testing b64 encoding',
    target: 'dGVzdGluZyBiNjQgZW5jb2Rpbmc='
  },
  simple_object: {
      source: {
        content: 'testing b64 encoding'
      },
      target: 'eyJjb250ZW50IjoidGVzdGluZyBiNjQgZW5jb2RpbmcifQ=='
    }
}

module.exports = ( () => {
  describe('# Encoding to b64', () => {

    it('encode string', () => {
      utils.encB64(testData.simple_string.source).should.equal(testData.simple_string.target)
    });

    it('encode object', () => {
      utils.encB64(testData.simple_object.source).should.equal(testData.simple_object.target)
    });

  });

  describe('# Decode to b64', () => {

    it('decode to string', () => {
      utils.decB64(testData.simple_string.target).should.equal(testData.simple_string.source)
    });

    it('decode to object', () => {
      expect(utils.decB64(testData.simple_object.target)).to.deep.equal(testData.simple_object.source)
    });

  });


});
