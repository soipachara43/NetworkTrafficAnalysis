"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbstractField = void 0;

var _constants = require("../../../common/constants");

var _tooltip_property = require("../tooltips/tooltip_property");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AbstractField =
/*#__PURE__*/
function () {
  function AbstractField(_ref) {
    var fieldName = _ref.fieldName,
        origin = _ref.origin;

    _classCallCheck(this, AbstractField);

    _defineProperty(this, "_fieldName", void 0);

    _defineProperty(this, "_origin", void 0);

    this._fieldName = fieldName;
    this._origin = origin || _constants.FIELD_ORIGIN.SOURCE;
  }

  _createClass(AbstractField, [{
    key: "getName",
    value: function getName() {
      return this._fieldName;
    }
  }, {
    key: "getRootName",
    value: function getRootName() {
      return this.getName();
    }
  }, {
    key: "canValueBeFormatted",
    value: function canValueBeFormatted() {
      return false;
    }
  }, {
    key: "getSource",
    value: function getSource() {
      throw new Error('must implement Field#getSource');
    }
  }, {
    key: "isValid",
    value: function isValid() {
      return !!this._fieldName;
    }
  }, {
    key: "getDataType",
    value: function () {
      var _getDataType = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", 'string');

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getDataType() {
        return _getDataType.apply(this, arguments);
      }

      return getDataType;
    }()
  }, {
    key: "getLabel",
    value: function () {
      var _getLabel = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this._fieldName);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getLabel() {
        return _getLabel.apply(this, arguments);
      }

      return getLabel;
    }()
  }, {
    key: "createTooltipProperty",
    value: function () {
      var _createTooltipProperty = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(value) {
        var label;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.getLabel();

              case 2:
                label = _context3.sent;
                return _context3.abrupt("return", new _tooltip_property.TooltipProperty(this.getName(), label, value));

              case 4:
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
    key: "getOrigin",
    value: function getOrigin() {
      return this._origin;
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
  }]);

  return AbstractField;
}();

exports.AbstractField = AbstractField;