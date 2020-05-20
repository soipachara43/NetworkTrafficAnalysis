"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClosureOptionsRadio = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var radios = [{
  id: 'close-by-user',
  label: i18n.CASE_CLOSURE_OPTIONS_MANUAL
}, {
  id: 'close-by-pushing',
  label: i18n.CASE_CLOSURE_OPTIONS_NEW_INCIDENT
}];

var ClosureOptionsRadioComponent = function ClosureOptionsRadioComponent(_ref) {
  var closureTypeSelected = _ref.closureTypeSelected,
      disabled = _ref.disabled,
      onChangeClosureType = _ref.onChangeClosureType;
  var onChangeLocal = (0, _react.useCallback)(function (id) {
    onChangeClosureType(id);
  }, [onChangeClosureType]);
  return _react.default.createElement(_eui.EuiRadioGroup, {
    disabled: disabled,
    options: radios,
    idSelected: closureTypeSelected,
    onChange: onChangeLocal,
    name: "closure_options",
    "data-test-subj": "closure-options-radio-group"
  });
};

var ClosureOptionsRadio = _react.default.memo(ClosureOptionsRadioComponent);

exports.ClosureOptionsRadio = ClosureOptionsRadio;