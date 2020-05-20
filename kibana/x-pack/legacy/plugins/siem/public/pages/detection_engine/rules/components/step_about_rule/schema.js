"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = void 0;

var _i18n = require("@kbn/i18n");

var _shared_imports = require("../../../../../shared_imports");

var _helpers = require("../mitre/helpers");

var _optional_field_label = require("../optional_field_label");

var _helpers2 = require("./helpers");

var I18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var emptyField = _shared_imports.fieldValidators.emptyField;
var schema = {
  name: {
    type: _shared_imports.FIELD_TYPES.TEXT,
    label: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRule.fieldNameLabel', {
      defaultMessage: 'Name'
    }),
    validations: [{
      validator: emptyField(_i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRule.nameFieldRequiredError', {
        defaultMessage: 'A name is required.'
      }))
    }]
  },
  description: {
    type: _shared_imports.FIELD_TYPES.TEXTAREA,
    label: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRule.fieldDescriptionLabel', {
      defaultMessage: 'Description'
    }),
    validations: [{
      validator: emptyField(_i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRule.descriptionFieldRequiredError', {
        defaultMessage: 'A description is required.'
      }))
    }]
  },
  severity: {
    type: _shared_imports.FIELD_TYPES.SUPER_SELECT,
    label: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRule.fieldSeverityLabel', {
      defaultMessage: 'Severity'
    }),
    validations: [{
      validator: emptyField(_i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRule.severityFieldRequiredError', {
        defaultMessage: 'A severity is required.'
      }))
    }]
  },
  riskScore: {
    type: _shared_imports.FIELD_TYPES.RANGE,
    label: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRule.fieldRiskScoreLabel', {
      defaultMessage: 'Risk score'
    })
  },
  references: {
    label: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRule.fieldReferenceUrlsLabel', {
      defaultMessage: 'Reference URLs'
    }),
    labelAppend: _optional_field_label.OptionalFieldLabel,
    validations: [{
      validator: function validator() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var _args$ = args[0],
            value = _args$.value,
            path = _args$.path;
        var hasError = false;
        value.forEach(function (url) {
          if ((0, _helpers2.isUrlInvalid)(url)) {
            hasError = true;
          }
        });
        return hasError ? {
          code: 'ERR_FIELD_FORMAT',
          path: path,
          message: I18n.URL_FORMAT_INVALID
        } : undefined;
      }
    }]
  },
  falsePositives: {
    label: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRule.fieldFalsePositiveLabel', {
      defaultMessage: 'False positive examples'
    }),
    labelAppend: _optional_field_label.OptionalFieldLabel
  },
  threat: {
    label: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRule.fieldMitreThreatLabel', {
      defaultMessage: "MITRE ATT&CK\\u2122"
    }),
    labelAppend: _optional_field_label.OptionalFieldLabel,
    validations: [{
      validator: function validator() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var _args$2 = args[0],
            value = _args$2.value,
            path = _args$2.path;
        var hasError = false;
        value.forEach(function (v) {
          if ((0, _helpers.isMitreAttackInvalid)(v.tactic.name, v.technique)) {
            hasError = true;
          }
        });
        return hasError ? {
          code: 'ERR_FIELD_MISSING',
          path: path,
          message: I18n.CUSTOM_MITRE_ATTACK_TECHNIQUES_REQUIRED
        } : undefined;
      }
    }]
  },
  tags: {
    type: _shared_imports.FIELD_TYPES.COMBO_BOX,
    label: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRule.fieldTagsLabel', {
      defaultMessage: 'Tags'
    }),
    helpText: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRule.fieldTagsHelpText', {
      defaultMessage: 'Type one or more custom identifying tags for this rule. Press enter after each tag to begin a new one.'
    }),
    labelAppend: _optional_field_label.OptionalFieldLabel
  },
  note: {
    type: _shared_imports.FIELD_TYPES.TEXTAREA,
    label: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRule.guideLabel', {
      defaultMessage: 'Investigation guide'
    }),
    helpText: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRule.guideHelpText', {
      defaultMessage: 'Provide helpful information for analysts that are performing a signal investigation. This guide will appear on both the rule details page and in timelines created from signals generated by this rule.'
    }),
    labelAppend: _optional_field_label.OptionalFieldLabel
  }
};
exports.schema = schema;