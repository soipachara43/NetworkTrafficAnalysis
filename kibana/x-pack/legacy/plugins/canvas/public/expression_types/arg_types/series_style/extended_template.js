"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtendedTemplate = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _objectPathImmutable = _interopRequireDefault(require("object-path-immutable"));

var _lodash = require("lodash");

var _i18n = require("../../../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var set = _objectPathImmutable.default.set,
    del = _objectPathImmutable.default.del;
var strings = _i18n.ArgTypesStrings.SeriesStyle;

var ExtendedTemplate = function ExtendedTemplate(props) {
  var typeInstance = props.typeInstance,
      onValueChange = props.onValueChange,
      labels = props.labels,
      argValue = props.argValue;
  var chain = (0, _lodash.get)(argValue, 'chain.0', {});
  var chainArgs = (0, _lodash.get)(chain, 'arguments', {});
  var selectedSeries = (0, _lodash.get)(chainArgs, 'label.0', '');
  var name = '';

  if (typeInstance) {
    name = typeInstance.name;
  }

  var fields = (0, _lodash.get)(typeInstance, 'options.include', []);
  var hasPropFields = fields.some(function (field) {
    return ['lines', 'bars', 'points'].indexOf(field) !== -1;
  });

  var handleChange = function handleChange(argName, ev) {
    var fn = ev.target.value === '' ? del : set;
    var newValue = fn(argValue, "chain.0.arguments.".concat(argName), [ev.target.value]);
    return onValueChange(newValue);
  }; // TODO: add fill and stack options
  // TODO: add label name auto-complete


  var values = [{
    value: 0,
    text: strings.getNoneOption()
  }, {
    value: 1,
    text: '1'
  }, {
    value: 2,
    text: '2'
  }, {
    value: 3,
    text: '3'
  }, {
    value: 4,
    text: '4'
  }, {
    value: 5,
    text: '5'
  }];
  var labelOptions = [{
    value: '',
    text: strings.getSelectSeriesOption()
  }];
  labels.sort().forEach(function (val) {
    return labelOptions.push({
      value: val,
      text: val
    });
  });
  return _react.default.createElement("div", null, name !== 'defaultStyle' && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    label: strings.getSeriesIdentifierLabel(),
    display: "columnCompressed"
  }, _react.default.createElement(_eui.EuiSelect, {
    compressed: true,
    value: selectedSeries,
    options: labelOptions,
    onChange: function onChange(ev) {
      return handleChange('label', ev);
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  })), hasPropFields && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, fields.includes('lines') && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    label: strings.getLineLabel(),
    display: "rowCompressed"
  }, _react.default.createElement(_eui.EuiSelect, {
    value: (0, _lodash.get)(chainArgs, 'lines.0', 0),
    options: values,
    compressed: true,
    onChange: function onChange(ev) {
      return handleChange('lines', ev);
    }
  }))), fields.includes('bars') && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    label: strings.getBarLabel(),
    display: "rowCompressed"
  }, _react.default.createElement(_eui.EuiSelect, {
    value: (0, _lodash.get)(chainArgs, 'bars.0', 0),
    options: values,
    compressed: true,
    onChange: function onChange(ev) {
      return handleChange('bars', ev);
    }
  }))), fields.includes('points') && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    label: strings.getPointLabel(),
    display: "rowCompressed"
  }, _react.default.createElement(_eui.EuiSelect, {
    value: (0, _lodash.get)(chainArgs, 'points.0', 0),
    options: values,
    compressed: true,
    onChange: function onChange(ev) {
      return handleChange('points', ev);
    }
  }))))));
};

exports.ExtendedTemplate = ExtendedTemplate;
ExtendedTemplate.displayName = 'SeriesStyleArgAdvancedInput';
ExtendedTemplate.propTypes = {
  onValueChange: _propTypes.default.func.isRequired,
  argValue: _propTypes.default.any.isRequired,
  typeInstance: _propTypes.default.object,
  labels: _propTypes.default.array.isRequired
};