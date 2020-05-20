"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TooltipProperty = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TooltipProperty =
/*#__PURE__*/
function () {
  function TooltipProperty(propertyKey, propertyName, rawValue) {
    _classCallCheck(this, TooltipProperty);

    _defineProperty(this, "_propertyKey", void 0);

    _defineProperty(this, "_propertyName", void 0);

    _defineProperty(this, "_rawValue", void 0);

    this._propertyKey = propertyKey;
    this._propertyName = propertyName;
    this._rawValue = rawValue;
  }

  _createClass(TooltipProperty, [{
    key: "getPropertyKey",
    value: function getPropertyKey() {
      return this._propertyKey;
    }
  }, {
    key: "getPropertyName",
    value: function getPropertyName() {
      return this._propertyName;
    }
  }, {
    key: "getHtmlDisplayValue",
    value: function getHtmlDisplayValue() {
      return _lodash.default.escape(this._rawValue);
    }
  }, {
    key: "getRawValue",
    value: function getRawValue() {
      return this._rawValue;
    }
  }, {
    key: "isFilterable",
    value: function isFilterable() {
      return false;
    }
  }, {
    key: "getESFilters",
    value: function () {
      var _getESFilters = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", []);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getESFilters() {
        return _getESFilters.apply(this, arguments);
      }

      return getESFilters;
    }()
  }]);

  return TooltipProperty;
}();

exports.TooltipProperty = TooltipProperty;