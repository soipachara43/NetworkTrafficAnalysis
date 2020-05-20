"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterLabel = FilterLabel;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _filter_operators = require("./filter_operators");

var _common = require("../../../../../common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function FilterLabel(_ref) {
  var filter = _ref.filter,
      valueLabel = _ref.valueLabel;
  var prefixText = filter.meta.negate ? " ".concat(_i18n.i18n.translate('data.filter.filterBar.negatedFilterPrefix', {
    defaultMessage: 'NOT '
  })) : '';
  var prefix = filter.meta.negate && !filter.meta.disabled ? _react.default.createElement(_eui.EuiTextColor, {
    color: "danger"
  }, prefixText) : prefixText;

  var getValue = function getValue(text) {
    return _react.default.createElement("span", {
      className: "globalFilterLabel__value"
    }, text);
  };

  if (filter.meta.alias !== null) {
    return _react.default.createElement(_react.Fragment, null, prefix, filter.meta.alias);
  }

  switch (filter.meta.type) {
    case _common.FILTERS.EXISTS:
      return _react.default.createElement(_react.Fragment, null, prefix, filter.meta.key, ": ", getValue("".concat(_filter_operators.existsOperator.message)));

    case _common.FILTERS.GEO_BOUNDING_BOX:
      return _react.default.createElement(_react.Fragment, null, prefix, filter.meta.key, ": ", getValue(valueLabel));

    case _common.FILTERS.GEO_POLYGON:
      return _react.default.createElement(_react.Fragment, null, prefix, filter.meta.key, ": ", getValue(valueLabel));

    case _common.FILTERS.PHRASES:
      return _react.default.createElement(_react.Fragment, null, prefix, filter.meta.key, ": ", getValue("".concat(_filter_operators.isOneOfOperator.message, " ").concat(valueLabel)));

    case _common.FILTERS.QUERY_STRING:
      return _react.default.createElement(_react.Fragment, null, prefix, getValue("".concat(valueLabel)));

    case _common.FILTERS.PHRASE:
    case _common.FILTERS.RANGE:
      return _react.default.createElement(_react.Fragment, null, prefix, filter.meta.key, ": ", getValue(valueLabel));

    default:
      return _react.default.createElement(_react.Fragment, null, prefix, getValue("".concat(JSON.stringify(filter.query) || filter.meta.value)));
  }
}