"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbstractSearchStrategy = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
 * ReqFacade is a regular KibanaRequest object extended with additional service
 * references to ensure backwards compatibility for existing integrations.
 *
 * This will be replaced by standard KibanaRequest and RequestContext objects in a later version.
 */
class AbstractSearchStrategy {
  constructor(server, callWithRequestFactory, SearchRequest) {
    _defineProperty(this, "getCallWithRequestInstance", void 0);

    _defineProperty(this, "getSearchRequest", void 0);

    this.getCallWithRequestInstance = req => callWithRequestFactory(server, req);

    this.getSearchRequest = req => {
      const callWithRequest = this.getCallWithRequestInstance(req);
      return new SearchRequest(req, callWithRequest);
    };
  }

  async getFieldsForWildcard(req, indexPattern, capabilities) {
    const {
      indexPatternsService
    } = req.pre;
    return await indexPatternsService.getFieldsForWildcard({
      pattern: indexPattern
    });
  }

  checkForViability(req, indexPattern) {
    throw new TypeError('Must override method');
  }

}

exports.AbstractSearchStrategy = AbstractSearchStrategy;