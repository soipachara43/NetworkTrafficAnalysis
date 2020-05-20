"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matrixToAngle = exports.reduceTransforms = exports.componentProduct = exports.subtract = exports.add = exports.compositeComponent = exports.translateComponent = exports.invert = exports.normalize = exports.mvMultiply = exports.multiply = exports.rotateZ = exports.scale = exports.translate = exports.BOTTOM_RIGHT = exports.BOTTOM_LEFT = exports.TOP_RIGHT = exports.TOP_LEFT = exports.UP = exports.RIGHT = exports.ORIGIN = exports.NANMATRIX = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Column major order:
 *
 * Instead of a row major ordered vector representation of a 4 x 4 matrix, we use column major ordered vectors.
 *
 * This is what the matrix is:                  Eg. this is the equivalent matrix of `translate3d(${x}px, ${y}px, ${z}px)`:
 *
 *         a e i m                                                           1 0 0 x
 *         b f j n                                                           0 1 0 y
 *         c g k o                                                           0 0 1 z
 *         d h l p                                                           0 0 0 1
 *
 *  but it's _not_ represented as a 2D array or array of arrays. CSS3 `transform3d` expects it as this vector:
 *
 *      [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p]
 *
 *  so it's clear that the first _column vector_ corresponds to a, b, c, d.
 *
 */
var NANMATRIX = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
exports.NANMATRIX = NANMATRIX;
var ORIGIN = [0, 0, 0, 1];
exports.ORIGIN = ORIGIN;
var RIGHT = [1, 0, 0, 1];
exports.RIGHT = RIGHT;
var UP = [0, 1, 0, 1];
exports.UP = UP;
var TOP_LEFT = [-1, 1, 0, 1];
exports.TOP_LEFT = TOP_LEFT;
var TOP_RIGHT = [1, 1, 0, 1];
exports.TOP_RIGHT = TOP_RIGHT;
var BOTTOM_LEFT = [-1, -1, 0, 1];
exports.BOTTOM_LEFT = BOTTOM_LEFT;
var BOTTOM_RIGHT = [1, -1, 0, 1]; // prettier-ignore

exports.BOTTOM_RIGHT = BOTTOM_RIGHT;

var translate = function translate(x, y, z) {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
}; // prettier-ignore


exports.translate = translate;

var scale = function scale(x, y, z) {
  return [x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1];
};

exports.scale = scale;

