"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.graph = void 0;

var _i18n = require("@kbn/i18n");

var _migrations = _interopRequireDefault(require("./migrations"));

var _mappings = _interopRequireDefault(require("./mappings.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
const graph = kibana => {
  return new kibana.Plugin({
    id: 'graph',
    configPrefix: 'xpack.graph',
    require: ['kibana', 'elasticsearch', 'xpack_main'],
    uiExports: {
      mappings: _mappings.default,
      migrations: _migrations.default
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
        canEditDrillDownUrls: Joi.boolean().default(true),
        savePolicy: Joi.string().valid(['config', 'configAndDataWithConsent', 'configAndData', 'none']).default('configAndData')
      }).default();
    },

    init(server) {
      server.plugins.xpack_main.registerFeature({
        id: 'graph',
        name: _i18n.i18n.translate('xpack.graph.featureRegistry.graphFeatureName', {
          defaultMessage: 'Graph'
        }),
        order: 1200,
        icon: 'graphApp',
        navLinkId: 'graph',
        app: ['graph', 'kibana'],
        catalogue: ['graph'],
        validLicenses: ['platinum', 'enterprise', 'trial'],
        privileges: {
          all: {
            app: ['graph', 'kibana'],
            catalogue: ['graph'],
            savedObject: {
              all: ['graph-workspace'],
              read: ['index-pattern']
            },
            ui: ['save', 'delete']
          },
          read: {
            app: ['graph', 'kibana'],
            catalogue: ['graph'],
            savedObject: {
              all: [],
              read: ['index-pattern', 'graph-workspace']
            },
            ui: []
          }
        }
      });
    }

  });
};

exports.graph = graph;