"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestTokensAdapter = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RestTokensAdapter =
/*#__PURE__*/
function () {
  function RestTokensAdapter(REST) {
    _classCallCheck(this, RestTokensAdapter);

    this.REST = REST;
  }

  _createClass(RestTokensAdapter, [{
    key: "createEnrollmentTokens",
    value: function () {
      var _createEnrollmentTokens = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var numTokens,
            results,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                numTokens = _args.length > 0 && _args[0] !== undefined ? _args[0] : 1;
                _context.next = 3;
                return this.REST.post('/api/beats/enrollment_tokens', {
                  num_tokens: numTokens
                });

              case 3:
                results = _context.sent.results;
                return _context.abrupt("return", results.map(function (result) {
                  return result.item;
                }));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createEnrollmentTokens() {
        return _createEnrollmentTokens.apply(this, arguments);
      }

      return createEnrollmentTokens;
    }()
  }]);

  return RestTokensAdapter;
}();

exports.RestTokensAdapter = RestTokensAdapter;