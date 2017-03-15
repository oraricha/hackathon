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
 * Menu component for navigation links and actions
 */

var Menu = function Menu(props, _ref) {
  var rebass = _ref.rebass;

  var _config$rebass = _extends({}, _config2.default, rebass),
      scale = _config$rebass.scale,
      colors = _config$rebass.colors,
      borderColor = _config$rebass.borderColor,
      borderRadius = _config$rebass.borderRadius;

  return _react2.default.createElement(_Base2.default, _extends({}, props, {
    className: 'Menu',
    baseStyle: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 128,
      marginBottom: scale[2],
      overflow: 'hidden',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: borderColor,
      borderRadius: borderRadius,
      color: colors.black,
      backgroundColor: colors.white
    } }));
};

Menu.defaultProps = {
  rounded: true
};

Menu.contextTypes = {
  rebass: _react2.default.PropTypes.object
};

exports.default = Menu;