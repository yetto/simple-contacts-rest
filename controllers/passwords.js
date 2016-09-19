"use strict"

const
  bcrypt = require('bcrypt'),
  salt = bcrypt.genSaltSync(10)
;

// More robust
// "bcrypt(hmac_sha512(password, pepper), salt)"

/*
  Store passwords
  http://blog.mongodb.org/post/32866457221/password-authentication-with-mongoose-part-1
*/

/*
  Account locking
  http://devsmash.com/blog/implementing-max-login-attempts-with-mongoose
*/


exports.encrypt = function(password, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    if (err)
      return callback(err);
    bcrypt.hash(password, salt, function(err, hash) {
      return callback(err, hash);
    });
  });
};

exports.compare = function(password, userPassword, callback) {
  bcrypt.compare(password, userPassword, function(err, isPasswordMatch) {
    if (err)
      return callback(err);
    return callback(null, isPasswordMatch);
  });
};