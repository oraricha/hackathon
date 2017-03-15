'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Utility for extracting margin props from components
 */

var n = function n(key, x, s) {
  return typeof x === 'number' ? _defineProperty({}, key, s[x]) : null;
};

function margins(props, scale) {
  var s = scale || [];

  var _ref2 = props || {},
      m = _ref2.m,
      mx = _ref2.mx,
      my = _ref2.my,
      mt = _ref2.mt,
      mr = _ref2.mr,
      mb = _ref2.mb,
      ml = _ref2.ml;

  var result = (0, _objectAssign2.default)({}, n('margin', m, s), n('marginTop', mt, s), n('marginBottom', mb, s), n('marginTop', my, s), n('marginBottom', my, s), n('marginLeft', ml, s), n('marginRight', mr, s), n('marginLeft', mx, s), n('marginRight', mx, s));

  return result;
}

exports.default = margins;