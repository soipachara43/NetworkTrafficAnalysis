"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemoryElasticsearchAdapter = void 0;

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
var MemoryElasticsearchAdapter =
/*#__PURE__*/
function () {
  function MemoryElasticsearchAdapter(mockIsKueryValid, mockKueryToEsQuery, suggestions) {
    _classCallCheck(this, MemoryElasticsearchAdapter);

    this.mockIsKueryValid = mockIsKueryValid;
    this.mockKueryToEsQuery = mockKueryToEsQuery;
    this.suggestions = suggestions;
  }

  _createClass(MemoryElasticsearchAdapter, [{
    key: "isKueryValid",
    value: function isKueryValid(kuery) {
      return this.mockIsKueryValid(kuery);
    }
  }, {
    key: "convertKueryToEsQuery",
    value: function () {
      var _convertKueryToEsQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(kuery) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.mockKueryToEsQuery(kuery));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function convertKueryToEsQuery(_x) {
        return _convertKueryToEsQuery.apply(this, arguments);
      }

      return convertKueryToEsQuery;
    }()
  }, {
    key: "getSuggestions",
    value: function () {
      var _getSuggestions = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(kuery, selectionStart) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.suggestions);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getSuggestions(_x2, _x3) {
        return _getSuggestions.apply(this, arguments);
      }

      return getSuggestions;
    }()
  }]);

  return MemoryElasticsearchAdapter;
}();

exports.MemoryElasticsearchAdapter = MemoryElasticsearchAdapter;