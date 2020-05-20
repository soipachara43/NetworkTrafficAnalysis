"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conflictErrorRT = exports.forbiddenErrorRT = exports.badRequestErrorRT = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createErrorRuntimeType = (statusCode, errorCode, attributes) => rt.type({
  statusCode: rt.literal(statusCode),
  error: rt.literal(errorCode),
  message: rt.string,
  ...(!!attributes ? {
    attributes
  } : {})
});

const badRequestErrorRT = createErrorRuntimeType(400, 'Bad Request');
exports.badRequestErrorRT = badRequestErrorRT;
const forbiddenErrorRT = createErrorRuntimeType(403, 'Forbidden');
exports.forbiddenErrorRT = forbiddenErrorRT;
const conflictErrorRT = createErrorRuntimeType(409, 'Conflict');
exports.conflictErrorRT = conflictErrorRT;