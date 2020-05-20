"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMapsAppRegistered = isMapsAppRegistered;
exports.isFieldVisualizable = isFieldVisualizable;
exports.getMapsAppUrl = getMapsAppUrl;

var _v = _interopRequireDefault(require("uuid/v4"));

var _risonNode = _interopRequireDefault(require("rison-node"));

var _public = require("../../../../../../../../../plugins/data/public");

var _kibana_services = require("../../../../kibana_services");

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
// @ts-ignore
function getMapsAppBaseUrl() {
  var mapsAppVisAlias = (0, _kibana_services.getServices)().visualizations.getAliases().find(function (_ref) {
    var name = _ref.name;
    return name === 'maps';
  });
  return mapsAppVisAlias ? mapsAppVisAlias.aliasUrl : null;
}

function isMapsAppRegistered() {
  return (0, _kibana_services.getServices)().visualizations.getAliases().some(function (_ref2) {
    var name = _ref2.name;
    return name === 'maps';
  });
}

function isFieldVisualizable(field) {
  if ((field.type === _public.KBN_FIELD_TYPES.GEO_POINT || field.type === _public.KBN_FIELD_TYPES.GEO_SHAPE) && isMapsAppRegistered()) {
    return true;
  }

  return field.visualizable;
}

function getMapsAppUrl(field, indexPattern, appState, columns) {
  var mapAppParams = new URLSearchParams(); // Copy global state

  var locationSplit = window.location.href.split('discover?');

  if (locationSplit.length > 1) {
    var discoverParams = new URLSearchParams(locationSplit[1]);
    var globalStateUrlValue = discoverParams.get('_g');

    if (globalStateUrlValue) {
      mapAppParams.set('_g', globalStateUrlValue);
    }
  } // Copy filters and query in app state


  var mapsAppState = {
    filters: appState.filters || []
  };

  if (appState.query) {
    mapsAppState.query = appState.query;
  } // @ts-ignore


  mapAppParams.set('_a', _risonNode.default.encode(mapsAppState)); // create initial layer descriptor

  var hasColumns = columns && columns.length && columns[0] !== '_source';
  var supportsClustering = field.aggregatable;
  mapAppParams.set('initialLayers', // @ts-ignore
  _risonNode.default.encode_array([{
    id: (0, _v.default)(),
    label: indexPattern.title,
    sourceDescriptor: {
      id: (0, _v.default)(),
      type: 'ES_SEARCH',
      geoField: field.name,
      tooltipProperties: hasColumns ? columns : [],
      indexPatternId: indexPattern.id,
      scalingType: supportsClustering ? 'CLUSTERS' : 'LIMIT'
    },
    visible: true,
    type: supportsClustering ? 'BLENDED_VECTOR' : 'VECTOR'
  }]));
  return (0, _kibana_services.getServices)().addBasePath("".concat(getMapsAppBaseUrl(), "?").concat(mapAppParams.toString()));
}