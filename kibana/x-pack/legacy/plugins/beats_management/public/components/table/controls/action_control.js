"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionControl = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ActionControl =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(ActionControl, _React$PureComponent);

  function ActionControl(props) {
    var _this;

    _classCallCheck(this, ActionControl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ActionControl).call(this, props));
    _this.state = {
      showModal: false
    };
    return _this;
  }

  _createClass(ActionControl, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          action = _this$props.action,
          actionHandler = _this$props.actionHandler,
          danger = _this$props.danger,
          name = _this$props.name,
          showWarning = _this$props.showWarning,
          warningHeading = _this$props.warningHeading,
          warningMessage = _this$props.warningMessage;
      return _react2.default.createElement("div", null, _react2.default.createElement(_eui.EuiButton, {
        size: "s",
        color: danger ? 'danger' : 'primary',
        disabled: this.props.disabled,
        onClick: showWarning ? function () {
          return _this2.setState({
            showModal: true
          });
        } : function () {
          return actionHandler(action);
        }
      }, name), this.state.showModal && _react2.default.createElement(_eui.EuiOverlayMask, null, _react2.default.createElement(_eui.EuiConfirmModal, {
        buttonColor: danger ? 'danger' : 'primary',
        cancelButtonText: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.beatsManagement.confirmModal.cancelButtonLabel",
          defaultMessage: "Cancel"
        }),
        confirmButtonText: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.beatsManagement.confirmModal.confirmButtonLabel",
          defaultMessage: "Confirm"
        }),
        onConfirm: function onConfirm() {
          actionHandler(action);

          _this2.setState({
            showModal: false
          });
        },
        onCancel: function onCancel() {
          return _this2.setState({
            showModal: false
          });
        },
        title: warningHeading ? warningHeading : _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.beatsManagement.confirmModal.confirmWarningTitle",
          defaultMessage: "Confirm"
        })
      }, warningMessage)));
    }
  }]);

  return ActionControl;
}(_react2.default.PureComponent);

exports.ActionControl = ActionControl;