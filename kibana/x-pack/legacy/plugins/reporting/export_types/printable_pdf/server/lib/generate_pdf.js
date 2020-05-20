"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePdfObservableFactory = generatePdfObservableFactory;

var _lodash = require("lodash");

var _operators = require("rxjs/operators");

var _layouts = require("../../../common/layouts");

var _screenshots = require("../../../common/lib/screenshots");

var _pdf = require("./pdf");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore untyped module
const getTimeRange = urlScreenshots => {
  const grouped = (0, _lodash.groupBy)(urlScreenshots.map(u => u.timeRange));
  const values = Object.values(grouped);

  if (values.length === 1) {
    return values[0][0];
  }

  return null;
};

function generatePdfObservableFactory(server, browserDriverFactory) {
  const screenshotsObservable = (0, _screenshots.screenshotsObservableFactory)(server, browserDriverFactory);
  return function generatePdfObservable(logger, title, urls, browserTimezone, conditionalHeaders, layoutParams, logo) {
    const layout = (0, _layouts.createLayout)(server, layoutParams);
    const screenshots$ = screenshotsObservable({
      logger,
      urls,
      conditionalHeaders,
      layout,
      browserTimezone
    }).pipe((0, _operators.mergeMap)(async results => {
      const pdfOutput = _pdf.pdf.create(layout, logo);

      if (title) {
        const timeRange = getTimeRange(results);
        title += timeRange ? ` - ${timeRange.duration}` : '';
        pdfOutput.setTitle(title);
      }

      results.forEach(r => {
        r.screenshots.forEach(screenshot => {
          pdfOutput.addImage(screenshot.base64EncodedData, {
            title: screenshot.title,
            description: screenshot.description
          });
        });
      });
      pdfOutput.generate();
      return {
        buffer: await pdfOutput.getBuffer(),
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