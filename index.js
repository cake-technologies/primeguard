let utils = require('./utils.js');

let checkPermissions = (header, action, rights, resource) => {
  // t = tenant, tp = tenantPerms, rp = ressourcePerms
  let t = header['x-sam-t'];
  let tp = utils.decrypt(header['x-sam-p'])[t];
  if (tp) {
    let rp = tp.find( p => p.r == resource);
    if(rp.p % rights[action] === 0 ) {
      // console.log(`user is allowed to ${action} on ${t}`);
      return true;
    }
  }
}

let extractIdToken = data => {
 return JSON.parse( utils.decB64( data.header.Authorization.split('.')[1] ).toString('utf8') );
}

module.exports = {
  sanitizeString: utils.sanitizeString,
  encB64: utils.encB64,
  decB64: utils.decB64,
  encrypt: utils.encrypt,
  decrypt: utils.decrypt,

  extractIdToken: extractIdToken,
  checkPermissions: checkPermissions
}
