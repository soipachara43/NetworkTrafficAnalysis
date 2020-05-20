"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LayerPanel = LayerPanel;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _change_indexpattern = require("./change_indexpattern");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function LayerPanel(_ref) {
  var state = _ref.state,
      layerId = _ref.layerId,
      onChangeIndexPattern = _ref.onChangeIndexPattern;
  var layer = state.layers[layerId];
  return _react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_change_indexpattern.ChangeIndexPattern, {
    "data-test-subj": "indexPattern-switcher",
    trigger: {
      label: state.indexPatterns[layer.indexPatternId].title,
      title: state.indexPatterns[layer.indexPatternId].title,
      'data-test-subj': 'lns_layerIndexPatternLabel',
      size: 'xs'
    },
    indexPatternId: layer.indexPatternId,
    indexPatternRefs: state.indexPatternRefs,
    onChangeIndexPattern: onChangeIndexPattern
  }));
}