"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemGrid = void 0;

var _lodash = require("lodash");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PER_ROW_DEFAULT = 6;

var ItemGrid = function ItemGridFunc(_ref) {
  var _ref$items = _ref.items,
      items = _ref$items === void 0 ? [] : _ref$items,
      _ref$itemsPerRow = _ref.itemsPerRow,
      itemsPerRow = _ref$itemsPerRow === void 0 ? PER_ROW_DEFAULT : _ref$itemsPerRow,
      children = _ref.children;
  var reducedRows = items.reduce(function (rows, item) {
    if ((0, _lodash.last)(rows).length >= itemsPerRow) {
      rows.push([]);
    }

    (0, _lodash.last)(rows).push(children(item));
    return rows;
  }, [[]]);
  return _react.default.createElement(_react.Fragment, null, reducedRows.map(function (row, i) {
    return _react.default.createElement("div", {
      key: "item-grid-row-".concat(i),
      className: "item-grid-row"
    }, row);
  }));
};

exports.ItemGrid = ItemGrid;
ItemGrid.propTypes = {
  items: _propTypes.default.array,
  itemsPerRow: _propTypes.default.number,
  children: _propTypes.default.func.isRequired
};