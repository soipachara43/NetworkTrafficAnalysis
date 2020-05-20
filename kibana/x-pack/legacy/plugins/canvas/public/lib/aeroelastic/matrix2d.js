"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dotProduct = exports.componentProduct = exports.subtract = exports.add = exports.normalize = exports.mvMultiply = exports.multiply = exports.scale = exports.translate = exports.UNITMATRIX = exports.ORIGIN = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ORIGIN = [0, 0, 1];
exports.ORIGIN = ORIGIN;
var UNITMATRIX = [1, 0, 0, 0, 1, 0, 0, 0, 1];
exports.UNITMATRIX = UNITMATRIX;

var translate = function translate(x, y) {
  return [1, 0, 0, 0, 1, 0, x, y, 1];
};

exports.translate = translate;

var scale = function scale(x, y) {
  return [x, 0, 0, 0, y, 0, 0, 0, 1];
};
/**
 * multiply
 *
 * Matrix multiplies two matrices of column major format, returning the result in the same format
 *
 *
 *                          A    D    G
 *                          B    E    H
 *                          C    F    I
 *
 *         a    d    g      .    .    .
 *         b    e    h      .    .    .
 *         c    f    i      .    .    c * G + f * H + i * I
 *
 */
// prettier-ignore


exports.scale = scale;

var mult = function mult(_ref, _ref2) {
  var _ref3 = _slicedToArray(_ref, 9),
      a = _ref3[0],
      b = _ref3[1],
      c = _ref3[2],
      d = _ref3[3],
      e = _ref3[4],
      f = _ref3[5],
      g = _ref3[6],
      h = _ref3[7],
      i = _ref3[8];

  var _ref4 = _slicedToArray(_ref2, 9),
      A = _ref4[0],
      B = _ref4[1],
      C = _ref4[2],
      D = _ref4[3],
      E = _ref4[4],
      F = _ref4[5],
      G = _ref4[6],
      H = _ref4[7],
      I = _ref4[8];

  return [a * A + d * B + g * C, b * A + e * B + h * C, c * A + f * B + i * C, a * D + d * E + g * F, b * D + e * E + h * F, c * D + f * E + i * F, a * G + d * H + g * I, b * G + e * H + h * I, c * G + f * H + i * I];
};

var multiply = function multiply(first) {
  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  return rest.reduce(function (prev, next) {
    return mult(prev, next);
  }, first);
};
/**
 * mvMultiply
 *
 * Multiplies a matrix and a vector
 *
 *
 *                          A
 *                          B
 *                          C
 *
 *         a    d    g      .
 *         b    e    h      .
 *         c    f    i      c * A + f * B + i * C
 *
 */


exports.multiply = multiply;

var mvMultiply = function mvMultiply(_ref5, _ref6) {
  var _ref7 = _slicedToArray(_ref5, 9),
      a = _ref7[0],
      b = _ref7[1],
      c = _ref7[2],
      d = _ref7[3],
      e = _ref7[4],
      f = _ref7[5],
      g = _ref7[6],
      h = _ref7[7],
      i = _ref7[8];

  var _ref8 = _slicedToArray(_ref6, 3),
      A = _ref8[0],
      B = _ref8[1],
      C = _ref8[2];

  return [a * A + d * B + g * C, b * A + e * B + h * C, c * A + f * B + i * C];
};

exports.mvMultiply = mvMultiply;

var normalize = function normalize(_ref9) {
  var _ref10 = _slicedToArray(_ref9, 3),
      A = _ref10[0],
      B = _ref10[1],
      C = _ref10[2];

  return C === 1 ? [A, B, C] : [A / C, B / C, 1];
};

exports.normalize = normalize;

var add = function add(_ref11, _ref12) {
  var _ref13 = _slicedToArray(_ref11, 9),
      a = _ref13[0],
      b = _ref13[1],
      c = _ref13[2],
      d = _ref13[3],
      e = _ref13[4],
      f = _ref13[5],
      g = _ref13[6],
      h = _ref13[7],
      i = _ref13[8];

  var _ref14 = _slicedToArray(_ref12, 9),
      A = _ref14[0],
      B = _ref14[1],
      C = _ref14[2],
      D = _ref14[3],
      E = _ref14[4],
      F = _ref14[5],
      G = _ref14[6],
      H = _ref14[7],
      I = _ref14[8];

  return [a + A, b + B, c + C, d + D, e + E, f + F, g + G, h + H, i + I];
};

exports.add = add;

var subtract = function subtract(_ref15, _ref16) {
  var _ref17 = _slicedToArray(_ref15, 9),
      a = _ref17[0],
      b = _ref17[1],
      c = _ref17[2],
      d = _ref17[3],
      e = _ref17[4],
      f = _ref17[5],
      g = _ref17[6],
      h = _ref17[7],
      i = _ref17[8];

  var _ref18 = _slicedToArray(_ref16, 9),
      A = _ref18[0],
      B = _ref18[1],
      C = _ref18[2],
      D = _ref18[3],
      E = _ref18[4],
      F = _ref18[5],
      G = _ref18[6],
      H = _ref18[7],
      I = _ref18[8];

  return [a - A, b - B, c - C, d - D, e - E, f - F, g - G, h - H, i - I];
};

exports.subtract = subtract;

var componentProduct = function componentProduct(_ref19, _ref20) {
  var _ref21 = _slicedToArray(_ref19, 3),
      a = _ref21[0],
      b = _ref21[1],
      c = _ref21[2];

  var _ref22 = _slicedToArray(_ref20, 3),
      A = _ref22[0],
      B = _ref22[1],
      C = _ref22[2];

  return [a * A, b * B, c * C];
};

exports.componentProduct = componentProduct;

var dotProduct = function dotProduct(_ref23, _ref24) {
  var _ref25 = _slicedToArray(_ref23, 3),
      a = _ref25[0],
      b = _ref25[1],
      c = _ref25[2];

  var _ref26 = _slicedToArray(_ref24, 3),
      A = _ref26[0],
      B = _ref26[1],
      C = _ref26[2];

  return a * A + b * B + c * C;
};

exports.dotProduct = dotProduct;