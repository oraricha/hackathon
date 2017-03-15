'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Utility for extracting border radii props from components
 */

function radii(props) {
  var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  var _ref = props || {},
      rounded = _ref.rounded,
      pill = _ref.pill,
      circle = _ref.circle;

  var borderRadius = void 0;

  if (rounded === true) {
    borderRadius = r;
  } else if (rounded === false) {
    borderRadius = 0;
  }

  if (typeof rounded === 'string') {
    var obj = {
      top: r + 'px ' + r + 'px 0 0',
      right: '0 ' + r + 'px ' + r + 'px 0',
      bottom: '0 0 ' + r + 'px ' + r + 'px',
      left: r + 'px 0 0 ' + r + 'px'
    };
    borderRadius = obj[rounded] || null;
  }

  if (pill || circle) {
    borderRadius = 99999;
  }

  if (typeof borderRadius === 'undefined') {
    return {};
  } else {
    return { borderRadius: borderRadius };
  }
}

exports.default = radii;