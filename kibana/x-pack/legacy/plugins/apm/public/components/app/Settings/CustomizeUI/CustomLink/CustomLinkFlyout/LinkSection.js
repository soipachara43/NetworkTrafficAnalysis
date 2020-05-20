"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkSection = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _Documentation = require("./Documentation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LinkSection = function LinkSection(_ref) {
  var label = _ref.label,
      onChangeLabel = _ref.onChangeLabel,
      url = _ref.url,
      onChangeUrl = _ref.onChangeUrl;
  var inputFields = [{
    name: 'label',
    label: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyout.link.label', {
      defaultMessage: 'Label'
    }),
    helpText: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyout.link.label.helpText', {
      defaultMessage: 'This is the label shown in the actions context menu. Keep it as short as possible.'
    }),
    placeholder: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyout.link.label.placeholder', {
      defaultMessage: 'e.g. Support tickets'
    }),
    value: label,
    onChange: onChangeLabel
  }, {
    name: 'url',
    label: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyout.link.url', {
      defaultMessage: 'URL'
    }),
    helpText: _react.default.createElement(_react.default.Fragment, null, _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyout.link.url.helpText', {
      defaultMessage: 'Add field name variables to your URL to apply values e.g. {sample}.',
      values: {
        sample: '{{trace.id}}'
      }
    }), ' ', _react.default.createElement(_Documentation.Documentation, {
      label: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyout.link.url.doc', {
        defaultMessage: 'Learn more in the docs.'
      })
    })),
    placeholder: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyout.link.url.placeholder', {
      defaultMessage: 'e.g. https://www.elastic.co/'
    }),
    value: url,
    onChange: onChangeUrl
  }];
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyout.action.title', {
    defaultMessage: 'Link'
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), inputFields.map(function (field) {
    return _react.default.createElement(_eui.EuiFormRow, {
      fullWidth: true,
      key: field.name,
      label: field.label,
      helpText: field.helpText,
      labelAppend: _react.default.createElement(_eui.EuiText, {
        size: "xs"
      }, _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyout.required', {
        defaultMessage: 'Required'
      }))
    }, _react.default.createElement(_eui.EuiFieldText, {
      placeholder: field.placeholder,
      name: field.name,
      fullWidth: true,
      value: field.value,
      onChange: function onChange(e) {
        return field.onChange(e.target.value);
      },
      "data-test-subj": field.name
    }));
  }));
};

exports.LinkSection = LinkSection;