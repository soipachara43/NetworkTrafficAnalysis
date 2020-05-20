"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigForm = void 0;

var _i18n = require("@kbn/i18n");

var _formsyReact = _interopRequireDefault(require("formsy-react"));

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _inputs = require("../../inputs");

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

var ConfigFormUi =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ConfigFormUi, _React$Component);

  function ConfigFormUi(props) {
    var _this;

    _classCallCheck(this, ConfigFormUi);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConfigFormUi).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "form", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "enableButton", function () {
      _this.setState({
        canSubmit: true
      });

      _this.props.canSubmit(true);
    });

    _defineProperty(_assertThisInitialized(_this), "disableButton", function () {
      _this.setState({
        canSubmit: false
      });

      _this.props.canSubmit(false);
    });

    _defineProperty(_assertThisInitialized(_this), "submit", function () {
      if (_this.form.current && _this.props.onSubmit) {
        _this.form.current.click();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onValidSubmit", function (model) {
      if (!_this.props.onSubmit) {
        return;
      }

      _this.props.onSubmit(model);
    });

    _this.state = {
      canSubmit: false
    };
    return _this;
  }

  _createClass(ConfigFormUi, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", null, _react.default.createElement("br", null), _react.default.createElement(_formsyReact.default, {
        onValidSubmit: this.onValidSubmit,
        onValid: this.enableButton,
        onInvalid: this.disableButton
      }, this.props.schema.configs.map(function (schema) {
        switch (schema.ui.type) {
          case 'input':
            return _react.default.createElement(_inputs.FormsyEuiFieldText, {
              key: schema.id,
              id: schema.id,
              defaultValue: (0, _lodash.get)(_this2.props, "values.config.".concat(schema.id), schema.defaultValue),
              name: schema.id,
              disabled: !_this2.props.onSubmit,
              helpText: schema.ui.helpText,
              placeholder: schema.ui.placeholder,
              label: schema.ui.label,
              validationError: schema.error,
              required: schema.required || false
            });

          case 'password':
            return _react.default.createElement(_inputs.FormsyEuiPasswordText, {
              key: schema.id,
              id: schema.id,
              disabled: !_this2.props.onSubmit,
              defaultValue: (0, _lodash.get)(_this2.props, "values.config.".concat(schema.id), schema.defaultValue),
              name: schema.id,
              placeholder: schema.ui.placeholder,
              helpText: schema.ui.helpText,
              label: schema.ui.label,
              validationError: schema.error,
              required: schema.required || false
            });

          case 'multi-input':
            return _react.default.createElement(_inputs.FormsyEuiMultiFieldText, {
              key: schema.id,
              id: schema.id,
              disabled: !_this2.props.onSubmit,
              defaultValue: (0, _lodash.get)(_this2.props, "values.config.".concat(schema.id), schema.defaultValue),
              name: schema.id,
              placeholder: schema.ui.placeholder,
              helpText: schema.ui.helpText,
              label: schema.ui.label,
              validationError: schema.error,
              required: schema.required
            });

          case 'select':
            return _react.default.createElement(_inputs.FormsyEuiSelect, {
              key: schema.id,
              id: schema.id,
              name: schema.id,
              disabled: !_this2.props.onSubmit,
              defaultValue: (0, _lodash.get)(_this2.props, "values.config.".concat(schema.id), schema.defaultValue),
              helpText: schema.ui.helpText,
              label: schema.ui.label,
              options: [{
                value: '',
                text: _i18n.i18n.translate('xpack.beatsManagement.table.selectOptionLabel', {
                  defaultMessage: 'Please Select An Option'
                })
              }].concat(schema.options || []),
              validationError: schema.error,
              required: schema.required
            });

          case 'code':
            return _react.default.createElement(_inputs.FormsyEuiCodeEditor, {
              key: "".concat(schema.id, "-").concat(_this2.props.id),
              mode: "yaml",
              disabled: !_this2.props.onSubmit,
              id: schema.id,
              defaultValue: (0, _lodash.get)(_this2.props, "values.config.".concat(schema.id), schema.defaultValue),
              name: schema.id,
              helpText: schema.ui.helpText,
              label: schema.ui.label,
              options: schema.options ? schema.options : [],
              validationError: schema.error,
              required: schema.required
            });
        }
      }), this.props.schema && _react.default.createElement(_inputs.FormsyEuiCodeEditor, {
        mode: "yaml",
        disabled: !this.props.onSubmit,
        id: 'other',
        defaultValue: (0, _lodash.get)(this.props, "values.config.other", ''),
        name: 'other',
        helpText: _i18n.i18n.translate('xpack.beatsManagement.config.otherConfigDescription', {
          defaultMessage: 'Use YAML format to specify other settings for the Filebeat Input'
        }),
        label: _i18n.i18n.translate('xpack.beatsManagement.config.otherConfigLabel', {
          defaultMessage: 'Other Config'
        }),
        validationError: _i18n.i18n.translate('xpack.beatsManagement.config.other.error', {
          defaultMessage: 'Use valid YAML format'
        }),
        required: false
      }), this.props.onSubmit && _react.default.createElement("button", {
        type: "submit",
        style: {
          display: 'none'
        },
        disabled: !this.state.canSubmit,
        ref: this.form
      })));
    }
  }]);

  return ConfigFormUi;
}(_react.default.Component);

var ConfigForm = ConfigFormUi;
exports.ConfigForm = ConfigForm;