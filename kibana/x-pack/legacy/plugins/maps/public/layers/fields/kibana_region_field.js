"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KibanaRegionField = void 0;

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

var KibanaRegionField =
/*#__PURE__*/
function (_AbstractField) {
  _inherits(KibanaRegionField, _AbstractField);

  function KibanaRegionField(_ref) {
    var _this;

    var fieldName = _ref.fieldName,
        source = _ref.source,
        origin = _ref.origin;

    _classCallCheck(this, KibanaRegionField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(KibanaRegionField).call(this, {
      fieldName: fieldName,
      origin: origin
    }));

    _defineProperty(_assertThisInitialized(_this), "_source", void 0);

    _this._source = source;
    return _this;
  }

  _createClass(KibanaRegionField, [{
    key: "getSource",
    value: function getSource() {
      return this._source;
    }
  }, {
    key: "getLabel",
    value: function () {
      var _getLabel = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var meta, field;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._source.getVectorFileMeta();

              case 2:
                meta = _context.sent;
                // TODO remove any and @ts-ignore when vectorFileMeta type defined
                // @ts-ignore
                field = meta.fields.find(function (f) {
                  return f.name === _this2.getName();
                });
                return _context.abrupt("return", field ? field.description : this.getName());

              case 5:
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
  }]);

  return KibanaRegionField;
}(_field.AbstractField);

exports.KibanaRegionField = KibanaRegionField;