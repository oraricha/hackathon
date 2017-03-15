'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Base = require('./Base');

var _Base2 = _interopRequireDefault(_Base);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Heading element with no margin and size based on fontSizes scale
 */

var Heading = function Heading(_ref, _ref2) {
  var rebass = _ref2.rebass;

  var level = _ref.level,
      size = _ref.size,
      big = _ref.big,
      alt = _ref.alt,
      _className = _ref._className,
      props = _objectWithoutProperties(_ref, ['level', 'size', 'big', 'alt', '_className']);

  var _config$rebass = _extends({}, _config2.default, rebass),
      fontSizes = _config$rebass.fontSizes,
      bold = _config$rebass.bold;

  var Component = 'h' + level;

  var h = function h(n) {
    return fontSizes[n];
  };

  var fontSize = typeof size === 'number' ? h(size) : h(level);
  if (alt) {
    fontSize = h(4);
  }
  if (big) {
    fontSize *= 2;
  }

  var cx = (0, _classnames2.default)(_className || 'Heading', {
    'Heading_alt': alt
  });

  return _react2.default.createElement(_Base2.default, _extends({}, props, {
    tagName: Component,
    className: cx,
    baseStyle: {
      fontSize: fontSize,
      fontWeight: bold,
      lineHeight: 1.25,
      margin: 0,
      opacity: alt ? 0.5 : null
    } }));
};

Heading.propTypes = {
  /** Doubles the visual size - useful for marketing pages */
  big: _react2.default.PropTypes.bool,
  /** Heading level, e.g. level={1} for <h1> */
  level: _react2.default.PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /** Visual size of heading */
  size: _react2.default.PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
  /** Applies alternate styling - useful for slugs and subheadings */
  alt: _react2.default.PropTypes.bool
};

Heading.defaultProps = {
  level: 2
};

Heading.contextTypes = {
  rebass: _react2.default.PropTypes.object
};

exports.default = Heading;