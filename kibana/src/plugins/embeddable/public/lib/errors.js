"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmbeddableFactoryNotFoundError = exports.PanelNotFoundError = void 0;

var _i18n = require("@kbn/i18n");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PanelNotFoundError =
/*#__PURE__*/
function (_Error) {
  _inherits(PanelNotFoundError, _Error);

  function PanelNotFoundError() {
    var _this;

    _classCallCheck(this, PanelNotFoundError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PanelNotFoundError).call(this, _i18n.i18n.translate('embeddableApi.errors.paneldoesNotExist', {
      defaultMessage: 'Panel not found'
    })));

    _defineProperty(_assertThisInitialized(_this), "code", 'PANEL_NOT_FOUND');

    return _this;
  }

  return PanelNotFoundError;
}(_wrapNativeSuper(Error));

exports.PanelNotFoundError = PanelNotFoundError;

var EmbeddableFactoryNotFoundError =
/*#__PURE__*/
function (_Error2) {
  _inherits(EmbeddableFactoryNotFoundError, _Error2);

  function EmbeddableFactoryNotFoundError(type) {
    var _this2;

    _classCallCheck(this, EmbeddableFactoryNotFoundError);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(EmbeddableFactoryNotFoundError).call(this, _i18n.i18n.translate('embeddableApi.errors.embeddableFactoryNotFound', {
      defaultMessage: "{type} can't be loaded. Please upgrade to the default distribution of Elasticsearch and Kibana with the appropriate license.",
      values: {
        type: type
      }
    })));

    _defineProperty(_assertThisInitialized(_this2), "code", 'EMBEDDABLE_FACTORY_NOT_FOUND');

    return _this2;
  }

  return EmbeddableFactoryNotFoundError;
}(_wrapNativeSuper(Error));

exports.EmbeddableFactoryNotFoundError = EmbeddableFactoryNotFoundError;