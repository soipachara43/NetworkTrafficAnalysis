"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ESTooltipProperty = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _public = require("../../../../../../../src/plugins/data/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ESTooltipProperty =
/*#__PURE__*/
function () {
  function ESTooltipProperty(tooltipProperty, indexPattern, field) {
    _classCallCheck(this, ESTooltipProperty);

    _defineProperty(this, "_tooltipProperty", void 0);

    _defineProperty(this, "_indexPattern", void 0);

    _defineProperty(this, "_field", void 0);

    this._tooltipProperty = tooltipProperty;
    this._indexPattern = indexPattern;
    this._field = field;
  }

  _createClass(ESTooltipProperty, [{
    key: "getPropertyKey",
    value: function getPropertyKey() {
      return this._tooltipProperty.getPropertyKey();
    }
  }, {
    key: "getPropertyName",
    value: function getPropertyName() {
      return this._tooltipProperty.getPropertyName();
    }
  }, {
    key: "getRawValue",
    value: function getRawValue() {
      return this._tooltipProperty.getRawValue();
    }
  }, {
    key: "_getIndexPatternField",
    value: function _getIndexPatternField() {
      return this._indexPattern.fields.getByName(this._field.getRootName());
    }
  }, {
    key: "getHtmlDisplayValue",
    value: function getHtmlDisplayValue() {
      if (typeof this.getRawValue() === 'undefined') {
        return '-';
      }

      var indexPatternField = this._getIndexPatternField();

      if (!indexPatternField || !this._field.canValueBeFormatted()) {
        return _lodash.default.escape(this.getRawValue());
      }

      var htmlConverter = indexPatternField.format.getConverterFor('html');
      return htmlConverter ? htmlConverter(this.getRawValue()) : indexPatternField.format.convert(this.getRawValue());
    }
  }, {
    key: "isFilterable",
    value: function isFilterable() {
      var indexPatternField = this._getIndexPatternField();

      return !!indexPatternField && (indexPatternField.type === 'string' || indexPatternField.type === 'date' || indexPatternField.type === 'ip' || indexPatternField.type === 'number');
    }
  }, {
    key: "getESFilters",
    value: function () {
      var _getESFilters = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var indexPatternField;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                indexPatternField = this._getIndexPatternField();

                if (indexPatternField) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", []);

              case 3:
                return _context.abrupt("return", [_public.esFilters.buildPhraseFilter(indexPatternField, this.getRawValue(), this._indexPattern)]);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getESFilters() {
        return _getESFilters.apply(this, arguments);
      }

      return getESFilters;
    }()
  }]);

  return ESTooltipProperty;
}();

exports.ESTooltipProperty = ESTooltipProperty;