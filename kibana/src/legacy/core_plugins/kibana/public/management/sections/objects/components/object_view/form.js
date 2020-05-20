"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _field = require("./field");

var _create_field_list = require("../../lib/create_field_list");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var Form =
/*#__PURE__*/
function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    var _this;

    _classCallCheck(this, Form);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Form).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleFieldChange", function (name, newState) {
      _this.setState({
        fieldStates: _objectSpread({}, _this.state.fieldStates, _defineProperty({}, name, newState))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onCancel", function () {
      window.history.back();
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmit",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _this$props, object, onSave, _this$state, fields, fieldStates, source, references, attributes;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, object = _this$props.object, onSave = _this$props.onSave;
              _this$state = _this.state, fields = _this$state.fields, fieldStates = _this$state.fieldStates;

              if (_this.isFormValid()) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return");

            case 4:
              _this.setState({
                submitting: true
              });

              source = (0, _lodash.cloneDeep)(object.attributes);
              fields.forEach(function (field) {
                var _ref2, _fieldStates$field$na;

                var value = (_ref2 = (_fieldStates$field$na = fieldStates[field.name]) === null || _fieldStates$field$na === void 0 ? void 0 : _fieldStates$field$na.value) !== null && _ref2 !== void 0 ? _ref2 : field.value;

                if (field.type === 'array' && typeof value === 'string') {
                  value = JSON.parse(value);
                }

                (0, _lodash.set)(source, field.name, value);
              });
              references = source.references, attributes = _objectWithoutProperties(source, ["references"]);
              _context.next = 10;
              return onSave({
                attributes: attributes,
                references: references
              });

            case 10:
              _this.setState({
                submitting: false
              });

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _this.state = {
      fields: [],
      fieldStates: {},
      submitting: false
    };
    return _this;
  }

  _createClass(Form, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
          object = _this$props2.object,
          service = _this$props2.service;
      var fields = (0, _create_field_list.createFieldList)(object, service);
      this.setState({
        fields: fields
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          editionEnabled = _this$props3.editionEnabled,
          service = _this$props3.service;
      var _this$state2 = this.state,
          fields = _this$state2.fields,
          fieldStates = _this$state2.fieldStates,
          submitting = _this$state2.submitting;
      var isValid = this.isFormValid();
      return _react.default.createElement(_eui.EuiForm, {
        "data-test-subj": "savedObjectEditForm",
        role: "form"
      }, fields.map(function (field) {
        return _react.default.createElement(_field.Field, {
          key: "".concat(field.type, "-").concat(field.name),
          type: field.type,
          name: field.name,
          value: field.value,
          state: fieldStates[field.name],
          disabled: !editionEnabled,
          onChange: _this2.handleFieldChange
        });
      }), _react.default.createElement(_eui.EuiSpacer, {
        size: 'l'
      }), _react.default.createElement(_eui.EuiFlexGroup, {
        responsive: false,
        gutterSize: 'm'
      }, editionEnabled && _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButton, {
        fill: true,
        "aria-label": _i18n.i18n.translate('kbn.management.objects.view.saveButtonAriaLabel', {
          defaultMessage: 'Save { title } object',
          values: {
            title: service.type
          }
        }),
        onClick: this.onSubmit,
        disabled: !isValid || submitting,
        "data-test-subj": "savedObjectEditSave"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.management.objects.view.saveButtonLabel",
        defaultMessage: "Save { title } object",
        values: {
          title: service.type
        }
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        "aria-label": _i18n.i18n.translate('kbn.management.objects.view.cancelButtonAriaLabel', {
          defaultMessage: 'Cancel'
        }),
        onClick: this.onCancel,
        "data-test-subj": "savedObjectEditCancel"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.management.objects.view.cancelButtonLabel",
        defaultMessage: "Cancel"
      })))));
    }
  }, {
    key: "isFormValid",
    value: function isFormValid() {
      var fieldStates = this.state.fieldStates;
      return !Object.values(fieldStates).some(function (state) {
        return state.invalid === true;
      });
    }
  }]);

  return Form;
}(_react.Component);

exports.Form = Form;