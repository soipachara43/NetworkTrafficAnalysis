"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectCustomCss = void 0;

var _i18n = require("@kbn/i18n");

var _fs = _interopRequireDefault(require("fs"));

var _util = require("util");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const fsp = {
  readFile: (0, _util.promisify)(_fs.default.readFile)
};

const injectCustomCss = async (browser, layout, logger) => {
  logger.debug(_i18n.i18n.translate('xpack.reporting.screencapture.injectingCss', {
    defaultMessage: 'injecting custom css'
  }));
  const filePath = layout.getCssOverridesPath();
  const buffer = await fsp.readFile(filePath);

  try {
    await browser.evaluate({
      fn: css => {
        const node = document.createElement('style');
        node.type = 'text/css';
        node.innerHTML = css; // eslint-disable-line no-unsanitized/property

        document.getElementsByTagName('head')[0].appendChild(node);
      },
      args: [buffer.toString()]
    }, {
      context: _constants.CONTEXT_INJECTCSS
    }, logger);
  } catch (err) {
    throw new Error(_i18n.i18n.translate('xpack.reporting.screencapture.injectCss', {
      defaultMessage: `An error occurred when trying to update Kibana CSS for reporting. {error}`,
      values: {
        error: err
      }
    }));
  }
};

exports.injectCustomCss = injectCustomCss;