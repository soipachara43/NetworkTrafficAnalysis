function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import PropTypes from "prop-types";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import classNames from 'classnames';
import { EuiStep } from './step';

function renderSteps(steps, firstStepNumber, headingElement) {
  return steps.map(function (step, index) {
    var className = step.className,
        children = step.children,
        title = step.title,
        status = step.status,
        rest = _objectWithoutProperties(step, ["className", "children", "title", "status"]);

    return React.createElement(EuiStep, _extends({
      className: className,
      key: index,
      headingElement: headingElement,
      step: firstStepNumber + index,
      title: title,
      status: status
    }, rest), children);
  });
}

export var EuiSteps = function EuiSteps(_ref) {
  var className = _ref.className,
      _ref$firstStepNumber = _ref.firstStepNumber,
      firstStepNumber = _ref$firstStepNumber === void 0 ? 1 : _ref$firstStepNumber,
      _ref$headingElement = _ref.headingElement,
      headingElement = _ref$headingElement === void 0 ? 'p' : _ref$headingElement,
      steps = _ref.steps,
      rest = _objectWithoutProperties(_ref, ["className", "firstStepNumber", "headingElement", "steps"]);

  var classes = classNames('euiSteps', className);
  return React.createElement("div", _extends({
    className: classes
  }, rest), renderSteps(steps, firstStepNumber, headingElement));
};
EuiSteps.propTypes = {
  className: PropTypes.string,
  "aria-label": PropTypes.string,
  "data-test-subj": PropTypes.string,

  /**
     * An array of `EuiStep` objects excluding the `step` prop
     */
  steps: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,

  /**
     * The number the steps should begin from
     */
  firstStepNumber: PropTypes.number,

  /**
     * The HTML tag used for the title
     */
  headingElement: PropTypes.string
};
EuiSteps.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "EuiSteps",
  "props": {
    "firstStepNumber": {
      "defaultValue": {
        "value": "1",
        "computed": false
      },
      "type": {
        "name": "number"
      },
      "required": false,
      "description": "The number the steps should begin from"
    },
    "headingElement": {
      "defaultValue": {
        "value": "'p'",
        "computed": false
      },
      "type": {
        "name": "string"
      },
      "required": false,
      "description": "The HTML tag used for the title"
    },
    "className": {
      "type": {
        "name": "string"
      },
      "required": false,
      "description": ""
    },
    "aria-label": {
      "type": {
        "name": "string"
      },
      "required": false,
      "description": ""
    },
    "data-test-subj": {
      "type": {
        "name": "string"
      },
      "required": false,
      "description": ""
    },
    "steps": {
      "type": {
        "name": "arrayOf",
        "value": {
          "name": "any"
        }
      },
      "required": true,
      "description": "An array of `EuiStep` objects excluding the `step` prop"
    }
  }
};