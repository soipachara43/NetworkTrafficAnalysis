"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsPage = exports.SettingsPageComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _reactRedux = require("react-redux");

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _reactRouterDom = require("react-router-dom");

var _selectors = require("../state/selectors");

var _dynamic_settings = require("../state/actions/dynamic_settings");

var _runtime_types = require("../../common/runtime_types");

var _use_breadcrumbs = require("../hooks/use_breadcrumbs");

var _constants = require("../../common/constants");

var _public = require("../../../../../../src/plugins/kibana_react/public");

var _hooks = require("../hooks");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SettingsPageComponent = function SettingsPageComponent(_ref) {
  var _useKibana$services, _useKibana$services$a;

  var dss = _ref.dynamicSettingsState,
      dispatchGetDynamicSettings = _ref.dispatchGetDynamicSettings,
      dispatchSetDynamicSettings = _ref.dispatchSetDynamicSettings;

  var settingsBreadcrumbText = _i18n.i18n.translate('xpack.uptime.settingsBreadcrumbText', {
    defaultMessage: 'Settings'
  });

  (0, _use_breadcrumbs.useBreadcrumbs)([{
    text: settingsBreadcrumbText
  }]);
  (0, _hooks.useUptimeTelemetry)(_hooks.UptimePage.Settings);
  (0, _react.useEffect)(function () {
    dispatchGetDynamicSettings({});
  }, [dispatchGetDynamicSettings]);

  var _useState = (0, _react.useState)(dss.settings || null),
      _useState2 = _slicedToArray(_useState, 2),
      formFields = _useState2[0],
      setFormFields = _useState2[1];

  if (!dss.loadError && formFields == null && dss.settings) {
    setFormFields(_objectSpread({}, dss.settings));
  }

  var fieldErrors = formFields && {
    heartbeatIndices: formFields.heartbeatIndices.match(/^\S+$/) ? null : 'May not be blank'
  };
  var isFormValid = !(fieldErrors && Object.values(fieldErrors).find(function (v) {
    return !!v;
  }));

  var onChangeFormField = function onChangeFormField(field, value) {
    if (formFields) {
      formFields[field] = value;
      setFormFields(_objectSpread({}, formFields));
    }
  };

  var onApply = function onApply(event) {
    event.preventDefault();

    if (formFields) {
      dispatchSetDynamicSettings(formFields);
    }
  };

  var resetForm = function resetForm() {
    if (formFields && dss.settings) {
      setFormFields(_objectSpread({}, dss.settings));
    }
  };

  var isFormDirty = dss.settings ? !(0, _lodash.isEqual)(dss.settings, formFields) : true;
  var canEdit = !!((_useKibana$services = (0, _public.useKibana)().services) === null || _useKibana$services === void 0 ? void 0 : (_useKibana$services$a = _useKibana$services.application) === null || _useKibana$services$a === void 0 ? void 0 : _useKibana$services$a.capabilities.uptime.configureSettings) || false;
  var isFormDisabled = dss.loading || !canEdit;

  var editNoticeTitle = _i18n.i18n.translate('xpack.uptime.settings.cannotEditTitle', {
    defaultMessage: 'You do not have permission to edit settings.'
  });

  var editNoticeText = _i18n.i18n.translate('xpack.uptime.settings.cannotEditText', {
    defaultMessage: "Your user currently has 'Read' permissions for the Uptime app. Enable a permissions-level of 'All' to edit these settings."
  });

  var cannotEditNotice = canEdit ? null : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
    title: editNoticeTitle
  }, editNoticeText), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }));
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactRouterDom.Link, {
    to: _constants.OVERVIEW_ROUTE
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    color: "primary",
    iconType: "arrowLeft"
  }, _i18n.i18n.translate('xpack.uptime.settings.returnToOverviewLinkLabel', {
    defaultMessage: 'Return to overview'
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, cannotEditNotice)), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement("form", {
    onSubmit: onApply
  }, _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.sourceConfiguration.indicesSectionTitle",
    defaultMessage: "Indices"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement("h4", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.uptime.sourceConfiguration.heartbeatIndicesTitle",
      defaultMessage: "Uptime indices"
    })),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.uptime.sourceConfiguration.heartbeatIndicesDescription",
      defaultMessage: "Index pattern for matching indices that contain Heartbeat data"
    })
  }, _react.default.createElement(_eui.EuiFormRow, {
    describedByIds: ['heartbeatIndices'],
    error: fieldErrors === null || fieldErrors === void 0 ? void 0 : fieldErrors.heartbeatIndices,
    fullWidth: true,
    helpText: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.uptime.sourceConfiguration.heartbeatIndicesDefaultValue",
      defaultMessage: "The default value is {defaultValue}",
      values: {
        defaultValue: _react.default.createElement(_eui.EuiCode, null, _runtime_types.defaultDynamicSettings.heartbeatIndices)
      }
    }),
    isInvalid: !!(fieldErrors === null || fieldErrors === void 0 ? void 0 : fieldErrors.heartbeatIndices),
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.uptime.sourceConfiguration.heartbeatIndicesLabel",
      defaultMessage: "Heartbeat indices"
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    "data-test-subj": "heartbeat-indices-input-".concat(dss.loading ? 'loading' : 'loaded'),
    fullWidth: true,
    disabled: isFormDisabled,
    isLoading: dss.loading,
    value: (formFields === null || formFields === void 0 ? void 0 : formFields.heartbeatIndices) || '',
    onChange: function onChange(event) {
      return onChangeFormField('heartbeatIndices', event.currentTarget.value);
    }
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "discardSettingsButton",
    isDisabled: !isFormDirty || isFormDisabled,
    onClick: function onClick() {
      resetForm();
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.sourceConfiguration.discardSettingsButtonLabel",
    defaultMessage: "Cancel"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    "data-test-subj": "apply-settings-button",
    type: "submit",
    color: "primary",
    isDisabled: !isFormDirty || !isFormValid || isFormDisabled,
    fill: true
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.sourceConfiguration.applySettingsButtonLabel",
    defaultMessage: "Apply changes"
  }))))))))));
};

exports.SettingsPageComponent = SettingsPageComponent;

var mapStateToProps = function mapStateToProps(state) {
  return {
    dynamicSettingsState: (0, _selectors.selectDynamicSettings)(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatchGetDynamicSettings: function dispatchGetDynamicSettings() {
      return dispatch((0, _dynamic_settings.getDynamicSettings)({}));
    },
    dispatchSetDynamicSettings: function dispatchSetDynamicSettings(settings) {
      return dispatch((0, _dynamic_settings.setDynamicSettings)(settings));
    }
  };
};

var SettingsPage = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SettingsPageComponent);
exports.SettingsPage = SettingsPage;