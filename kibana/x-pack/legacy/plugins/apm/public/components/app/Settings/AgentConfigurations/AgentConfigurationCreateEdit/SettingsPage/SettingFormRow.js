"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingFormRow = SettingFormRow;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _setting_definitions = require("../../../../../../../../../../plugins/apm/common/agent_configuration/setting_definitions");

var _amount_and_unit = require("../../../../../../../../../../plugins/apm/common/agent_configuration/amount_and_unit");

var _SelectWithPlaceholder = require("../../../../../shared/SelectWithPlaceholder");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function FormRow(_ref) {
  var setting = _ref.setting,
      value = _ref.value,
      _onChange = _ref.onChange;

  switch (setting.type) {
    case 'float':
    case 'text':
      {
        return _react.default.createElement(_eui.EuiFieldText, {
          placeholder: setting.placeholder,
          value: value || '',
          onChange: function onChange(e) {
            return _onChange(setting.key, e.target.value);
          }
        });
      }

    case 'integer':
      {
        return _react.default.createElement(_eui.EuiFieldNumber, {
          placeholder: setting.placeholder,
          value: value || '',
          min: setting.min,
          max: setting.max,
          onChange: function onChange(e) {
            return _onChange(setting.key, e.target.value);
          }
        });
      }

    case 'select':
      {
        return _react.default.createElement(_SelectWithPlaceholder.SelectWithPlaceholder, {
          placeholder: setting.placeholder,
          options: setting.options,
          value: value,
          onChange: function onChange(e) {
            return _onChange(setting.key, e.target.value);
          }
        });
      }

    case 'boolean':
      {
        return _react.default.createElement(_SelectWithPlaceholder.SelectWithPlaceholder, {
          placeholder: setting.placeholder,
          options: [{
            text: 'true',
            value: 'true'
          }, {
            text: 'false',
            value: 'false'
          }],
          value: value,
          onChange: function onChange(e) {
            return _onChange(setting.key, e.target.value);
          }
        });
      }

    case 'bytes':
    case 'duration':
      {
        var _setting$units;

        var _amountAndUnitToObjec = (0, _amount_and_unit.amountAndUnitToObject)(value !== null && value !== void 0 ? value : ''),
            amount = _amountAndUnitToObjec.amount,
            unit = _amountAndUnitToObjec.unit;

        return _react.default.createElement(_eui.EuiFlexGroup, {
          gutterSize: "s"
        }, _react.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react.default.createElement(_eui.EuiFieldNumber, {
          placeholder: setting.placeholder,
          value: amount,
          min: 'min' in setting ? setting.min : 1,
          onChange: function onChange(e) {
            return _onChange(setting.key, (0, _amount_and_unit.amountAndUnitToString)({
              amount: e.target.value,
              unit: unit
            }));
          }
        })), _react.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react.default.createElement(_SelectWithPlaceholder.SelectWithPlaceholder, {
          placeholder: _i18n.i18n.translate('xpack.apm.unitLabel', {
            defaultMessage: 'Select unit'
          }),
          value: unit,
          options: (_setting$units = setting.units) === null || _setting$units === void 0 ? void 0 : _setting$units.map(function (text) {
            return {
              text: text,
              value: text
            };
          }),
          onChange: function onChange(e) {
            return _onChange(setting.key, (0, _amount_and_unit.amountAndUnitToString)({
              amount: amount,
              unit: e.target.value
            }));
          }
        })));
      }

    default:
      throw new Error("Unknown type \"".concat(setting.type, "\""));
  }
}

function SettingFormRow(_ref2) {
  var isUnsaved = _ref2.isUnsaved,
      setting = _ref2.setting,
      value = _ref2.value,
      onChange = _ref2.onChange;
  var isInvalid = value != null && value !== '' && !(0, _setting_definitions.isValid)(setting, value);
  return _react.default.createElement(_eui.EuiDescribedFormGroup, {
    fullWidth: true,
    title: _react.default.createElement("h3", null, setting.label, ' ', isUnsaved && _react.default.createElement(_eui.EuiIconTip, {
      type: 'dot',
      color: 'warning',
      content: _i18n.i18n.translate('xpack.apm.agentConfig.unsavedSetting.tooltip', {
        defaultMessage: 'Unsaved'
      })
    })),
    description: _react.default.createElement(_react.default.Fragment, null, setting.description, setting.defaultValue && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiCode, null, "Default: ", setting.defaultValue)))
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: setting.key,
    error: setting.validationError,
    isInvalid: isInvalid
  }, _react.default.createElement(FormRow, {
    onChange: onChange,
    setting: setting,
    value: value
  })));
}