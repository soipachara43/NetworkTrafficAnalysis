"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Field = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

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

var Field =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Field, _PureComponent);

  function Field() {
    _classCallCheck(this, Field);

    return _possibleConstructorReturn(this, _getPrototypeOf(Field).apply(this, arguments));
  }

  _createClass(Field, [{
    key: "render",
    value: function render() {
      var name = this.props.name;
      return _react.default.createElement(_eui.EuiFormRow, {
        fullWidth: true,
        label: name
      }, this.renderField());
    }
  }, {
    key: "onCodeEditorChange",
    value: function onCodeEditorChange(targetValue) {
      var _this$props = this.props,
          name = _this$props.name,
          onChange = _this$props.onChange;
      var invalid = false;

      try {
        JSON.parse(targetValue);
      } catch (e) {
        invalid = true;
      }

      onChange(name, {
        value: targetValue,
        invalid: invalid
      });
    }
  }, {
    key: "onFieldChange",
    value: function onFieldChange(targetValue) {
      var _this$props2 = this.props,
          name = _this$props2.name,
          type = _this$props2.type,
          onChange = _this$props2.onChange;
      var newParsedValue = targetValue;
      var invalid = false;

      if (type === 'number') {
        try {
          newParsedValue = Number(newParsedValue);
        } catch (e) {
          invalid = true;
        }
      }

      onChange(name, {
        value: newParsedValue,
        invalid: invalid
      });
    }
  }, {
    key: "renderField",
    value: function renderField() {
      var _ref,
          _this = this;

      var _this$props3 = this.props,
          type = _this$props3.type,
          name = _this$props3.name,
          state = _this$props3.state,
          disabled = _this$props3.disabled;
      var currentValue = (_ref = state === null || state === void 0 ? void 0 : state.value) !== null && _ref !== void 0 ? _ref : this.props.value;

      switch (type) {
        case 'number':
          return _react.default.createElement(_eui.EuiFieldNumber, {
            name: name,
            id: this.fieldId,
            value: currentValue,
            onChange: function onChange(e) {
              return _this.onFieldChange(e.target.value);
            },
            disabled: disabled,
            "data-test-subj": "savedObjects-editField-".concat(name)
          });

        case 'boolean':
          return _react.default.createElement(_eui.EuiSwitch, {
            name: name,
            id: this.fieldId,
            label: !!currentValue ? _react.default.createElement(_react2.FormattedMessage, {
              id: "kbn.management.objects.field.onLabel",
              defaultMessage: "On"
            }) : _react.default.createElement(_react2.FormattedMessage, {
              id: "kbn.management.objects.field.offLabel",
              defaultMessage: "Off"
            }),
            checked: !!currentValue,
            onChange: function onChange(e) {
              return _this.onFieldChange(e.target.checked);
            },
            disabled: disabled,
            "data-test-subj": "savedObjects-editField-".concat(name)
          });

        case 'json':
        case 'array':
          return _react.default.createElement("div", {
            "data-test-subj": "savedObjects-editField-".concat(name)
          }, _react.default.createElement(_eui.EuiCodeEditor, {
            mode: "json",
            theme: "textmate",
            value: currentValue,
            onChange: function onChange(value) {
              return _this.onCodeEditorChange(value);
            },
            width: "100%",
            height: "auto",
            minLines: 6,
            maxLines: 30,
            isReadOnly: disabled,
            setOptions: {
              showLineNumbers: true,
              tabSize: 2,
              useSoftTabs: true
            },
            editorProps: {
              $blockScrolling: Infinity
            },
            showGutter: true
          }));

        default:
          return _react.default.createElement(_eui.EuiFieldText, {
            id: this.fieldId,
            name: name,
            value: currentValue,
            onChange: function onChange(e) {
              return _this.onFieldChange(e.target.value);
            },
            disabled: disabled,
            "data-test-subj": "savedObjects-editField-".concat(name)
          });
      }
    }
  }, {
    key: "fieldId",
    get: function get() {
      var name = this.props.name;
      return "savedObjects-editField-".concat(name);
    }
  }]);

  return Field;
}(_react.PureComponent);

exports.Field = Field;