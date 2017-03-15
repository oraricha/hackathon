"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _resolveCellDefaults = require("./resolve-cell-defaults");

var _resolveCellDefaults2 = _interopRequireDefault(_resolveCellDefaults);

var _resolveColumnCounts = require("./resolve-column-counts");

var _resolveColumnCounts2 = _interopRequireDefault(_resolveColumnCounts);

var _resolveCellStyles = require("./resolve-cell-styles");

var _resolveCellStyles2 = _interopRequireDefault(_resolveCellStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var resolveCells = function resolveCells(props) {
  // Resolve the final style defaults for each cell
  var children = props.children,
      style = props.style,
      childProps = _objectWithoutProperties(props, ["children", "style"]); // eslint-disable-line no-unused-vars


  var childrenWithDefaults = _react.Children.map(props.children, function (child) {
    return _react2.default.cloneElement(child, (0, _resolveCellDefaults2.default)(_extends({}, childProps, child.props)));
  });

  // Add column counts to each cell's props
  var childrenWithColumnCounts = (0, _resolveColumnCounts2.default)({
    children: childrenWithDefaults,
    breakpoints: props.breakpoints
  });

  // Resolve the final cell styles
  return _react.Children.map(childrenWithColumnCounts, function (child) {
    return _react2.default.cloneElement(child, {
      style: (0, _resolveCellStyles2.default)(child.props)
    });
  });
};

exports.default = resolveCells;