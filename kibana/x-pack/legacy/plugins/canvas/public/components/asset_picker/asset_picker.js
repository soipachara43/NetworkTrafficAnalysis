"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssetPicker = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _i18n = require("../../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var strings = _i18n.ComponentStrings.AssetPicker;

var AssetPicker =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AssetPicker, _PureComponent);

  function AssetPicker() {
    _classCallCheck(this, AssetPicker);

    return _possibleConstructorReturn(this, _getPrototypeOf(AssetPicker).apply(this, arguments));
  }

  _createClass(AssetPicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var selectedAsset = document.getElementById('canvasAssetPicker__selectedAsset');

      if (selectedAsset) {
        selectedAsset.scrollIntoView();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          assets = _this$props.assets,
          selected = _this$props.selected,
          onChange = _this$props.onChange;
      return _react.default.createElement(_eui.EuiFlexGrid, {
        id: "canvasAssetPicker",
        className: "canvasAssetPicker",
        gutterSize: "s",
        columns: 4
      }, assets.map(function (asset) {
        return _react.default.createElement(_eui.EuiFlexItem, {
          key: asset.id,
          id: asset.id === selected ? 'canvasAssetPicker__selectedAsset' : '',
          className: "canvasCheckered"
        }, _react.default.createElement(_eui.EuiLink, {
          className: "canvasAssetPicker__link",
          disabled: asset.id === selected,
          onClick: function onClick() {
            return onChange(asset);
          }
        }, _react.default.createElement(_eui.EuiImage, {
          url: asset.value,
          alt: strings.getAssetAltText()
        }), asset.id === selected && _react.default.createElement(_eui.EuiIcon, {
          className: "canvasAssetPicker__selected",
          type: "checkInCircleFilled"
        })));
      }));
    }
  }]);

  return AssetPicker;
}(_react.PureComponent);

exports.AssetPicker = AssetPicker;

_defineProperty(AssetPicker, "propTypes", {
  assets: _propTypes.default.array.isRequired,
  selected: _propTypes.default.string,
  onChange: _propTypes.default.func.isRequired
});