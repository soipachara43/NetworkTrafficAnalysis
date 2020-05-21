function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
import { EuiTitle } from '../title';
import { EuiStepNumber } from './step_number';
import { EuiI18n } from '../i18n';
export var EuiStep = function EuiStep(_ref) {
  var className = _ref.className,
      children = _ref.children,
      _ref$headingElement = _ref.headingElement,
      headingElement = _ref$headingElement === void 0 ? 'p' : _ref$headingElement,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 1 : _ref$step,
      title = _ref.title,
      status = _ref.status,
      rest = _objectWithoutProperties(_ref, ["className", "children", "headingElement", "step", "title", "status"]);

  var classes = classNames('euiStep', className);
  return React.createElement("div", _extends({
    className: classes
  }, rest), React.createElement("div", {
    className: "euiStep__titleWrapper"
  }, React.createElement(EuiI18n, {
    token: "euiStep.ariaLabel",
    default: function _default(_ref2) {
      var status = _ref2.status;
      if (status === 'incomplete') return 'Incomplete Step';
      return 'Step';
    },
    values: {
      status: status
    }
  }, function (ariaLabel) {
    return React.createElement(EuiStepNumber, {
      className: "euiStep__circle",
      "aria-label": "".concat(ariaLabel, " ").concat(step),
      number: step,
      status: status,
      isHollow: status === 'incomplete'
    });
  }), React.createElement(EuiTitle, {
    size: "s",
    className: "euiStep__title"
  }, React.createElement(headingElement, null, title))), React.createElement("div", {
    className: "euiStep__content"
  }, children));
};
EuiStep.propTypes = {
  className: PropTypes.string,
  "aria-label": PropTypes.string,
  "data-test-subj": PropTypes.string,
  children: PropTypes.node.isRequired,

  /**
     * The HTML tag used for the title
     */
  headingElement: PropTypes.string,

  /**
     * The number of the step in the list of steps
     */
  step: PropTypes.number,
  title: PropTypes.string.isRequired,

  /**
     * May replace the number provided in props.step with alternate styling.
     */
  status: PropTypes.oneOf(["complete", "incomplete", "warning", "danger", "disabled"])
};
EuiStep.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "EuiStep",
  "props": {
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
    "step": {
      "defaultValue": {
        "value": "1",
        "computed": false
      },
      "type": {
        "name": "number"
      },
      "required": false,
      "description": "The number of the step in the list of steps"
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
    "children": {
      "type": {
        "name": "node"
      },
      "required": true,
      "description": ""
    },
    "title": {
      "type": {
        "name": "string"
      },
      "required": true,
      "description": ""
    },
    "status": {
      "type": {
        "name": "enum",
        "value": [{
          "value": "\"complete\"",
          "computed": false
        }, {
          "value": "\"incomplete\"",
          "computed": false
        }, {
          "value": "\"warning\"",
          "computed": false
        }, {
          "value": "\"danger\"",
          "computed": false
        }, {
          "value": "\"disabled\"",
          "computed": false
        }]
      },
      "required": false,
      "description": "May replace the number provided in props.step with alternate styling."
    }
  }
};