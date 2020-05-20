"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemoryTagsAdapter = void 0;

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
var MemoryTagsAdapter =
/*#__PURE__*/
function () {
  function MemoryTagsAdapter(tagsDB) {
    _classCallCheck(this, MemoryTagsAdapter);

    _defineProperty(this, "tagsDB", []);

    this.tagsDB = tagsDB;
  }

  _createClass(MemoryTagsAdapter, [{
    key: "getTagsWithIds",
    value: function () {
      var _getTagsWithIds = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(tagIds) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.tagsDB.filter(function (tag) {
                  return tagIds.includes(tag.id);
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getTagsWithIds(_x) {
        return _getTagsWithIds.apply(this, arguments);
      }

      return getTagsWithIds;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(tagIds) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.tagsDB = this.tagsDB.filter(function (tag) {
                  return !tagIds.includes(tag.id);
                });
                return _context2.abrupt("return", true);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _delete(_x2) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
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
                return _context3.abrupt("return", this.tagsDB);

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getAll(_x3) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "upsertTag",
    value: function () {
      var _upsertTag = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(tag) {
        var existingTagIndex;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                existingTagIndex = this.tagsDB.findIndex(function (t) {
                  return t.id === tag.id;
                });

                if (existingTagIndex !== -1) {
                  this.tagsDB[existingTagIndex] = tag;
                } else {
                  this.tagsDB.push(tag);
                }

                return _context4.abrupt("return", tag);

              case 3:
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
                return _context5.abrupt("return", this.tagsDB);

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getAssignable(_x5) {
        return _getAssignable.apply(this, arguments);
      }

      return getAssignable;
    }()
  }]);

  return MemoryTagsAdapter;
}();

exports.MemoryTagsAdapter = MemoryTagsAdapter;