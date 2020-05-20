"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeRange = void 0;

var _constants = require("./constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getTimeRange = async (browser, layout, logger) => {
  logger.debug('getting timeRange');
  const timeRange = await browser.evaluate({
    fn: durationAttribute => {
      const durationElement = document.querySelector(`[${durationAttribute}]`);

      if (!durationElement) {
        return null;
      }

      const duration = durationElement.getAttribute(durationAttribute);

      if (!duration) {
        return null;
      }

      return {
        duration
      };
    },
    args: [layout.selectors.timefilterDurationAttribute]
  }, {
    context: _constants.CONTEXT_GETTIMERANGE
  }, logger);

  if (timeRange) {
    logger.info(`timeRange: ${timeRange.duration}`);
  } else {
    logger.debug('no timeRange');
  }

  return timeRange;
};

exports.getTimeRange = getTimeRange;