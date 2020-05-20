"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgentConfigurationCreateEdit = AgentConfigurationCreateEdit;

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _history = require("../../../../../utils/history");

var _ServicePage = require("./ServicePage/ServicePage");

var _SettingsPage = require("./SettingsPage/SettingsPage");

var _url_helpers = require("../../../../shared/Links/url_helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getInitialNewConfig(existingConfig) {
  return {
    agent_name: existingConfig === null || existingConfig === void 0 ? void 0 : existingConfig.agent_name,
    service: (existingConfig === null || existingConfig === void 0 ? void 0 : existingConfig.service) || {},
    settings: (existingConfig === null || existingConfig === void 0 ? void 0 : existingConfig.settings) || {}
  };
}

function setPage(pageStep) {
  _history.history.push(_objectSpread({}, _history.history.location, {
    search: (0, _url_helpers.fromQuery)(_objectSpread({}, (0, _url_helpers.toQuery)(_history.history.location.search), {
      pageStep: pageStep
    }))
  }));
}

function getUnsavedChanges(_ref) {
  var newConfig = _ref.newConfig,
      existingConfig = _ref.existingConfig;
  return Object.fromEntries(Object.entries(newConfig.settings).filter(function (_ref2) {
    var _existingConfig$setti;

    var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        value = _ref3[1];

    var existingValue = existingConfig === null || existingConfig === void 0 ? void 0 : (_existingConfig$setti = existingConfig.settings) === null || _existingConfig$setti === void 0 ? void 0 : _existingConfig$setti[key]; // don't highlight changes that were added and removed

    if (value === '' && existingValue == null) {
      return false;
    }

    return existingValue !== value;
  }));
}

function AgentConfigurationCreateEdit(_ref4) {
  var pageStep = _ref4.pageStep,
      existingConfigResult = _ref4.existingConfigResult;
  var existingConfig = existingConfigResult === null || existingConfigResult === void 0 ? void 0 : existingConfigResult.data;
  var isEditMode = Boolean(existingConfigResult);

  var _useState = (0, _react.useState)(getInitialNewConfig(existingConfig)),
      _useState2 = _slicedToArray(_useState, 2),
      newConfig = _useState2[0],
      setNewConfig = _useState2[1];

  var resetSettings = (0, _react.useCallback)(function () {
    setNewConfig(function (_newConfig) {
      return _objectSpread({}, _newConfig, {
        settings: (existingConfig === null || existingConfig === void 0 ? void 0 : existingConfig.settings) || {}
      });
    });
  }, [existingConfig]); // update newConfig when existingConfig has loaded

  (0, _react.useEffect)(function () {
    setNewConfig(getInitialNewConfig(existingConfig));
  }, [existingConfig]);
  (0, _react.useEffect)(function () {
    // the user tried to edit the service of an existing config
    if (pageStep === 'choose-service-step' && isEditMode) {
      setPage('choose-settings-step');
    } // the user skipped the first step (select service)


    if (pageStep === 'choose-settings-step' && !isEditMode && (0, _lodash.isEmpty)(newConfig.service)) {
      setPage('choose-service-step');
    }
  }, [isEditMode, newConfig, pageStep]);
  var unsavedChanges = getUnsavedChanges({
    newConfig: newConfig,
    existingConfig: existingConfig
  });
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", null, isEditMode ? _i18n.i18n.translate('xpack.apm.agentConfig.editConfigTitle', {
    defaultMessage: 'Edit configuration'
  }) : _i18n.i18n.translate('xpack.apm.agentConfig.createConfigTitle', {
    defaultMessage: 'Create configuration'
  }))), _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _i18n.i18n.translate('xpack.apm.agentConfig.newConfig.description', {
    defaultMessage: "This allows you to fine-tune your agent configuration directly in\n        Kibana. Best of all, changes are automatically propagated to your APM\n        agents so there\u2019s no need to redeploy."
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), pageStep === 'choose-service-step' && _react.default.createElement(_ServicePage.ServicePage, {
    newConfig: newConfig,
    setNewConfig: setNewConfig,
    onClickNext: function onClickNext() {
      return setPage('choose-settings-step');
    }
  }), pageStep === 'choose-settings-step' && _react.default.createElement(_SettingsPage.SettingsPage, {
    status: existingConfigResult === null || existingConfigResult === void 0 ? void 0 : existingConfigResult.status,
    unsavedChanges: unsavedChanges,
    onClickEdit: function onClickEdit() {
      return setPage('choose-service-step');
    },
    newConfig: newConfig,
    setNewConfig: setNewConfig,
    resetSettings: resetSettings,
    isEditMode: isEditMode
  }));
}