"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomElementModal = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _constants = require("../../../common/lib/constants");

var _dataurl = require("../../../common/lib/dataurl");

var _element_card = require("../element_card");

var _components = require("../../../i18n/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MAX_NAME_LENGTH = 40;
var MAX_DESCRIPTION_LENGTH = 100;
var strings = _components.ComponentStrings.CustomElementModal;

var CustomElementModal =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(CustomElementModal, _PureComponent);

  function CustomElementModal() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CustomElementModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CustomElementModal)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      name: _this.props.name || '',
      description: _this.props.description || '',
      image: _this.props.image || ''
    });

    _defineProperty(_assertThisInitialized(_this), "_handleChange", function (type, value) {
      _this.setState(_defineProperty({}, type, value));
    });

    _defineProperty(_assertThisInitialized(_this), "_handleUpload", function (files) {
      if (files == null) return;
      var file = files[0];

      var _get$split = (0, _lodash.get)(file, 'type', '').split('/'),
          _get$split2 = _slicedToArray(_get$split, 2),
          type = _get$split2[0],
          subtype = _get$split2[1];

      if (type === 'image' && _constants.VALID_IMAGE_TYPES.indexOf(subtype) >= 0) {
        (0, _dataurl.encode)(file).then(function (dataurl) {
          return _this._handleChange('image', dataurl);
        });
      }
    });

    return _this;
  }

  _createClass(CustomElementModal, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          onSave = _this$props.onSave,
          onCancel = _this$props.onCancel,
          title = _this$props.title,
          rest = _objectWithoutProperties(_this$props, ["onSave", "onCancel", "title"]);

      var _this$state = this.state,
          name = _this$state.name,
          description = _this$state.description,
          image = _this$state.image;
      return _react.default.createElement(_eui.EuiModal, _extends({}, rest, {
        className: "canvasCustomElementModal",
        maxWidth: 700,
        onClose: onCancel,
        initialFocus: ".canvasCustomElementForm__name"
      }), _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, null, _react.default.createElement("h3", null, title))), _react.default.createElement(_eui.EuiModalBody, null, _react.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceBetween",
        alignItems: "flexStart"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        className: "canvasCustomElementForm",
        grow: 2
      }, _react.default.createElement(_eui.EuiFormRow, {
        label: strings.getNameInputLabel(),
        helpText: strings.getCharactersRemainingDescription(MAX_NAME_LENGTH - name.length),
        compressed: true
      }, _react.default.createElement(_eui.EuiFieldText, {
        value: name,
        className: "canvasCustomElementForm__name",
        onChange: function onChange(e) {
          return e.target.value.length <= MAX_NAME_LENGTH && _this2._handleChange('name', e.target.value);
        },
        required: true,
        "data-test-subj": "canvasCustomElementForm-name"
      })), _react.default.createElement(_eui.EuiFormRow, {
        label: strings.getDescriptionInputLabel(),
        helpText: strings.getCharactersRemainingDescription(MAX_DESCRIPTION_LENGTH - description.length)
      }, _react.default.createElement(_eui.EuiTextArea, {
        value: description,
        rows: 2,
        onChange: function onChange(e) {
          return e.target.value.length <= MAX_DESCRIPTION_LENGTH && _this2._handleChange('description', e.target.value);
        },
        "data-test-subj": "canvasCustomElementForm-description"
      })), _react.default.createElement(_eui.EuiFormRow, {
        className: "canvasCustomElementForm__thumbnail",
        label: strings.getImageInputLabel(),
        compressed: true
      }, _react.default.createElement(_eui.EuiFilePicker, {
        initialPromptText: strings.getImageFilePickerPlaceholder(),
        onChange: this._handleUpload,
        className: "canvasImageUpload",
        accept: "image/*"
      })), _react.default.createElement(_eui.EuiText, {
        className: "canvasCustomElementForm__thumbnailHelp",
        size: "xs"
      }, _react.default.createElement("p", null, strings.getImageInputDescription()))), _react.default.createElement(_eui.EuiFlexItem, {
        className: "canvasElementCard__wrapper canvasCustomElementForm__preview",
        grow: 1
      }, _react.default.createElement(_eui.EuiTitle, {
        size: "xxxs"
      }, _react.default.createElement("h4", null, strings.getElementPreviewTitle())), _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react.default.createElement(_element_card.ElementCard, {
        title: name,
        description: description,
        image: image
      })))), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "flexEnd"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        onClick: onCancel
      }, strings.getCancelButtonLabel())), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButton, {
        fill: true,
        onClick: function onClick() {
          onSave(name, description, image);
        },
        "data-test-subj": "canvasCustomElementForm-submit"
      }, strings.getSaveButtonLabel())))));
    }
  }]);

  return CustomElementModal;
}(_react.PureComponent);

exports.CustomElementModal = CustomElementModal;

_defineProperty(CustomElementModal, "propTypes", {
  name: _propTypes.default.string,
  description: _propTypes.default.string,
  image: _propTypes.default.string,
  title: _propTypes.default.string.isRequired,
  onSave: _propTypes.default.func.isRequired,
  onCancel: _propTypes.default.func.isRequired
});