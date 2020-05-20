"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeJobFactory = void 0;

var Rx = _interopRequireWildcard(require("rxjs"));

var _operators = require("rxjs/operators");

var _constants = require("../../../../common/constants");

var _execute_job = require("../../../common/execute_job/");

var _generate_pdf = require("../lib/generate_pdf");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const executeJobFactory = async function executeJobFactoryFn(reporting, server, elasticsearch, parentLogger) {
  const browserDriverFactory = await reporting.getBrowserDriverFactory();
  const generatePdfObservable = (0, _generate_pdf.generatePdfObservableFactory)(server, browserDriverFactory);
  const logger = parentLogger.clone([_constants.PDF_JOB_TYPE, 'execute']);
  return function executeJob(jobId, job, cancellationToken) {
    const jobLogger = logger.clone([jobId]);
    const process$ = Rx.of(1).pipe((0, _operators.mergeMap)(() => (0, _execute_job.decryptJobHeaders)({
      server,
      job,
      logger
    })), (0, _operators.map)(decryptedHeaders => (0, _execute_job.omitBlacklistedHeaders)({
      job,
      decryptedHeaders
    })), (0, _operators.map)(filteredHeaders => (0, _execute_job.getConditionalHeaders)({
      server,
      job,
      filteredHeaders
    })), (0, _operators.mergeMap)(conditionalHeaders => (0, _execute_job.getCustomLogo)({
      reporting,
      server,
      job,
      conditionalHeaders
    })), (0, _operators.mergeMap)(({
      logo,
      conditionalHeaders
    }) => {
      const urls = (0, _execute_job.getFullUrls)({
        server,
        job
      });
      const {
        browserTimezone,
        layout,
        title
      } = job;
      return generatePdfObservable(jobLogger, title, urls, browserTimezone, conditionalHeaders, layout, logo);
    }), (0, _operators.map)(({
      buffer,
      warnings
    }) => ({
      content_type: 'application/pdf',
      content: buffer.toString('base64'),
      size: buffer.byteLength,
      warnings
    })), (0, _operators.catchError)(err => {
      jobLogger.error(err);
      return Rx.throwError(err);
    }));
    const stop$ = Rx.fromEventPattern(cancellationToken.on);
    return process$.pipe((0, _operators.takeUntil)(stop$)).toPromise();
  };
};

exports.executeJobFactory = executeJobFactory;