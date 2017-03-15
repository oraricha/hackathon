'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Utility for extracting color and backgroundColor props from components
 */

function colorStyle(props, colors, context) {
  colors = colors || {};

  var _ref = props || {},
      color = _ref.color,
      backgroundColor = _ref.backgroundColor,
      theme = _ref.theme,
      inverted = _ref.inverted;

  var result = {};

  if (color && colors[color]) {
    result.color = colors[color];
  } else if (typeof color === 'string') {
    result.color = color;
  }

  if (backgroundColor && colors[backgroundColor]) {
    result.backgroundColor = colors[backgroundColor];
  } else if (typeof backgroundColor === 'string') {
    result.backgroundColor = backgroundColor;
  }

  if (theme && colors[theme]) {
    var invertedColor = context && context.inverted;
    if (inverted) {
      result.color = invertedColor || colors.white;
      result.backgroundColor = colors[theme];
    } else {
      result.color = colors[theme];
    }
  }

  return result;
}

exports.default = colorStyle;