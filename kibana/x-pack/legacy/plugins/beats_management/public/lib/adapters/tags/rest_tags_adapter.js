"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestTagsAdapter = void 0;

var _lodash = require("lodash");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RestTagsAdapter =
/*#__PURE__*/
function () {
  function RestTagsAdapter(REST) {
    _classCallCheck(this, RestTagsAdapter);

    this.REST = REST;
  }

  _createClass(RestTagsAdapter, [{
    key: "getTagsWithIds",
    value: function () {
      var _getTagsWithIds = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(tagIds) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.REST.get("/api/beats/tags/".concat((0, _lodash.uniq)(tagIds).join(',')));

              case 3:
                return _context.abrupt("return", _context.sent.items);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", []);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      function getTagsWithIds(_x) {
        return _getTagsWithIds.apply(this, arguments);
      }

      return getTagsWithIds;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(ESQuery) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.REST.get("/api/beats/tags", {
                  ESQuery: ESQuery
                });

              case 3:
                return _context2.abrupt("return", _context2.sent.list);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", []);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 6]]);
      }));

      function getAll(_x2) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(tagIds) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.REST.delete("/api/beats/tags/".concat((0, _lodash.uniq)(tagIds).join(',')));

              case 2:
                return _context3.abrupt("return", _context3.sent.success);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _delete(_x3) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "upsertTag",
    value: function () {
      var _upsertTag = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(tag) {
        var response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.REST.put("/api/beats/tag/".concat(tag.id), {
                  color: tag.color,
                  name: tag.name
                });

              case 2:
                response = _context4.sent;
                return _context4.abrupt("return", response.success ? tag : null);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function upsertTag(_x4) {
        return _upsertTag.apply(this, arguments);
      }

      return upsertTag;
    }()
  }, {
    key: "getAssignable",
    value: function () {
      var _getAssignable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(beats) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this.REST.get("/api/beats/tags/assignable/".concat(beats.map(function (beat) {
                  return beat.id;
                }).join(',')));

              case 3:
                return _context5.abrupt("return", _context5.sent.items);

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", []);

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 6]]);
      }));

      function getAssignable(_x5) {
        return _getAssignable.apply(this, arguments);
      }

      return getAssignable;
    }()
  }]);

  return RestTagsAdapter;
}();

exports.RestTagsAdapter = RestTagsAdapter;