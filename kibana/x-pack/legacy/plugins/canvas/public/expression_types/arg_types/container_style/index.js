"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containerStyle = void 0;

var _recompose = require("recompose");

var _objectPathImmutable = _interopRequireDefault(require("object-path-immutable"));

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
var set = _objectPathImmutable.default.set;
var strings = _i18n.ArgTypesStrings.ContainerStyle;

var wrap = function wrap(Component) {
  return (// TODO: this should be in a helper
    (0, _recompose.withHandlers)({
      getArgValue: function getArgValue(_ref) {
        var argValue = _ref.argValue;
        return function (name, alt) {
          var args = (0, _lodash.get)(argValue, 'chain.0.arguments', {});
          return (0, _lodash.get)(args, "".concat(name, ".0"), alt);
        };
      },
      setArgValue: function setArgValue(_ref2) {
        var argValue = _ref2.argValue,
            onValueChange = _ref2.onValueChange;
        return function (name, val) {
          var newValue = set(argValue, "chain.0.arguments.".concat(name, ".0"), val);
          onValueChange(newValue);
        };
      }
    })(Component)
  );
};

var containerStyle = function containerStyle() {
  return {
    name: 'containerStyle',
    displayName: strings.getDisplayName(),
    help: strings.getHelp(),
    default: '{containerStyle}',
    simpleTemplate: (0, _template_from_react_component.templateFromReactComponent)(wrap(_simple_template.SimpleTemplate)),
    template: (0, _template_from_react_component.templateFromReactComponent)(wrap(_extended_template.ExtendedTemplate))
  };
};

exports.containerStyle = containerStyle;