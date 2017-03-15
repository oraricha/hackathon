"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prune = function prune(object) {
  return Object.keys(object).reduce(function (acc, key) {
    return object[key] === undefined ? acc : _extends({}, acc, _defineProperty({}, key, object[key]));
  }, {});
};

var resolveCellDefaults = function resolveCellDefaults(props) {
  var gridDefault = {
    width: props.cellWidth,
    horizontalAlign: props.cellAlign,
    verticalAlign: props.cellVerticalAlign,
    gutter: props.gutter
  };

  var cellDefault = {
    width: props.width,
    horizontalAlign: props.align,
    verticalAlign: props.verticalAlign,
    order: props.order
  };

  var breakpoints = ["small", "medium", "large", "xlarge"].map(function (size) {
    return {
      mediaQuery: props.breakpoints[size],
      gridBreakpointDefault: {
        width: props[size + "CellWidth"],
        horizontalAlign: props[size + "CellAlign"],
        verticalAlign: props[size + "CellVerticalAlign"]
      },
      cellBreakpointDefault: {
        width: props[size + "Width"],
        horizontalAlign: props[size + "Align"],
        verticalAlign: props[size + "VerticalAlign"],
        order: props[size + "Order"]
      }
    };
  });

  return breakpoints.reduce(function (acc, breakpoint) {
    // Extract the media query and the breakpoint cell configs
    var mediaQuery = breakpoint.mediaQuery,
        gridBreakpointDefault = breakpoint.gridBreakpointDefault,
        cellBreakpointDefault = breakpoint.cellBreakpointDefault;

    // Determine the final cell configuration.
    // Uses these sources for cell styles, in order of precedence:
    // - Grid default
    // - Grid breakpoint default
    // - Cell default
    // - Cell breakpoint default

    var cellConfig = _extends({}, prune(gridDefault), prune(gridBreakpointDefault), prune(cellDefault), prune(cellBreakpointDefault));

    return _extends({}, acc, _defineProperty({}, mediaQuery, cellConfig));
  }, {});
};

exports.default = resolveCellDefaults;