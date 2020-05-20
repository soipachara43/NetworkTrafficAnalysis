"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLegacyServerEndpoints = exports.createLegacyServerInterpreterApi = exports.registries = exports.FunctionsRegistry = exports.TypesRegistry = void 0;

var _common = require("@kbn/interpreter/common");

var _boom = _interopRequireDefault(require("boom"));

var _configSchema = require("@kbn/config-schema");

var _common2 = require("../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/* eslint-disable max-classes-per-file */
// TODO: Remove this file once https://github.com/elastic/kibana/issues/46906 is complete.
// @ts-ignore
class TypesRegistry extends _common.Registry {
  wrapper(obj) {
    return new _common2.ExpressionType(obj);
  }

}

exports.TypesRegistry = TypesRegistry;

class FunctionsRegistry extends _common.Registry {
  wrapper(obj) {
    return new _common.Fn(obj);
  }

}

exports.FunctionsRegistry = FunctionsRegistry;
const registries = {
  types: new TypesRegistry(),
  serverFunctions: new FunctionsRegistry()
};
exports.registries = registries;

const createLegacyServerInterpreterApi = () => {
  const api = (0, _common.registryFactory)(registries);
  (0, _common.register)(registries, {
    types: _common2.typeSpecs
  });
  return api;
};

exports.createLegacyServerInterpreterApi = createLegacyServerInterpreterApi;

const createLegacyServerEndpoints = (api, logger, core, plugins) => {
  const router = core.http.createRouter();
  /**
   * Register the endpoint that returns the list of server-only functions.
   */

  router.get({
    path: `/api/interpreter/fns`,
    validate: {
      body: _configSchema.schema.any()
    }
  }, async (context, request, response) => {
    const functions = api.registries().serverFunctions.toJS();
    const body = JSON.stringify(functions);
    return response.ok({
      body
    });
  });
  /**
   * Run a single Canvas function.
   *
   * @param {*} server - The Kibana server object
   * @param {*} handlers - The Canvas handlers
   * @param {*} fnCall - Describes the function being run `{ functionName, args, context }`
   */

  async function runFunction(handlers, fnCall) {
    const {
      functionName,
      args,
      context
    } = fnCall;
    const {
      deserialize
    } = (0, _common2.serializeProvider)(registries.types.toJS());
    const fnDef = registries.serverFunctions.toJS()[functionName];
    if (!fnDef) throw _boom.default.notFound(`Function "${functionName}" could not be found.`);
    const deserialized = deserialize(context);
    const result = fnDef.fn(deserialized, args, handlers);
    return result;
  }
  /**
   * Register an endpoint that executes a batch of functions, and streams the
   * results back using ND-JSON.
   */


  plugins.bfetch.addBatchProcessingRoute(`/api/interpreter/fns`, request => {
    const scopedClient = core.elasticsearch.dataClient.asScoped(request);
    const handlers = {
      environment: 'server',
      elasticsearchClient: async (endpoint, clientParams = {}, options) => scopedClient.callAsCurrentUser(endpoint, clientParams, options)
    };
    return {
      onBatchItem: async fnCall => {
        const result = await runFunction(handlers, fnCall);

        if (typeof result === 'undefined') {
          throw new Error(`Function ${fnCall.functionName} did not return anything.`);
        }

        return result;
      }
    };
  });
};

exports.createLegacyServerEndpoints = createLegacyServerEndpoints;