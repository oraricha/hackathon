"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable new-cap */


var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash.initial");

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require("lodash.last");

var _lodash4 = _interopRequireDefault(_lodash3);

var _parseFraction = require("./parse-fraction");

var _parseFraction2 = _interopRequireDefault(_parseFraction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var resolveColumnCounts = function resolveColumnCounts(_ref) {
  var children = _ref.children,
      breakpoints = _ref.breakpoints;

  // Create an array of column counts that matches
  // the indices of the cell array. This way, each
  // cell knows about how many columns its parent
  // row contains and therefore can calculate
  // gutters correctly.

  // The data pipeline looks like this:
  // [[CellProps, CellProps], [CellProps, CellProps, CellProps]] ->
  // [[2, 2], [3, 3, 3]] ->
  // [2, 2, 3, 3, 3]

  // The indices of the final array align with the
  // indices of the child cell array.
  var columnCounts = Object.keys(breakpoints).reduce(function (all, breakpoint) {
    var mediaQuery = breakpoints[breakpoint];
    return _extends({}, all, _defineProperty({}, mediaQuery, children.reduce(function (acc, cell) {
      var breakpointCell = cell.props[mediaQuery];

      // On the first fold, add a new subarray
      // with the first cell props.
      if (!acc.length) {
        return [[breakpointCell]];
      }

      var rest = (0, _lodash2.default)(acc);
      var row = (0, _lodash4.default)(acc);

      // If the sum of the current and previous
      // cells is gte 1, leave the current
      // subarray and start a new one with
      // the current cell
      var sum = row.map(function (column) {
        return (0, _parseFraction2.default)(column.width);
      }).reduce(function (previous, width) {
        return previous + width;
      });
      if (sum >= 1) {
        return [].concat(_toConsumableArray(acc), [[breakpointCell]]);
      }

      return [].concat(_toConsumableArray(rest), [[].concat(_toConsumableArray(row), [breakpointCell])]);
    }, []).map(function (row) {
      return row.map(function () {
        return row.length;
      });
    }).reduce(function (acc, row) {
      return acc.concat(row);
    })));
  }, {});

  // Add the column counts to the cell props.
  return _react.Children.map(children, function (cell, index) {
    var propsWithColumnCounts = Object.keys(columnCounts).reduce(function (acc, breakpoint) {
      var columnCount = columnCounts[breakpoint][index];
      var cellProps = cell.props[breakpoint];
      return _extends({}, acc, _defineProperty({}, breakpoint, _extends({}, cellProps, { columnCount: columnCount })));
    }, {});
    return _react2.default.cloneElement(cell, propsWithColumnCounts);
  });
};

exports.default = resolveColumnCounts;