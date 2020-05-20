"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPdfUrl = getPdfUrl;
exports.createPdf = createPdf;

var _risonNode = _interopRequireDefault(require("rison-node"));

var _fetch = require("../../../../common/lib/fetch");

var _public = require("../../../../../../../../src/plugins/kibana_utils/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// type of the desired pdf output (print or preserve_layout)
var PDF_LAYOUT_TYPE = 'preserve_layout';

function getPdfUrlParts(_ref, _ref2, basePath) {
  var id = _ref.id,
      title = _ref.name,
      width = _ref.width,
      height = _ref.height;
  var pageCount = _ref2.pageCount;
  var reportingEntry = basePath.prepend('/api/reporting/generate');
  var urlPrefix = basePath.get().replace(basePath.serverBasePath, ''); // for Spaces prefix, which is included in basePath.get()

  var canvasEntry = "".concat(urlPrefix, "/app/canvas#"); // The viewport in Reporting by specifying the dimensions. In order for things to work,
  // we need a viewport that will include all of the pages in the workpad. The viewport
  // also needs to include any offset values from the 0,0 position, otherwise the cropped
  // screenshot that Reporting takes will be off the mark. Reporting will take a screenshot
  // of the entire viewport and then crop it down to the element that was asked for.
  // NOTE: while the above is true, the scaling seems to be broken. The export screen draws
  // pages at the 0,0 point, so the offset isn't currently required to get the correct
  // viewport size.
  // build a list of all page urls for exporting, they are captured one at a time

  var workpadUrls = [];

  for (var i = 1; i <= pageCount; i++) {
    workpadUrls.push(_risonNode.default.encode("".concat(canvasEntry, "/export/workpad/pdf/").concat(id, "/page/").concat(i)));
  }

  var jobParams = {
    browserTimezone: 'America/Phoenix',
    // TODO: get browser timezone, or Kibana setting?
    layout: {
      dimensions: {
        width: width,
        height: height
      },
      id: PDF_LAYOUT_TYPE
    },
    objectType: 'canvas workpad',
    relativeUrls: workpadUrls,
    title: title
  };
  return {
    createPdfUri: "".concat(reportingEntry, "/printablePdf"),
    createPdfPayload: {
      jobParams: _risonNode.default.encode(jobParams)
    }
  };
}

function getPdfUrl() {
  var urlParts = getPdfUrlParts.apply(void 0, arguments);

  var param = function param(key, val) {
    return _public.url.encodeUriQuery(key, true) + (val === true ? '' : '=' + _public.url.encodeUriQuery(val, true));
  };

  return "".concat(urlParts.createPdfUri, "?").concat(param('jobParams', urlParts.createPdfPayload.jobParams));
}

function createPdf() {
  var _getPdfUrlParts = getPdfUrlParts.apply(void 0, arguments),
      createPdfUri = _getPdfUrlParts.createPdfUri,
      createPdfPayload = _getPdfUrlParts.createPdfPayload;

  return _fetch.fetch.post(createPdfUri, createPdfPayload);
}