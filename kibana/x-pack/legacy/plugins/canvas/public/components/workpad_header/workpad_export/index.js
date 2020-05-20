"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkpadExport = void 0;

var _reactRedux = require("react-redux");

var _recompose = require("recompose");

var _public = require("../../../../../../../plugins/reporting/public");

var _workpad = require("../../../state/selectors/workpad");

var _notify = require("../../../lib/notify");

var _get_window = require("../../../lib/get_window");

var _download_workpad = require("../../../lib/download_workpad");

var _workpad_export = require("./workpad_export");

var _utils = require("./utils");

var _public2 = require("../../../../../../../../src/plugins/kibana_react/public/");

var _i18n = require("../../../../i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore Untyped local
// @ts-ignore Untyped local
// @ts-ignore Untyped local
var strings = _i18n.ComponentStrings.WorkpadHeaderWorkpadExport;

var mapStateToProps = function mapStateToProps(state) {
  return {
    workpad: (0, _workpad.getWorkpad)(state),
    pageCount: (0, _workpad.getPages)(state).length
  };
};

var getAbsoluteUrl = function getAbsoluteUrl(path) {
  var _getWindow = (0, _get_window.getWindow)(),
      location = _getWindow.location;

  if (!location) {
    return path;
  } // fallback for mocked window object


  var protocol = location.protocol,
      hostname = location.hostname,
      port = location.port;
  return "".concat(protocol, "//").concat(hostname, ":").concat(port).concat(path);
};

var WorkpadExport = (0, _recompose.compose)((0, _reactRedux.connect)(mapStateToProps), _public2.withKibana, (0, _recompose.withProps)(function (_ref) {
  var workpad = _ref.workpad,
      pageCount = _ref.pageCount,
      kibana = _ref.kibana;
  return {
    getExportUrl: function getExportUrl(type) {
      if (type === 'pdf') {
        var pdfUrl = (0, _utils.getPdfUrl)(workpad, {
          pageCount: pageCount
        }, kibana.services.http.basePath);
        return getAbsoluteUrl(pdfUrl);
      }

      throw new Error(strings.getUnknownExportErrorMessage(type));
    },
    onCopy: function onCopy(type) {
      switch (type) {
        case 'pdf':
          _notify.notify.info(strings.getCopyPDFMessage());

          break;

        case 'reportingConfig':
          _notify.notify.info(strings.getCopyReportingConfigMessage());

          break;

        default:
          throw new Error(strings.getUnknownExportErrorMessage(type));
      }
    },
    onExport: function onExport(type) {
      switch (type) {
        case 'pdf':
          return (0, _utils.createPdf)(workpad, {
            pageCount: pageCount
          }, kibana.services.http.basePath).then(function (_ref2) {
            var data = _ref2.data;

            _notify.notify.info(strings.getExportPDFMessage(), {
              title: strings.getExportPDFTitle(workpad.name)
            }); // register the job so a completion notification shows up when it's ready


            _public.jobCompletionNotifications.add(data.job.id);
          }).catch(function (err) {
            _notify.notify.error(err, {
              title: strings.getExportPDFErrorTitle(workpad.name)
            });
          });

        case 'json':
          (0, _download_workpad.downloadWorkpad)(workpad.id);
          return;

        default:
          throw new Error(strings.getUnknownExportErrorMessage(type));
      }
    }
  };
}))(_workpad_export.WorkpadExport);
exports.WorkpadExport = WorkpadExport;