"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestConfigBlocksAdapter = void 0;

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
var RestConfigBlocksAdapter =
/*#__PURE__*/
function () {
  function RestConfigBlocksAdapter(REST) {
    _classCallCheck(this, RestConfigBlocksAdapter);

    this.REST = REST;
  }

  _createClass(RestConfigBlocksAdapter, [{
    key: "upsert",
    value: function () {
      var _upsert = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(blocks) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.REST.put("/api/beats/configurations", blocks);

              case 2:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function upsert(_x) {
        return _upsert.apply(this, arguments);
      }

      return upsert;
    }()
  }, {
    key: "getForTags",
    value: function () {
      var _getForTags = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(tagIds, page) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.REST.get("/api/beats/configurations/".concat(tagIds.join(','), "/").concat(page));

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getForTags(_x2, _x3) {
        return _getForTags.apply(this, arguments);
      }

      return getForTags;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(id) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.REST.delete("/api/beats/configurations/".concat(id));

              case 2:
                return _context3.abrupt("return", _context3.sent.success);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _delete(_x4) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return RestConfigBlocksAdapter;
}();

exports.RestConfigBlocksAdapter = RestConfigBlocksAdapter;