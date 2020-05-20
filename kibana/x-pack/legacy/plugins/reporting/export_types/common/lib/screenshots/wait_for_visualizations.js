"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitForVisualizations = void 0;

var _i18n = require("@kbn/i18n");

var _constants = require("./constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getCompletedItemsCount = ({
  renderCompleteSelector
}) => {
  return document.querySelectorAll(renderCompleteSelector).length;
};
/*
 * 1. Wait for the visualization metadata to be found in the DOM
 * 2. Read the metadata for the number of visualization items
 * 3. Wait for the render complete event to be fired once for each item
 */


const waitForVisualizations = async (server, browser, itemsCount, layout, logger) => {
  const config = server.config();
  const {
    renderComplete: renderCompleteSelector
  } = layout.selectors;
  logger.debug(_i18n.i18n.translate('xpack.reporting.screencapture.waitingForRenderedElements', {
    defaultMessage: `waiting for {itemsCount} rendered elements to be in the DOM`,
    values: {
      itemsCount
    }
  }));

  try {
    await browser.waitFor({
      fn: getCompletedItemsCount,
      args: [{
        renderCompleteSelector
      }],
      toEqual: itemsCount,
      timeout: config.get('xpack.reporting.capture.timeouts.renderComplete')
    }, {
      context: _constants.CONTEXT_WAITFORELEMENTSTOBEINDOM
    }, logger);
    logger.debug(`found ${itemsCount} rendered elements in the DOM`);
  } catch (err) {
    throw new Error(_i18n.i18n.translate('xpack.reporting.screencapture.couldntFinishRendering', {
      defaultMessage: `An error occurred when trying to wait for {count} visualizations to finish rendering. You may need to increase '{configKey}'. {error}`,
      values: {
        count: itemsCount,
        configKey: 'xpack.reporting.capture.timeouts.renderComplete',
        error: err
      }
    }));
  }
};

exports.waitForVisualizations = waitForVisualizations;