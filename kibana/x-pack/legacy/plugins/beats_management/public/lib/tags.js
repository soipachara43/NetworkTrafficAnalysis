"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagsLib = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TagsLib =
/*#__PURE__*/
function () {
  function TagsLib(adapter, elasticsearch) {
    _classCallCheck(this, TagsLib);

    this.adapter = adapter;
    this.elasticsearch = elasticsearch;
  }

  _createClass(TagsLib, [{
    key: "getTagsWithIds",
    value: function () {
      var _getTagsWithIds = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(tagIds) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(tagIds.length === 0)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", []);

              case 2:
                _context.next = 4;
                return this.adapter.getTagsWithIds(_toConsumableArray(new Set(tagIds)));

              case 4:
                return _context.abrupt("return", _context.sent);

              case 5:
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
                _context2.next = 2;
                return this.adapter.delete(_toConsumableArray(new Set(tagIds)));

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
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
    }() // FIXME: This needs to be paginated https://github.com/elastic/kibana/issues/26022

  }, {
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(kuery) {
        var ESQuery;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!kuery) {
                  _context3.next = 4;
                  break;
                }

                _context3.next = 3;
                return this.elasticsearch.convertKueryToEsQuery(kuery);

              case 3:
                ESQuery = _context3.sent;

              case 4:
                _context3.next = 6;
                return this.adapter.getAll(ESQuery);

              case 6:
                return _context3.abrupt("return", _context3.sent);

              case 7:
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
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!tag.id) {
                  tag.id = (0, _v.default)();
                }

                _context4.next = 3;
                return this.adapter.upsertTag(tag);

              case 3:
                return _context4.abrupt("return", _context4.sent);

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
    key: "getassignableTagsForBeats",
    value: function () {
      var _getassignableTagsForBeats = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(beats) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.adapter.getAssignable(beats);

              case 2:
                return _context5.abrupt("return", _context5.sent);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getassignableTagsForBeats(_x5) {
        return _getassignableTagsForBeats.apply(this, arguments);
      }

      return getassignableTagsForBeats;
    }()
  }]);

  return TagsLib;
}();

exports.TagsLib = TagsLib;