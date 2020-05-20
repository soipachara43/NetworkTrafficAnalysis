"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertTypesToLegacySchema = exports.convertLegacyTypes = void 0;

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

/**
 * Converts the legacy savedObjects mappings, schema, and migrations
 * to actual {@link SavedObjectsType | saved object types}
 */
const convertLegacyTypes = ({
  savedObjectMappings = [],
  savedObjectMigrations = {},
  savedObjectSchemas = {},
  savedObjectsManagement = {}
}, legacyConfig) => {
  return savedObjectMappings.reduce((types, {
    properties
  }) => {
    return [...types, ...Object.entries(properties).map(([type, mappings]) => {
      var _ref, _ref2;

      const schema = savedObjectSchemas[type];
      const migrations = savedObjectMigrations[type];
      const management = savedObjectsManagement[type];
      return {
        name: type,
        hidden: (_ref = schema === null || schema === void 0 ? void 0 : schema.hidden) !== null && _ref !== void 0 ? _ref : false,
        namespaceAgnostic: (_ref2 = schema === null || schema === void 0 ? void 0 : schema.isNamespaceAgnostic) !== null && _ref2 !== void 0 ? _ref2 : false,
        mappings,
        indexPattern: typeof (schema === null || schema === void 0 ? void 0 : schema.indexPattern) === 'function' ? schema.indexPattern(legacyConfig) : schema === null || schema === void 0 ? void 0 : schema.indexPattern,
        convertToAliasScript: schema === null || schema === void 0 ? void 0 : schema.convertToAliasScript,
        migrations: convertLegacyMigrations(migrations !== null && migrations !== void 0 ? migrations : {}),
        management: management ? convertLegacyTypeManagement(management) : undefined
      };
    })];
  }, []);
};
/**
 * Convert {@link SavedObjectsType | saved object types} to the legacy {@link SavedObjectsSchemaDefinition | schema} format
 */


exports.convertLegacyTypes = convertLegacyTypes;

const convertTypesToLegacySchema = types => {
  return types.reduce((schema, type) => {
    return { ...schema,
      [type.name]: {
        isNamespaceAgnostic: type.namespaceAgnostic,
        hidden: type.hidden,
        indexPattern: type.indexPattern,
        convertToAliasScript: type.convertToAliasScript
      }
    };
  }, {});
};

exports.convertTypesToLegacySchema = convertTypesToLegacySchema;

const convertLegacyMigrations = legacyMigrations => {
  return Object.entries(legacyMigrations).reduce((migrated, [version, migrationFn]) => {
    return { ...migrated,
      [version]: (doc, context) => migrationFn(doc, context.log)
    };
  }, {});
};

const convertLegacyTypeManagement = legacyTypeManagement => {
  return {
    importableAndExportable: legacyTypeManagement.isImportableAndExportable,
    defaultSearchField: legacyTypeManagement.defaultSearchField,
    icon: legacyTypeManagement.icon,
    getTitle: legacyTypeManagement.getTitle,
    getEditUrl: legacyTypeManagement.getEditUrl,
    getInAppUrl: legacyTypeManagement.getInAppUrl
  };
};