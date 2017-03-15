"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var validateFraction = function validateFraction(fraction) {
  var _fraction = _slicedToArray(fraction, 2),
      n = _fraction[0],
      d = _fraction[1];

  // Remove all whitespace and parse numbers


  var numerator = parseInt(n.replace(/\s/g, ""), 10);
  var denominator = parseInt(d.replace(/\s/g, ""), 10);
  var result = numerator / denominator;

  if (denominator === 0) {
    throw new Error("Your fraction divides by zero.");
  }

  if (!numerator || !denominator) {
    throw new Error("Your fraction is missing a numerator or denominator.");
  }

  if (result > 1) {
    throw new Error("Your fraction must be less than or equal to 1.");
  }

  return [numerator, denominator];
};

var parseFraction = function parseFraction(string) {
  if (string.trim() === "1") {
    return 1;
  }

  var _string$split = string.split("/"),
      _string$split2 = _slicedToArray(_string$split, 2),
      rawNumerator = _string$split2[0],
      rawDenominator = _string$split2[1];

  var _validateFraction = validateFraction([rawNumerator, rawDenominator]),
      _validateFraction2 = _slicedToArray(_validateFraction, 2),
      numerator = _validateFraction2[0],
      denominator = _validateFraction2[1];

  return numerator / denominator;
};

exports.default = parseFraction;