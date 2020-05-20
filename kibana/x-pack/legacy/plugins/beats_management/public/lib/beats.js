"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeatsLib = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var BeatsLib =
/*#__PURE__*/
function () {
  function BeatsLib(adapter, elasticsearch) {
    var _this = this;

    _classCallCheck(this, BeatsLib);

    this.adapter = adapter;
    this.elasticsearch = elasticsearch;

    _defineProperty(this, "getBeatWithToken",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(enrollmentToken) {
        var beat;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.adapter.getBeatWithToken(enrollmentToken);

              case 2:
                beat = _context.sent;
                return _context.abrupt("return", beat);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(this, "getBeatsWithTag",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(tagId) {
        var beats;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.adapter.getBeatsWithTag(tagId);

              case 2:
                beats = _context2.sent;
                return _context2.abrupt("return", beats);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(this, "getAll",
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(kuery) {
        var ESQuery, beats;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!kuery) {
                  _context3.next = 4;
                  break;
                }

                _context3.next = 3;
                return _this.elasticsearch.convertKueryToEsQuery(kuery);

              case 3:
                ESQuery = _context3.sent;

              case 4:
                _context3.next = 6;
                return _this.adapter.getAll(ESQuery);

              case 6:
                beats = _context3.sent;
                return _context3.abrupt("return", beats);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(this, "update",
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(id, beatData) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this.adapter.update(id, beatData);

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x4, _x5) {
        return _ref4.apply(this, arguments);
      };
    }());

    _defineProperty(this, "removeTagsFromBeats",
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(removals) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _this.adapter.removeTagsFromBeats(removals);

              case 2:
                return _context5.abrupt("return", _context5.sent);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x6) {
        return _ref5.apply(this, arguments);
      };
    }());

    _defineProperty(this, "assignTagsToBeats",
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(assignments) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this.adapter.assignTagsToBeats(assignments);

              case 2:
                return _context6.abrupt("return", _context6.sent);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x7) {
        return _ref6.apply(this, arguments);
      };
    }());
  }
  /** Get a single beat using it's ID for lookup */


  _createClass(BeatsLib, [{
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(id) {
        var beat;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.adapter.get(id);

              case 2:
                beat = _context7.sent;
                return _context7.abrupt("return", beat);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function get(_x8) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
    /** Get a single beat using the token it was enrolled in for lookup */

  }]);

  return BeatsLib;
}();

exports.BeatsLib = BeatsLib;