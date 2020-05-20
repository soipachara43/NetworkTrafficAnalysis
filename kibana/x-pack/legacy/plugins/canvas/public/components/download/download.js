"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Download = void 0;

var _base64Js = require("base64-js");

var _fileSaver = _interopRequireDefault(require("file-saver"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _dataurl = require("../../../common/lib/dataurl");

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

var Download =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Download, _React$PureComponent);

  function Download() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Download);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Download)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      var _this$props = _this.props,
          fileName = _this$props.fileName,
          content = _this$props.content;
      var asset = (0, _dataurl.parseDataUrl)(content, true);

      if (asset && asset.data) {
        var assetBlob = new Blob([(0, _base64Js.toByteArray)(asset.data)], {
          type: asset.mimetype
        });
        var ext = asset.extension ? ".".concat(asset.extension) : '';

        _fileSaver.default.saveAs(assetBlob, "canvas-".concat(fileName).concat(ext));
      }
    });

    return _this;
  }

  _createClass(Download, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "canvasDownload",
        onClick: this.onClick,
        onKeyPress: this.onClick,
        tabIndex: 0,
        role: "button"
      }, this.props.children);
    }
  }]);

  return Download;
}(_react.default.PureComponent);

exports.Download = Download;

_defineProperty(Download, "propTypes", {
  children: _propTypes.default.element.isRequired,
  fileName: _propTypes.default.string.isRequired,
  content: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]).isRequired
});