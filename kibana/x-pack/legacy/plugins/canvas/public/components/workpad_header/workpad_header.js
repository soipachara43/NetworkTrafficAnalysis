"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkpadHeader = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactShortcuts = require("react-shortcuts");

var _eui = require("@elastic/eui");

var _i18n = require("../../../i18n");

var _asset_manager = require("../asset_manager");

var _element_types = require("../element_types");

var _tool_tip_shortcut = require("../tool_tip_shortcut/");

var _embeddable_flyout = require("../embeddable_flyout");

var _control_settings = require("./control_settings");

var _refresh_control = require("./refresh_control");

var _fullscreen_control = require("./fullscreen_control");

var _workpad_export = require("./workpad_export");

var _workpad_zoom = require("./workpad_zoom");

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

var strings = _i18n.ComponentStrings.WorkpadHeader;

var WorkpadHeader =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(WorkpadHeader, _React$PureComponent);

  function WorkpadHeader() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, WorkpadHeader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WorkpadHeader)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isModalVisible: false,
      isPanelVisible: false
    });

    _defineProperty(_assertThisInitialized(_this), "_fullscreenButton", function (_ref) {
      var toggleFullscreen = _ref.toggleFullscreen;
      return _react.default.createElement(_eui.EuiToolTip, {
        position: "bottom",
        content: _react.default.createElement("span", null, strings.getFullScreenTooltip(), ' ', _react.default.createElement(_tool_tip_shortcut.ToolTipShortcut, {
          namespace: "PRESENTATION",
          action: "FULLSCREEN"
        }))
      }, _react.default.createElement(_eui.EuiButtonIcon, {
        iconType: "fullScreen",
        "aria-label": strings.getFullScreenButtonAriaLabel(),
        onClick: toggleFullscreen
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "_keyHandler", function (action) {
      if (action === 'EDITING') {
        _this.props.toggleWriteable();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_hideElementModal", function () {
      return _this.setState({
        isModalVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_showElementModal", function () {
      return _this.setState({
        isModalVisible: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_hideEmbeddablePanel", function () {
      return _this.setState({
        isPanelVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_showEmbeddablePanel", function () {
      return _this.setState({
        isPanelVisible: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_elementAdd", function () {
      return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiModal, {
        onClose: _this._hideElementModal,
        className: "canvasModal--fixedSize",
        maxWidth: "1000px",
        initialFocus: ".canvasElements__filter input"
      }, _react.default.createElement(_element_types.ElementTypes, {
        onClose: _this._hideElementModal
      }), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiButton, {
        size: "s",
        onClick: _this._hideElementModal
      }, strings.getAddElementModalCloseButtonLabel()))));
    });

    _defineProperty(_assertThisInitialized(_this), "_embeddableAdd", function () {
      return _react.default.createElement(_embeddable_flyout.AddEmbeddablePanel, {
        onClose: _this._hideEmbeddablePanel
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_getEditToggleToolTipText", function () {
      if (!_this.props.canUserWrite) {
        return strings.getNoWritePermissionTooltipText();
      }

      var content = _this.props.isWriteable ? strings.getHideEditControlTooltip() : strings.getShowEditControlTooltip();
      return content;
    });

    _defineProperty(_assertThisInitialized(_this), "_getEditToggleToolTip", function () {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        textOnly: false
      },
          textOnly = _ref2.textOnly;

      var content = _this._getEditToggleToolTipText();

      if (textOnly) {
        return content;
      }

      return _react.default.createElement("span", null, content, " ", _react.default.createElement(_tool_tip_shortcut.ToolTipShortcut, {
        namespace: "EDITOR",
        action: "EDITING"
      }));
    });

    return _this;
  }

  _createClass(WorkpadHeader, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isWriteable = _this$props.isWriteable,
          canUserWrite = _this$props.canUserWrite,
          toggleWriteable = _this$props.toggleWriteable;
      var _this$state = this.state,
          isModalVisible = _this$state.isModalVisible,
          isPanelVisible = _this$state.isPanelVisible;
      return _react.default.createElement("div", null, isModalVisible ? this._elementAdd() : null, isPanelVisible ? this._embeddableAdd() : null, _react.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "s",
        alignItems: "center",
        justifyContent: "spaceBetween",
        className: "canvasLayout__stageHeaderInner"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "center",
        gutterSize: "xs"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_control_settings.ControlSettings, null)), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_refresh_control.RefreshControl, null)), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_fullscreen_control.FullscreenControl, null, this._fullscreenButton)), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_workpad_zoom.WorkpadZoom, null)), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_workpad_export.WorkpadExport, null)), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, canUserWrite && _react.default.createElement(_reactShortcuts.Shortcuts, {
        name: "EDITOR",
        handler: this._keyHandler,
        targetNodeSelector: "body",
        global: true,
        isolate: true
      }), _react.default.createElement(_eui.EuiToolTip, {
        position: "bottom",
        content: this._getEditToggleToolTip()
      }, _react.default.createElement(_eui.EuiButtonIcon, {
        iconType: isWriteable ? 'lockOpen' : 'lock',
        onClick: toggleWriteable,
        size: "s",
        "aria-label": this._getEditToggleToolTipText(),
        isDisabled: !canUserWrite
      }))))), isWriteable ? _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "center",
        gutterSize: "s"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_asset_manager.AssetManager, null)), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        onClick: this._showEmbeddablePanel
      }, strings.getEmbedObjectButtonLabel())), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButton, {
        fill: true,
        size: "s",
        iconType: "vector",
        "data-test-subj": "add-element-button",
        onClick: this._showElementModal
      }, strings.getAddElementButtonLabel())))) : null));
    }
  }]);

  return WorkpadHeader;
}(_react.default.PureComponent);

exports.WorkpadHeader = WorkpadHeader;

_defineProperty(WorkpadHeader, "propTypes", {
  isWriteable: _propTypes.default.bool,
  toggleWriteable: _propTypes.default.func
});