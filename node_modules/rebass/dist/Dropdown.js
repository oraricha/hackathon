'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Base = require('./Base');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Position relative container for positioning DropdownMenu component
 */

var Dropdown = function Dropdown(props) {
  return _react2.default.createElement(_Base2.default, _extends({}, props, {
    className: 'Dropdown',
    baseStyle: {
      position: 'relative'
    } }));
};

exports.default = Dropdown;