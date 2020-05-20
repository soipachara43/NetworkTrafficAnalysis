"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexPatternsService = void 0;

var _pattern_cache = require("./_pattern_cache");

var _index_pattern = require("./index_pattern");

var _index_patterns_api_client = require("./index_patterns_api_client");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var indexPatternCache = (0, _pattern_cache.createIndexPatternCache)();

var IndexPatternsService =
/*#__PURE__*/
function () {
  function IndexPatternsService(config, savedObjectsClient, http) {
    var _this = this;

    _classCallCheck(this, IndexPatternsService);

    _defineProperty(this, "config", void 0);

    _defineProperty(this, "savedObjectsClient", void 0);

    _defineProperty(this, "savedObjectsCache", void 0);

    _defineProperty(this, "apiClient", void 0);

    _defineProperty(this, "getIds",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var refresh,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                refresh = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;

                if (!(!_this.savedObjectsCache || refresh)) {
                  _context.next = 4;
                  break;
                }

                _context.next = 4;
                return _this.refreshSavedObjectsCache();

              case 4:
                if (_this.savedObjectsCache) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", []);

              case 6:
                return _context.abrupt("return", _this.savedObjectsCache.map(function (obj) {
                  return obj === null || obj === void 0 ? void 0 : obj.id;
                }));

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function () {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(this, "getTitles",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var refresh,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                refresh = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : false;

                if (!(!_this.savedObjectsCache || refresh)) {
                  _context2.next = 4;
                  break;
                }

                _context2.next = 4;
                return _this.refreshSavedObjectsCache();

              case 4:
                if (_this.savedObjectsCache) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", []);

              case 6:
                return _context2.abrupt("return", _this.savedObjectsCache.map(function (obj) {
                  var _obj$attributes;

                  return obj === null || obj === void 0 ? void 0 : (_obj$attributes = obj.attributes) === null || _obj$attributes === void 0 ? void 0 : _obj$attributes.title;
                }));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function () {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(this, "getFields",
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(fields) {
        var refresh,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                refresh = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;

                if (!(!_this.savedObjectsCache || refresh)) {
                  _context3.next = 4;
                  break;
                }

                _context3.next = 4;
                return _this.refreshSavedObjectsCache();

              case 4:
                if (_this.savedObjectsCache) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", []);

              case 6:
                return _context3.abrupt("return", _this.savedObjectsCache.map(function (obj) {
                  var result = {};
                  fields.forEach(function (f) {
                    var _obj$attributes2;

                    return result[f] = obj[f] || (obj === null || obj === void 0 ? void 0 : (_obj$attributes2 = obj.attributes) === null || _obj$attributes2 === void 0 ? void 0 : _obj$attributes2[f]);
                  });
                  return result;
                }));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(this, "getFieldsForTimePattern", function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _this.apiClient.getFieldsForTimePattern(options);
    });

    _defineProperty(this, "getFieldsForWildcard", function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _this.apiClient.getFieldsForWildcard(options);
    });

    _defineProperty(this, "clearCache", function (id) {
      _this.savedObjectsCache = null;

      if (id) {
        indexPatternCache.clear(id);
      } else {
        indexPatternCache.clearAll();
      }
    });

    _defineProperty(this, "getCache",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (_this.savedObjectsCache) {
                _context4.next = 3;
                break;
              }

              _context4.next = 3;
              return _this.refreshSavedObjectsCache();

            case 3:
              return _context4.abrupt("return", _this.savedObjectsCache);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));

    _defineProperty(this, "getDefault",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var defaultIndexPatternId;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              defaultIndexPatternId = _this.config.get('defaultIndex');

              if (!defaultIndexPatternId) {
                _context5.next = 5;
                break;
              }

              _context5.next = 4;
              return _this.get(defaultIndexPatternId);

            case 4:
              return _context5.abrupt("return", _context5.sent);

            case 5:
              return _context5.abrupt("return", null);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));

    _defineProperty(this, "get",
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(id) {
        var cache, indexPattern;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                cache = indexPatternCache.get(id);

                if (!cache) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt("return", cache);

              case 3:
                _context6.next = 5;
                return _this.make(id);

              case 5:
                indexPattern = _context6.sent;
                return _context6.abrupt("return", indexPatternCache.set(id, indexPattern));

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x2) {
        return _ref6.apply(this, arguments);
      };
    }());

    _defineProperty(this, "make", function (id) {
      var indexPattern = new _index_pattern.IndexPattern(id, function (cfg) {
        return _this.config.get(cfg);
      }, _this.savedObjectsClient, _this.apiClient, indexPatternCache);
      return indexPattern.init();
    });

    this.apiClient = new _index_patterns_api_client.IndexPatternsApiClient(http);
    this.config = config;
    this.savedObjectsClient = savedObjectsClient;
  }

  _createClass(IndexPatternsService, [{
    key: "refreshSavedObjectsCache",
    value: function () {
      var _refreshSavedObjectsCache = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.savedObjectsClient.find({
                  type: 'index-pattern',
                  fields: ['title'],
                  perPage: 10000
                });

              case 2:
                this.savedObjectsCache = _context7.sent.savedObjects;

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function refreshSavedObjectsCache() {
        return _refreshSavedObjectsCache.apply(this, arguments);
      }

      return refreshSavedObjectsCache;
    }()
  }]);

  return IndexPatternsService;
}();

exports.IndexPatternsService = IndexPatternsService;