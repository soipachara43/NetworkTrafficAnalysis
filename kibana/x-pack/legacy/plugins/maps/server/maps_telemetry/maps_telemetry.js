"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildMapsTelemetry = buildMapsTelemetry;
exports.getMapsTelemetry = getMapsTelemetry;

var _lodash = _interopRequireDefault(require("lodash"));

var _constants = require("../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getUniqueLayerCounts(layerCountsList, mapsCount) {
  const uniqueLayerTypes = _lodash.default.uniq(_lodash.default.flatten(layerCountsList.map(lTypes => Object.keys(lTypes))));

  return uniqueLayerTypes.reduce((accu, type) => {
    const typeCounts = layerCountsList.reduce((tCountsAccu, tCounts) => {
      if (tCounts[type]) {
        tCountsAccu.push(tCounts[type]);
      }

      return tCountsAccu;
    }, []);

    const typeCountsSum = _lodash.default.sum(typeCounts);

    accu[type] = {
      min: typeCounts.length ? _lodash.default.min(typeCounts) : 0,
      max: typeCounts.length ? _lodash.default.max(typeCounts) : 0,
      avg: typeCountsSum ? typeCountsSum / mapsCount : 0
    };
    return accu;
  }, {});
}

function getIndexPatternsWithGeoFieldCount(indexPatterns) {
  const fieldLists = indexPatterns.map(indexPattern => indexPattern.attributes && indexPattern.attributes.fields ? JSON.parse(indexPattern.attributes.fields) : []);
  const fieldListsWithGeoFields = fieldLists.filter(fields => fields.some(field => field.type === _constants.ES_GEO_FIELD_TYPE.GEO_POINT || field.type === _constants.ES_GEO_FIELD_TYPE.GEO_SHAPE));
  return fieldListsWithGeoFields.length;
}

function buildMapsTelemetry({
  mapSavedObjects,
  indexPatternSavedObjects,
  settings
}) {
  const layerLists = mapSavedObjects.map(savedMapObject => savedMapObject.attributes && savedMapObject.attributes.layerListJSON ? JSON.parse(savedMapObject.attributes.layerListJSON) : []);
  const mapsCount = layerLists.length;
  const dataSourcesCount = layerLists.map(lList => {
    const sourceIdList = lList.map(layer => layer.sourceDescriptor.id);
    return _lodash.default.uniq(sourceIdList).length;
  });
  const layersCount = layerLists.map(lList => lList.length);
  const layerTypesCount = layerLists.map(lList => _lodash.default.countBy(lList, 'type')); // Count of EMS Vector layers used

  const emsLayersCount = layerLists.map(lList => (0, _lodash.default)(lList).countBy(layer => {
    const isEmsFile = _lodash.default.get(layer, 'sourceDescriptor.type') === _constants.EMS_FILE;

    return isEmsFile && _lodash.default.get(layer, 'sourceDescriptor.id');
  }).pick((val, key) => key !== 'false').value());

  const dataSourcesCountSum = _lodash.default.sum(dataSourcesCount);

  const layersCountSum = _lodash.default.sum(layersCount);

  const indexPatternsWithGeoFieldCount = getIndexPatternsWithGeoFieldCount(indexPatternSavedObjects);
  return {
    settings,
    indexPatternsWithGeoFieldCount,
    // Total count of maps
    mapsTotalCount: mapsCount,
    // Time of capture
    timeCaptured: new Date().toISOString(),
    attributesPerMap: {
      // Count of data sources per map
      dataSourcesCount: {
        min: dataSourcesCount.length ? _lodash.default.min(dataSourcesCount) : 0,
        max: dataSourcesCount.length ? _lodash.default.max(dataSourcesCount) : 0,
        avg: dataSourcesCountSum ? layersCountSum / mapsCount : 0
      },
      // Total count of layers per map
      layersCount: {
        min: layersCount.length ? _lodash.default.min(layersCount) : 0,
        max: layersCount.length ? _lodash.default.max(layersCount) : 0,
        avg: layersCountSum ? layersCountSum / mapsCount : 0
      },
      // Count of layers by type
      layerTypesCount: { ...getUniqueLayerCounts(layerTypesCount, mapsCount)
      },
      // Count of layer by EMS region
      emsVectorLayersCount: { ...getUniqueLayerCounts(emsLayersCount, mapsCount)
      }
    }
  };
}

async function getMapSavedObjects(savedObjectsClient) {
  const mapsSavedObjects = await savedObjectsClient.find({
    type: _constants.MAP_SAVED_OBJECT_TYPE
  });
  return _lodash.default.get(mapsSavedObjects, 'saved_objects', []);
}

async function getIndexPatternSavedObjects(savedObjectsClient) {
  const indexPatternSavedObjects = await savedObjectsClient.find({
    type: 'index-pattern'
  });
  return _lodash.default.get(indexPatternSavedObjects, 'saved_objects', []);
}

async function getMapsTelemetry(savedObjectsClient, config) {
  const mapSavedObjects = await getMapSavedObjects(savedObjectsClient);
  const indexPatternSavedObjects = await getIndexPatternSavedObjects(savedObjectsClient);
  const settings = {
    showMapVisualizationTypes: config().get('xpack.maps.showMapVisualizationTypes')
  };
  const mapsTelemetry = buildMapsTelemetry({
    mapSavedObjects,
    indexPatternSavedObjects,
    settings
  });
  return await savedObjectsClient.create(_constants.TELEMETRY_TYPE, mapsTelemetry, {
    id: _constants.TELEMETRY_TYPE,
    overwrite: true
  });
}