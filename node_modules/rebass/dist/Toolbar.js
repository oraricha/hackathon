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
 * Toolbar component that vertically centers children with display flex
 */

var Toolbar = function Toolbar(props, _ref) {
  var rebass = _ref.rebass;

  var _config$rebass = _extends({}, _config2.default, rebass),
      scale = _config$rebass.scale,
      colors = _config$rebass.colors;

  return _react2.default.createElement(_Base2.default, _extends({}, props, {
    className: 'Toolbar',
    baseStyle: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 48,
      paddingLeft: scale[1],
      paddingRight: scale[1],
      color: colors.white,
      backgroundColor: colors.primary
    } }));
};

Toolbar.contextTypes = {
  rebass: _react2.default.PropTypes.object
};

exports.default = Toolbar;