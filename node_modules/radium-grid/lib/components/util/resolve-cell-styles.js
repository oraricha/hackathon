"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-magic-numbers */


var _lodash = require("lodash.merge");

var _lodash2 = _interopRequireDefault(_lodash);

var _mergeStyles = require("radium/lib/merge-styles");

var _parseFraction = require("./parse-fraction");

var _parseFraction2 = _interopRequireDefault(_parseFraction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var parseUnit = function parseUnit(value) {
  // http://stackoverflow.com/questions/2868947/split1px-into-1px-1-px-in-javascript
  var matches = value.match(/^(\d+(?:\.\d+)?)(.*)$/);

  var _matches = _slicedToArray(matches, 3),
      number = _matches[1],
      unit = _matches[2];

  return { number: number, unit: unit };
};

var resolveCellGutter = function resolveCellGutter(_ref) {
  var gutter = _ref.gutter,
      columnCount = _ref.columnCount;

  var _parseUnit = parseUnit(gutter),
      number = _parseUnit.number,
      unit = _parseUnit.unit;

  return "" + (number - number / columnCount) + unit;
};

var resolveCellFlexBasis = function resolveCellFlexBasis(_ref2) {
  var width = _ref2.width,
      gutter = _ref2.gutter,
      columnCount = _ref2.columnCount;

  var MULTIPLIER = 100;

  // Full-width cells have no gutter
  if (width === 1) {
    return "100%";
  }

  var finalGutter = resolveCellGutter({ gutter: gutter, columnCount: columnCount });

  return "calc(" + width * MULTIPLIER + "% - " + finalGutter + ")";
};

// Merge Radium style arrays and leave
// normal style objects untouched
var resolvePropStyles = function resolvePropStyles(styles) {
  if (styles && Array.isArray(styles)) {
    return (0, _mergeStyles.mergeStyles)(styles);
  }
  return styles ? styles : {};
};

var resolveCellStyles = function resolveCellStyles(props) {
  // Translate grid-speak to flexbox-speak
  var alignmentMap = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
    top: "flex-start",
    middle: "center",
    bottom: "flex-end"
  };

  var mediaQueries = Object.keys(props).filter(function (key) {
    return key.indexOf("@media") !== -1;
  });

  var cellStyle = mediaQueries.reduce(function (acc, mediaQuery) {
    var breakpointStyles = props[mediaQuery];

    return _extends({}, acc, _defineProperty({}, mediaQuery, {
      display: "flex",
      flexBasis: resolveCellFlexBasis({
        width: (0, _parseFraction2.default)(breakpointStyles.width),
        gutter: breakpointStyles.gutter,
        columnCount: breakpointStyles.columnCount
      }),
      alignItems: alignmentMap[breakpointStyles.verticalAlign],
      justifyContent: alignmentMap[breakpointStyles.horizontalAlign],
      order: breakpointStyles.order ? breakpointStyles.order : "initial"
    }));
  }, {});

  // Deep merge here so that custom media query
  // styles don't get obliterated by the defaults
  return (0, _lodash2.default)(cellStyle, resolvePropStyles(props.style));
};

exports.default = resolveCellStyles;