"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddEmbeddablePanel = exports.EmbeddableFlyoutPortal = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _recompose = require("recompose");

var _reactRedux = require("react-redux");

var _flyout = require("./flyout");

var _elements = require("../../state/actions/elements");

var _workpad = require("../../state/selectors/workpad");

var _embeddable = require("../../../canvas_plugin_src/expression_types/embeddable");

var _public = require("../../../../../../../src/plugins/kibana_react/public");

var _allowedEmbeddables;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var allowedEmbeddables = (_allowedEmbeddables = {}, _defineProperty(_allowedEmbeddables, _embeddable.EmbeddableTypes.map, function (id) {
  return "savedMap id=\"".concat(id, "\" | render");
}), _defineProperty(_allowedEmbeddables, _embeddable.EmbeddableTypes.lens, function (id) {
  return "savedLens id=\"".concat(id, "\" | render");
}), _defineProperty(_allowedEmbeddables, _embeddable.EmbeddableTypes.visualization, function (id) {
  return "savedVisualization id=\"".concat(id, "\" | render");
}), _allowedEmbeddables);

// FIX: Missing state type
var mapStateToProps = function mapStateToProps(state) {
  return {
    pageId: (0, _workpad.getSelectedPage)(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addEmbeddable: function addEmbeddable(pageId, partialElement) {
      return dispatch((0, _elements.addElement)(pageId, partialElement));
    }
  };
};

var mergeProps = function mergeProps(stateProps, dispatchProps, ownProps) {
  var pageId = stateProps.pageId,
      remainingStateProps = _objectWithoutProperties(stateProps, ["pageId"]);

  var addEmbeddable = dispatchProps.addEmbeddable;
  return _objectSpread({}, remainingStateProps, {}, ownProps, {
    onSelect: function onSelect(id, type) {
      var partialElement = {
        expression: "markdown \"Could not find embeddable for type ".concat(type, "\" | render")
      };

      if (allowedEmbeddables[type]) {
        partialElement.expression = allowedEmbeddables[type](id);
      }

      addEmbeddable(pageId, partialElement);
      ownProps.onClose();
    }
  });
};

var EmbeddableFlyoutPortal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EmbeddableFlyoutPortal, _React$Component);

  function EmbeddableFlyoutPortal(props) {
    var _this;

    _classCallCheck(this, EmbeddableFlyoutPortal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EmbeddableFlyoutPortal).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "el", void 0);

    _this.el = document.createElement('div');
    return _this;
  }

  _createClass(EmbeddableFlyoutPortal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var body = document.querySelector('body');

      if (body && this.el) {
        body.appendChild(this.el);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var body = document.querySelector('body');

      if (body && this.el) {
        body.removeChild(this.el);
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.el) {
        return _reactDom.default.createPortal(_react.default.createElement(_flyout.AddEmbeddableFlyout, _extends({}, this.props, {
          availableEmbeddables: Object.keys(allowedEmbeddables),
          savedObjects: this.props.kibana.services.savedObjects,
          uiSettings: this.props.kibana.services.uiSettings
        })), this.el);
      }
    }
  }]);

  return EmbeddableFlyoutPortal;
}(_react.default.Component);

exports.EmbeddableFlyoutPortal = EmbeddableFlyoutPortal;
var AddEmbeddablePanel = (0, _recompose.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps), _public.withKibana)(EmbeddableFlyoutPortal);
exports.AddEmbeddablePanel = AddEmbeddablePanel;