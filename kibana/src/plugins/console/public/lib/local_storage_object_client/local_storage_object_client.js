"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalObjectStorage = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LocalObjectStorage =
/*#__PURE__*/
function () {
  function LocalObjectStorage(client, type) {
    _classCallCheck(this, LocalObjectStorage);

    this.client = client;

    _defineProperty(this, "prefix", void 0);

    this.prefix = "console_local_".concat(type);
  }

  _createClass(LocalObjectStorage, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(obj) {
        var id, newObj;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _uuid.default.v4();
                newObj = _objectSpread({
                  id: id
                }, obj);
                this.client.set("".concat(this.prefix, "_").concat(id), newObj);
                return _context.abrupt("return", newObj);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(obj) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.client.set("".concat(this.prefix, "_").concat(obj.id), obj);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function update(_x2) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "findAll",
    value: function () {
      var _findAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var _this = this;

        var allLocalKeys, result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                allLocalKeys = this.client.keys().filter(function (key) {
                  return key.includes(_this.prefix);
                });
                result = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context3.prev = 5;

                for (_iterator = allLocalKeys[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  key = _step.value;
                  result.push(this.client.get(key));
                }

                _context3.next = 13;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](5);
                _didIteratorError = true;
                _iteratorError = _context3.t0;

              case 13:
                _context3.prev = 13;
                _context3.prev = 14;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 16:
                _context3.prev = 16;

                if (!_didIteratorError) {
                  _context3.next = 19;
                  break;
                }

                throw _iteratorError;

              case 19:
                return _context3.finish(16);

              case 20:
                return _context3.finish(13);

              case 21:
                return _context3.abrupt("return", result);

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[5, 9, 13, 21], [14,, 16, 20]]);
      }));

      function findAll() {
        return _findAll.apply(this, arguments);
      }

      return findAll;
    }()
  }]);

  return LocalObjectStorage;
}();

exports.LocalObjectStorage = LocalObjectStorage;