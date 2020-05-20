"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.transformValidateBulkError = exports.transformValidate = exports.transformValidateFindAlerts = void 0;

var _Either = require("fp-ts/lib/Either");

var _pipeable = require("fp-ts/lib/pipeable");

var _utils = require("../schemas/response/utils");

var _types = require("../../rules/types");

var _utils2 = require("../utils");

var _rules_schema = require("../schemas/response/rules_schema");

var _exact_check = require("../schemas/response/exact_check");

var _utils3 = require("./utils");

var _find_rules_schema = require("../schemas/response/find_rules_schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const transformValidateFindAlerts = (findResults, ruleActions, ruleStatuses) => {
  const transformed = (0, _utils3.transformFindAlerts)(findResults, ruleActions, ruleStatuses);

  if (transformed == null) {
    return [null, 'Internal error transforming'];
  } else {
    const decoded = _find_rules_schema.findRulesSchema.decode(transformed);

    const checked = (0, _exact_check.exactCheck)(transformed, decoded);

    const left = errors => (0, _utils.formatErrors)(errors);

    const right = () => [];

    const piped = (0, _pipeable.pipe)(checked, (0, _Either.fold)(left, right));

    if (piped.length === 0) {
      return [transformed, null];
    } else {
      return [null, piped.join(',')];
    }
  }
};

exports.transformValidateFindAlerts = transformValidateFindAlerts;

const transformValidate = (alert, ruleActions, ruleStatus) => {
  const transformed = (0, _utils3.transform)(alert, ruleActions, ruleStatus);

  if (transformed == null) {
    return [null, 'Internal error transforming'];
  } else {
    return validate(transformed, _rules_schema.rulesSchema);
  }
};

exports.transformValidate = transformValidate;

const transformValidateBulkError = (ruleId, alert, ruleActions, ruleStatus) => {
  if ((0, _types.isAlertType)(alert)) {
    if ((0, _types.isRuleStatusFindType)(ruleStatus) && (ruleStatus === null || ruleStatus === void 0 ? void 0 : ruleStatus.saved_objects.length) > 0) {
      var _ref;

      const transformed = (0, _utils3.transformAlertToRule)(alert, ruleActions, (_ref = ruleStatus === null || ruleStatus === void 0 ? void 0 : ruleStatus.saved_objects[0]) !== null && _ref !== void 0 ? _ref : ruleStatus);
      const [validated, errors] = validate(transformed, _rules_schema.rulesSchema);

      if (errors != null || validated == null) {
        return (0, _utils2.createBulkErrorObject)({
          ruleId,
          statusCode: 500,
          message: errors !== null && errors !== void 0 ? errors : 'Internal error transforming'
        });
      } else {
        return validated;
      }
    } else {
      const transformed = (0, _utils3.transformAlertToRule)(alert);
      const [validated, errors] = validate(transformed, _rules_schema.rulesSchema);

      if (errors != null || validated == null) {
        return (0, _utils2.createBulkErrorObject)({
          ruleId,
          statusCode: 500,
          message: errors !== null && errors !== void 0 ? errors : 'Internal error transforming'
        });
      } else {
        return validated;
      }
    }
  } else {
    return (0, _utils2.createBulkErrorObject)({
      ruleId,
      statusCode: 500,
      message: 'Internal error transforming'
    });
  }
};

exports.transformValidateBulkError = transformValidateBulkError;

const validate = (obj, schema) => {
  const decoded = schema.decode(obj);
  const checked = (0, _exact_check.exactCheck)(obj, decoded);

  const left = errors => [null, (0, _utils.formatErrors)(errors).join(',')];

  const right = output => [output, null];

  return (0, _pipeable.pipe)(checked, (0, _Either.fold)(left, right));
};

exports.validate = validate;