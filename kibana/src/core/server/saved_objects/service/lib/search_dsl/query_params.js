"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryParams = getQueryParams;

var _server = require("../../../../../../plugins/data/server");

var _mappings = require("../../../mappings");

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
// eslint-disable-next-line @kbn/eslint/no-restricted-paths

/**
 * Gets the types based on the type. Uses mappings to support
 * null type (all types), a single type string or an array
 */
function getTypes(mappings, type) {
  if (!type) {
    return Object.keys((0, _mappings.getRootPropertiesObjects)(mappings));
  }

  if (Array.isArray(type)) {
    return type;
  }

  return [type];
}
/**
 *  Get the field params based on the types and searchFields
 */


function getFieldsForTypes(types, searchFields) {
  if (!searchFields || !searchFields.length) {
    return {
      lenient: true,
      fields: ['*']
    };
  }

  let fields = [];

  for (const field of searchFields) {
    fields = fields.concat(types.map(prefix => `${prefix}.${field}`));
  }

  return {
    fields
  };
}
/**
 *  Gets the clause that will filter for the type in the namespace.
 *  Some types are namespace agnostic, so they must be treated differently.
 */


function getClauseForType(registry, namespace, type) {
  if (namespace && !registry.isNamespaceAgnostic(type)) {
    return {
      bool: {
        must: [{
          term: {
            type
          }
        }, {
          term: {
            namespace
          }
        }]
      }
    };
  }

  return {
    bool: {
      must: [{
        term: {
          type
        }
      }],
      must_not: [{
        exists: {
          field: 'namespace'
        }
      }]
    }
  };
}

/**
 *  Get the "query" related keys for the search body
 */
function getQueryParams({
  mappings,
  registry,
  namespace,
  type,
  search,
  searchFields,
  defaultSearchOperator,
  hasReference,
  kueryNode
}) {
  const types = getTypes(mappings, type);
  const bool = {
    filter: [...(kueryNode != null ? [_server.esKuery.toElasticsearchQuery(kueryNode)] : []), {
      bool: {
        must: hasReference ? [{
          nested: {
            path: 'references',
            query: {
              bool: {
                must: [{
                  term: {
                    'references.id': hasReference.id
                  }
                }, {
                  term: {
                    'references.type': hasReference.type
                  }
                }]
              }
            }
          }
        }] : undefined,
        should: types.map(shouldType => getClauseForType(registry, namespace, shouldType)),
        minimum_should_match: 1
      }
    }]
  };

  if (search) {
    bool.must = [{
      simple_query_string: {
        query: search,
        ...getFieldsForTypes(types, searchFields),
        ...(defaultSearchOperator ? {
          default_operator: defaultSearchOperator
        } : {})
      }
    }];
  }

  return {
    query: {
      bool
    }
  };
}