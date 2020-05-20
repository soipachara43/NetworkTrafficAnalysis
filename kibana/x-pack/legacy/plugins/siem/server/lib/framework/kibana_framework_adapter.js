"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapRequest = wrapRequest;
exports.KibanaBackendFrameworkAdapter = void 0;

var GraphiQL = _interopRequireWildcard(require("apollo-server-module-graphiql"));

var _apolloServerCore = require("apollo-server-core");

var _configSchema = require("@kbn/config-schema");

var _server = require("../../../../../../../src/plugins/data/server");

var _types = require("./types");

var _utils = require("../detection_engine/routes/utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class KibanaBackendFrameworkAdapter {
  constructor(core, plugins, isProductionMode) {
    this.isProductionMode = isProductionMode;

    _defineProperty(this, "router", void 0);

    _defineProperty(this, "security", void 0);

    this.router = core.http.createRouter();
    this.security = plugins.security;
  }

  async callWithRequest(req, endpoint, // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params) {
    const {
      elasticsearch,
      uiSettings
    } = req.context.core;
    const includeFrozen = await uiSettings.client.get('search:includeFrozen');
    const maxConcurrentShardRequests = endpoint === 'msearch' ? await uiSettings.client.get('courier:maxConcurrentShardRequests') : 0;
    return elasticsearch.dataClient.callAsCurrentUser(endpoint, { ...params,
      ignore_throttled: !includeFrozen,
      ...(maxConcurrentShardRequests > 0 ? {
        max_concurrent_shard_requests: maxConcurrentShardRequests
      } : {})
    });
  }

  registerGraphQLEndpoint(routePath, schema) {
    this.router.post({
      path: routePath,
      validate: {
        body: _configSchema.schema.object({}, {
          unknowns: 'allow'
        })
      },
      options: {
        tags: ['access:siem']
      }
    }, async (context, request, response) => {
      try {
        const user = await this.getCurrentUserInfo(request);
        const gqlResponse = await (0, _apolloServerCore.runHttpQuery)([request], {
          method: 'POST',
          options: req => ({
            context: {
              req: wrapRequest(req, context, user)
            },
            schema
          }),
          query: request.body
        });
        return response.ok({
          body: gqlResponse,
          headers: {
            'content-type': 'application/json'
          }
        });
      } catch (error) {
        return this.handleError(error, response);
      }
    });

    if (!this.isProductionMode) {
      this.router.get({
        path: `${routePath}/graphiql`,
        validate: false,
        options: {
          tags: ['access:siem']
        }
      }, async (context, request, response) => {
        const graphiqlString = await GraphiQL.resolveGraphiQLString(request.query, {
          endpointURL: routePath,
          passHeader: "'kbn-xsrf': 'graphiql'"
        }, request);
        return response.ok({
          body: graphiqlString,
          headers: {
            'content-type': 'text/html'
          }
        });
      });
    }
  }

  async getCurrentUserInfo(request) {
    try {
      var _ref, _this$security;

      const user = (_ref = await ((_this$security = this.security) === null || _this$security === void 0 ? void 0 : _this$security.authc.getCurrentUser(request))) !== null && _ref !== void 0 ? _ref : null;
      return user;
    } catch {
      return null;
    }
  } // eslint-disable-next-line @typescript-eslint/no-explicit-any


  handleError(error, response) {
    const siemResponse = (0, _utils.buildSiemResponse)(response);

    if (error.name === 'HttpQueryError') {
      return siemResponse.error({
        statusCode: error.statusCode,
        headers: error.headers,
        body: error.message
      });
    }

    return siemResponse.error({
      statusCode: 500,
      body: error.message
    });
  }

  getIndexPatternsService(request) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const callCluster = async (endpoint, params) => this.callWithRequest(request, endpoint, { ...params,
      allowNoIndices: true
    });

    return new _server.IndexPatternsFetcher(callCluster);
  }

}

exports.KibanaBackendFrameworkAdapter = KibanaBackendFrameworkAdapter;

function wrapRequest(request, context, user) {
  return {
    [_types.internalFrameworkRequest]: request,
    body: request.body,
    context,
    user
  };
}