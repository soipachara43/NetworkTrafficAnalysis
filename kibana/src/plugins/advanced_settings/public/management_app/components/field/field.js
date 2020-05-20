"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Field = exports.getEditableValue = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

require("brace/theme/textmate");

require("brace/mode/markdown");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _lib = require("../../lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var getEditableValue = function getEditableValue(type, value, defVal) {
  var val = value === null || value === undefined ? defVal : value;

  switch (type) {
    case 'array':
      return val.join(', ');

    case 'boolean':
      return !!val;

    case 'number':
      return Number(val);

    case 'image':
      return val;

    default:
      return val || '';
  }
};

exports.getEditableValue = getEditableValue;

var Field =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Field, _PureComponent);

  function Field() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Field);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Field)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "changeImageForm", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (unsavedChanges) {
      _this.props.handleChange(_this.props.setting.name, unsavedChanges);
    });

    _defineProperty(_assertThisInitialized(_this), "resetField", function () {
      var _this$props$setting = _this.props.setting,
          type = _this$props$setting.type,
          defVal = _this$props$setting.defVal;

      if (type === 'image') {
        _this.cancelChangeImage();

        return _this.handleChange({
          value: getEditableValue(type, defVal),
          changeImage: true
        });
      }

      return _this.handleChange({
        value: getEditableValue(type, defVal)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onCodeEditorChange", function (value) {
      var _this$props$setting2 = _this.props.setting,
          defVal = _this$props$setting2.defVal,
          type = _this$props$setting2.type;
      var newUnsavedValue;
      var errorParams = {};

      switch (type) {
        case 'json':
          var isJsonArray = Array.isArray(JSON.parse(defVal || '{}'));
          newUnsavedValue = value.trim() || (isJsonArray ? '[]' : '{}');

          try {
            JSON.parse(newUnsavedValue);
          } catch (e) {
            errorParams = {
              error: _i18n.i18n.translate('advancedSettings.field.codeEditorSyntaxErrorMessage', {
                defaultMessage: 'Invalid JSON syntax'
              }),
              isInvalid: true
            };
          }

          break;

        default:
          newUnsavedValue = value;
      }

      _this.handleChange(_objectSpread({
        value: newUnsavedValue
      }, errorParams));
    });

    _defineProperty(_assertThisInitialized(_this), "onFieldChangeSwitch", function (e) {
      return _this.onFieldChange(e.target.checked);
    });

    _defineProperty(_assertThisInitialized(_this), "onFieldChangeEvent", function (e) {
      return _this.onFieldChange(e.target.value);
    });

    _defineProperty(_assertThisInitialized(_this), "onFieldChange", function (targetValue) {
      var _ref;

      var _this$props$setting3 = _this.props.setting,
          type = _this$props$setting3.type,
          validation = _this$props$setting3.validation,
          value = _this$props$setting3.value,
          defVal = _this$props$setting3.defVal;
      var newUnsavedValue;

      switch (type) {
        case 'boolean':
          var unsavedChanges = _this.props.unsavedChanges;
          var currentValue = unsavedChanges ? unsavedChanges.value : getEditableValue(type, value, defVal);
          newUnsavedValue = !currentValue;
          break;

        case 'number':
          newUnsavedValue = Number(targetValue);
          break;

        default:
          newUnsavedValue = targetValue;
      }

      var errorParams = {};

      if ((_ref = validation) === null || _ref === void 0 ? void 0 : _ref.regex) {
        if (!validation.regex.test(newUnsavedValue.toString())) {
          errorParams = {
            error: validation.message,
            isInvalid: true
          };
        }
      }

      _this.handleChange(_objectSpread({
        value: newUnsavedValue
      }, errorParams));
    });

    _defineProperty(_assertThisInitialized(_this), "onImageChange",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(files) {
        var file, _ref3, maxSize, base64Image, errorParams, isInvalid;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(files == null)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                if (files.length) {
                  _context.next = 5;
                  break;
                }

                _this.setState({
                  unsavedValue: null
                });

                return _context.abrupt("return");

              case 5:
                file = files[0];
                _ref3 = _this.props.setting.validation, maxSize = _ref3.maxSize;
                _context.prev = 7;
                base64Image = '';

                if (!(file instanceof File)) {
                  _context.next = 13;
                  break;
                }

                _context.next = 12;
                return _this.getImageAsBase64(file);

              case 12:
                base64Image = _context.sent;

              case 13:
                errorParams = {};
                isInvalid = !!((maxSize === null || maxSize === void 0 ? void 0 : maxSize.length) && base64Image.length > maxSize.length);

                if (isInvalid) {
                  errorParams = {
                    isInvalid: isInvalid,
                    error: _i18n.i18n.translate('advancedSettings.field.imageTooLargeErrorMessage', {
                      defaultMessage: 'Image is too large, maximum size is {maxSizeDescription}',
                      values: {
                        maxSizeDescription: maxSize.description
                      }
                    })
                  };
                }

                _this.handleChange(_objectSpread({
                  changeImage: true,
                  value: base64Image
                }, errorParams));

                _context.next = 23;
                break;

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](7);

                _this.props.toasts.addDanger(_i18n.i18n.translate('advancedSettings.field.imageChangeErrorMessage', {
                  defaultMessage: 'Image could not be saved'
                }));

                _this.cancelChangeImage();

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[7, 19]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "changeImage", function () {
      _this.handleChange({
        value: null,
        changeImage: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "cancelChangeImage", function () {
      var _this$changeImageForm;

      if ((_this$changeImageForm = _this.changeImageForm.current) === null || _this$changeImageForm === void 0 ? void 0 : _this$changeImageForm.fileInput) {
        _this.changeImageForm.current.fileInput.value = '';

        _this.changeImageForm.current.handleChange();
      }

      if (_this.props.clearChange) {
        _this.props.clearChange(_this.props.setting.name);
      }
    });

    return _this;
  }

  _createClass(Field, [{
    key: "getDisplayedDefaultValue",
    value: function getDisplayedDefaultValue(type, defVal) {
      var optionLabels = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (defVal === undefined || defVal === null || defVal === '') {
        return 'null';
      }

      switch (type) {
        case 'array':
          return defVal.join(', ');

        case 'select':
          return optionLabels.hasOwnProperty(String(defVal)) ? optionLabels[String(defVal)] : String(defVal);

        default:
          return String(defVal);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _prevProps$unsavedCha, _this$props$unsavedCh;

      if (prevProps.setting.type === 'image' && ((_prevProps$unsavedCha = prevProps.unsavedChanges) === null || _prevProps$unsavedCha === void 0 ? void 0 : _prevProps$unsavedCha.value) && !((_this$props$unsavedCh = this.props.unsavedChanges) === null || _this$props$unsavedCh === void 0 ? void 0 : _this$props$unsavedCh.value)) {
        this.cancelChangeImage();
      }
    }
  }, {
    key: "getImageAsBase64",
    value: function () {
      var _getImageAsBase = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(file) {
        var reader;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                reader = new FileReader();
                reader.readAsDataURL(file);
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  reader.onload = function () {
                    resolve(reader.result || undefined);
                  };

                  reader.onerror = function (err) {
                    reject(err);
                  };
                }));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getImageAsBase64(_x2) {
        return _getImageAsBase.apply(this, arguments);
      }

      return getImageAsBase64;
    }()
  }, {
    key: "renderField",
    value: function renderField(id, setting) {
      var _this$props = this.props,
          enableSaving = _this$props.enableSaving,
          unsavedChanges = _this$props.unsavedChanges,
          loading = _this$props.loading;
      var name = setting.name,
          value = setting.value,
          type = setting.type,
          options = setting.options,
          _setting$optionLabels = setting.optionLabels,
          optionLabels = _setting$optionLabels === void 0 ? {} : _setting$optionLabels,
          isOverridden = setting.isOverridden,
          defVal = setting.defVal,
          ariaName = setting.ariaName;
      var a11yProps = unsavedChanges ? {
        'aria-label': ariaName,
        'aria-describedby': id
      } : {
        'aria-label': ariaName
      };
      var currentValue = unsavedChanges ? unsavedChanges.value : getEditableValue(type, value, defVal);

      switch (type) {
        case 'boolean':
          return _react.default.createElement(_eui.EuiSwitch, _extends({
            label: !!currentValue ? _react.default.createElement(_react2.FormattedMessage, {
              id: "advancedSettings.field.onLabel",
              defaultMessage: "On"
            }) : _react.default.createElement(_react2.FormattedMessage, {
              id: "advancedSettings.field.offLabel",
              defaultMessage: "Off"
            }),
            checked: !!currentValue,
            onChange: this.onFieldChangeSwitch,
            disabled: loading || isOverridden || !enableSaving,
            "data-test-subj": "advancedSetting-editField-".concat(name)
          }, a11yProps));

        case 'markdown':
        case 'json':
          return _react.default.createElement("div", {
            "data-test-subj": "advancedSetting-editField-".concat(name)
          }, _react.default.createElement(_eui.EuiCodeEditor, _extends({}, a11yProps, {
            mode: type,
            theme: "textmate",
            value: currentValue,
            onChange: this.onCodeEditorChange,
            width: "100%",
            height: "auto",
            minLines: 6,
            maxLines: 30,
            isReadOnly: isOverridden || !enableSaving,
            setOptions: {
              showLineNumbers: false,
              tabSize: 2
            },
            editorProps: {
              $blockScrolling: Infinity
            },
            showGutter: false
          })));

        case 'image':
          var changeImage = unsavedChanges === null || unsavedChanges === void 0 ? void 0 : unsavedChanges.changeImage;

          if (!(0, _lib.isDefaultValue)(setting) && !changeImage) {
            return _react.default.createElement(_eui.EuiImage, _extends({}, a11yProps, {
              allowFullScreen: true,
              url: value,
              alt: name
            }));
          } else {
            return _react.default.createElement(_eui.EuiFilePicker, {
              disabled: loading || isOverridden || !enableSaving,
              onChange: this.onImageChange,
              accept: ".jpg,.jpeg,.png",
              ref: this.changeImageForm,
              fullWidth: true,
              "data-test-subj": "advancedSetting-editField-".concat(name)
            });
          }

        case 'select':
          return _react.default.createElement(_eui.EuiSelect, _extends({}, a11yProps, {
            value: currentValue,
            options: options.map(function (option) {
              return {
                text: optionLabels.hasOwnProperty(option) ? optionLabels[option] : option,
                value: option
              };
            }),
            onChange: this.onFieldChangeEvent,
            isLoading: loading,
            disabled: loading || isOverridden || !enableSaving,
            fullWidth: true,
            "data-test-subj": "advancedSetting-editField-".concat(name)
          }));

        case 'number':
          return _react.default.createElement(_eui.EuiFieldNumber, _extends({}, a11yProps, {
            value: currentValue,
            onChange: this.onFieldChangeEvent,
            isLoading: loading,
            disabled: loading || isOverridden || !enableSaving,
            fullWidth: true,
            "data-test-subj": "advancedSetting-editField-".concat(name)
          }));

        default:
          return _react.default.createElement(_eui.EuiFieldText, _extends({}, a11yProps, {
            value: currentValue,
            onChange: this.onFieldChangeEvent,
            isLoading: loading,
            disabled: loading || isOverridden || !enableSaving,
            fullWidth: true,
            "data-test-subj": "advancedSetting-editField-".concat(name)
          }));
      }
    }
  }, {
    key: "renderLabel",
    value: function renderLabel(setting) {
      return setting.name;
    }
  }, {
    key: "renderHelpText",
    value: function renderHelpText(setting) {
      if (setting.isOverridden) {
        return _react.default.createElement(_eui.EuiText, {
          size: "xs"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "advancedSettings.field.helpText",
          defaultMessage: "This setting is overridden by the Kibana server and can not be changed."
        }));
      }

      var canUpdateSetting = this.props.enableSaving;
      var defaultLink = this.renderResetToDefaultLink(setting);
      var imageLink = this.renderChangeImageLink(setting);

      if (canUpdateSetting && (defaultLink || imageLink)) {
        return _react.default.createElement("span", null, defaultLink, imageLink);
      }

      return null;
    }
  }, {
    key: "renderTitle",
    value: function renderTitle(setting) {
      var unsavedChanges = this.props.unsavedChanges;
      var isInvalid = unsavedChanges === null || unsavedChanges === void 0 ? void 0 : unsavedChanges.isInvalid;
      var unsavedIconLabel = unsavedChanges ? isInvalid ? _i18n.i18n.translate('advancedSettings.field.invalidIconLabel', {
        defaultMessage: 'Invalid'
      }) : _i18n.i18n.translate('advancedSettings.field.unsavedIconLabel', {
        defaultMessage: 'Unsaved'
      }) : undefined;
      return _react.default.createElement("h3", null, _react.default.createElement("span", {
        className: "mgtAdvancedSettings__fieldTitle"
      }, setting.displayName || setting.name), setting.isCustom ? _react.default.createElement(_eui.EuiIconTip, {
        type: "asterisk",
        color: "primary",
        "aria-label": _i18n.i18n.translate('advancedSettings.field.customSettingAriaLabel', {
          defaultMessage: 'Custom setting'
        }),
        content: _react.default.createElement(_react2.FormattedMessage, {
          id: "advancedSettings.field.customSettingTooltip",
          defaultMessage: "Custom setting"
        })
      }) : '', unsavedChanges ? _react.default.createElement(_eui.EuiIconTip, {
        anchorClassName: "mgtAdvancedSettings__fieldTitleUnsavedIcon",
        type: isInvalid ? 'alert' : 'dot',
        color: isInvalid ? 'danger' : 'warning',
        "aria-label": unsavedIconLabel,
        content: unsavedIconLabel
      }) : '');
    }
  }, {
    key: "renderDescription",
    value: function renderDescription(setting) {
      var description;
      var deprecation;

      if (setting.deprecation) {
        var links = this.props.dockLinks;
        deprecation = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiToolTip, {
          content: setting.deprecation.message
        }, _react.default.createElement(_eui.EuiBadge, {
          color: "warning",
          onClick: function onClick() {
            window.open(links.management[setting.deprecation.docLinksKey], '_blank');
          },
          onClickAriaLabel: _i18n.i18n.translate('advancedSettings.field.deprecationClickAreaLabel', {
            defaultMessage: 'Click to view deprecation documentation for {settingName}.',
            values: {
              settingName: setting.name
            }
          })
        }, "Deprecated")), _react.default.createElement(_eui.EuiSpacer, {
          size: "s"
        }));
      }

      if (_react.default.isValidElement(setting.description)) {
        description = setting.description;
      } else {
        description = _react.default.createElement("div", {
          /*
           * Justification for dangerouslySetInnerHTML:
           * Setting description may contain formatting and links to documentation.
           */
          dangerouslySetInnerHTML: {
            __html: setting.description || ''
          } // eslint-disable-line react/no-danger

        });
      }

      return _react.default.createElement(_react.Fragment, null, deprecation, description, this.renderDefaultValue(setting));
    }
  }, {
    key: "renderDefaultValue",
    value: function renderDefaultValue(setting) {
      var type = setting.type,
          defVal = setting.defVal,
          optionLabels = setting.optionLabels;

      if ((0, _lib.isDefaultValue)(setting)) {
        return;
      }

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react.default.createElement(_eui.EuiText, {
        size: "xs"
      }, type === 'json' ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
        id: "advancedSettings.field.defaultValueTypeJsonText",
        defaultMessage: "Default: {value}",
        values: {
          value: _react.default.createElement(_eui.EuiCodeBlock, {
            language: "json",
            paddingSize: "s",
            overflowHeight: defVal.length >= 500 ? 300 : undefined
          }, this.getDisplayedDefaultValue(type, defVal))
        }
      })) : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
        id: "advancedSettings.field.defaultValueText",
        defaultMessage: "Default: {value}",
        values: {
          value: _react.default.createElement(_eui.EuiCode, null, this.getDisplayedDefaultValue(type, defVal, optionLabels))
        }
      }))));
    }
  }, {
    key: "renderResetToDefaultLink",
    value: function renderResetToDefaultLink(setting) {
      var _this$props$unsavedCh2;

      var defVal = setting.defVal,
          ariaName = setting.ariaName,
          name = setting.name;

      if (defVal === ((_this$props$unsavedCh2 = this.props.unsavedChanges) === null || _this$props$unsavedCh2 === void 0 ? void 0 : _this$props$unsavedCh2.value) || (0, _lib.isDefaultValue)(setting) || this.props.loading) {
        return;
      }

      return _react.default.createElement("span", null, _react.default.createElement(_eui.EuiLink, {
        "aria-label": _i18n.i18n.translate('advancedSettings.field.resetToDefaultLinkAriaLabel', {
          defaultMessage: 'Reset {ariaName} to default',
          values: {
            ariaName: ariaName
          }
        }),
        onClick: this.resetField,
        "data-test-subj": "advancedSetting-resetField-".concat(name)
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "advancedSettings.field.resetToDefaultLinkText",
        defaultMessage: "Reset to default"
      })), "\xA0\xA0\xA0");
    }
  }, {
    key: "renderChangeImageLink",
    value: function renderChangeImageLink(setting) {
      var _this$props$unsavedCh3;

      var changeImage = (_this$props$unsavedCh3 = this.props.unsavedChanges) === null || _this$props$unsavedCh3 === void 0 ? void 0 : _this$props$unsavedCh3.changeImage;
      var type = setting.type,
          value = setting.value,
          ariaName = setting.ariaName,
          name = setting.name;

      if (type !== 'image' || !value || changeImage) {
        return;
      }

      return _react.default.createElement("span", null, _react.default.createElement(_eui.EuiLink, {
        "aria-label": _i18n.i18n.translate('advancedSettings.field.changeImageLinkAriaLabel', {
          defaultMessage: 'Change {ariaName}',
          values: {
            ariaName: ariaName
          }
        }),
        onClick: this.changeImage,
        "data-test-subj": "advancedSetting-changeImage-".concat(name)
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "advancedSettings.field.changeImageLinkText",
        defaultMessage: "Change image"
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          setting = _this$props2.setting,
          unsavedChanges = _this$props2.unsavedChanges;
      var error = unsavedChanges === null || unsavedChanges === void 0 ? void 0 : unsavedChanges.error;
      var isInvalid = unsavedChanges === null || unsavedChanges === void 0 ? void 0 : unsavedChanges.isInvalid;
      var className = (0, _classnames.default)('mgtAdvancedSettings__field', {
        'mgtAdvancedSettings__field--unsaved': unsavedChanges,
        'mgtAdvancedSettings__field--invalid': isInvalid
      });
      var id = setting.name;
      return _react.default.createElement(_eui.EuiDescribedFormGroup, {
        className: className,
        title: this.renderTitle(setting),
        description: this.renderDescription(setting),
        fullWidth: true
      }, _react.default.createElement(_eui.EuiFormRow, {
        isInvalid: isInvalid,
        error: error,
        label: this.renderLabel(setting),
        helpText: this.renderHelpText(setting),
        className: "mgtAdvancedSettings__fieldRow",
        hasChildLabel: setting.type !== 'boolean',
        fullWidth: true
      }, _react.default.createElement(_react.default.Fragment, null, this.renderField(id, setting), unsavedChanges && _react.default.createElement(_eui.EuiScreenReaderOnly, null, _react.default.createElement("p", {
        id: id
      }, unsavedChanges.error ? unsavedChanges.error : _i18n.i18n.translate('advancedSettings.field.settingIsUnsaved', {
        defaultMessage: 'Setting is currently not saved.'
      }))))));
    }
  }]);

  return Field;
}(_react.PureComponent);

exports.Field = Field;