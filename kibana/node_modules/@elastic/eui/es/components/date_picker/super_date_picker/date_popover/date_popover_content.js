import PropTypes from 'prop-types';
import React from 'react';
import { EuiTabbedContent } from '../../../tabs';
import { EuiText } from '../../../text';
import { EuiButton } from '../../../button';
import { EuiAbsoluteTab } from './absolute_tab';
import { EuiRelativeTab } from './relative_tab';
import { getDateMode, DATE_MODES, toAbsoluteString, toRelativeString } from '../date_modes';
export function EuiDatePopoverContent(_ref) {
  var value = _ref.value,
      roundUp = _ref.roundUp,
      onChange = _ref.onChange,
      dateFormat = _ref.dateFormat,
      timeFormat = _ref.timeFormat,
      locale = _ref.locale,
      position = _ref.position;

  var onTabClick = function onTabClick(selectedTab) {
    switch (selectedTab.id) {
      case DATE_MODES.ABSOLUTE:
        onChange(toAbsoluteString(value, roundUp));
        break;

      case DATE_MODES.RELATIVE:
        onChange(toRelativeString(value));
        break;
    }
  };

  var ariaLabel = "".concat(position === 'start' ? 'Start' : 'End', " date:");

  var renderTabs = function renderTabs() {
    return [{
      id: DATE_MODES.ABSOLUTE,
      name: 'Absolute',
      content: React.createElement(EuiAbsoluteTab, {
        dateFormat: dateFormat,
        timeFormat: timeFormat,
        locale: locale,
        value: value,
        onChange: onChange,
        roundUp: roundUp,
        position: position
      }),
      'data-test-subj': 'superDatePickerAbsoluteTab',
      'aria-label': "".concat(ariaLabel, " Absolute")
    }, {
      id: DATE_MODES.RELATIVE,
      name: 'Relative',
      content: React.createElement(EuiRelativeTab, {
        dateFormat: dateFormat,
        locale: locale,
        value: value,
        onChange: onChange,
        roundUp: roundUp,
        position: position
      }),
      'data-test-subj': 'superDatePickerRelativeTab',
      'aria-label': "".concat(ariaLabel, " Relative")
    }, {
      id: DATE_MODES.NOW,
      name: 'Now',
      content: React.createElement(EuiText, {
        size: "s",
        color: "subdued",
        className: "euiDatePopoverContent__padded--large"
      }, React.createElement("p", null, "Setting the time to \"now\" means that on every refresh this time will be set to the time of the refresh."), React.createElement(EuiButton, {
        "data-test-subj": "superDatePickerNowButton",
        onClick: function onClick() {
          return onChange('now');
        },
        fullWidth: true,
        size: "s",
        fill: true
      }, "Set ", position, " date and time to now")),
      'data-test-subj': 'superDatePickerNowTab',
      'aria-label': "".concat(ariaLabel, " Now")
    }];
  };

  return React.createElement(EuiTabbedContent, {
    className: "euiDatePopoverContent",
    tabs: renderTabs(),
    autoFocus: "selected",
    initialSelectedTab: {
      id: getDateMode(value)
    },
    onTabClick: onTabClick,
    size: "s",
    expand: true
  });
}
EuiDatePopoverContent.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  roundUp: PropTypes.bool,
  dateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  locale: PropTypes.string,
  position: PropTypes.oneOf(['start', 'end'])
};
EuiDatePopoverContent.defaultProps = {
  roundUp: false
};
EuiDatePopoverContent.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "EuiDatePopoverContent",
  "props": {
    "roundUp": {
      "defaultValue": {
        "value": "false",
        "computed": false
      },
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": ""
    },
    "value": {
      "type": {
        "name": "string"
      },
      "required": true,
      "description": ""
    },
    "onChange": {
      "type": {
        "name": "func"
      },
      "required": true,
      "description": ""
    },
    "dateFormat": {
      "type": {
        "name": "string"
      },
      "required": true,
      "description": ""
    },
    "timeFormat": {
      "type": {
        "name": "string"
      },
      "required": true,
      "description": ""
    },
    "locale": {
      "type": {
        "name": "string"
      },
      "required": false,
      "description": ""
    },
    "position": {
      "type": {
        "name": "enum",
        "value": [{
          "value": "'start'",
          "computed": false
        }, {
          "value": "'end'",
          "computed": false
        }]
      },
      "required": false,
      "description": ""
    }
  }
};