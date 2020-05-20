"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScreenshots = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getAsyncDurationLogger = logger => {
  return async (description, promise) => {
    const start = Date.now();
    const result = await promise;
    logger.debug(_i18n.i18n.translate('xpack.reporting.screencapture.asyncTook', {
      defaultMessage: '{description} took {took}ms',
      values: {
        description,
        took: Date.now() - start
      }
    }));
    return result;
  };
};

const getScreenshots = async (browser, elementsPositionAndAttributes, logger) => {
  logger.info(_i18n.i18n.translate('xpack.reporting.screencapture.takingScreenshots', {
    defaultMessage: `taking screenshots`
  }));
  const asyncDurationLogger = getAsyncDurationLogger(logger);
  const screenshots = [];

  for (let i = 0; i < elementsPositionAndAttributes.length; i++) {
    const item = elementsPositionAndAttributes[i];
    const base64EncodedData = await asyncDurationLogger(`screenshot #${i + 1}`, browser.screenshot(item.position));
    screenshots.push({
      base64EncodedData,
      title: item.attributes.title,
      description: item.attributes.description
    });
  }

  logger.info(_i18n.i18n.translate('xpack.reporting.screencapture.screenshotsTaken', {
    defaultMessage: `screenshots taken: {numScreenhots}`,
    values: {
      numScreenhots: screenshots.length
    }
  }));
  return screenshots;
};

exports.getScreenshots = getScreenshots;