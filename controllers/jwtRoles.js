const
  jwt = require('jsonwebtoken')
;

let badPerms = {
  message: 'Permission denied'
};

let permSets = {
    all : ["admin:read","admin:write","user:read","user:write"],
    arw : ["admin:read","admin:write"],
    aw : ["admin:write"],
    ar : ["admin:read"],
    urw : ["user:read","user:write","admin:read","admin:write"],
    uw : ["user:write","admin:write"],
    ur : ["user:read","admin:read"]
}

var debug;

let Perms = function(optional) {
  this.badPerms = badPerms;
  this.sets = permSets;
  debug = optional || null;
};

Perms.prototype.check = function(checkFor) {
  return _middleware.bind(this);
  function _middleware(req, res, next) {
    verify(req, res, function(perms) {
      debug('Perms.verify', perms, checkFor);
      if (evaluatePerms(perms,checkFor)) next();
      else res.status(401).json(badPerms);
    });
  }
};

function verify(req, res, callback) {

  let
    token =
    req.headers['x-access-token'] ||
    res.locals.token ||
    req.body.token ||
    req.query.token,

    SECRET =
      process.env.SECRET || 'createDotEnvFile',

    ADMIN_SECRET =
      process.env.ADMIN_SECRET || 'pleaseCreateDotEnvFile'
  ;

  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if(decoded) {
      res.locals.userID = decoded.userID;
      callback(decoded.perms);
    }
    if(decoded) return true;
    jwt.verify(token, process.env.ADMIN_SECRET, function(err, decoded) {
      if (err) {
        return err
      } else {
        res.locals.userID = decoded.userID;
        callback(decoded.perms);
      }
    });
  });

}; // END verify

function evaluatePerms(userPerm, pathPerms) {

  userPerm
    = (typeof userPerm === 'string') ? [userPerm] : userPerm;
  pathPerms
    = (typeof pathPerms === 'string') ? [pathPerms] : pathPerms;

  var res = userPerm.map(function(perm, index, array) {
    for (var i = 0; i < pathPerms.length; i++) {
      if (perm === pathPerms[i]) return true;
    }
  });

  if (res.indexOf(true) != -1) return true
  else return false;

}; // evaluatePerms

module.exports = function(optional) {
  return new Perms(optional);
};