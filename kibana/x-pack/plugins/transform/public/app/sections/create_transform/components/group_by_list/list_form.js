"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupByListForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _group_by_label_form = require("./group_by_label_form");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var GroupByListForm = function GroupByListForm(_ref) {
  var deleteHandler = _ref.deleteHandler,
      list = _ref.list,
      onChange = _ref.onChange,
      options = _ref.options;
  var listKeys = Object.keys(list);
  return _react.default.createElement(_react.Fragment, null, listKeys.map(function (aggName, i) {
    var otherAggNames = listKeys.filter(function (k) {
      return k !== aggName;
    });
    return _react.default.createElement(_react.Fragment, {
      key: aggName
    }, _react.default.createElement(_eui.EuiPanel, {
      paddingSize: "s",
      "data-test-subj": "transformGroupByEntry ".concat(i)
    }, _react.default.createElement(_group_by_label_form.GroupByLabelForm, {
      deleteHandler: deleteHandler,
      item: list[aggName],
      otherAggNames: otherAggNames,
      onChange: function (_onChange) {
        function onChange(_x) {
          return _onChange.apply(this, arguments);
        }

        onChange.toString = function () {
          return _onChange.toString();
        };

        return onChange;
      }(function (item) {
        return onChange(aggName, item);
      }),
      options: options
    })), listKeys.length > 0 && _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }));
  }));
};

exports.GroupByListForm = GroupByListForm;