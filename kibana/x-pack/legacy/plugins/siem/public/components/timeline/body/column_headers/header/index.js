"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = exports.HeaderComponent = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _actions = require("../actions");

var _filter = require("../filter");

var _helpers = require("./helpers");

var _header_content = require("./header_content");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var HeaderComponent = function HeaderComponent(_ref) {
  var header = _ref.header,
      onColumnRemoved = _ref.onColumnRemoved,
      onColumnSorted = _ref.onColumnSorted,
      _ref$onFilterChange = _ref.onFilterChange,
      onFilterChange = _ref$onFilterChange === void 0 ? _fp.noop : _ref$onFilterChange,
      sort = _ref.sort;
  var onClick = (0, _react.useCallback)(function () {
    onColumnSorted({
      columnId: header.id,
      sortDirection: (0, _helpers.getNewSortDirectionOnClick)({
        clickedHeader: header,
        currentSort: sort
      })
    });
  }, [onColumnSorted, header, sort]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_header_content.HeaderContent, {
    header: header,
    isResizing: false,
    onClick: onClick,
    sort: sort
  }, _react.default.createElement(_actions.Actions, {
    header: header,
    onColumnRemoved: onColumnRemoved,
    sort: sort
  })), _react.default.createElement(_filter.Filter, {
    header: header,
    onFilterChange: onFilterChange
  }));
};

exports.HeaderComponent = HeaderComponent;

var Header = _react.default.memo(HeaderComponent);

exports.Header = Header;