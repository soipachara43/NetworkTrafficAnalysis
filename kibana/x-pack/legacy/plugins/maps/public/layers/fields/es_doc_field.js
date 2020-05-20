"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ESDocField = void 0;

var _es_tooltip_property = require("../tooltips/es_tooltip_property");

var _tooltip_property = require("../tooltips/tooltip_property");

var _constants = require("../../../common/constants");

var _public = require("../../../../../../../src/plugins/data/public");

var _field = require("./field");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ESDocField =
/*#__PURE__*/
function (_AbstractField) {
  _inherits(ESDocField, _AbstractField);

  function ESDocField(_ref) {
    var _this;

    var fieldName = _ref.fieldName,
        source = _ref.source,
        origin = _ref.origin;

    _classCallCheck(this, ESDocField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ESDocField).call(this, {
      fieldName: fieldName,
      origin: origin
    }));

    _defineProperty(_assertThisInitialized(_this), "_source", void 0);

    _this._source = source;
    return _this;
  }

  _createClass(ESDocField, [{
    key: "canValueBeFormatted",
    value: function canValueBeFormatted() {
      return true;
    }
  }, {
    key: "getSource",
    value: function getSource() {
      return this._source;
    }
  }, {
    key: "_getIndexPatternField",
    value: function () {
      var _getIndexPatternField2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var indexPattern, indexPatternField;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._source.getIndexPattern();

              case 2:
                indexPattern = _context.sent;
                indexPatternField = indexPattern.fields.getByName(this.getName());
                return _context.abrupt("return", indexPatternField && _public.indexPatterns.isNestedField(indexPatternField) ? undefined : indexPatternField);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _getIndexPatternField() {
        return _getIndexPatternField2.apply(this, arguments);
      }

      return _getIndexPatternField;
    }()
  }, {
    key: "createTooltipProperty",
    value: function () {
      var _createTooltipProperty = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(value) {
        var indexPattern, tooltipProperty;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._source.getIndexPattern();

              case 2:
                indexPattern = _context2.sent;
                _context2.t0 = _tooltip_property.TooltipProperty;
                _context2.t1 = this.getName();
                _context2.next = 7;
                return this.getLabel();

              case 7:
                _context2.t2 = _context2.sent;
                _context2.t3 = value;
                tooltipProperty = new _context2.t0(_context2.t1, _context2.t2, _context2.t3);
                return _context2.abrupt("return", new _es_tooltip_property.ESTooltipProperty(tooltipProperty, indexPattern, this));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createTooltipProperty(_x) {
        return _createTooltipProperty.apply(this, arguments);
      }

      return createTooltipProperty;
    }()
  }, {
    key: "getDataType",
    value: function () {
      var _getDataType = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var indexPatternField;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._getIndexPatternField();

              case 2:
                indexPatternField = _context3.sent;
                return _context3.abrupt("return", indexPatternField ? indexPatternField.type : '');

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getDataType() {
        return _getDataType.apply(this, arguments);
      }

      return getDataType;
    }()
  }, {
    key: "supportsFieldMeta",
    value: function supportsFieldMeta() {
      return true;
    }
  }, {
    key: "getOrdinalFieldMetaRequest",
    value: function () {
      var _getOrdinalFieldMetaRequest = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var indexPatternField, extendedStats;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._getIndexPatternField();

              case 2:
                indexPatternField = _context4.sent;

                if (!(!indexPatternField || indexPatternField.type !== 'number' && indexPatternField.type !== 'date')) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return", null);

              case 5:
                // TODO remove local typing once Kibana has figured out a core place for Elasticsearch aggregation request types
                // https://github.com/elastic/kibana/issues/60102
                extendedStats = {};

                if (indexPatternField.scripted) {
                  extendedStats.script = {
                    source: indexPatternField.script,
                    lang: indexPatternField.lang
                  };
                } else {
                  extendedStats.field = this.getName();
                }

                return _context4.abrupt("return", _defineProperty({}, this.getName(), {
                  extended_stats: extendedStats
                }));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getOrdinalFieldMetaRequest() {
        return _getOrdinalFieldMetaRequest.apply(this, arguments);
      }

      return getOrdinalFieldMetaRequest;
    }()
  }, {
    key: "getCategoricalFieldMetaRequest",
    value: function () {
      var _getCategoricalFieldMetaRequest = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var indexPatternField, topTerms;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._getIndexPatternField();

              case 2:
                indexPatternField = _context5.sent;

                if (indexPatternField) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt("return", null);

              case 5:
                // TODO remove local typing once Kibana has figured out a core place for Elasticsearch aggregation request types
                // https://github.com/elastic/kibana/issues/60102
                topTerms = {
                  size: _constants.COLOR_PALETTE_MAX_SIZE - 1 // need additional color for the "other"-value

                };

                if (indexPatternField.scripted) {
                  topTerms.script = {
                    source: indexPatternField.script,
                    lang: indexPatternField.lang
                  };
                } else {
                  topTerms.field = this.getName();
                }

                return _context5.abrupt("return", _defineProperty({}, this.getName(), {
                  terms: topTerms
                }));

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getCategoricalFieldMetaRequest() {
        return _getCategoricalFieldMetaRequest.apply(this, arguments);
      }

      return getCategoricalFieldMetaRequest;
    }()
  }]);

  return ESDocField;
}(_field.AbstractField);

exports.ESDocField = ESDocField;