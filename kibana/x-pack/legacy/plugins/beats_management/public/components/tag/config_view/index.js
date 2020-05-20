"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigView = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _config_schemas = require("../../../../common/config_schemas");

var _config_schemas_translations_map = require("../../../../common/config_schemas_translations_map");

var _config_form = require("./config_form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ConfigViewUi =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ConfigViewUi, _React$Component);

  function ConfigViewUi(props) {
    var _this;

    _classCallCheck(this, ConfigViewUi);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConfigViewUi).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "form", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "editMode", void 0);

    _defineProperty(_assertThisInitialized(_this), "schema", (0, _config_schemas_translations_map.translateConfigSchema)(_config_schemas.configBlockSchemas));

    _defineProperty(_assertThisInitialized(_this), "onValueChange", function (field) {
      return function (e) {
        var value = e.currentTarget ? e.currentTarget.value : e;

        _this.setState(function (state) {
          return {
            configBlock: _objectSpread({}, state.configBlock, _defineProperty({}, field, value))
          };
        });
      };
    });

    _this.editMode = props.configBlock !== undefined;
    _this.state = {
      valid: false,
      configBlock: props.configBlock || {
        type: _this.schema[0].id
      }
    };
    return _this;
  }

  _createClass(ConfigViewUi, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var thisConfigSchema = this.schema.find(function (s) {
        return _this2.state.configBlock.type === s.id;
      });

      if (!thisConfigSchema) {
        return _i18n.i18n.translate('xpack.beatsManagement.tagConfig.invalidSchema', {
          defaultMessage: 'Error: This config is invalid, it is not supported by Beats and should be removed'
        });
      }

      return _react.default.createElement(_eui.EuiFlyout, {
        onClose: this.props.onClose
      }, _react.default.createElement(_eui.EuiFlyoutHeader, {
        hasBorder: true
      }, _react.default.createElement(_eui.EuiTitle, {
        size: "m"
      }, _react.default.createElement("h2", null, this.editMode ? this.props.onSave ? _i18n.i18n.translate('xpack.beatsManagement.tagConfig.editConfigurationTitle', {
        defaultMessage: 'Edit configuration block'
      }) : _i18n.i18n.translate('xpack.beatsManagement.tagConfig.viewConfigurationTitle"', {
        defaultMessage: 'View configuration block'
      }) : _i18n.i18n.translate('xpack.beatsManagement.tagConfig.addConfigurationTitle"', {
        defaultMessage: 'Add configuration block'
      })))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_eui.EuiFormRow, {
        label: _i18n.i18n.translate('xpack.beatsManagement.tagConfig.typeLabel', {
          defaultMessage: 'Type'
        })
      }, _react.default.createElement(_eui.EuiSelect, {
        options: this.schema.map(function (s) {
          return {
            value: s.id,
            text: s.name
          };
        }),
        value: this.state.configBlock.type,
        disabled: this.editMode,
        onChange: this.onValueChange('type')
      })), _react.default.createElement(_eui.EuiFormRow, {
        label: _i18n.i18n.translate('xpack.beatsManagement.tagConfig.descriptionLabel', {
          defaultMessage: 'Description'
        })
      }, _react.default.createElement(_eui.EuiFieldText, {
        value: this.state.configBlock.description,
        disabled: !this.props.onSave,
        onChange: this.onValueChange('description'),
        placeholder: _i18n.i18n.translate('xpack.beatsManagement.tagConfig.descriptionPlaceholder', {
          defaultMessage: 'Description (optional)'
        })
      })), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement("h3", null, _i18n.i18n.translate('xpack.beatsManagement.tagConfig.configurationTypeText', {
        defaultMessage: '{configType} configuration',
        values: {
          configType: thisConfigSchema ? thisConfigSchema.name : 'Unknown'
        }
      })), _react.default.createElement(_eui.EuiHorizontalRule, null), _react.default.createElement(_config_form.ConfigForm, {
        onSubmit: this.props.onSave ? function (data) {
          if (_this2.props.onSave) {
            _this2.props.onSave(_objectSpread({}, _this2.state.configBlock, {
              config: data
            }));
          }

          _this2.props.onClose();
        } : undefined,
        canSubmit: function canSubmit(canIt) {
          return _this2.setState({
            valid: canIt
          });
        },
        ref: this.form,
        values: this.state.configBlock,
        id: thisConfigSchema ? thisConfigSchema.name : 'Undefined',
        schema: thisConfigSchema
      })), _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceBetween"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        iconType: "cross",
        onClick: this.props.onClose
      }, _i18n.i18n.translate('xpack.beatsManagement.tagConfig.closeButtonLabel', {
        defaultMessage: 'Close'
      }))), this.props.onSave && _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButton, {
        disabled: !this.state.valid,
        fill: true,
        onClick: function onClick() {
          if (_this2.form.current) {
            _this2.form.current.submit();
          }
        }
      }, _i18n.i18n.translate('xpack.beatsManagement.tagConfig.saveButtonLabel', {
        defaultMessage: 'Save'
      }))))));
    }
  }]);

  return ConfigViewUi;
}(_react.default.Component);

var ConfigView = ConfigViewUi;
exports.ConfigView = ConfigView;