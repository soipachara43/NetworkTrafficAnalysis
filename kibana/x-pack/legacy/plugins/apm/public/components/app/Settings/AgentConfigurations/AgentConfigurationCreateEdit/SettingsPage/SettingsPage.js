"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsPage = SettingsPage;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _useFetcher = require("../../../../../../hooks/useFetcher");

var _history = require("../../../../../../utils/history");

var _setting_definitions = require("../../../../../../../../../../plugins/apm/common/agent_configuration/setting_definitions");

var _saveConfig = require("./saveConfig");

var _useApmPluginContext = require("../../../../../../hooks/useApmPluginContext");

var _public = require("../../../../../../../../../../plugins/observability/public");

var _SettingFormRow = require("./SettingFormRow");

var _all_option = require("../../../../../../../../../../plugins/apm/common/agent_configuration/all_option");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function removeEmpty(obj) {
  return Object.fromEntries(Object.entries(obj).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return v != null && v !== '';
  }));
}

function SettingsPage(_ref3) {
  var status = _ref3.status,
      unsavedChanges = _ref3.unsavedChanges,
      newConfig = _ref3.newConfig,
      setNewConfig = _ref3.setNewConfig,
      resetSettings = _ref3.resetSettings,
      isEditMode = _ref3.isEditMode,
      onClickEdit = _ref3.onClickEdit;
  // get a telemetry UI event tracker
  var trackApmEvent = (0, _public.useUiTracker)({
    app: 'apm'
  });
  var toasts = (0, _useApmPluginContext.useApmPluginContext)().core.notifications.toasts;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isSaving = _useState2[0],
      setIsSaving = _useState2[1];

  var unsavedChangesCount = Object.keys(unsavedChanges).length;
  var isLoading = status === _useFetcher.FETCH_STATUS.LOADING;
  var isFormValid = (0, _react.useMemo)(function () {
    return _setting_definitions.settingDefinitions // only validate settings that are not empty
    .filter(function (_ref4) {
      var key = _ref4.key;
      var value = newConfig.settings[key];
      return value != null && value !== '';
    }) // every setting must be valid for the form to be valid
    .every(function (def) {
      var value = newConfig.settings[def.key];
      return (0, _setting_definitions.isValid)(def, value);
    });
  }, [newConfig.settings]);

  var handleSubmitEvent =
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var config;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              trackApmEvent({
                metric: 'save_agent_configuration'
              });
              config = _objectSpread({}, newConfig, {
                settings: removeEmpty(newConfig.settings)
              });
              setIsSaving(true);
              _context.next = 5;
              return (0, _saveConfig.saveConfig)({
                config: config,
                isEditMode: isEditMode,
                toasts: toasts
              });

            case 5:
              setIsSaving(false); // go back to overview

              _history.history.push({
                pathname: '/settings/agent-configuration',
                search: _history.history.location.search
              });

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleSubmitEvent() {
      return _ref5.apply(this, arguments);
    };
  }();

  if (status === _useFetcher.FETCH_STATUS.FAILURE) {
    return _react.default.createElement(_eui.EuiCallOut, {
      title: _i18n.i18n.translate('xpack.apm.agentConfig.settingsPage.notFound.title', {
        defaultMessage: 'Sorry, there was an error'
      }),
      color: "danger",
      iconType: "alert"
    }, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.apm.agentConfig.settingsPage.notFound.message', {
      defaultMessage: 'The requested configuration does not exist'
    })));
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiForm, null, _react.default.createElement("form", {
    onKeyPress: function onKeyPress(e) {
      var didClickEnter = e.which === 13;

      if (didClickEnter && isFormValid) {
        e.preventDefault();
        handleSubmitEvent();
      }
    }
  }, _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "m"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h3", null, _i18n.i18n.translate('xpack.apm.agentConfig.chooseService.title', {
    defaultMessage: 'Choose service'
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiStat, {
    titleSize: "xs",
    title: isLoading ? '-' : (0, _all_option.getOptionLabel)(newConfig.service.name),
    description: _i18n.i18n.translate('xpack.apm.agentConfig.chooseService.service.name.label', {
      defaultMessage: 'Service name'
    })
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiStat, {
    titleSize: "xs",
    title: isLoading ? '-' : (0, _all_option.getOptionLabel)(newConfig.service.environment),
    description: _i18n.i18n.translate('xpack.apm.agentConfig.chooseService.service.environment.label', {
      defaultMessage: 'Environment'
    })
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, !isEditMode && _react.default.createElement(_eui.EuiButton, {
    onClick: onClickEdit,
    iconType: "pencil"
  }, _i18n.i18n.translate('xpack.apm.agentConfig.chooseService.editButton', {
    defaultMessage: 'Edit'
  }))))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "m"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h3", null, _i18n.i18n.translate('xpack.apm.agentConfig.settings.title', {
    defaultMessage: 'Configuration options'
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), isLoading ? _react.default.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "m"
  })) : renderSettings({
    unsavedChanges: unsavedChanges,
    newConfig: newConfig,
    setNewConfig: setNewConfig
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "xxl"
  }), unsavedChangesCount > 0 && _react.default.createElement(_eui.EuiBottomBar, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    style: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  }, _react.default.createElement(_eui.EuiHealth, {
    color: "warning"
  }), _react.default.createElement(_eui.EuiText, null, _i18n.i18n.translate('xpack.apm.unsavedChanges', {
    defaultMessage: '{unsavedChangesCount, plural, =0{0 unsaved changes} one {1 unsaved change} other {# unsaved changes}} ',
    values: {
      unsavedChangesCount: unsavedChangesCount
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    color: "ghost",
    onClick: resetSettings
  }, _i18n.i18n.translate('xpack.apm.agentConfig.settingsPage.discardChangesButton', {
    defaultMessage: 'Discard changes'
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    onClick: handleSubmitEvent,
    fill: true,
    isLoading: isSaving,
    isDisabled: !isFormValid,
    color: "secondary",
    iconType: "check"
  }, _i18n.i18n.translate('xpack.apm.agentConfig.settingsPage.saveButton', {
    defaultMessage: 'Save configuration'
  }))))))));
}

function renderSettings(_ref6) {
  var newConfig = _ref6.newConfig,
      unsavedChanges = _ref6.unsavedChanges,
      setNewConfig = _ref6.setNewConfig;
  return _setting_definitions.settingDefinitions // filter out agent specific items that are not applicable
  // to the selected service
  .filter((0, _setting_definitions.filterByAgent)(newConfig.agent_name)).map(function (setting) {
    return _react.default.createElement(_SettingFormRow.SettingFormRow, {
      isUnsaved: unsavedChanges.hasOwnProperty(setting.key),
      key: setting.key,
      setting: setting,
      value: newConfig.settings[setting.key],
      onChange: function onChange(key, value) {
        setNewConfig(function (prev) {
          return _objectSpread({}, prev, {
            settings: _objectSpread({}, prev.settings, _defineProperty({}, key, value))
          });
        });
      }
    });
  });
}