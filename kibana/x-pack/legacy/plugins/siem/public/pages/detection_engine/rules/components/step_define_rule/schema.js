"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = void 0;

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../../../../../../../src/plugins/data/public");

var _ml_helpers = require("../../../../../../common/detection_engine/ml_helpers");

var _shared_imports = require("../../../../../shared_imports");

var _translations = require("./translations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var schema = {
  index: {
    type: _shared_imports.FIELD_TYPES.COMBO_BOX,
    label: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRule.fiedIndexPatternsLabel', {
      defaultMessage: 'Index patterns'
    }),
    helpText: _react.default.createElement(_eui.EuiText, {
      size: "xs"
    }, _translations.INDEX_HELPER_TEXT),
    validations: [{
      validator: function validator() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var formData = args[0].formData;
        var needsValidation = !(0, _ml_helpers.isMlRule)(formData.ruleType);

        if (!needsValidation) {
          return;
        }

        return _shared_imports.fieldValidators.emptyField(_i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.outputIndiceNameFieldRequiredError', {
          defaultMessage: 'A minimum of one index pattern is required.'
        })).apply(void 0, args);
      }
    }]
  },
  queryBar: {
    label: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.fieldQuerBarLabel', {
      defaultMessage: 'Custom query'
    }),
    validations: [{
      validator: function validator() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var _args$ = args[0],
            value = _args$.value,
            path = _args$.path,
            formData = _args$.formData;
        var _ref = value,
            query = _ref.query,
            filters = _ref.filters;
        var needsValidation = !(0, _ml_helpers.isMlRule)(formData.ruleType);

        if (!needsValidation) {
          return;
        }

        return (0, _fp.isEmpty)(query.query) && (0, _fp.isEmpty)(filters) ? {
          code: 'ERR_FIELD_MISSING',
          path: path,
          message: _translations.CUSTOM_QUERY_REQUIRED
        } : undefined;
      }
    }, {
      validator: function validator() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        var _args$2 = args[0],
            value = _args$2.value,
            path = _args$2.path,
            formData = _args$2.formData;
        var _ref2 = value,
            query = _ref2.query;
        var needsValidation = !(0, _ml_helpers.isMlRule)(formData.ruleType);

        if (!needsValidation) {
          return;
        }

        if (!(0, _fp.isEmpty)(query.query) && query.language === 'kuery') {
          try {
            _public.esKuery.fromKueryExpression(query.query);
          } catch (err) {
            return {
              code: 'ERR_FIELD_FORMAT',
              path: path,
              message: _translations.INVALID_CUSTOM_QUERY
            };
          }
        }
      }
    }]
  },
  ruleType: {
    label: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.fieldRuleTypeLabel', {
      defaultMessage: 'Rule type'
    }),
    validations: []
  },
  anomalyThreshold: {
    label: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.fieldAnomalyThresholdLabel', {
      defaultMessage: 'Anomaly score threshold'
    }),
    validations: []
  },
  machineLearningJobId: {
    label: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.fieldMachineLearningJobIdLabel', {
      defaultMessage: 'Machine Learning job'
    }),
    validations: [{
      validator: function validator() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        var formData = args[0].formData;
        var needsValidation = (0, _ml_helpers.isMlRule)(formData.ruleType);

        if (!needsValidation) {
          return;
        }

        return _shared_imports.fieldValidators.emptyField(_i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.machineLearningJobIdRequired', {
          defaultMessage: 'A Machine Learning job is required.'
        })).apply(void 0, args);
      }
    }]
  },
  timeline: {
    label: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRule.fieldTimelineTemplateLabel', {
      defaultMessage: 'Timeline template'
    }),
    helpText: _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRule.fieldTimelineTemplateHelpText', {
      defaultMessage: 'Select an existing timeline to use as a template when investigating generated signals.'
    })
  }
};
exports.schema = schema;