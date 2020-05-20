"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexPatterns = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Fetches Configured Index Patterns from the Kibana saved objects API
 *
 * TODO: Refactor to context provider: https://github.com/elastic/siem-team/issues/448
 */
var getIndexPatterns =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(savedObjects) {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return savedObjects.client.find({
              type: 'index-pattern',
              fields: ['title'],
              perPage: 10000
            });

          case 2:
            response = _context.sent;
            return _context.abrupt("return", response.savedObjects);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getIndexPatterns(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getIndexPatterns = getIndexPatterns;