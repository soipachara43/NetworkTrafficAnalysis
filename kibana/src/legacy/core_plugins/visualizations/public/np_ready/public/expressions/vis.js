"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExprVis = void 0;

var _events = require("events");

var _lodash = _interopRequireDefault(require("lodash"));

var _public = require("../../../../../../../plugins/visualizations/public");

var _services = require("../services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ExprVis =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(ExprVis, _EventEmitter);

  function ExprVis() {
    var _this;

    var visState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      type: 'histogram'
    };

    _classCallCheck(this, ExprVis);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExprVis).call(this));

    _defineProperty(_assertThisInitialized(_this), "title", '');

    _defineProperty(_assertThisInitialized(_this), "type", void 0);

    _defineProperty(_assertThisInitialized(_this), "params", {});

    _defineProperty(_assertThisInitialized(_this), "sessionState", {});

    _defineProperty(_assertThisInitialized(_this), "API", void 0);

    _defineProperty(_assertThisInitialized(_this), "eventsSubject", void 0);

    _defineProperty(_assertThisInitialized(_this), "uiState", void 0);

    _this.type = _this.getType(visState.type);
    _this.uiState = new _public.PersistedState();

    _this.setState(visState);

    _this.API = {
      events: {
        filter: function filter(data) {
          if (!_this.eventsSubject) return;

          _this.eventsSubject.next({
            name: 'filterBucket',
            data: data
          });
        },
        brush: function brush(data) {
          if (!_this.eventsSubject) return;

          _this.eventsSubject.next({
            name: 'brush',
            data: data
          });
        }
      }
    };
    return _this;
  }

  _createClass(ExprVis, [{
    key: "getType",
    value: function getType(type) {
      if (_lodash.default.isString(type)) {
        return (0, _services.getTypes)().get(type);

        if (!this.type) {
          throw new Error("Invalid type \"".concat(type, "\""));
        }
      } else {
        return type;
      }
    }
  }, {
    key: "setState",
    value: function setState(state) {
      this.title = state.title || '';

      if (state.type) {
        this.type = this.getType(state.type);
      }

      this.params = _lodash.default.defaultsDeep({}, _lodash.default.cloneDeep(state.params || {}), _lodash.default.cloneDeep(this.type.visConfig.defaults || {}));
    }
  }, {
    key: "getState",
    value: function getState() {
      return {
        title: this.title,
        type: this.type.name,
        params: _lodash.default.cloneDeep(this.params)
      };
    }
  }, {
    key: "updateState",
    value: function updateState() {
      this.emit('update');
    }
  }, {
    key: "forceReload",
    value: function forceReload() {
      this.emit('reload');
    }
  }, {
    key: "isHierarchical",
    value: function isHierarchical() {
      if (_lodash.default.isFunction(this.type.hierarchicalData)) {
        return !!this.type.hierarchicalData(this);
      } else {
        return !!this.type.hierarchicalData;
      }
    }
  }, {
    key: "hasUiState",
    value: function hasUiState() {
      return !!this.uiState;
    }
  }, {
    key: "getUiState",
    value: function getUiState() {
      return this.uiState;
    }
  }, {
    key: "setUiState",
    value: function setUiState(state) {
      this.uiState = state;
    }
    /**
     * Currently this is only used to extract map-specific information
     * (e.g. mapZoom, mapCenter).
     */

  }, {
    key: "uiStateVal",
    value: function uiStateVal(key, val) {
      if (this.hasUiState()) {
        if (_lodash.default.isUndefined(val)) {
          return this.uiState.get(key);
        }

        return this.uiState.set(key, val);
      }

      return val;
    }
  }]);

  return ExprVis;
}(_events.EventEmitter);

exports.ExprVis = ExprVis;