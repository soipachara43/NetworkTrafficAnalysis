"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seriesStyle = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recompose = require("recompose");

var _lodash = require("lodash");

var _template_from_react_component = require("../../../lib/template_from_react_component");

var _simple_template = require("./simple_template");

var _extended_template = require("./extended_template");

var _i18n = require("../../../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _i18n.ArgTypesStrings.SeriesStyle;

var formatLabel = function formatLabel(label, props) {
  if (typeof label !== 'string') {
    props.renderError();
  }

  return "".concat(strings.getStyleLabel(), ": ").concat(label);
};

var EnhancedExtendedTemplate = (0, _recompose.compose)((0, _recompose.lifecycle)({
  componentWillMount: function componentWillMount() {
    var label = (0, _lodash.get)(this.props.argValue, 'chain.0.arguments.label.0', '');

    if (label) {
      this.props.setLabel(formatLabel(label, this.props));
    }
  },
  componentDidUpdate: function componentDidUpdate(prevProps) {
    var newLabel = (0, _lodash.get)(this.props.argValue, 'chain.0.arguments.label.0', '');

    if (newLabel && prevProps.label !== formatLabel(newLabel, this.props)) {
      this.props.setLabel(formatLabel(newLabel, this.props));
    }
  }
}))(_extended_template.ExtendedTemplate);
EnhancedExtendedTemplate.propTypes = {
  argValue: _propTypes.default.any.isRequired,
  setLabel: _propTypes.default.func.isRequired,
  label: _propTypes.default.string
};

var seriesStyle = function seriesStyle() {
  return {
    name: 'seriesStyle',
    displayName: strings.getDisplayName(),
    help: strings.getHelp(),
    template: (0, _template_from_react_component.templateFromReactComponent)(EnhancedExtendedTemplate),
    simpleTemplate: (0, _template_from_react_component.templateFromReactComponent)(_simple_template.SimpleTemplate),
    default: '{seriesStyle}'
  };
};

exports.seriesStyle = seriesStyle;