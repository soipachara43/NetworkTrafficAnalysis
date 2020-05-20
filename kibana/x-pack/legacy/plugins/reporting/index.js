"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reporting = void 0;

var _i18n = require("@kbn/i18n");

var _path = require("path");

var _constants = require("./common/constants");

var _config = require("./config");

var _legacy = require("./server/legacy");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const kbToBase64Length = kb => {
  return Math.floor(kb * 1024 * 8 / 6);
};

const reporting = kibana => {
  return new kibana.Plugin({
    id: _constants.PLUGIN_ID,
    configPrefix: 'xpack.reporting',
    publicDir: (0, _path.resolve)(__dirname, 'public'),
    require: ['kibana', 'elasticsearch', 'xpack_main'],
    config: _config.config,
    uiExports: {
      uiSettingDefaults: {
        [_constants.UI_SETTINGS_CUSTOM_PDF_LOGO]: {
          name: _i18n.i18n.translate('xpack.reporting.pdfFooterImageLabel', {
            defaultMessage: 'PDF footer image'
          }),
          value: null,
          description: _i18n.i18n.translate('xpack.reporting.pdfFooterImageDescription', {
            defaultMessage: `Custom image to use in the PDF's footer`
          }),
          type: 'image',
          validation: {
            maxSize: {
              length: kbToBase64Length(200),
              description: '200 kB'
            }
          },
          category: [_constants.PLUGIN_ID]
        }
      }
    },

    async init(server) {
      return (0, _legacy.legacyInit)(server, this);
    },

    deprecations({
      unused
    }) {
      return [unused('capture.concurrency'), unused('capture.timeout'), unused('capture.settleTime'), unused('kibanaApp')];
    }

  });
};

exports.reporting = reporting;