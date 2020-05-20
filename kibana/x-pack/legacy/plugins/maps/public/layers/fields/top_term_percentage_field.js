"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopTermPercentageField = void 0;

var _tooltip_property = require("../tooltips/tooltip_property");

var _constants = require("../../../common/constants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TopTermPercentageField =
/*#__PURE__*/
function () {
  function TopTermPercentageField(topTermAggField) {
    _classCallCheck(this, TopTermPercentageField);

    _defineProperty(this, "_topTermAggField", void 0);

    this._topTermAggField = topTermAggField;
  }

  _createClass(TopTermPercentageField, [{
    key: "getSource",
    value: function getSource() {
      return this._topTermAggField.getSource();
    }
  }, {
    key: "getOrigin",
    value: function getOrigin() {
      return this._topTermAggField.getOrigin();
    }
  }, {
    key: "getName",
    value: function getName() {
      return "".concat(this._topTermAggField.getName()).concat(_constants.TOP_TERM_PERCENTAGE_SUFFIX);
    }
  }, {
    key: "getRootName",
    value: function getRootName() {
      // top term percentage is a derived value so it has no root field
      return '';
    }
  }, {
    key: "getLabel",
    value: function () {
      var _getLabel = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var baseLabel;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._topTermAggField.getLabel();

              case 2:
                baseLabel = _context.sent;
                return _context.abrupt("return", "".concat(baseLabel, "%"));

              case 4:
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
    key: "isValid",
    value: function isValid() {
      return this._topTermAggField.isValid();
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
                return _context2.abrupt("return", 'number');

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getDataType() {
        return _getDataType.apply(this, arguments);
      }

      return getDataType;
    }()
  }, {
    key: "createTooltipProperty",
    value: function () {
      var _createTooltipProperty = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(value) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = _tooltip_property.TooltipProperty;
                _context3.t1 = this.getName();
                _context3.next = 4;
                return this.getLabel();

              case 4:
                _context3.t2 = _context3.sent;
                _context3.t3 = value;
                return _context3.abrupt("return", new _context3.t0(_context3.t1, _context3.t2, _context3.t3));

              case 7:
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
    value: function getValueAggDsl() {
      return null;
    }
  }, {
    key: "getBucketCount",
    value: function getBucketCount() {
      return 0;
    }
  }, {
    key: "supportsFieldMeta",
    value: function supportsFieldMeta() {
      return false;
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
                return _context4.abrupt("return", null);

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
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
                return _context5.abrupt("return", null);

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getCategoricalFieldMetaRequest() {
        return _getCategoricalFieldMetaRequest.apply(this, arguments);
      }

      return getCategoricalFieldMetaRequest;
    }()
  }, {
    key: "canValueBeFormatted",
    value: function canValueBeFormatted() {
      return false;
    }
  }]);

  return TopTermPercentageField;
}();

exports.TopTermPercentageField = TopTermPercentageField;