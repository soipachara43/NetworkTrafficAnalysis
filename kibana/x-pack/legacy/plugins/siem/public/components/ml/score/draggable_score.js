"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DraggableScore = exports.DraggableScoreComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _draggable_wrapper = require("../../drag_and_drop/draggable_wrapper");

var _data_provider = require("../../timeline/data_providers/data_provider");

var _provider = require("../../timeline/data_providers/provider");

var _page = require("../../page");

var _score_health = require("./score_health");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DraggableScoreComponent = function DraggableScoreComponent(_ref) {
  var id = _ref.id,
      _ref$index = _ref.index,
      index = _ref$index === void 0 ? 0 : _ref$index,
      score = _ref.score;
  var scoreString = (0, _score_health.getScoreString)(score.severity);
  return _react.default.createElement(_draggable_wrapper.DraggableWrapper, {
    key: "draggable-score-draggable-wrapper-".concat(id),
    dataProvider: {
      and: [],
      enabled: true,
      id: id,
      name: score.entityName,
      excluded: false,
      kqlQuery: '',
      queryMatch: {
        field: score.entityName,
        value: score.entityValue,
        operator: _data_provider.IS_OPERATOR
      }
    },
    render: function render(dataProvider, _, snapshot) {
      return snapshot.isDragging ? _react.default.createElement(_draggable_wrapper.DragEffects, null, _react.default.createElement(_provider.Provider, {
        dataProvider: dataProvider
      })) : _react.default.createElement(_react.default.Fragment, null, index !== 0 && _react.default.createElement(_react.default.Fragment, null, ',', _react.default.createElement(_page.Spacer, null)), scoreString);
    }
  });
};

exports.DraggableScoreComponent = DraggableScoreComponent;
DraggableScoreComponent.displayName = 'DraggableScoreComponent';

var DraggableScore = _react.default.memo(DraggableScoreComponent);

exports.DraggableScore = DraggableScore;
DraggableScore.displayName = 'DraggableScore';