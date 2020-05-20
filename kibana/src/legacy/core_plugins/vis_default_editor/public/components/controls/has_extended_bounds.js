"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HasExtendedBoundsParamEditor = HasExtendedBoundsParamEditor;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../plugins/data/public");

var _switch = require("./switch");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var isType = _public.search.aggs.isType;

function HasExtendedBoundsParamEditor(props) {
  (0, _react.useEffect)(function () {
    props.setValue(props.value && props.agg.params.min_doc_count);
  }, [props.agg.params.min_doc_count]);
  return _react.default.createElement(_switch.SwitchParamEditor, _extends({}, props, {
    displayLabel: _i18n.i18n.translate('visDefaultEditor.controls.extendedBoundsLabel', {
      defaultMessage: 'Extend bounds'
    }),
    displayToolTip: _i18n.i18n.translate('visDefaultEditor.controls.extendedBoundsTooltip', {
      defaultMessage: 'Min and Max do not filter the results, but rather extend the bounds of the result set.'
    }),
    disabled: !props.agg.params.min_doc_count || !(isType('number')(props.agg) || isType('date')(props.agg))
  }));
}