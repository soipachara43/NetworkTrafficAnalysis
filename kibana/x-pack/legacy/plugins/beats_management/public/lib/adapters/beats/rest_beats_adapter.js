"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestBeatsAdapter = void 0;

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
var RestBeatsAdapter =
/*#__PURE__*/
function () {
  function RestBeatsAdapter(REST) {
    _classCallCheck(this, RestBeatsAdapter);

    this.REST = REST;
  }

  _createClass(RestBeatsAdapter, [{
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(id) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.REST.get("/api/beats/agent/".concat(id));

              case 3:
                return _context.abrupt("return", _context.sent.item);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", null);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      function get(_x) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "getBeatWithToken",
    value: function () {
      var _getBeatWithToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(enrollmentToken) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.REST.get("/api/beats/agent/unknown/".concat(enrollmentToken));

              case 3:
                return _context2.abrupt("return", _context2.sent.item);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", null);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 6]]);
      }));

      function getBeatWithToken(_x2) {
        return _getBeatWithToken.apply(this, arguments);
      }

      return getBeatWithToken;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(ESQuery) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.REST.get('/api/beats/agents/all', {
                  ESQuery: ESQuery
                });

              case 3:
                return _context3.abrupt("return", _context3.sent.list);

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", []);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 6]]);
      }));

      function getAll(_x3) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "getBeatsWithTag",
    value: function () {
      var _getBeatsWithTag = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(tagId) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.REST.get("/api/beats/agents/tag/".concat(tagId));

              case 3:
                return _context4.abrupt("return", _context4.sent.list);

              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", []);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 6]]);
      }));

      function getBeatsWithTag(_x4) {
        return _getBeatsWithTag.apply(this, arguments);
      }

      return getBeatsWithTag;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(id, beatData) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.REST.put("/api/beats/agent/".concat(id), beatData);

              case 2:
                return _context5.abrupt("return", true);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function update(_x5, _x6) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "removeTagsFromBeats",
    value: function () {
      var _removeTagsFromBeats = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(removals) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.REST.post("/api/beats/agents_tags/removals", {
                  removals: removals
                });

              case 2:
                return _context6.abrupt("return", _context6.sent.results);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function removeTagsFromBeats(_x7) {
        return _removeTagsFromBeats.apply(this, arguments);
      }

      return removeTagsFromBeats;
    }()
  }, {
    key: "assignTagsToBeats",
    value: function () {
      var _assignTagsToBeats = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(assignments) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.REST.post("/api/beats/agents_tags/assignments", {
                  assignments: assignments
                });

              case 2:
                return _context7.abrupt("return", _context7.sent.results);

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function assignTagsToBeats(_x8) {
        return _assignTagsToBeats.apply(this, arguments);
      }

      return assignTagsToBeats;
    }()
  }]);

  return RestBeatsAdapter;
}();

exports.RestBeatsAdapter = RestBeatsAdapter;