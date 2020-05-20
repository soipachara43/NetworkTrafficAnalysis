"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templateFromReactComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = require("@kbn/i18n/react");

var _error_boundary = require("../components/enhance/error_boundary");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var templateFromReactComponent = function templateFromReactComponent(Component) {
  var WrappedComponent = function WrappedComponent(props) {
    return _react.default.createElement(_error_boundary.ErrorBoundary, null, function (_ref) {
      var error = _ref.error;

      if (error) {
        props.renderError();
        return null;
      }

      return _react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(Component, props));
    });
  };

  WrappedComponent.propTypes = {
    renderError: _propTypes.default.func
  };
  return function (domNode, config, handlers) {
    try {
      var el = _react.default.createElement(WrappedComponent, config);

      (0, _reactDom.render)(el, domNode, function () {
        handlers.done();
      });
      handlers.onDestroy(function () {
        (0, _reactDom.unmountComponentAtNode)(domNode);
      });
    } catch (err) {
      handlers.done();
      config.renderError();
    }
  };
};

exports.templateFromReactComponent = templateFromReactComponent;