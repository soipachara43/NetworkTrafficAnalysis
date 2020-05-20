"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssetManager = void 0;

var _eui = require("@elastic/eui");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("../../../i18n");

var _confirm_modal = require("../confirm_modal");

var _asset_modal = require("./asset_modal");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var strings = _i18n.ComponentStrings.AssetManager;

var AssetManager =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AssetManager, _PureComponent);

  function AssetManager() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AssetManager);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AssetManager)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      deleteId: null,
      isLoading: false,
      isModalVisible: false
    });

    _defineProperty(_assertThisInitialized(_this), "showModal", function () {
      return _this.setState({
        isModalVisible: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "resetDelete", function () {
      return _this.setState({
        deleteId: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "doDelete", function () {
      _this.resetDelete();

      _this.props.onAssetDelete(_this.state.deleteId);
    });

    _defineProperty(_assertThisInitialized(_this), "handleFileUpload", function (files) {
      if (files == null) return;

      _this.setState({
        isLoading: true
      });

      Promise.all(Array.from(files).map(function (file) {
        return _this.props.onAssetAdd(file);
      })).finally(function () {
        _this.setState({
          isLoading: false
        });
      });
    });

    return _this;
  }

  _createClass(AssetManager, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          isModalVisible = _this$state.isModalVisible,
          isLoading = _this$state.isLoading;
      var _this$props = this.props,
          assetValues = _this$props.assetValues,
          onAssetCopy = _this$props.onAssetCopy,
          onAddImageElement = _this$props.onAddImageElement;

      var assetModal = _react.default.createElement(_asset_modal.AssetModal, {
        assetValues: assetValues,
        isLoading: isLoading,
        onAssetCopy: onAssetCopy,
        onAssetCreate: function onAssetCreate(createdAsset) {
          onAddImageElement(createdAsset.id);

          _this2.setState({
            isModalVisible: false
          });
        },
        onAssetDelete: function onAssetDelete(asset) {
          return _this2.setState({
            deleteId: asset.id
          });
        },
        onClose: function onClose() {
          return _this2.setState({
            isModalVisible: false
          });
        },
        onFileUpload: this.handleFileUpload
      });

      var confirmModal = _react.default.createElement(_confirm_modal.ConfirmModal, {
        isOpen: this.state.deleteId !== null,
        title: strings.getConfirmModalTitle(),
        message: strings.getConfirmModalMessageText(),
        confirmButtonText: strings.getConfirmModalButtonLabel(),
        onConfirm: this.doDelete,
        onCancel: this.resetDelete
      });

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiButtonEmpty, {
        onClick: this.showModal
      }, strings.getButtonLabel()), isModalVisible ? assetModal : null, confirmModal);
    }
  }]);

  return AssetManager;
}(_react.PureComponent);

exports.AssetManager = AssetManager;

_defineProperty(AssetManager, "propTypes", {
  assetValues: _propTypes.default.array,
  onAddImageElement: _propTypes.default.func.isRequired,
  onAssetAdd: _propTypes.default.func.isRequired,
  onAssetCopy: _propTypes.default.func.isRequired,
  onAssetDelete: _propTypes.default.func.isRequired
});

_defineProperty(AssetManager, "defaultProps", {
  assetValues: []
});