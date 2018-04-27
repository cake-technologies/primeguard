var crypto = require('crypto');

module.exports = {
  sanitizeString: str => str,

  encB64: data => {
    if (typeof data !== "string" )
      data = JSON.stringify(data);

    return Buffer.from(data).toString('base64');;
  },

  decB64: data => {
    var res = new Buffer.from(data, 'base64').toString('utf8');
    try {
      res = JSON.parse(res);
    } catch (e) {
      // thing was only a string before
    }
    return res;
  },

  encrypt: (text, algorithm, secret) => {
    var cipher = crypto.createCipher(algorithm, secret)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  },

  decrypt: (text, algorithm, secret) => {
    var decipher = crypto.createDecipher(algorithm, secret)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }
};
