"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHandler = void 0;

var url = _interopRequireWildcard(require("url"));

var _lodash = require("lodash");

var _lib = require("../../../../lib");

var _router = require("../../../../../../../core/server/http/router");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
// TODO: find a better way to get information from the request like remoteAddress and remotePort
// for forwarding.
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
function toURL(base, path) {
  const urlResult = new url.URL(`${(0, _lodash.trimRight)(base, '/')}/${(0, _lodash.trimLeft)(path, '/')}`); // Appending pretty here to have Elasticsearch do the JSON formatting, as doing
  // in JS can lead to data loss (7.0 will get munged into 7, thus losing indication of
  // measurement precision)

  if (!urlResult.searchParams.get('pretty')) {
    urlResult.searchParams.append('pretty', 'true');
  }

  return urlResult;
}

function filterHeaders(originalHeaders, headersToKeep) {
  const normalizeHeader = function (header) {
    if (!header) {
      return '';
    }

    header = header.toString();
    return header.trim().toLowerCase();
  }; // Normalize list of headers we want to allow in upstream request


  const headersToKeepNormalized = headersToKeep.map(normalizeHeader);
  return (0, _lodash.pick)(originalHeaders, headersToKeepNormalized);
}

function getRequestConfig(headers, esConfig, proxyConfigCollection, uri) {
  const filteredHeaders = filterHeaders(headers, esConfig.requestHeadersWhitelist);
  const newHeaders = (0, _lib.setHeaders)(filteredHeaders, esConfig.customHeaders);

  if (proxyConfigCollection.hasConfig()) {
    return { ...proxyConfigCollection.configForUri(uri),
      headers: newHeaders
    };
  }

  return { ...(0, _lib.getElasticsearchProxyConfig)(esConfig),
    headers: newHeaders
  };
}

function getProxyHeaders(req) {
  var _req$info, _req$info2;

  const headers = Object.create(null); // Scope this proto-unsafe functionality to where it is being used.

  function extendCommaList(obj, property, value) {
    obj[property] = (obj[property] ? obj[property] + ',' : '') + value;
  }

  const _req = (0, _router.ensureRawRequest)(req);

  if ((_req === null || _req === void 0 ? void 0 : (_req$info = _req.info) === null || _req$info === void 0 ? void 0 : _req$info.remotePort) && (_req === null || _req === void 0 ? void 0 : (_req$info2 = _req.info) === null || _req$info2 === void 0 ? void 0 : _req$info2.remoteAddress)) {
    // see https://git.io/vytQ7
    extendCommaList(headers, 'x-forwarded-for', _req.info.remoteAddress);
    extendCommaList(headers, 'x-forwarded-port', _req.info.remotePort);
    extendCommaList(headers, 'x-forwarded-proto', _req.server.info.protocol);
    extendCommaList(headers, 'x-forwarded-host', _req.info.host);
  }

  const contentType = req.headers['content-type'];

  if (contentType) {
    headers['content-type'] = contentType;
  }

  return headers;
}

const createHandler = ({
  log,
  readLegacyESConfig,
  pathFilters,
  proxyConfigCollection
}) => async (ctx, request, response) => {
  const {
    body,
    query
  } = request;
  const {
    path,
    method
  } = query;

  if (!pathFilters.some(re => re.test(path))) {
    return response.forbidden({
      body: `Error connecting to '${path}':\n\nUnable to send requests to that path.`,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }

  const legacyConfig = readLegacyESConfig();
  const {
    hosts
  } = legacyConfig;
  let esIncomingMessage;

  for (let idx = 0; idx < hosts.length; ++idx) {
    const host = hosts[idx];

    try {
      const uri = toURL(host, path); // Because this can technically be provided by a settings-defined proxy config, we need to
      // preserve these property names to maintain BWC.

      const {
        timeout,
        agent,
        headers,
        rejectUnauthorized
      } = getRequestConfig(request.headers, legacyConfig, proxyConfigCollection, uri.toString());
      const requestHeaders = { ...headers,
        ...getProxyHeaders(request)
      };
      esIncomingMessage = await (0, _lib.proxyRequest)({
        method: method.toLowerCase(),
        headers: requestHeaders,
        uri,
        timeout,
        payload: body,
        rejectUnauthorized,
        agent
      });
      break;
    } catch (e) {
      // If we reached here it means we hit a lower level network issue than just, for e.g., a 500.
      // We try contacting another node in that case.
      log.error(e);

      if (idx === hosts.length - 1) {
        log.warn(`Could not connect to any configured ES node [${hosts.join(', ')}]`);
        return response.customError({
          statusCode: 502,
          body: e
        });
      } // Otherwise, try the next host...

    }
  }

  const {
    statusCode,
    statusMessage,
    headers: {
      warning
    }
  } = esIncomingMessage;

  if (method.toUpperCase() !== 'HEAD') {
    return response.custom({
      statusCode: statusCode,
      body: esIncomingMessage,
      headers: {
        warning: warning || ''
      }
    });
  }

  return response.custom({
    statusCode: statusCode,
    body: `${statusCode} - ${statusMessage}`,
    headers: {
      warning: warning || '',
      'Content-Type': 'text/plain'
    }
  });
};

exports.createHandler = createHandler;