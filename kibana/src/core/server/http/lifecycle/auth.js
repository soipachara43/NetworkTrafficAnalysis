"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adoptToHapiAuthFormat = adoptToHapiAuthFormat;
exports.AuthResultType = void 0;

var _router = require("../router");

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

/** @public */
let AuthResultType;
/** @public */

exports.AuthResultType = AuthResultType;

(function (AuthResultType) {
  AuthResultType["authenticated"] = "authenticated";
  AuthResultType["notHandled"] = "notHandled";
  AuthResultType["redirected"] = "redirected";
})(AuthResultType || (exports.AuthResultType = AuthResultType = {}));

const authResult = {
  authenticated(data = {}) {
    return {
      type: AuthResultType.authenticated,
      state: data.state,
      requestHeaders: data.requestHeaders,
      responseHeaders: data.responseHeaders
    };
  },

  notHandled() {
    return {
      type: AuthResultType.notHandled
    };
  },

  redirected(headers) {
    return {
      type: AuthResultType.redirected,
      headers
    };
  },

  isAuthenticated(result) {
    return (result === null || result === void 0 ? void 0 : result.type) === AuthResultType.authenticated;
  },

  isNotHandled(result) {
    return (result === null || result === void 0 ? void 0 : result.type) === AuthResultType.notHandled;
  },

  isRedirected(result) {
    return (result === null || result === void 0 ? void 0 : result.type) === AuthResultType.redirected;
  }

};
/**
 * Auth Headers map
 * @public
 */

const toolkit = {
  authenticated: authResult.authenticated,
  notHandled: authResult.notHandled,
  redirected: authResult.redirected
};
/**
 * See {@link AuthToolkit}.
 * @public
 */

/** @public */
function adoptToHapiAuthFormat(fn, log, onAuth = () => undefined) {
  return async function interceptAuth(request, responseToolkit) {
    const hapiResponseAdapter = new _router.HapiResponseAdapter(responseToolkit);

    const kibanaRequest = _router.KibanaRequest.from(request, undefined, false);

    try {
      const result = await fn(kibanaRequest, _router.lifecycleResponseFactory, toolkit);

      if ((0, _router.isKibanaResponse)(result)) {
        return hapiResponseAdapter.handle(result);
      }

      if (authResult.isAuthenticated(result)) {
        onAuth(request, {
          state: result.state,
          requestHeaders: result.requestHeaders,
          responseHeaders: result.responseHeaders
        });
        return responseToolkit.authenticated({
          credentials: result.state || {}
        });
      }

      if (authResult.isRedirected(result)) {
        // we cannot redirect a user when resources with optional auth requested
        if (kibanaRequest.route.options.authRequired === 'optional') {
          return responseToolkit.continue;
        }

        return hapiResponseAdapter.handle(_router.lifecycleResponseFactory.redirected({
          // hapi doesn't accept string[] as a valid header
          headers: result.headers
        }));
      }

      if (authResult.isNotHandled(result)) {
        if (kibanaRequest.route.options.authRequired === 'optional') {
          return responseToolkit.continue;
        }

        return hapiResponseAdapter.handle(_router.lifecycleResponseFactory.unauthorized());
      }

      throw new Error(`Unexpected result from Authenticate. Expected AuthResult or KibanaResponse, but given: ${result}.`);
    } catch (error) {
      log.error(error);
      return hapiResponseAdapter.toInternalError();
    }
  };
}