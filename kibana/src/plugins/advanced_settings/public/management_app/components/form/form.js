"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../kibana_react/public");

var _lib = require("../../lib");

var _field = require("../field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var NAV_IS_LOCKED_KEY = 'core.chrome.isLocked';

var Form =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Form, _PureComponent);

  function Form() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Form)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      unsavedChanges: {},
      loading: false
    });

    _defineProperty(_assertThisInitialized(_this), "getSettingByKey", function (key) {
      return Object.values(_this.props.settings).flat().find(function (el) {
        return el.name === key;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getCountOfUnsavedChanges", function () {
      return Object.keys(_this.state.unsavedChanges).length;
    });

    _defineProperty(_assertThisInitialized(_this), "getCountOfHiddenUnsavedChanges", function () {
      var shownSettings = Object.values(_this.props.visibleSettings).flat().map(function (setting) {
        return setting.name;
      });
      return Object.keys(_this.state.unsavedChanges).filter(function (key) {
        return !shownSettings.includes(key);
      }).length;
    });

    _defineProperty(_assertThisInitialized(_this), "areChangesInvalid", function () {
      var unsavedChanges = _this.state.unsavedChanges;
      return Object.values(unsavedChanges).some(function (_ref) {
        var isInvalid = _ref.isInvalid;
        return isInvalid;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (key, change) {
      var setting = _this.getSettingByKey(key);

      if (!setting) {
        return;
      }

      var type = setting.type,
          defVal = setting.defVal,
          value = setting.value;
      var savedValue = (0, _field.getEditableValue)(type, value, defVal);

      if (change.value === savedValue) {
        return _this.clearChange(key);
      }

      _this.setState({
        unsavedChanges: _objectSpread({}, _this.state.unsavedChanges, _defineProperty({}, key, change))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "clearChange", function (key) {
      if (!_this.state.unsavedChanges[key]) {
        return;
      }

      var unsavedChanges = _objectSpread({}, _this.state.unsavedChanges);

      delete unsavedChanges[key];

      _this.setState({
        unsavedChanges: unsavedChanges
      });
    });

    _defineProperty(_assertThisInitialized(_this), "clearAllUnsaved", function () {
      _this.setState({
        unsavedChanges: {}
      });
    });

    _defineProperty(_assertThisInitialized(_this), "saveAll",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var unsavedChanges, configToSave, requiresReload;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.setLoading(true);

              unsavedChanges = _this.state.unsavedChanges;

              if (!(0, _lodash.isEmpty)(unsavedChanges)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return");

            case 4:
              configToSave = {};
              requiresReload = false;
              Object.entries(unsavedChanges).forEach(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                    name = _ref4[0],
                    value = _ref4[1].value;

                var setting = _this.getSettingByKey(name);

                if (!setting) {
                  return;
                }

                var defVal = setting.defVal,
                    type = setting.type,
                    requiresPageReload = setting.requiresPageReload;
                var valueToSave = value;
                var equalsToDefault = false;

                switch (type) {
                  case 'array':
                    valueToSave = valueToSave.split(',').map(function (val) {
                      return val.trim();
                    });
                    equalsToDefault = valueToSave.join(',') === defVal.join(',');
                    break;

                  case 'json':
                    var isArray = Array.isArray(JSON.parse(defVal || '{}'));
                    valueToSave = valueToSave.trim();
                    valueToSave = valueToSave || (isArray ? '[]' : '{}');

                  default:
                    equalsToDefault = valueToSave === defVal;
                }

                if (requiresPageReload) {
                  requiresReload = true;
                }

                configToSave[name] = equalsToDefault ? null : valueToSave;
              });
              _context.prev = 7;
              _context.next = 10;
              return _this.props.save(configToSave);

            case 10:
              _this.clearAllUnsaved();

              if (requiresReload) {
                _this.renderPageReloadToast();
              }

              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](7);

              _this.props.toasts.addDanger(_i18n.i18n.translate('advancedSettings.form.saveErrorMessage', {
                defaultMessage: 'Unable to save'
              }));

            case 17:
              _this.setLoading(false);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[7, 14]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "renderPageReloadToast", function () {
      _this.props.toasts.add({
        title: _i18n.i18n.translate('advancedSettings.form.requiresPageReloadToastDescription', {
          defaultMessage: 'One or more settings require you to reload the page to take effect.'
        }),
        text: (0, _public.toMountPoint)(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
          justifyContent: "flexEnd",
          gutterSize: "s"
        }, _react.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react.default.createElement(_eui.EuiButton, {
          size: "s",
          onClick: function onClick() {
            return window.location.reload();
          }
        }, _i18n.i18n.translate('advancedSettings.form.requiresPageReloadToastButtonLabel', {
          defaultMessage: 'Reload page'
        })))))),
        color: 'success'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderCountOfUnsaved", function () {
      var unsavedCount = _this.getCountOfUnsavedChanges();

      var hiddenUnsavedCount = _this.getCountOfHiddenUnsavedChanges();

      return _react.default.createElement(_eui.EuiTextColor, {
        className: "mgtAdvancedSettingsForm__unsavedCountMessage",
        color: "ghost"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "advancedSettings.form.countOfSettingsChanged",
        defaultMessage: "{unsavedCount} unsaved {unsavedCount, plural, one {setting} other {settings} }{hiddenCount, plural, =0 {} other {, # hidden} }",
        values: {
          unsavedCount: unsavedCount,
          hiddenCount: hiddenUnsavedCount
        }
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "renderBottomBar", function () {
      var areChangesInvalid = _this.areChangesInvalid();

      var bottomBarClasses = (0, _classnames.default)('mgtAdvancedSettingsForm__bottomBar', {
        'mgtAdvancedSettingsForm__bottomBar--pushForNav': localStorage.getItem(NAV_IS_LOCKED_KEY) === 'true'
      });
      return _react.default.createElement(_eui.EuiBottomBar, {
        className: bottomBarClasses,
        "data-test-subj": "advancedSetting-bottomBar"
      }, _react.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceBetween",
        alignItems: "center",
        responsive: false,
        gutterSize: "s"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false,
        className: "mgtAdvancedSettingsForm__unsavedCount"
      }, _react.default.createElement("p", {
        id: "aria-describedby.countOfUnsavedSettings"
      }, _this.renderCountOfUnsaved())), _react.default.createElement(_eui.EuiFlexItem, null), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        color: "ghost",
        size: "s",
        iconType: "cross",
        onClick: _this.clearAllUnsaved,
        "aria-describedby": "aria-describedby.countOfUnsavedSettings",
        "data-test-subj": "advancedSetting-cancelButton"
      }, _i18n.i18n.translate('advancedSettings.form.cancelButtonLabel', {
        defaultMessage: 'Cancel changes'
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiToolTip, {
        content: areChangesInvalid && _i18n.i18n.translate('advancedSettings.form.saveButtonTooltipWithInvalidChanges', {
          defaultMessage: 'Fix invalid settings before saving.'
        })
      }, _react.default.createElement(_eui.EuiButton, {
        className: "mgtAdvancedSettingsForm__button",
        disabled: areChangesInvalid,
        color: "secondary",
        fill: true,
        size: "s",
        iconType: "check",
        onClick: _this.saveAll,
        "aria-describedby": "aria-describedby.countOfUnsavedSettings",
        isLoading: _this.state.loading,
        "data-test-subj": "advancedSetting-saveButton"
      }, _i18n.i18n.translate('advancedSettings.form.saveButtonLabel', {
        defaultMessage: 'Save changes'
      }))))));
    });

    return _this;
  }

  _createClass(Form, [{
    key: "setLoading",
    value: function setLoading(loading) {
      this.setState({
        loading: loading
      });
    }
  }, {
    key: "renderClearQueryLink",
    value: function renderClearQueryLink(totalSettings, currentSettings) {
      var clearQuery = this.props.clearQuery;

      if (totalSettings !== currentSettings) {
        return _react.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react.default.createElement("em", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "advancedSettings.form.searchResultText",
          defaultMessage: "Search terms are hiding {settingsCount} settings {clearSearch}",
          values: {
            settingsCount: totalSettings - currentSettings,
            clearSearch: _react.default.createElement(_eui.EuiLink, {
              onClick: clearQuery
            }, _react.default.createElement("em", null, _react.default.createElement(_react2.FormattedMessage, {
              id: "advancedSettings.form.clearSearchResultText",
              defaultMessage: "(clear search)"
            })))
          }
        })));
      }

      return null;
    }
  }, {
    key: "renderCategory",
    value: function renderCategory(category, settings, totalSettings) {
      var _this2 = this;

      return _react.default.createElement(_react.Fragment, {
        key: category
      }, _react.default.createElement(_eui.EuiPanel, {
        paddingSize: "l"
      }, _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(_eui.EuiText, null, _react.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "baseline"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement("h2", null, (0, _lib.getCategoryName)(category))), this.renderClearQueryLink(totalSettings, settings.length))), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), settings.map(function (setting) {
        return _react.default.createElement(_field.Field, {
          key: setting.name,
          setting: setting,
          handleChange: _this2.handleChange,
          unsavedChanges: _this2.state.unsavedChanges[setting.name],
          clearChange: _this2.clearChange,
          enableSaving: _this2.props.enableSaving,
          dockLinks: _this2.props.dockLinks,
          toasts: _this2.props.toasts
        });
      }))), _react.default.createElement(_eui.EuiSpacer, {
        size: "l"
      }));
    }
  }, {
    key: "maybeRenderNoSettings",
    value: function maybeRenderNoSettings(clearQuery) {
      if (this.props.showNoResultsMessage) {
        return _react.default.createElement(_eui.EuiPanel, {
          paddingSize: "l"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "advancedSettings.form.noSearchResultText",
          defaultMessage: "No settings found {clearSearch}",
          values: {
            clearSearch: _react.default.createElement(_eui.EuiLink, {
              onClick: clearQuery
            }, _react.default.createElement(_react2.FormattedMessage, {
              id: "advancedSettings.form.clearNoSearchResultText",
              defaultMessage: "(clear search)"
            }))
          }
        }));
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var unsavedChanges = this.state.unsavedChanges;
      var _this$props = this.props,
          visibleSettings = _this$props.visibleSettings,
          categories = _this$props.categories,
          categoryCounts = _this$props.categoryCounts,
          clearQuery = _this$props.clearQuery;
      var currentCategories = [];
      categories.forEach(function (category) {
        if (visibleSettings[category] && visibleSettings[category].length) {
          currentCategories.push(category);
        }
      });
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", null, currentCategories.length ? currentCategories.map(function (category) {
        return _this3.renderCategory(category, visibleSettings[category], categoryCounts[category]);
      }) : this.maybeRenderNoSettings(clearQuery)), !(0, _lodash.isEmpty)(unsavedChanges) && this.renderBottomBar());
    }
  }]);

  return Form;
}(_react.PureComponent);

exports.Form = Form;