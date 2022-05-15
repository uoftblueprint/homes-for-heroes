const set = require('lodash.set');

export function isEmpty(str) {
  return !str || str.length === 0;
}

export function errorToObj(errors) {
  const errorObj = {};
  if (errors === undefined || errors === null || errors.constructor !== Array || errors.length === 0) return errorObj;

  errors
    .filter((error) => error.location === 'body')
    .forEach((error) => {
      set(errorObj, error.param, error.msg);
    });
  return errorObj;
}
