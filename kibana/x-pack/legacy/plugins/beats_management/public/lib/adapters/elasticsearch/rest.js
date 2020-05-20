"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestElasticsearchAdapter = void 0;

var _lodash = require("lodash");

var _new_platform = require("ui/new_platform");

var _public = require("../../../../../../../../src/plugins/data/public");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RestElasticsearchAdapter =
/*#__PURE__*/
function () {
  function RestElasticsearchAdapter(indexPatternName) {
    _classCallCheck(this, RestElasticsearchAdapter);

    this.indexPatternName = indexPatternName;

    _defineProperty(this, "cachedIndexPattern", null);
  }

  _createClass(RestElasticsearchAdapter, [{
    key: "isKueryValid",
    value: function isKueryValid(kuery) {
      try {
        _public.esKuery.fromKueryExpression(kuery);
      } catch (err) {
        return false;
      }

      return true;
    }
  }, {
    key: "convertKueryToEsQuery",
    value: function () {
      var _convertKueryToEsQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(kuery) {
        var ast, indexPattern;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.isKueryValid(kuery)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", '');

              case 2:
                ast = _public.esKuery.fromKueryExpression(kuery);
                _context.next = 5;
                return this.getIndexPattern();

              case 5:
                indexPattern = _context.sent;
                return _context.abrupt("return", JSON.stringify(_public.esKuery.toElasticsearchQuery(ast, indexPattern)));

              case 7:
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
        var indexPattern;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getIndexPattern();

              case 2:
                indexPattern = _context2.sent;
                _context2.next = 5;
                return _new_platform.npStart.plugins.data.autocomplete.getQuerySuggestions({
                  language: 'kuery',
                  indexPatterns: [indexPattern],
                  boolFilter: [],
                  query: kuery || '',
                  selectionStart: selectionStart,
                  selectionEnd: selectionStart
                });

              case 5:
                _context2.t0 = _context2.sent;

                if (_context2.t0) {
                  _context2.next = 8;
                  break;
                }

                _context2.t0 = [];

              case 8:
                return _context2.abrupt("return", _context2.t0);

              case 9:
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
  }, {
    key: "getIndexPattern",
    value: function () {
      var _getIndexPattern = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.cachedIndexPattern) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", this.cachedIndexPattern);

              case 2:
                _context3.next = 4;
                return _new_platform.npStart.plugins.data.indexPatterns.getFieldsForWildcard({
                  pattern: this.indexPatternName
                });

              case 4:
                res = _context3.sent;

                if (!(0, _lodash.isEmpty)(res.fields)) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return");

              case 7:
                this.cachedIndexPattern = {
                  fields: res.fields,
                  title: "".concat(this.indexPatternName)
                };
                return _context3.abrupt("return", this.cachedIndexPattern);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getIndexPattern() {
        return _getIndexPattern.apply(this, arguments);
      }

      return getIndexPattern;
    }()
  }]);

  return RestElasticsearchAdapter;
}();

exports.RestElasticsearchAdapter = RestElasticsearchAdapter;