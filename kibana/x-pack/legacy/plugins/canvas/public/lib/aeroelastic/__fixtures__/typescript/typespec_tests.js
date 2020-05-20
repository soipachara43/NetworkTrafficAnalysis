"use strict";

var _select = require("../../select");

var _matrix2d = require("../../matrix2d");

var _matrix = require("../../matrix");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*

  Type checking isn't too useful if future commits can accidentally weaken the type constraints, because a
  TypeScript linter will not complain - everything that passed before will continue to pass. The coder
  will not have feedback that the original intent with the typing got compromised. To declare the intent
  via passing and failing type checks, test cases are needed, some of which designed to expect a TS pass,
  some of them to expect a TS complaint. It documents intent for peers too, as type specs are a tough read.

  Run compile-time type specification tests in the `kibana` root with:

     yarn typespec

  Test "cases" expecting to pass TS checks are not annotated, while ones we want TS to complain about
  are prepended with the comment
 
  // typings:expect-error

  The test "suite" and "cases" are wrapped in IIFEs to prevent linters from complaining about the unused
  binding. It can be structured internally as desired.
  
*/
(function () {
  /**
   * TYPE TEST SUITE
   */
  (function vectorArrayCreationTests(vec2d, vec3d) {
    // 2D vector OK
    vec2d = [0, 0, 0]; // OK

    vec2d = [-0, NaN, -Infinity]; // IEEE 754 values are OK
    // 3D vector OK

    vec3d = [0, 0, 0, 0];
    vec3d = [100, -0, Infinity, NaN]; // 2D vector not OK
    // typings:expect-error

    vec2d = 3; // not even an array
    // typings:expect-error

    vec2d = []; // no elements
    // typings:expect-error

    vec2d = [0, 0]; // too few elements
    // typings:expect-error

    vec2d = [0, 0, 0, 0]; // too many elements
    // 3D vector not OK
    // typings:expect-error

    vec3d = 3; // not even an array
    // typings:expect-error

    vec3d = []; // no elements
    // typings:expect-error

    vec3d = [0, 0, 0]; // too few elements
    // typings:expect-error

    vec3d = [0, 0, 0, 0, 0]; // too many elements

    return; // arrayCreationTests
  })(_matrix2d.ORIGIN, _matrix.ORIGIN);

  (function matrixArrayCreationTests(mat2d, mat3d) {
    // 2D matrix OK
    mat2d = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // OK

    mat2d = [-0, NaN, -Infinity, 3, 4, 5, 6, 7, 8]; // IEEE 754 values are OK
    // 3D matrix OK

    mat3d = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    mat3d = [100, -0, Infinity, NaN, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // 2D matrix not OK
    // typings:expect-error

    mat2d = 3; // not even an array
    // typings:expect-error

    mat2d = []; // no elements
    // typings:expect-error

    mat2d = [0, 1, 2, 3, 4, 5, 6, 7]; // too few elements
    // typings:expect-error

    mat2d = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // too many elements
    // 3D vector not OK
    // typings:expect-error

    mat3d = 3; // not even an array
    // typings:expect-error

    mat3d = []; // no elements
    // typings:expect-error

    mat3d = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // too few elements
    // typings:expect-error

    mat3d = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]; // too many elements
    // Matrix modification should NOT be OK

    mat3d[3] = 100; // too bad the ReadOnly part appears not to be enforced so can't precede it with typings:expect-error

    return; // arrayCreationTests
  })(_matrix2d.UNITMATRIX, _matrix.NANMATRIX);

  (function matrixMatrixAdditionTests(mat2d, mat3d) {
    (0, _matrix2d.add)(mat2d, mat2d); // OK

    (0, _matrix.add)(mat3d, mat3d); // OK
    // typings:expect-error

    (0, _matrix2d.add)(mat2d, mat3d); // at least one arg doesn't comply
    // typings:expect-error

    (0, _matrix2d.add)(mat3d, mat2d); // at least one arg doesn't comply
    // typings:expect-error

    (0, _matrix2d.add)(mat3d, mat3d); // at least one arg doesn't comply
    // typings:expect-error

    (0, _matrix.add)(mat2d, mat3d); // at least one arg doesn't comply
    // typings:expect-error

    (0, _matrix.add)(mat3d, mat2d); // at least one arg doesn't comply
    // typings:expect-error

    (0, _matrix.add)(mat2d, mat2d); // at least one arg doesn't comply

    return; // matrixMatrixAdditionTests
  })(_matrix2d.UNITMATRIX, _matrix.NANMATRIX);

  (function matrixVectorMultiplicationTests(vec2d, mat2d, vec3d, mat3d) {
    (0, _matrix2d.mvMultiply)(mat2d, vec2d); // OK

    (0, _matrix.mvMultiply)(mat3d, vec3d); // OK
    // typings:expect-error

    (0, _matrix.mvMultiply)(mat2d, vec2d); // trying to use a 3d fun for 2d args
    // typings:expect-error

    (0, _matrix2d.mvMultiply)(mat3d, vec3d); // trying to use a 2d fun for 3d args
    // typings:expect-error

    (0, _matrix2d.mvMultiply)(mat3d, vec2d); // 1st arg is a mismatch
    // typings:expect-error

    (0, _matrix2d.mvMultiply)(mat2d, vec3d); // 2nd arg is a mismatch
    // typings:expect-error

    (0, _matrix.mvMultiply)(mat2d, vec3d); // 1st arg is a mismatch
    // typings:expect-error

    (0, _matrix.mvMultiply)(mat3d, vec2d); // 2nd arg is a mismatch

    return; // matrixVectorTests
  })(_matrix2d.ORIGIN, _matrix2d.UNITMATRIX, _matrix.ORIGIN, _matrix.NANMATRIX);

  (function jsonTests(plain) {
    // numbers are OK
    plain = 1;
    plain = NaN;
    plain = Infinity;
    plain = -Infinity;
    plain = Math.pow(2, 6); // other JSON primitive types are OK

    plain = false;
    plain = 'hello';
    plain = null; // structures made of above and of structures are OK

    plain = {};
    plain = [];
    plain = {
      a: 1
    };
    plain = [0, null, false, NaN, 3.14, 'one more'];
    plain = {
      a: {
        b: 5,
        c: {
          d: [1, 'a', -Infinity, null],
          e: -1
        },
        f: 'b'
      },
      g: false
    }; // typings:expect-error

    plain = undefined; // it's undefined
    // typings:expect-error

    plain = function plain(a) {
      return a;
    }; // it's a function
    // typings:expect-error


    plain = [new Date()]; // it's a time
    // typings:expect-error

    plain = {
      a: Symbol('haha')
    }; // symbol isn't permitted either
    // typings:expect-error

    plain = window || void 0; // typings:expect-error

    plain = {
      a: {
        b: 5,
        c: {
          d: [1, 'a', undefined, null]
        }
      }
    }; // going deep into the structure

    return; // jsonTests
  })(null);

  (function selectTests(selector) {
    selector = (0, _select.select)(function (a) {
      return a;
    }); // one arg

    selector = (0, _select.select)(function (a, b) {
      return "".concat(a, " and ").concat(b);
    }); // more args

    selector = (0, _select.select)(function () {
      return 1;
    }); // zero arg

    selector = (0, _select.select)(function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return args;
    }); // variadic
    // typings:expect-error

    selector = function selector(a) {
      return a;
    }; // not a selector
    // typings:expect-error


    selector = (0, _select.select)(function () {}); // should yield a JSON value, but it returns void
    // typings:expect-error

    selector = (0, _select.select)(function (x) {
      return {
        a: x,
        b: undefined
      };
    }); // should return a Json

    return; // selectTests
  })((0, _select.select)(function (a) {
    return a;
  }));

  return; // test suite
})();