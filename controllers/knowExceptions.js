"use strict"

const
  _ = require('lodash/core');

var exception = {
  message: 'unhandle exception',
  code: 500
};

function _handleErrObj(err, defaultMsg) {
  if (err.message.indexOf('E11000') != -1) {
    exception.message = 'Email and/or username is already in use.';
    exception.code = 406;
    return exception;
  }
  if (err.message.indexOf('validation failed') != -1){
    exception.message = 'Double check provided information. A validation error ocurred.';
    exception.code = 406;
  }
  return exception;
}

function _handleErrStr(err, defaultMsg) {
  return exception;
}

module.exports = function(err, defaultMsg) {
  exception.message = defaultMsg;
  if (typeof err === 'object') return _handleErrObj(err, defaultMsg);
  if (typeof err === 'string') return _handleErrStr(err, defaultMsg);
  return exception;
};