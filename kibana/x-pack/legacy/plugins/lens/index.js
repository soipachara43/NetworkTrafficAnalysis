"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lens = void 0;

var Joi = _interopRequireWildcard(require("joi"));

var _path = require("path");

var _mappings = _interopRequireDefault(require("./mappings.json"));

var _common = require("../../../plugins/lens/common");

var _migrations = require("./migrations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const lens = kibana => {
  return new kibana.Plugin({
    id: _common.PLUGIN_ID,
    configPrefix: `xpack.${_common.PLUGIN_ID}`,
    // task_manager could be required, but is only used for telemetry
    require: ['kibana', 'elasticsearch', 'xpack_main', 'interpreter'],
    publicDir: (0, _path.resolve)(__dirname, 'public'),
    uiExports: {
      app: {
        title: _common.NOT_INTERNATIONALIZED_PRODUCT_NAME,
        description: 'Explore and visualize data.',
        main: `plugins/${_common.PLUGIN_ID}/redirect`,
        listed: false
      },
      visualize: [`plugins/${_common.PLUGIN_ID}/legacy`],
      embeddableFactories: [`plugins/${_common.PLUGIN_ID}/legacy`],
      styleSheetPaths: (0, _path.resolve)(__dirname, 'public/index.scss'),
      mappings: _mappings.default,
      migrations: {
        lens: _migrations.migrations
      },
      savedObjectsManagement: {
        lens: {
          defaultSearchField: 'title',
          isImportableAndExportable: true,
          getTitle: obj => obj.attributes.title,
          getInAppUrl: obj => ({
            path: (0, _common.getEditPath)(obj.id),
            uiCapabilitiesPath: 'lens.show'
          })
        }
      }
    },
    config: () => {
      return Joi.object({
        enabled: Joi.boolean().default(true)
      }).default();
    }
  });
};

exports.lens = lens;