"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrations = void 0;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function isLensSavedXY770(doc) {
  return doc.type === 'lens' && doc.attributes && doc.attributes.visualizationType === 'lnsXY';
}

const migrations = {
  '7.7.0': doc => {
    var _newDoc$attributes$st, _newDoc$attributes$st2, _ref, _newDoc$attributes$st3;

    const newDoc = (0, _lodash.cloneDeep)(doc);

    if (!isLensSavedXY770(newDoc)) {
      return newDoc;
    }

    const datasourceState = (_newDoc$attributes$st = newDoc.attributes.state) === null || _newDoc$attributes$st === void 0 ? void 0 : (_newDoc$attributes$st2 = _newDoc$attributes$st.datasourceStates) === null || _newDoc$attributes$st2 === void 0 ? void 0 : _newDoc$attributes$st2.indexpattern;
    const datasourceLayers = (_ref = datasourceState === null || datasourceState === void 0 ? void 0 : datasourceState.layers) !== null && _ref !== void 0 ? _ref : {};
    const xyState = (_newDoc$attributes$st3 = newDoc.attributes.state) === null || _newDoc$attributes$st3 === void 0 ? void 0 : _newDoc$attributes$st3.visualization;
    newDoc.attributes.state.visualization.layers = xyState.layers.map(layer => {
      const layerId = layer.layerId;
      const datasource = datasourceLayers[layerId];
      return { ...layer,
        xAccessor: (datasource === null || datasource === void 0 ? void 0 : datasource.columns[layer.xAccessor]) ? layer.xAccessor : undefined,
        splitAccessor: (datasource === null || datasource === void 0 ? void 0 : datasource.columns[layer.splitAccessor]) ? layer.splitAccessor : undefined,
        accessors: layer.accessors.filter(accessor => !!(datasource === null || datasource === void 0 ? void 0 : datasource.columns[accessor]))
      };
    });
    return newDoc;
  }
};
exports.migrations = migrations;