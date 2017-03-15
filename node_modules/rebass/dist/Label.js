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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Label element for form controls
 */

var Label = function Label(_ref, _ref2) {
  var rebass = _ref2.rebass;

  var hide = _ref.hide,
      props = _objectWithoutProperties(_ref, ['hide']);

  var _config$rebass = _extends({}, _config2.default, rebass),
      fontSizes = _config$rebass.fontSizes,
      bold = _config$rebass.bold;

  var hideStyle = hide ? {
    position: 'absolute',
    height: 1,
    width: 1,
    overflow: 'hidden',
    clip: 'rect(1px, 1px, 1px, 1px)'
  } : {};

  return _react2.default.createElement(_Base2.default, _extends({}, props, {
    tagName: 'label',
    className: 'Label',
    baseStyle: _extends({
      fontSize: fontSizes[5],
      fontWeight: bold,
      lineHeight: 1
    }, hideStyle) }));
};

Label.propTypes = {
  /** Accessibly hide label for use in high density UI.
   *  This can still cause accessibility issues. Use this with caution.
   */
  hide: _react2.default.PropTypes.bool
};

Label.contextTypes = {
  rebass: _react2.default.PropTypes.object
};

exports.default = Label;