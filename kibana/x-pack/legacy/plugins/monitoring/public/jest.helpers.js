"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockUseEffects = mockUseEffects;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Suppress React 16.8 act() warnings globally.
 * The react teams fix won't be out of alpha until 16.9.0.
 * https://github.com/facebook/react/issues/14769#issuecomment-514589856
 */
var consoleError = console.error; // eslint-disable-line no-console

beforeAll(function () {
  jest.spyOn(console, 'error').mockImplementation(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!args[0].includes('Warning: An update to %s inside a test was not wrapped in act')) {
      consoleError.apply(void 0, args);
    }
  });
});

function mockUseEffects() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var spy = jest.spyOn(_react.default, 'useEffect');

  for (var i = 0; i < count; i++) {
    spy.mockImplementationOnce(function (f) {
      return f();
    });
  }
} // export function mockUseEffectForDeps(deps, count = 1) {
//   const spy = jest.spyOn(React, 'useEffect');
//   for (let i = 0; i < count; i++) {
//     spy.mockImplementationOnce((f, depList) => {
//     });
//   }
// }