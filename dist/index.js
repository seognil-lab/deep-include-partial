'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fp = require('lodash/fp');

var ANY = Symbol('ANY');
var VOID = Symbol('VOID');

function deepIncludePartial(data, pattern) {
  var comparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : fp.isEqual;

  if (!fp.isPlainObject(pattern) || !fp.isPlainObject(data)) {
    throw "Please pass a result object and a pattern object";
  }

  if (typeof comparator != 'function') {
    throw "Please pass a function comparator";
  }

  for (var key in pattern) {
    var current = data[key];
    var should = pattern[key];

    if (should === VOID) {
      if (fp.has(key, data)) return false;
    } else if (should === ANY) {
      if (!fp.has(key, data)) return false;
    } else if (fp.isArray(should)) {
      if (!fp.isArray(current) || !comparator(current, should)) return false;
    } else if (fp.isObject(should)) {
      if (!fp.isObject(current) || !deepIncludePartial(current, should)) return false;
    } else {
      if (!comparator(current, should)) return false;
    }
  }

  return true;
} // * --------------------------------

exports.ANY = ANY;
exports.VOID = VOID;
exports.deepIncludePartial = deepIncludePartial;
//# sourceMappingURL=index.js.map
