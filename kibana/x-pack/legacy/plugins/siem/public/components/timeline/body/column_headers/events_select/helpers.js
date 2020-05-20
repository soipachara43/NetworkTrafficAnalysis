"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEventsSelectOptions = exports.DropdownDisplay = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _pin = require("../../../../pin");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var InputDisplay = _styledComponents.default.div.withConfig({
  displayName: "InputDisplay",
  componentId: "sc-15pp4t2-0"
})(["width:5px;"]);

InputDisplay.displayName = 'InputDisplay';

var PinIconContainer = _styledComponents.default.div.withConfig({
  displayName: "PinIconContainer",
  componentId: "sc-15pp4t2-1"
})(["margin-right:5px;"]);

PinIconContainer.displayName = 'PinIconContainer';

var PinActionItem = _styledComponents.default.div.withConfig({
  displayName: "PinActionItem",
  componentId: "sc-15pp4t2-2"
})(["display:flex;flex-direction:row;"]);

PinActionItem.displayName = 'PinActionItem';

var DropdownDisplay = _react.default.memo(function (_ref) {
  var text = _ref.text;
  return _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, text);
});

exports.DropdownDisplay = DropdownDisplay;
DropdownDisplay.displayName = 'DropdownDisplay';

var getEventsSelectOptions = function getEventsSelectOptions() {
  return [{
    inputDisplay: _react.default.createElement(InputDisplay, null),
    disabled: true,
    dropdownDisplay: _react.default.createElement(DropdownDisplay, {
      text: i18n.SELECT_ALL
    }),
    value: 'select-all'
  }, {
    inputDisplay: _react.default.createElement(InputDisplay, null),
    disabled: true,
    dropdownDisplay: _react.default.createElement(DropdownDisplay, {
      text: i18n.SELECT_NONE
    }),
    value: 'select-none'
  }, {
    inputDisplay: _react.default.createElement(InputDisplay, null),
    disabled: true,
    dropdownDisplay: _react.default.createElement(DropdownDisplay, {
      text: i18n.SELECT_PINNED
    }),
    value: 'select-pinned'
  }, {
    inputDisplay: _react.default.createElement(InputDisplay, null),
    disabled: true,
    dropdownDisplay: _react.default.createElement(DropdownDisplay, {
      text: i18n.SELECT_UNPINNED
    }),
    value: 'select-unpinned'
  }, {
    inputDisplay: _react.default.createElement(InputDisplay, null),
    disabled: true,
    dropdownDisplay: _react.default.createElement(PinActionItem, null, _react.default.createElement(PinIconContainer, null, _react.default.createElement(_pin.Pin, {
      allowUnpinning: true,
      pinned: true
    })), _react.default.createElement(DropdownDisplay, {
      text: i18n.PIN_SELECTED
    })),
    value: 'pin-selected'
  }, {
    inputDisplay: _react.default.createElement(InputDisplay, null),
    disabled: true,
    dropdownDisplay: _react.default.createElement(PinActionItem, null, _react.default.createElement(PinIconContainer, null, _react.default.createElement(_pin.Pin, {
      allowUnpinning: true,
      pinned: false
    })), _react.default.createElement(DropdownDisplay, {
      text: i18n.UNPIN_SELECTED
    })),
    value: 'unpin-selected'
  }];
};

exports.getEventsSelectOptions = getEventsSelectOptions;