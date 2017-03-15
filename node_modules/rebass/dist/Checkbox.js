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
 * Checkbox input with label
 */

var Checkbox = function Checkbox(_ref, _ref2) {
  var rebass = _ref2.rebass;

  var label = _ref.label,
      name = _ref.name,
      checked = _ref.checked,
      children = _ref.children,
      backgroundColor = _ref.backgroundColor,
      theme = _ref.theme,
      inverted = _ref.inverted,
      rounded = _ref.rounded,
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
      props = _objectWithoutProperties(_ref, ['label', 'name', 'checked', 'children', 'backgroundColor', 'theme', 'inverted', 'rounded', 'stacked', 'style', 'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py']);

  var _config$rebass = _extends({}, _config2.default, rebass),
      scale = _config$rebass.scale,
      colors = _config$rebass.colors,
      borderRadius = _config$rebass.borderRadius;

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

  var boxProps = {
    backgroundColor: backgroundColor,
    theme: theme,
    inverted: inverted,
    rounded: rounded
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
    box: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: scale[2],
      height: scale[2],
      marginRight: stacked ? null : scale[1],
      marginBottom: stacked ? scale[1] : null,
      backgroundColor: checked ? 'currentcolor' : 'transparent',
      borderRadius: borderRadius,
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: checked ? null : colors.gray,
      transition: 'background-color .1s ease-out'
    },
    icon: {
      display: checked ? null : 'none',
      width: '75%',
      height: '75%',
      marginTop: 1,
      fill: colors.white
    }
  };

  var cx = (0, _classnames2.default)('Checkbox', {
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
      type: 'checkbox',
      checked: checked,
      style: sx.input })),
    _react2.default.createElement(
      _Base2.default,
      _extends({}, boxProps, {
        className: 'Checkbox_box',
        baseStyle: sx.box }),
      _react2.default.createElement(
        'svg',
        {
          viewBox: '0 0 32 32',
          style: sx.icon },
        _react2.default.createElement('path', { d: 'M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z' })
      )
    ),
    label
  );
};

Checkbox.propTypes = {
  /** Label for form element */
  label: _react2.default.PropTypes.string.isRequired,
  /** Name attribute for form element */
  name: _react2.default.PropTypes.string.isRequired,
  /** Place label centered under the radio */
  stacked: _react2.default.PropTypes.bool
};

exports.default = Checkbox;