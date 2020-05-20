"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createExportableType = exports.setupServer = void 0;

var _context = require("../../../context");

var _test_utils = require("../../../http/test_utils");

var _mocks = require("../../../mocks");

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
const coreId = Symbol('core');

const setupServer = async () => {
  const coreContext = (0, _test_utils.createCoreContext)({
    coreId
  });
  const contextService = new _context.ContextService(coreContext);
  const server = (0, _test_utils.createHttpServer)(coreContext);
  const httpSetup = await server.setup({
    context: contextService.setup({
      pluginDependencies: new Map()
    })
  });

  const handlerContext = _mocks.coreMock.createRequestHandlerContext();

  httpSetup.registerRouteHandlerContext(coreId, 'core', async (ctx, req, res) => {
    return handlerContext;
  });
  return {
    server,
    httpSetup,
    handlerContext
  };
};

exports.setupServer = setupServer;

const createExportableType = name => {
  return {
    name,
    hidden: false,
    namespaceAgnostic: false,
    mappings: {
      properties: {}
    },
    management: {
      importableAndExportable: true
    }
  };
};

exports.createExportableType = createExportableType;