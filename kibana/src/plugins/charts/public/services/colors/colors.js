"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorsService = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _mapped_colors = require("./mapped_colors");

var _seed_colors = require("./seed_colors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Accepts an array of strings or numbers that are used to create a
 * a lookup table that associates the values (key) with a hex color (value).
 * Returns a function that accepts a value (i.e. a string or number)
 * and returns a hex color associated with that value.
 */
var ColorsService =
/*#__PURE__*/
function () {
  function ColorsService() {
    _classCallCheck(this, ColorsService);

    _defineProperty(this, "_mappedColors", void 0);

    _defineProperty(this, "seedColors", _seed_colors.seedColors);
  }

  _createClass(ColorsService, [{
    key: "init",
    value: function init(uiSettings) {
      this._mappedColors = new _mapped_colors.MappedColors(uiSettings);
    }
  }, {
    key: "createColorLookupFunction",
    value: function createColorLookupFunction(arrayOfStringsOrNumbers) {
      var _this = this;

      var colorMapping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!Array.isArray(arrayOfStringsOrNumbers)) {
        throw new Error("createColorLookupFunction expects an array but recived: ".concat(_typeof(arrayOfStringsOrNumbers)));
      }

      arrayOfStringsOrNumbers.forEach(function (val) {
        if (!_lodash.default.isString(val) && !_lodash.default.isNumber(val) && !_lodash.default.isUndefined(val)) {
          throw new TypeError('createColorLookupFunction expects an array of strings, numbers, or undefined values');
        }
      });
      this.mappedColors.mapKeys(arrayOfStringsOrNumbers);
      return function (value) {
        return colorMapping[value] || _this.mappedColors.get(value);
      };
    }
  }, {
    key: "mappedColors",
    get: function get() {
      if (!this._mappedColors) {
        throw new Error('ColorService not yet initialized');
      }

      return this._mappedColors;
    }
  }]);

  return ColorsService;
}();

exports.ColorsService = ColorsService;