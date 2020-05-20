"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHitIterator = createHitIterator;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function parseResponse(request) {
  const response = await request;

  if (!response || !response._scroll_id) {
    throw new Error(_i18n.i18n.translate('xpack.reporting.exportTypes.csv.hitIterator.expectedScrollIdErrorMessage', {
      defaultMessage: 'Expected {scrollId} in the following Elasticsearch response: {response}',
      values: {
        response: JSON.stringify(response),
        scrollId: '_scroll_id'
      }
    }));
  }

  if (!response.hits) {
    throw new Error(_i18n.i18n.translate('xpack.reporting.exportTypes.csv.hitIterator.expectedHitsErrorMessage', {
      defaultMessage: 'Expected {hits} in the following Elasticsearch response: {response}',
      values: {
        response: JSON.stringify(response),
        hits: 'hits'
      }
    }));
  }

  return {
    scrollId: response._scroll_id,
    hits: response.hits.hits
  };
}

function createHitIterator(logger) {
  return async function* hitIterator(scrollSettings, callEndpoint, searchRequest, cancellationToken) {
    logger.debug('executing search request');

    function search(index, body) {
      return parseResponse(callEndpoint('search', {
        index,
        body,
        scroll: scrollSettings.duration,
        size: scrollSettings.size
      }));
    }

    function scroll(scrollId) {
      logger.debug('executing scroll request');
      return parseResponse(callEndpoint('scroll', {
        scrollId,
        scroll: scrollSettings.duration
      }));
    }

    function clearScroll(scrollId) {
      logger.debug('executing clearScroll request');
      return callEndpoint('clearScroll', {
        scrollId: [scrollId]
      });
    }

    try {
      let {
        scrollId,
        hits
      } = await search(searchRequest.index, searchRequest.body);

      try {
        while (hits && hits.length && !cancellationToken.isCancelled()) {
          for (const hit of hits) {
            yield hit;
          }

          ({
            scrollId,
            hits
          } = await scroll(scrollId));

          if (cancellationToken.isCancelled()) {
            logger.warning('Any remaining scrolling searches have been cancelled by the cancellation token.');
          }
        }
      } finally {
        await clearScroll(scrollId);
      }
    } catch (err) {
      logger.error(err);
      throw err;
    }
  };
}