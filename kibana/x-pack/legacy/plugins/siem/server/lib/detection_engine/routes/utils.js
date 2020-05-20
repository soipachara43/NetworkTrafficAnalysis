"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateLicenseForRuleType = exports.convertToSnakeCase = exports.buildSiemResponse = exports.SiemResponseFactory = exports.buildRouteValidation = exports.transformBulkError = exports.transformImportError = exports.createImportErrorObject = exports.createSuccessObject = exports.isImportRegular = exports.isBulkError = exports.createBulkErrorObject = exports.transformError = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _fp = require("lodash/fp");

var _i18n = require("@kbn/i18n");

var _constants = require("../../../../common/constants");

var _ml_helpers = require("../../../../common/detection_engine/ml_helpers");

var _bad_request_error = require("../errors/bad_request_error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const transformError = err => {
  if (_boom.default.isBoom(err)) {
    return {
      message: err.output.payload.message,
      statusCode: err.output.statusCode
    };
  } else {
    if (err.statusCode != null) {
      return {
        message: err.message,
        statusCode: err.statusCode
      };
    } else if (err instanceof _bad_request_error.BadRequestError) {
      // allows us to throw request validation errors in the absence of Boom
      return {
        message: err.message,
        statusCode: 400
      };
    } else {
      var _err$message;

      // natively return the err and allow the regular framework
      // to deal with the error when it is a non Boom
      return {
        message: (_err$message = err.message) !== null && _err$message !== void 0 ? _err$message : '(unknown error message)',
        statusCode: 500
      };
    }
  }
};

exports.transformError = transformError;

const createBulkErrorObject = ({
  ruleId,
  id,
  statusCode,
  message
}) => {
  if (id != null && ruleId != null) {
    return {
      id,
      rule_id: ruleId,
      error: {
        status_code: statusCode,
        message
      }
    };
  } else if (id != null) {
    return {
      id,
      error: {
        status_code: statusCode,
        message
      }
    };
  } else if (ruleId != null) {
    return {
      rule_id: ruleId,
      error: {
        status_code: statusCode,
        message
      }
    };
  } else {
    return {
      rule_id: '(unknown id)',
      error: {
        status_code: statusCode,
        message
      }
    };
  }
};

exports.createBulkErrorObject = createBulkErrorObject;

const isBulkError = importRuleResponse => {
  return (0, _fp.has)('error', importRuleResponse);
};

exports.isBulkError = isBulkError;

const isImportRegular = importRuleResponse => {
  return !(0, _fp.has)('error', importRuleResponse) && (0, _fp.has)('status_code', importRuleResponse);
};

exports.isImportRegular = isImportRegular;

const createSuccessObject = existingImportSuccessError => {
  return {
    success_count: existingImportSuccessError.success_count + 1,
    success: existingImportSuccessError.success,
    errors: existingImportSuccessError.errors
  };
};

exports.createSuccessObject = createSuccessObject;

const createImportErrorObject = ({
  ruleId,
  statusCode,
  message,
  existingImportSuccessError
}) => {
  return {
    success: false,
    errors: [...existingImportSuccessError.errors, createBulkErrorObject({
      ruleId,
      statusCode,
      message
    })],
    success_count: existingImportSuccessError.success_count
  };
};

exports.createImportErrorObject = createImportErrorObject;

const transformImportError = (ruleId, err, existingImportSuccessError) => {
  if (_boom.default.isBoom(err)) {
    return createImportErrorObject({
      ruleId,
      statusCode: err.output.statusCode,
      message: err.message,
      existingImportSuccessError
    });
  } else if (err instanceof _bad_request_error.BadRequestError) {
    return createImportErrorObject({
      ruleId,
      statusCode: 400,
      message: err.message,
      existingImportSuccessError
    });
  } else {
    var _err$statusCode;

    return createImportErrorObject({
      ruleId,
      statusCode: (_err$statusCode = err.statusCode) !== null && _err$statusCode !== void 0 ? _err$statusCode : 500,
      message: err.message,
      existingImportSuccessError
    });
  }
};

exports.transformImportError = transformImportError;

const transformBulkError = (ruleId, err) => {
  if (_boom.default.isBoom(err)) {
    return createBulkErrorObject({
      ruleId,
      statusCode: err.output.statusCode,
      message: err.message
    });
  } else if (err instanceof _bad_request_error.BadRequestError) {
    return createBulkErrorObject({
      ruleId,
      statusCode: 400,
      message: err.message
    });
  } else {
    var _err$statusCode2;

    return createBulkErrorObject({
      ruleId,
      statusCode: (_err$statusCode2 = err.statusCode) !== null && _err$statusCode2 !== void 0 ? _err$statusCode2 : 500,
      message: err.message
    });
  }
};

exports.transformBulkError = transformBulkError;

const buildRouteValidation = schema => (payload, {
  ok,
  badRequest
}) => {
  const {
    value,
    error
  } = schema.validate(payload);

  if (error) {
    return badRequest(error.message);
  }

  return ok(value);
};

exports.buildRouteValidation = buildRouteValidation;

const statusToErrorMessage = statusCode => {
  switch (statusCode) {
    case 400:
      return 'Bad Request';

    case 401:
      return 'Unauthorized';

    case 403:
      return 'Forbidden';

    case 404:
      return 'Not Found';

    case 409:
      return 'Conflict';

    case 500:
      return 'Internal Error';

    default:
      return '(unknown error)';
  }
};

class SiemResponseFactory {
  constructor(response) {
    this.response = response;
  }

  error({
    statusCode,
    body,
    headers
  }) {
    const contentType = {
      'content-type': 'application/json'
    };
    const defaultedHeaders = { ...contentType,
      ...(headers !== null && headers !== void 0 ? headers : {})
    };
    return this.response.custom({
      headers: defaultedHeaders,
      statusCode,
      body: Buffer.from(JSON.stringify({
        message: body !== null && body !== void 0 ? body : statusToErrorMessage(statusCode),
        status_code: statusCode
      }))
    });
  }

}

exports.SiemResponseFactory = SiemResponseFactory;

const buildSiemResponse = response => new SiemResponseFactory(response);

exports.buildSiemResponse = buildSiemResponse;

const convertToSnakeCase = obj => {
  if (!obj) {
    return null;
  }

  return Object.keys(obj).reduce((acc, item) => {
    const newKey = (0, _fp.snakeCase)(item);
    return { ...acc,
      [newKey]: obj[item]
    };
  }, {});
};
/**
 * Checks the current Kibana License against the rule under operation.
 *
 * @param license ILicense representing the user license
 * @param ruleType the type of the current rule
 *
 * @throws BadRequestError if rule and license are incompatible
 */


exports.convertToSnakeCase = convertToSnakeCase;

const validateLicenseForRuleType = ({
  license,
  ruleType
}) => {
  if ((0, _ml_helpers.isMlRule)(ruleType) && !license.hasAtLeast(_constants.MINIMUM_ML_LICENSE)) {
    const message = _i18n.i18n.translate('xpack.siem.licensing.unsupportedMachineLearningMessage', {
      defaultMessage: 'Your license does not support machine learning. Please upgrade your license.'
    });

    throw new _bad_request_error.BadRequestError(message);
  }
};

exports.validateLicenseForRuleType = validateLicenseForRuleType;