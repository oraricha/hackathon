'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Base = require('./Base');

var _Base2 = _interopRequireDefault(_Base);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Pre element for displaying code examples
 */

var Pre = function Pre(props, _ref) {
  var rebass = _ref.rebass;

  var _config$rebass = _extends({}, _config2.default, rebass),
      monospace = _config$rebass.monospace,
      scale = _config$rebass.scale,
      borderColor = _config$rebass.borderColor;

  return _react2.default.createElement(_Base2.default, _extends({}, props, {
    tagName: 'pre',
    className: 'Pre',
    baseStyle: {
      fontFamily: monospace,
      paddingLeft: scale[2],
      marginBottom: scale[2],
      borderLeft: '4px solid ' + borderColor,
      overflowX: 'scroll'
    } }));
};

Pre.contextTypes = {
  rebass: _react2.default.PropTypes.object
};

exports.default = Pre;