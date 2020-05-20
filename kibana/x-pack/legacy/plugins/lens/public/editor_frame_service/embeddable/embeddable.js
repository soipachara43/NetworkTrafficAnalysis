"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Embeddable = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _events = require("../../../../../../../src/legacy/core_plugins/visualizations/public/np_ready/public/embeddable/events");

var _public = require("../../../../../../../src/plugins/embeddable/public");

var _persistence = require("../../persistence");

var _expression_wrapper = require("./expression_wrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Embeddable =
/*#__PURE__*/
function (_AbstractEmbeddable) {
  _inherits(Embeddable, _AbstractEmbeddable);

  function Embeddable(timefilter, expressionRenderer, _ref, initialInput, parent) {
    var _this;

    var savedVis = _ref.savedVis,
        editUrl = _ref.editUrl,
        editable = _ref.editable,
        indexPatterns = _ref.indexPatterns;

    _classCallCheck(this, Embeddable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Embeddable).call(this, initialInput, {
      defaultTitle: savedVis.title,
      savedObjectId: savedVis.id,
      editable: editable,
      // passing edit url and index patterns to the output of this embeddable for
      // the container to pick them up and use them to configure filter bar and
      // config dropdown correctly.
      editUrl: editUrl,
      indexPatterns: indexPatterns
    }, parent));

    _defineProperty(_assertThisInitialized(_this), "type", _persistence.DOC_TYPE);

    _defineProperty(_assertThisInitialized(_this), "expressionRenderer", void 0);

    _defineProperty(_assertThisInitialized(_this), "savedVis", void 0);

    _defineProperty(_assertThisInitialized(_this), "domNode", void 0);

    _defineProperty(_assertThisInitialized(_this), "subscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "autoRefreshFetchSubscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "currentContext", {});

    _this.expressionRenderer = expressionRenderer;
    _this.savedVis = savedVis;
    _this.subscription = _this.getInput$().subscribe(function (input) {
      return _this.onContainerStateChanged(input);
    });

    _this.onContainerStateChanged(initialInput);

    _this.autoRefreshFetchSubscription = timefilter.getAutoRefreshFetch$().subscribe(_this.reload.bind(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Embeddable, [{
    key: "supportedTriggers",
    value: function supportedTriggers() {
      switch (this.savedVis.visualizationType) {
        case 'lnsXY':
          // TODO: case 'lnsDatatable':
          return [_events.VIS_EVENT_TO_TRIGGER.filter];

        case 'lnsMetric':
        default:
          return [];
      }
    }
  }, {
    key: "onContainerStateChanged",
    value: function onContainerStateChanged(containerState) {
      var cleanedFilters = containerState.filters ? containerState.filters.filter(function (filter) {
        return !filter.meta.disabled;
      }) : undefined;

      if (!_lodash.default.isEqual(containerState.timeRange, this.currentContext.timeRange) || !_lodash.default.isEqual(containerState.query, this.currentContext.query) || !_lodash.default.isEqual(cleanedFilters, this.currentContext.filters)) {
        this.currentContext = {
          timeRange: containerState.timeRange,
          query: containerState.query,
          lastReloadRequestTime: this.currentContext.lastReloadRequestTime,
          filters: cleanedFilters
        };

        if (this.domNode) {
          this.render(this.domNode);
        }
      }
    }
    /**
     *
     * @param {HTMLElement} domNode
     * @param {ContainerState} containerState
     */

  }, {
    key: "render",
    value: function render(domNode) {
      this.domNode = domNode;
      (0, _reactDom.render)(_react.default.createElement(_expression_wrapper.ExpressionWrapper, {
        ExpressionRenderer: this.expressionRenderer,
        expression: this.savedVis.expression,
        context: this.currentContext
      }), domNode);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(Embeddable.prototype), "destroy", this).call(this);

      if (this.domNode) {
        (0, _reactDom.unmountComponentAtNode)(this.domNode);
      }

      if (this.subscription) {
        this.subscription.unsubscribe();
      }

      this.autoRefreshFetchSubscription.unsubscribe();
    }
  }, {
    key: "reload",
    value: function reload() {
      var currentTime = Date.now();

      if (this.currentContext.lastReloadRequestTime !== currentTime) {
        this.currentContext = _objectSpread({}, this.currentContext, {
          lastReloadRequestTime: currentTime
        });

        if (this.domNode) {
          this.render(this.domNode);
        }
      }
    }
  }]);

  return Embeddable;
}(_public.Embeddable);

exports.Embeddable = Embeddable;