var rotateZ = function rotateZ(a) {
  var sinA = Math.sin(a);
  var cosA = Math.cos(a);
  return [cosA, -sinA, 0, 0, sinA, cosA, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
};
/**
 * multiply
 *
 * Matrix multiplies two matrices of column major format, returning the result in the same format
 *
 *
 *                               A    E    I    M
 *                               B    F    J    N
 *                               C    G    K    O
 *                               D    H    L    P
 *
 *         a    e    i    m      .    .    .    .
 *         b    f    j    n      .    .    .    .
 *         c    g    k    o      .    .    .    .
 *         d    h    l    p      .    .    .    d * M + h * N + l * O + p * P
 *
 */
// prettier-ignore


exports.rotateZ = rotateZ;

var mult = function mult(_ref, _ref2) {
  var _ref3 = _slicedToArray(_ref, 16),
      a = _ref3[0],
      b = _ref3[1],
      c = _ref3[2],
      d = _ref3[3],
      e = _ref3[4],
      f = _ref3[5],
      g = _ref3[6],
      h = _ref3[7],
      i = _ref3[8],
      j = _ref3[9],
      k = _ref3[10],
      l = _ref3[11],
      m = _ref3[12],
      n = _ref3[13],
      o = _ref3[14],
      p = _ref3[15];

  var _ref4 = _slicedToArray(_ref2, 16),
      A = _ref4[0],
      B = _ref4[1],
      C = _ref4[2],
      D = _ref4[3],
      E = _ref4[4],
      F = _ref4[5],
      G = _ref4[6],
      H = _ref4[7],
      I = _ref4[8],
      J = _ref4[9],
      K = _ref4[10],
      L = _ref4[11],
      M = _ref4[12],
      N = _ref4[13],
      O = _ref4[14],
      P = _ref4[15];

  return [a * A + e * B + i * C + m * D, b * A + f * B + j * C + n * D, c * A + g * B + k * C + o * D, d * A + h * B + l * C + p * D, a * E + e * F + i * G + m * H, b * E + f * F + j * G + n * H, c * E + g * F + k * G + o * H, d * E + h * F + l * G + p * H, a * I + e * J + i * K + m * L, b * I + f * J + j * K + n * L, c * I + g * J + k * K + o * L, d * I + h * J + l * K + p * L, a * M + e * N + i * O + m * P, b * M + f * N + j * O + n * P, c * M + g * N + k * O + o * P, d * M + h * N + l * O + p * P];
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
 *                               A
 *                               B
 *                               C
 *                               D
 *
 *         a    e    i    m      .
 *         b    f    j    n      .
 *         c    g    k    o      .
 *         d    h    l    p      d * A + h * B + l * C + p * D
 *
 */
// prettier-ignore


exports.multiply = multiply;

var mvMultiply = function mvMultiply(_ref5, _ref6) {
  var _ref7 = _slicedToArray(_ref5, 16),
      a = _ref7[0],
      b = _ref7[1],
      c = _ref7[2],
      d = _ref7[3],
      e = _ref7[4],
      f = _ref7[5],
      g = _ref7[6],
      h = _ref7[7],
      i = _ref7[8],
      j = _ref7[9],
      k = _ref7[10],
      l = _ref7[11],
      m = _ref7[12],
      n = _ref7[13],
      o = _ref7[14],
      p = _ref7[15];

  var _ref8 = _slicedToArray(_ref6, 4),
      A = _ref8[0],
      B = _ref8[1],
      C = _ref8[2],
      D = _ref8[3];

  return [a * A + e * B + i * C + m * D, b * A + f * B + j * C + n * D, c * A + g * B + k * C + o * D, d * A + h * B + l * C + p * D];
};

exports.mvMultiply = mvMultiply;

var normalize = function normalize(_ref9) {
  var _ref10 = _slicedToArray(_ref9, 4),
      A = _ref10[0],
      B = _ref10[1],
      C = _ref10[2],
      D = _ref10[3];

  return D === 1 ? [A, B, C, D] : [A / D, B / D, C / D, 1];
};
/**
 * invert
 *
 * Inverts the matrix
 *
 *         a    e    i    m
 *         b    f    j    n
 *         c    g    k    o
 *         d    h    l    p
 *
 */


exports.normalize = normalize;

var invert = function invert(_ref11) {
  var _ref12 = _slicedToArray(_ref11, 16),
      a = _ref12[0],
      b = _ref12[1],
      c = _ref12[2],
      d = _ref12[3],
      e = _ref12[4],
      f = _ref12[5],
      g = _ref12[6],
      h = _ref12[7],
      i = _ref12[8],
      j = _ref12[9],
      k = _ref12[10],
      l = _ref12[11],
      m = _ref12[12],
      n = _ref12[13],
      o = _ref12[14],
      p = _ref12[15];

  var inv = [f * k * p - f * l * o - j * g * p + j * h * o + n * g * l - n * h * k, -b * k * p + b * l * o + j * c * p - j * d * o - n * c * l + n * d * k, b * g * p - b * h * o - f * c * p + f * d * o + n * c * h - n * d * g, -b * g * l + b * h * k + f * c * l - f * d * k - j * c * h + j * d * g, -e * k * p + e * l * o + i * g * p - i * h * o - m * g * l + m * h * k, a * k * p - a * l * o - i * c * p + i * d * o + m * c * l - m * d * k, -a * g * p + a * h * o + e * c * p - e * d * o - m * c * h + m * d * g, a * g * l - a * h * k - e * c * l + e * d * k + i * c * h - i * d * g, e * j * p - e * l * n - i * f * p + i * h * n + m * f * l - m * h * j, -a * j * p + a * l * n + i * b * p - i * d * n - m * b * l + m * d * j, a * f * p - a * h * n - e * b * p + e * d * n + m * b * h - m * d * f, -a * f * l + a * h * j + e * b * l - e * d * j - i * b * h + i * d * f, -e * j * o + e * k * n + i * f * o - i * g * n - m * f * k + m * g * j, a * j * o - a * k * n - i * b * o + i * c * n + m * b * k - m * c * j, -a * f * o + a * g * n + e * b * o - e * c * n - m * b * g + m * c * f, a * f * k - a * g * j - e * b * k + e * c * j + i * b * g - i * c * f];
  var det = a * inv[0] + b * inv[4] + c * inv[8] + d * inv[12];

  if (det === 0) {
    return NANMATRIX; // no real solution
  } else {
    var recDet = 1 / det;

    for (var index = 0; index < 16; index++) {
      inv[index] *= recDet;
    }

    return inv;
  }
}; // prettier-ignore


exports.invert = invert;

var translateComponent = function translateComponent(a) {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, a[12], a[13], a[14], 1];
};

exports.translateComponent = translateComponent;

var compositeComponent = function compositeComponent(_ref13) {
  var _ref14 = _slicedToArray(_ref13, 16),
      a = _ref14[0],
      b = _ref14[1],
      c = _ref14[2],
      d = _ref14[3],
      e = _ref14[4],
      f = _ref14[5],
      g = _ref14[6],
      h = _ref14[7],
      i = _ref14[8],
      j = _ref14[9],
      k = _ref14[10],
      l = _ref14[11],
      m = _ref14[12],
      n = _ref14[13],
      o = _ref14[14],
      p = _ref14[15];

  return [a, b, c, d, e, f, g, h, i, j, k, l, 0, 0, 0, p];
}; // prettier-ignore


exports.compositeComponent = compositeComponent;

var add = function add(_ref15, _ref16) {
  var _ref17 = _slicedToArray(_ref15, 16),
      a = _ref17[0],
      b = _ref17[1],
      c = _ref17[2],
      d = _ref17[3],
      e = _ref17[4],
      f = _ref17[5],
      g = _ref17[6],
      h = _ref17[7],
      i = _ref17[8],
      j = _ref17[9],
      k = _ref17[10],
      l = _ref17[11],
      m = _ref17[12],
      n = _ref17[13],
      o = _ref17[14],
      p = _ref17[15];

  var _ref18 = _slicedToArray(_ref16, 16),
      A = _ref18[0],
      B = _ref18[1],
      C = _ref18[2],
      D = _ref18[3],
      E = _ref18[4],
      F = _ref18[5],
      G = _ref18[6],
      H = _ref18[7],
      I = _ref18[8],
      J = _ref18[9],
      K = _ref18[10],
      L = _ref18[11],
      M = _ref18[12],
      N = _ref18[13],
      O = _ref18[14],
      P = _ref18[15];

  return [a + A, b + B, c + C, d + D, e + E, f + F, g + G, h + H, i + I, j + J, k + K, l + L, m + M, n + N, o + O, p + P];
}; // prettier-ignore


exports.add = add;

var subtract = function subtract(_ref19, _ref20) {
  var _ref21 = _slicedToArray(_ref19, 16),
      a = _ref21[0],
      b = _ref21[1],
      c = _ref21[2],
      d = _ref21[3],
      e = _ref21[4],
      f = _ref21[5],
      g = _ref21[6],
      h = _ref21[7],
      i = _ref21[8],
      j = _ref21[9],
      k = _ref21[10],
      l = _ref21[11],
      m = _ref21[12],
      n = _ref21[13],
      o = _ref21[14],
      p = _ref21[15];

  var _ref22 = _slicedToArray(_ref20, 16),
      A = _ref22[0],
      B = _ref22[1],
      C = _ref22[2],
      D = _ref22[3],
      E = _ref22[4],
      F = _ref22[5],
      G = _ref22[6],
      H = _ref22[7],
      I = _ref22[8],
      J = _ref22[9],
      K = _ref22[10],
      L = _ref22[11],
      M = _ref22[12],
      N = _ref22[13],
      O = _ref22[14],
      P = _ref22[15];

  return [a - A, b - B, c - C, d - D, e - E, f - F, g - G, h - H, i - I, j - J, k - K, l - L, m - M, n - N, o - O, p - P];
};

exports.subtract = subtract;

var componentProduct = function componentProduct(_ref23, _ref24) {
  var _ref25 = _slicedToArray(_ref23, 4),
      a = _ref25[0],
      b = _ref25[1],
      c = _ref25[2],
      d = _ref25[3];

  var _ref26 = _slicedToArray(_ref24, 4),
      A = _ref26[0],
      B = _ref26[1],
      C = _ref26[2],
      D = _ref26[3];

  return [a * A, b * B, c * C, d * D];
};

exports.componentProduct = componentProduct;

var reduceTransforms = function reduceTransforms(transforms) {
  return transforms.length === 1 ? transforms[0] : transforms.slice(1).reduce(function (prev, next) {
    return multiply(prev, next);
  }, transforms[0]);
};

exports.reduceTransforms = reduceTransforms;

var clamp = function clamp(low, high, value) {
  return Math.min(high, Math.max(low, value));
};

var matrixToAngle = function matrixToAngle(transformMatrix) {
  // clamping is needed, otherwise inevitable floating point inaccuracies can cause NaN
  var z0 = Math.acos(clamp(-1, 1, transformMatrix[0]));
  var z1 = Math.asin(clamp(-1, 1, transformMatrix[1]));
  return z1 > 0 ? z0 : -z0;
};

exports.matrixToAngle = matrixToAngle;