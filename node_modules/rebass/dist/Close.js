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
 * A button with an × for close and dismiss actions
 */

var Close = function Close(props, _ref) {
  var rebass = _ref.rebass;

  return _react2.default.createElement(_Base2.default, _extends({}, props, {
    tagName: 'button',
    className: 'Close',
    title: 'Close',
    baseStyle: {
      fontSize: '1.5em',
      lineHeight: 1,
      fontWeight: 'bold',
      margin: 0,
      padding: 0,
      cursor: 'pointer',
      color: 'inherit',
      backgroundColor: 'transparent',
      border: 0,
      WebkitAppearance: 'none'
    },
    children: '\xD7' }));
};

Close.contextTypes = {
  rebass: _react2.default.PropTypes.object
};

exports.default = Close;