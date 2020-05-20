"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionType = getActionType;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _field_mapping = require("../../pages/case/components/configure_cases/field_mapping");

var i18n = _interopRequireWildcard(require("./translations"));

var _validators = require("./validators");

var _config = require("./config");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var serviceNowDefinition = _config.connectors['.servicenow'];

function getActionType() {
  return {
    id: serviceNowDefinition.actionTypeId,
    iconClass: serviceNowDefinition.logo,
    selectMessage: i18n.SERVICENOW_DESC,
    actionTypeTitle: i18n.SERVICENOW_TITLE,
    validateConnector: function validateConnector(action) {
      var errors = {
        apiUrl: [],
        username: [],
        password: []
      };

      if (!action.config.apiUrl) {
        errors.apiUrl = [].concat(_toConsumableArray(errors.apiUrl), [i18n.SERVICENOW_API_URL_REQUIRED]);
      }

      if ((0, _validators.isUrlInvalid)(action.config.apiUrl)) {
        errors.apiUrl = [].concat(_toConsumableArray(errors.apiUrl), [i18n.SERVICENOW_API_URL_INVALID]);
      }

      if (!action.secrets.username) {
        errors.username = [].concat(_toConsumableArray(errors.username), [i18n.SERVICENOW_USERNAME_REQUIRED]);
      }

      if (!action.secrets.password) {
        errors.password = [].concat(_toConsumableArray(errors.password), [i18n.SERVICENOW_PASSWORD_REQUIRED]);
      }

      return {
        errors: errors
      };
    },
    validateParams: function validateParams(actionParams) {
      return {
        errors: {}
      };
    },
    actionConnectorFields: ServiceNowConnectorFields,
    actionParamsFields: ServiceNowParamsFields
  };
}

var ServiceNowConnectorFields = function ServiceNowConnectorFields(_ref) {
  var action = _ref.action,
      editActionConfig = _ref.editActionConfig,
      editActionSecrets = _ref.editActionSecrets,
      errors = _ref.errors;

  /* We do not provide defaults values to the fields (like empty string for apiUrl) intentionally.
   * If we do, errors will be shown the first time the flyout is open even though the user did not
   * interact with the form. Also, we would like to show errors for empty fields provided by the user.
  /*/
  var _action$config = action.config,
      apiUrl = _action$config.apiUrl,
      _action$config$casesC = _action$config.casesConfiguration;
  _action$config$casesC = _action$config$casesC === void 0 ? {} : _action$config$casesC;
  var _action$config$casesC2 = _action$config$casesC.mapping,
      mapping = _action$config$casesC2 === void 0 ? [] : _action$config$casesC2;
  var _action$secrets = action.secrets,
      username = _action$secrets.username,
      password = _action$secrets.password;
  var isApiUrlInvalid = errors.apiUrl.length > 0 && apiUrl != null;
  var isUsernameInvalid = errors.username.length > 0 && username != null;
  var isPasswordInvalid = errors.password.length > 0 && password != null;
  /**
   * We need to distinguish between the add flyout and the edit flyout.
   * useEffect will run only once on component mount.
   * This guarantees that the function below will run only once.
   * On the first render of the component the apiUrl can be either undefined or filled.
   * If it is filled then we are on the edit flyout. Otherwise we are on the add flyout.
   */

  (0, _react.useEffect)(function () {
    if (!(0, _fp.isEmpty)(apiUrl)) {
      editActionSecrets('username', '');
      editActionSecrets('password', '');
    }
  }, []);

  if ((0, _fp.isEmpty)(mapping)) {
    editActionConfig('casesConfiguration', _objectSpread({}, action.config.casesConfiguration, {
      mapping: _config.defaultMapping
    }));
  }

  var handleOnChangeActionConfig = (0, _react.useCallback)(function (key, evt) {
    return editActionConfig(key, evt.target.value);
  }, []);
  var handleOnBlurActionConfig = (0, _react.useCallback)(function (key) {
    if (key === 'apiUrl' && action.config[key] == null) {
      editActionConfig(key, '');
    }
  }, [action.config]);
  var handleOnChangeSecretConfig = (0, _react.useCallback)(function (key, evt) {
    return editActionSecrets(key, evt.target.value);
  }, []);
  var handleOnBlurSecretConfig = (0, _react.useCallback)(function (key) {
    if (['username', 'password'].includes(key) && (0, _fp.get)(key, action.secrets) == null) {
      editActionSecrets(key, '');
    }
  }, [action.secrets]);
  var handleOnChangeMappingConfig = (0, _react.useCallback)(function (newMapping) {
    return editActionConfig('casesConfiguration', _objectSpread({}, action.config.casesConfiguration, {
      mapping: newMapping
    }));
  }, [action.config]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    id: "apiUrl",
    fullWidth: true,
    error: errors.apiUrl,
    isInvalid: isApiUrlInvalid,
    label: i18n.SERVICENOW_API_URL_LABEL
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    isInvalid: isApiUrlInvalid,
    name: "apiUrl",
    value: apiUrl || '' // Needed to prevent uncontrolled input error when value is undefined
    ,
    "data-test-subj": "apiUrlFromInput",
    placeholder: "https://<instance>.service-now.com",
    onChange: handleOnChangeActionConfig.bind(null, 'apiUrl'),
    onBlur: handleOnBlurActionConfig.bind(null, 'apiUrl')
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    id: "connector-servicenow-username",
    fullWidth: true,
    error: errors.username,
    isInvalid: isUsernameInvalid,
    label: i18n.SERVICENOW_USERNAME_LABEL
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    isInvalid: isUsernameInvalid,
    name: "connector-servicenow-username",
    value: username || '' // Needed to prevent uncontrolled input error when value is undefined
    ,
    "data-test-subj": "usernameFromInput",
    onChange: handleOnChangeSecretConfig.bind(null, 'username'),
    onBlur: handleOnBlurSecretConfig.bind(null, 'username')
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    id: "connector-servicenow-password",
    fullWidth: true,
    error: errors.password,
    isInvalid: isPasswordInvalid,
    label: i18n.SERVICENOW_PASSWORD_LABEL
  }, _react.default.createElement(_eui.EuiFieldPassword, {
    fullWidth: true,
    isInvalid: isPasswordInvalid,
    name: "connector-servicenow-password",
    value: password || '' // Needed to prevent uncontrolled input error when value is undefined
    ,
    "data-test-subj": "passwordFromInput",
    onChange: handleOnChangeSecretConfig.bind(null, 'password'),
    onBlur: handleOnBlurSecretConfig.bind(null, 'password')
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_field_mapping.FieldMapping, {
    disabled: true,
    mapping: mapping,
    onChangeMapping: handleOnChangeMappingConfig
  }))));
};

var ServiceNowParamsFields = function ServiceNowParamsFields(_ref2) {
  var actionParams = _ref2.actionParams,
      editAction = _ref2.editAction,
      index = _ref2.index,
      errors = _ref2.errors;
  return null;
};