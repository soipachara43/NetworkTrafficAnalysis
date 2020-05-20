"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePngObservableFactory = generatePngObservableFactory;

var _operators = require("rxjs/operators");

var _preserve_layout = require("../../../common/layouts/preserve_layout");

var _screenshots = require("../../../common/lib/screenshots");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function generatePngObservableFactory(server, browserDriverFactory) {
  const screenshotsObservable = (0, _screenshots.screenshotsObservableFactory)(server, browserDriverFactory);
  return function generatePngObservable(logger, url, browserTimezone, conditionalHeaders, layoutParams) {
    if (!layoutParams || !layoutParams.dimensions) {
      throw new Error(`LayoutParams.Dimensions is undefined.`);
    }

    const layout = new _preserve_layout.PreserveLayout(layoutParams.dimensions);
    const screenshots$ = screenshotsObservable({
      logger,
      urls: [url],
      conditionalHeaders,
      layout,
      browserTimezone
    }).pipe((0, _operators.map)(results => {
      return {
        buffer: results[0].screenshots[0].base64EncodedData,
        warnings: results.reduce((found, current) => {
          if (current.error) {
            found.push(current.error.message);
          }

          return found;
        }, [])
      };
    }));
    return screenshots$;
  };
}