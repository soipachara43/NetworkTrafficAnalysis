"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityDraggable = exports.EntityDraggableComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _draggable_wrapper = require("../drag_and_drop/draggable_wrapper");

var _data_provider = require("../timeline/data_providers/data_provider");

var _provider = require("../timeline/data_providers/provider");

var _helpers = require("../drag_and_drop/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EntityDraggableComponent = function EntityDraggableComponent(_ref) {
  var idPrefix = _ref.idPrefix,
      entityName = _ref.entityName,
      entityValue = _ref.entityValue;
  var id = (0, _helpers.escapeDataProviderId)("entity-draggable-".concat(idPrefix, "-").concat(entityName, "-").concat(entityValue));
  return _react.default.createElement(_draggable_wrapper.DraggableWrapper, {
    key: id,
    dataProvider: {
      and: [],
      enabled: true,
      id: id,
      name: entityValue,
      excluded: false,
      kqlQuery: '',
      queryMatch: {
        field: entityName,
        value: entityValue,
        operator: _data_provider.IS_OPERATOR
      }
    },
    render: function render(dataProvider, _, snapshot) {
      return snapshot.isDragging ? _react.default.createElement(_draggable_wrapper.DragEffects, null, _react.default.createElement(_provider.Provider, {
        dataProvider: dataProvider
      })) : _react.default.createElement(_react.default.Fragment, null, "".concat(entityName, ": \"").concat(entityValue, "\""));
    }
  });
};

exports.EntityDraggableComponent = EntityDraggableComponent;
EntityDraggableComponent.displayName = 'EntityDraggableComponent';

var EntityDraggable = _react.default.memo(EntityDraggableComponent);

exports.EntityDraggable = EntityDraggable;
EntityDraggable.displayName = 'EntityDraggable';