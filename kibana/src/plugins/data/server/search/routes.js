"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerSearchRoute = registerSearchRoute;

var _configSchema = require("@kbn/config-schema");

var _lib = require("../lib");

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
function registerSearchRoute(router) {
  router.post({
    path: '/internal/search/{strategy}',
    validate: {
      params: _configSchema.schema.object({
        strategy: _configSchema.schema.string()
      }),
      query: _configSchema.schema.object({}, {
        unknowns: 'allow'
      }),
      body: _configSchema.schema.object({}, {
        unknowns: 'allow'
      })
    }
  }, async (context, request, res) => {
    const searchRequest = request.body;
    const {
      strategy
    } = request.params;
    const signal = (0, _lib.getRequestAbortedSignal)(request.events.aborted$);

    try {
      const response = await context.search.search(searchRequest, {
        signal
      }, strategy);
      return res.ok({
        body: response
      });
    } catch (err) {
      var _err$body;

      return res.customError({
        statusCode: err.statusCode || 500,
        body: {
          message: err.message,
          attributes: {
            error: ((_err$body = err.body) === null || _err$body === void 0 ? void 0 : _err$body.error) || err.message
          }
        }
      });
    }
  });
  router.delete({
    path: '/internal/search/{strategy}/{id}',
    validate: {
      params: _configSchema.schema.object({
        strategy: _configSchema.schema.string(),
        id: _configSchema.schema.string()
      }),
      query: _configSchema.schema.object({}, {
        unknowns: 'allow'
      })
    }
  }, async (context, request, res) => {
    const {
      strategy,
      id
    } = request.params;

    try {
      await context.search.cancel(id, strategy);
      return res.ok();
    } catch (err) {
      return res.customError({
        statusCode: err.statusCode,
        body: {
          message: err.message,
          attributes: {
            error: err.body.error
          }
        }
      });
    }
  });
}