"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visualizationSavedObjectType = void 0;

var _visualization_migrations = require("./visualization_migrations");

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const visualizationSavedObjectType = {
  name: 'visualization',
  hidden: false,
  namespaceAgnostic: false,
  management: {
    icon: 'visualizeApp',
    defaultSearchField: 'title',
    importableAndExportable: true,

    getTitle(obj) {
      return obj.attributes.title;
    },

    getEditUrl(obj) {
      return `/management/kibana/objects/savedVisualizations/${encodeURIComponent(obj.id)}`;
    },

    getInAppUrl(obj) {
      return {
        path: `/app/kibana#/visualize/edit/${encodeURIComponent(obj.id)}`,
        uiCapabilitiesPath: 'visualize.show'
      };
    }

  },
  mappings: {
    properties: {
      description: {
        type: 'text'
      },
      kibanaSavedObjectMeta: {
        properties: {
          searchSourceJSON: {
            type: 'text'
          }
        }
      },
      savedSearchRefName: {
        type: 'keyword'
      },
      title: {
        type: 'text'
      },
      uiStateJSON: {
        type: 'text'
      },
      version: {
        type: 'integer'
      },
      visState: {
        type: 'text'
      }
    }
  },
  migrations: _visualization_migrations.visualizationSavedObjectTypeMigrations
};
exports.visualizationSavedObjectType = visualizationSavedObjectType;