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

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Input element with label with support for aria-invalid, disabled, and readOnly HTML attributes
 */

var Input = function Input(_ref, _ref2) {
  var rebass = _ref2.rebass;

  var label = _ref.label,
      name = _ref.name,
      type = _ref.type,
      message = _ref.message,
      hideLabel = _ref.hideLabel,
      children = _ref.children,
      style = _ref.style,
      autoOff = _ref.autoOff,
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
      props = _objectWithoutProperties(_ref, ['label', 'name', 'type', 'message', 'hideLabel', 'children', 'style', 'autoOff', 'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py']);

  var _config$rebass = _extends({}, _config2.default, rebass),
      scale = _config$rebass.scale,
      colors = _config$rebass.colors,
      borderColor = _config$rebass.borderColor;

  var invalid = props.invalid || props['aria-invalid'];

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

  var sx = {
    root: {
      marginBottom: scale[2],
      color: invalid ? colors.error : null
    },
    input: {
      fontFamily: 'inherit',
      fontSize: 'inherit',
      boxSizing: 'border-box',
      display: 'block',
      width: '100%',
      height: scale[3],
      margin: 0,
      paddingLeft: scale[1],
      paddingRight: scale[1],
      color: 'inherit',
      backgroundColor: 'rgba(255, 255, 255, .25)',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: invalid ? colors.error : borderColor
    }
  };

  var cx = (0, _classnames2.default)('Input', {
    'isInvalid': invalid,
    'isDisabled': props.disabled,
    'isReadonly': props.readOnly
  });

  var autoProps = autoOff ? {
    autoComplete: 'off',
    autoCorrect: 'off',
    autoCapitalize: 'off',
    spellCheck: 'off'
  } : {};

  return _react2.default.createElement(
    _Base2.default,
    _extends({}, rootProps, {
      className: cx,
      baseStyle: sx.root }),
    _react2.default.createElement(_Label2.default, {
      htmlFor: name,
      hide: hideLabel,
      children: label }),
    _react2.default.createElement(_Base2.default, _extends({}, autoProps, props, {
      tagName: 'input',
      type: type,
      name: name,
      baseStyle: sx.input })),
    message && _react2.default.createElement(_Text2.default, { small: true, children: message })
  );
};

Input.propTypes = {
  /** Label for form element */
  label: _react2.default.PropTypes.string.isRequired,
  /** Name attribute for form element */
  name: _react2.default.PropTypes.string.isRequired,
  /** Form element type */
  type: _react2.default.PropTypes.string,
  /** Adds a helper or error message below the input */
  message: _react2.default.PropTypes.string,
  /** Hides the form element label */
  hideLabel: _react2.default.PropTypes.bool,
  /** Disables autocomplete, autocorrect, autocapitalize, and spellcheck props */
  autoOff: _react2.default.PropTypes.bool,
  /** Controls the border radius for creating grouped elements */
  rounded: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool, _react2.default.PropTypes.oneOf(['top', 'right', 'bottom', 'left'])])
};

Input.defaultProps = {
  type: 'text',
  rounded: true
};

Input.contextTypes = {
  rebass: _react2.default.PropTypes.object
};

exports.default = Input;