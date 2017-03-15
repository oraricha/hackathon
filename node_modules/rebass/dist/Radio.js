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

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Styled custom radio input with label
 */

var Radio = function Radio(_ref, _ref2) {
  var rebass = _ref2.rebass;

  var label = _ref.label,
      name = _ref.name,
      checked = _ref.checked,
      children = _ref.children,
      backgroundColor = _ref.backgroundColor,
      theme = _ref.theme,
      circle = _ref.circle,
      inverted = _ref.inverted,
      stacked = _ref.stacked,
      style = _ref.style,
      m = _ref.m,
      mt = _ref.mt,
      mr = _ref.mr,
      mb = _ref.mb,
      ml = _ref.ml,
      mx = _ref.mx,
      my = _ref.my,
      p = _ref.p,
      pt = _ref.pt,
      pr = _ref.pr,
      pb = _ref.pb,
      pl = _ref.pl,
      px = _ref.px,
      py = _ref.py,
      props = _objectWithoutProperties(_ref, ['label', 'name', 'checked', 'children', 'backgroundColor', 'theme', 'circle', 'inverted', 'stacked', 'style', 'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py']);

  var _config$rebass = _extends({}, _config2.default, rebass),
      scale = _config$rebass.scale,
      colors = _config$rebass.colors;

  var invalid = props['aria-invalid'] || props.invalid;

  var rootProps = {
    style: style,
    m: m,
    mt: mt,
    mr: mr,
    mb: mb,
    ml: ml,
    mx: mx,
    my: my,
    p: p,
    pt: pt,
    pr: pr,
    pb: pb,
    pl: pl,
    px: px,
    py: py
  };

  var dotProps = {
    backgroundColor: backgroundColor,
    theme: theme,
    circle: circle,
    inverted: inverted
  };

  var sx = {
    root: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      flexDirection: stacked ? 'column' : null,
      paddingBottom: scale[1],
      color: invalid ? colors.error : null,
      cursor: 'pointer'
    },
    input: {
      position: 'absolute',
      zIndex: -1,
      opacity: 0
    },
    dot: {
      width: scale[2],
      height: scale[2],
      marginRight: stacked ? null : scale[1],
      marginBottom: stacked ? scale[1] : null,
      backgroundColor: checked ? colors.white : 'currentcolor',
      borderWidth: 5,
      borderStyle: checked ? 'solid' : null,
      borderColor: checked ? 'currentcolor' : null,
      opacity: checked ? null : 1 / 4,
      transition: 'border .1s ease-out'
    }
  };

  var cx = (0, _classnames2.default)('Radio', {
    'isInvalid': invalid,
    'isDisabled': props.disabled,
    'isReadonly': props.readOnly
  });

  return _react2.default.createElement(
    _Base2.default,
    _extends({}, rootProps, {
      tagName: _Label2.default,
      className: cx,
      baseStyle: sx.root }),
    _react2.default.createElement('input', _extends({}, props, {
      name: name,
      checked: checked,
      type: 'radio',
      style: sx.input })),
    _react2.default.createElement(_Base2.default, _extends({}, dotProps, {
      className: 'Radio_dot',
      baseStyle: sx.dot })),
    label
  );
};

Radio.propTypes = {
  /** Label for form element */
  label: _react2.default.PropTypes.string.isRequired,
  /** Name attribute for form element */
  name: _react2.default.PropTypes.string.isRequired,
  /** Place label centered under the radio */
  stacked: _react2.default.PropTypes.bool
};

Radio.defaultProps = {
  circle: true
};

Radio.contextTypes = {
  rebass: _react2.default.PropTypes.object
};

exports.default = Radio;