'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Heading = require('./Heading');

var _Heading2 = _interopRequireDefault(_Heading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Heading element with unstyled link. Useful for in-page navigation
 */

var HeadingLink = function HeadingLink(_ref, _ref2) {
  var rebass = _ref2.rebass;

  var level = _ref.level,
      size = _ref.size,
      href = _ref.href,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ['level', 'size', 'href', 'style']);

  return _react2.default.createElement(
    _Heading2.default,
    {
      _className: 'HeadingLink',
      level: level,
      size: size,
      style: style },
    _react2.default.createElement('a', _extends({}, props, {
      href: href,
      style: {
        color: 'inherit',
        textDecoration: 'none'
      } }))
  );
};

HeadingLink.propTypes = {
  /** Heading level, e.g. level={1} for <h1> */
  level: _react2.default.PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /** Visual size of heading */
  size: _react2.default.PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /** href for link */
  href: _react2.default.PropTypes.string
};

HeadingLink.defaultProps = {
  level: 2,
  href: '#!'
};

HeadingLink.contextTypes = {
  rebass: _react2.default.PropTypes.object
};

exports.default = HeadingLink;