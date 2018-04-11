var crypto = require('crypto');
let aws    = require('aws-sdk');
let util   = aws.util;

module.exports = {

  sanitizeString: str => str,

  encB64: text => Buffer.from(JSON.stringify(text)).toString('base64'),

  decB64: text => JSON.parse(util.base64.decode(text).toString('utf8')),

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
  },

  extractIdToken: idToken => JSON.parse(util.base64.decode(idToken.split('.')[1]).toString('utf8')),

  checkPermissions: (header, action, rights, resource) => {
    // t = tenant, tp = tenantPerms, rp = ressourcePerms
    let t = header['x-sam-t'];
    let tp = decrypt(header['x-sam-p'])[t];
    if (tp) {
      let rp = tp.find( p => p.r == resource);
      if(rp.p % rights[action] === 0 ) {
        // console.log(`user is allowed to ${action} on ${t}`);
        return true;
      }
    }
  }
}
