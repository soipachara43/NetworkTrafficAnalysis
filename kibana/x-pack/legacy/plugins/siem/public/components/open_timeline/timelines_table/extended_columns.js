"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExtendedColumns = void 0;

var _react = _interopRequireDefault(require("react"));

var _empty_value = require("../../empty_value");

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable react/display-name */

/**
 * Returns the extended columns that are specific to the `All Timelines` view
 * of the `Timelines` page
 */
var getExtendedColumns = function getExtendedColumns() {
  return [{
    dataType: 'string',
    field: 'updatedBy',
    name: i18n.MODIFIED_BY,
    render: function render(updatedBy) {
      return _react.default.createElement("div", {
        "data-test-subj": "username"
      }, (0, _empty_value.defaultToEmptyTag)(updatedBy));
    },
    sortable: false
  }];
};

exports.getExtendedColumns = getExtendedColumns;