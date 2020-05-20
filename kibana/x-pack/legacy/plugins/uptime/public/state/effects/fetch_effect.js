"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchEffectFactory = fetchEffectFactory;

var _effects = require("redux-saga/effects");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Factory function for a fetch effect. It expects three action creators,
 * one to call for a fetch, one to call for success, and one to handle failures.
 * @param fetch creates a fetch action
 * @param success creates a success action
 * @param fail creates a failure action
 * @template T the action type expected by the fetch action
 * @template R the type that the API request should return on success
 * @template S tye type of the success action
 * @template F the type of the failure action
 */
function fetchEffectFactory(fetch, success, fail) {
  return (
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(action) {
      var _response;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _effects.call)(fetch, action.payload);

            case 3:
              _response = _context.sent;

              if (!(_response instanceof Error)) {
                _context.next = 10;
                break;
              }

              // eslint-disable-next-line no-console
              console.error(_response);
              _context.next = 8;
              return (0, _effects.put)(fail(_response));

            case 8:
              _context.next = 12;
              break;

            case 10:
              _context.next = 12;
              return (0, _effects.put)(success(_response));

            case 12:
              _context.next = 19;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);
              // eslint-disable-next-line no-console
              console.error(_context.t0);
              _context.next = 19;
              return (0, _effects.put)(fail(_context.t0));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 14]]);
    })
  );
}