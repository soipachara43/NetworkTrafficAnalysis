"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmbeddableTypes = void 0;

var _constants = require("../../../maps/common/constants");

var _public = require("../../../../../../src/legacy/core_plugins/visualizations/public");

var _constants2 = require("../../../../../plugins/lens/common/constants");

var _constants3 = require("../../../../../../src/legacy/core_plugins/kibana/public/discover/np_ready/embeddable/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
const EmbeddableTypes = {
  lens: _constants2.LENS_EMBEDDABLE_TYPE,
  map: _constants.MAP_SAVED_OBJECT_TYPE,
  search: _constants3.SEARCH_EMBEDDABLE_TYPE,
  visualization: _public.VISUALIZE_EMBEDDABLE_TYPE
};
exports.EmbeddableTypes = EmbeddableTypes;