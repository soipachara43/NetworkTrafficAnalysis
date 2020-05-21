import PropTypes from 'prop-types';
import React from 'react';
import { commonlyUsedRangeShape } from '../types';
import { EuiI18n } from '../../../i18n';
import { EuiFlexGrid, EuiFlexItem } from '../../../flex';
import { EuiTitle } from '../../../title';
import { EuiLink } from '../../../link';
import { EuiHorizontalRule } from '../../../horizontal_rule';
import { htmlIdGenerator } from '../../../../services';
var generateId = htmlIdGenerator();
export function EuiCommonlyUsedTimeRanges(_ref) {
  var applyTime = _ref.applyTime,
      commonlyUsedRanges = _ref.commonlyUsedRanges;
  var legendId = generateId();
  var links = commonlyUsedRanges.map(function (_ref2) {
    var start = _ref2.start,
        end = _ref2.end,
        label = _ref2.label;

    var applyCommonlyUsed = function applyCommonlyUsed() {
      applyTime({
        start: start,
        end: end
      });
    };

    return React.createElement(EuiFlexItem, {
      key: label,
      component: "li",
      className: "euiCommonlyUsedTimeRanges__item"
    }, React.createElement(EuiLink, {
      onClick: applyCommonlyUsed,
      "data-test-subj": "superDatePickerCommonlyUsed_".concat(label.replace(' ', '_'))
    }, label));
  });
  return React.createElement("fieldset", null, React.createElement(EuiTitle, {
    size: "xxxs"
  }, React.createElement("legend", {
    id: legendId,
    "aria-label": "Commonly used time ranges"
  }, React.createElement(EuiI18n, {
    token: "euiCommonlyUsedTimeRanges.legend",
    default: "Commonly used"
  }))), React.createElement("div", {
    className: "euiQuickSelectPopover__section"
  }, React.createElement(EuiFlexGrid, {
    "aria-labelledby": legendId,
    gutterSize: "s",
    columns: 2,
    direction: "column",
    responsive: false,
    component: "ul"
  }, links)), React.createElement(EuiHorizontalRule, {
    margin: "s"
  }));
}
EuiCommonlyUsedTimeRanges.propTypes = {
  applyTime: PropTypes.func.isRequired,
  commonlyUsedRanges: PropTypes.arrayOf(commonlyUsedRangeShape).isRequired
};
EuiCommonlyUsedTimeRanges.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "EuiCommonlyUsedTimeRanges",
  "props": {
    "applyTime": {
      "type": {
        "name": "func"
      },
      "required": true,
      "description": ""
    },
    "commonlyUsedRanges": {
      "type": {
        "name": "arrayOf",
        "value": {
          "name": "custom",
          "raw": "commonlyUsedRangeShape"
        }
      },
      "required": true,
      "description": ""
    }
  }
};