const
  _ = require('lodash/core')
;

let exception = {
  message : 'unhandle exception',
  code : 500
};

function _handleErrObj(err,defaultMsg){
  if ( err.message.indexOf('E11000') != 1 ) {
    exception.message = 'email and/or username is already taken';
    exception.code = 406;
    return exception;
  }
  return exception;
}

function _handleErrStr(err,defaultMsg){
  return exception;
}

module.exports = function(err,defaultMsg){
  exception.message = defaultMsg;
  if (typeof   err === 'object') return _handleErrObj(err,defaultMsg);
  if (typeof err === 'string') return _handleErrStr(err,defaultMsg);
  return exception;
};
