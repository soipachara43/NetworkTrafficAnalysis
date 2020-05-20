"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultEditorController = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _public = require("../../../../plugins/kibana_utils/public");

var _public2 = require("../../../../plugins/kibana_react/public");

var _default_editor = require("./default_editor");

var _sidebar = require("./components/sidebar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var localStorage = new _public.Storage(window.localStorage);

var DefaultEditorController =
/*#__PURE__*/
function () {
  function DefaultEditorController(el, vis, eventEmitter, embeddableHandler) {
    _classCallCheck(this, DefaultEditorController);

    _defineProperty(this, "el", void 0);

    _defineProperty(this, "state", void 0);

    this.el = el;
    var visType = vis.type;
    var optionTabs = [].concat(_toConsumableArray(visType.schemas.buckets || visType.schemas.metrics ? [{
      name: 'data',
      title: _i18n.i18n.translate('visDefaultEditor.sidebar.tabs.dataLabel', {
        defaultMessage: 'Data'
      }),
      editor: _sidebar.DefaultEditorDataTab
    }] : []), _toConsumableArray(!visType.editorConfig.optionTabs && visType.editorConfig.optionsTemplate ? [{
      name: 'options',
      title: _i18n.i18n.translate('visDefaultEditor.sidebar.tabs.optionsLabel', {
        defaultMessage: 'Options'
      }),
      editor: visType.editorConfig.optionsTemplate
    }] : visType.editorConfig.optionTabs));
    this.state = {
      vis: vis,
      optionTabs: optionTabs,
      eventEmitter: eventEmitter,
      embeddableHandler: embeddableHandler
    };
  }

  _createClass(DefaultEditorController, [{
    key: "render",
    value: function render(_ref) {
      var data = _ref.data,
          core = _ref.core,
          props = _objectWithoutProperties(_ref, ["data", "core"]);

      (0, _reactDom.render)(_react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_public2.KibanaContextProvider, {
        services: _objectSpread({
          appName: 'vis_default_editor',
          storage: localStorage,
          data: data
        }, core)
      }, _react.default.createElement(_default_editor.DefaultEditor, _extends({}, this.state, props)))), this.el);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      (0, _reactDom.unmountComponentAtNode)(this.el);
    }
  }]);

  return DefaultEditorController;
}();

exports.DefaultEditorController = DefaultEditorController;