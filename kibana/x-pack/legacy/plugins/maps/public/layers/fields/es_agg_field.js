"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.esAggFieldsFactory = esAggFieldsFactory;
exports.ESAggField = void 0;

var _es_doc_field = require("./es_doc_field");

var _constants = require("../../../common/constants");

var _is_metric_countable = require("../util/is_metric_countable");

var _es_agg_utils = require("../util/es_agg_utils");

var _top_term_percentage_field = require("./top_term_percentage_field");

var _tooltip_property = require("../tooltips/tooltip_property");

var _es_agg_tooltip_property = require("../tooltips/es_agg_tooltip_property");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ESAggField =
/*#__PURE__*/
function () {
  function ESAggField(_ref) {
    var label = _ref.label,
        source = _ref.source,
        aggType = _ref.aggType,
        esDocField = _ref.esDocField,
        origin = _ref.origin;

    _classCallCheck(this, ESAggField);

    _defineProperty(this, "_source", void 0);

    _defineProperty(this, "_origin", void 0);

    _defineProperty(this, "_label", void 0);

    _defineProperty(this, "_aggType", void 0);

    _defineProperty(this, "_esDocField", void 0);

    this._source = source;
    this._origin = origin;
    this._label = label;
    this._aggType = aggType;
    this._esDocField = esDocField;
  }

  _createClass(ESAggField, [{
    key: "getSource",
    value: function getSource() {
      return this._source;
    }
  }, {
    key: "getOrigin",
    value: function getOrigin() {
      return this._origin;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this._source.getAggKey(this.getAggType(), this.getRootName());
    }
  }, {
    key: "getRootName",
    value: function getRootName() {
      return this._getESDocFieldName();
    }
  }, {
    key: "getLabel",
    value: function () {
      var _getLabel = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this._label ? this._label : this._source.getAggLabel(this.getAggType(), this.getRootName()));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getLabel() {
        return _getLabel.apply(this, arguments);
      }

      return getLabel;
    }()
  }, {
    key: "getAggType",
    value: function getAggType() {
      return this._aggType;
    }
  }, {
    key: "isValid",
    value: function isValid() {
      return this.getAggType() === _constants.AGG_TYPE.COUNT ? true : !!this._esDocField;
    }
  }, {
    key: "getDataType",
    value: function () {
      var _getDataType = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.getAggType() === _constants.AGG_TYPE.TERMS ? 'string' : 'number');

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getDataType() {
        return _getDataType.apply(this, arguments);
      }

      return getDataType;
    }()
  }, {
    key: "_getESDocFieldName",
    value: function _getESDocFieldName() {
      return this._esDocField ? this._esDocField.getName() : '';
    }
  }, {
    key: "createTooltipProperty",
    value: function () {
      var _createTooltipProperty = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(value) {
        var indexPattern, tooltipProperty;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._source.getIndexPattern();

              case 2:
                indexPattern = _context3.sent;
                _context3.t0 = _tooltip_property.TooltipProperty;
                _context3.t1 = this.getName();
                _context3.next = 7;
                return this.getLabel();

              case 7:
                _context3.t2 = _context3.sent;
                _context3.t3 = value;
                tooltipProperty = new _context3.t0(_context3.t1, _context3.t2, _context3.t3);
                return _context3.abrupt("return", new _es_agg_tooltip_property.ESAggTooltipProperty(tooltipProperty, indexPattern, this));

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createTooltipProperty(_x) {
        return _createTooltipProperty.apply(this, arguments);
      }

      return createTooltipProperty;
    }()
  }, {
    key: "getValueAggDsl",
    value: function getValueAggDsl(indexPattern) {
      if (this.getAggType() === _constants.AGG_TYPE.COUNT) {
        return null;
      }

      var field = (0, _es_agg_utils.getField)(indexPattern, this.getRootName());
      var aggType = this.getAggType();
      var aggBody = aggType === _constants.AGG_TYPE.TERMS ? {
        size: 1,
        shard_size: 1
      } : {};
      return _defineProperty({}, aggType, (0, _es_agg_utils.addFieldToDSL)(aggBody, field));
    }
  }, {
    key: "getBucketCount",
    value: function getBucketCount() {
      // terms aggregation increases the overall number of buckets per split bucket
      return this.getAggType() === _constants.AGG_TYPE.TERMS ? 1 : 0;
    }
  }, {
    key: "supportsFieldMeta",
    value: function supportsFieldMeta() {
      // count and sum aggregations are not within field bounds so they do not support field meta.
      return !(0, _is_metric_countable.isMetricCountable)(this.getAggType());
    }
  }, {
    key: "canValueBeFormatted",
    value: function canValueBeFormatted() {
      // Do not use field formatters for counting metrics
      return ![_constants.AGG_TYPE.COUNT, _constants.AGG_TYPE.UNIQUE_COUNT].includes(this.getAggType());
    }
  }, {
    key: "getOrdinalFieldMetaRequest",
    value: function () {
      var _getOrdinalFieldMetaRequest = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this._esDocField ? this._esDocField.getOrdinalFieldMetaRequest() : null);

              case 1:
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
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this._esDocField ? this._esDocField.getCategoricalFieldMetaRequest() : null);

              case 1:
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

  return ESAggField;
}();

exports.ESAggField = ESAggField;

function esAggFieldsFactory(aggDescriptor, source, origin) {
  var aggField = new ESAggField({
    label: aggDescriptor.label,
    esDocField: aggDescriptor.field ? new _es_doc_field.ESDocField({
      fieldName: aggDescriptor.field,
      source: source,
      origin: origin
    }) : undefined,
    aggType: aggDescriptor.type,
    source: source,
    origin: origin
  });
  var aggFields = [aggField];

  if (aggDescriptor.field && aggDescriptor.type === _constants.AGG_TYPE.TERMS) {
    aggFields.push(new _top_term_percentage_field.TopTermPercentageField(aggField));
  }

  return aggFields;
}