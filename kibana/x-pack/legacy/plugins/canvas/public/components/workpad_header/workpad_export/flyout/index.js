"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShareWebsiteFlyout = void 0;

var _reactRedux = require("react-redux");

var _recompose = require("recompose");

var _workpad = require("../../../../state/selectors/workpad");

var _notify = require("../../../../lib/notify");

var _download_workpad = require("../../../../lib/download_workpad");

var _share_website_flyout = require("./share_website_flyout");

var _fetch = require("../../../../../common/lib/fetch");

var _constants = require("../../../../../common/lib/constants");

var _supported_renderers = require("../../../../../shareable_runtime/supported_renderers");

var _components = require("../../../../../i18n/components");

var _public = require("../../../../../../../../../src/plugins/kibana_react/public/");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore Untyped local
// @ts-ignore Untyped local
// @ts-ignore Untyped local
// @ts-ignore Untyped local.
var strings = _components.ComponentStrings.WorkpadHeaderWorkpadExport;

var getUnsupportedRenderers = function getUnsupportedRenderers(state) {
  var renderers = [];
  var expressions = (0, _workpad.getRenderedWorkpadExpressions)(state);
  expressions.forEach(function (expression) {
    if (!_supported_renderers.renderFunctionNames.includes(expression)) {
      renderers.push(expression);
    }
  });
  return renderers;
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    renderedWorkpad: (0, _workpad.getRenderedWorkpad)(state),
    unsupportedRenderers: getUnsupportedRenderers(state),
    workpad: (0, _workpad.getWorkpad)(state)
  };
};

var ShareWebsiteFlyout = (0, _recompose.compose)((0, _reactRedux.connect)(mapStateToProps), _public.withKibana, (0, _recompose.withProps)(function (_ref) {
  var unsupportedRenderers = _ref.unsupportedRenderers,
      renderedWorkpad = _ref.renderedWorkpad,
      onClose = _ref.onClose,
      workpad = _ref.workpad,
      kibana = _ref.kibana;
  return {
    unsupportedRenderers: unsupportedRenderers,
    onClose: onClose,
    onCopy: function onCopy() {
      _notify.notify.info(strings.getCopyShareConfigMessage());
    },
    onDownload: function onDownload(type) {
      switch (type) {
        case 'share':
          (0, _download_workpad.downloadRenderedWorkpad)(renderedWorkpad);
          return;

        case 'shareRuntime':
          (0, _download_workpad.downloadRuntime)(kibana.services.http.basePath.get());
          return;

        case 'shareZip':
          var basePath = kibana.services.http.basePath.get();

          _fetch.arrayBufferFetch.post("".concat(basePath).concat(_constants.API_ROUTE_SHAREABLE_ZIP), JSON.stringify(renderedWorkpad)).then(function (blob) {
            return (0, _download_workpad.downloadZippedRuntime)(blob.data);
          }).catch(function (err) {
            _notify.notify.error(err, {
              title: strings.getShareableZipErrorTitle(workpad.name)
            });
          });

          return;

        default:
          throw new Error(strings.getUnknownExportErrorMessage(type));
      }
    }
  };
}))(_share_website_flyout.ShareWebsiteFlyout);
exports.ShareWebsiteFlyout = ShareWebsiteFlyout;