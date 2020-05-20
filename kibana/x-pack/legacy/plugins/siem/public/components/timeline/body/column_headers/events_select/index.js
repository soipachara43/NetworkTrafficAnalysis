"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventsSelect = exports.EVENTS_SELECT_WIDTH = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _helpers = require("./helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  .eventsSelectItem {\n    width: 100% !important;\n\n    .euiContextMenu__icon {\n      display: none !important;\n    }\n  }\n\n  .eventsSelectDropdown {\n    width: ", "px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var EVENTS_SELECT_WIDTH = 60; // px
// SIDE EFFECT: the following `createGlobalStyle` overrides
// the style of the select items

exports.EVENTS_SELECT_WIDTH = EVENTS_SELECT_WIDTH;
var EventsSelectGlobalStyle = (0, _styledComponents.createGlobalStyle)(_templateObject(), EVENTS_SELECT_WIDTH);

var CheckboxContainer = _styledComponents.default.div.withConfig({
  displayName: "CheckboxContainer",
  componentId: "bvbq5a-0"
})(["position:relative;"]);

CheckboxContainer.displayName = 'CheckboxContainer';

var PositionedCheckbox = _styledComponents.default.div.withConfig({
  displayName: "PositionedCheckbox",
  componentId: "bvbq5a-1"
})(["left:7px;position:absolute;top:-28px;"]);

PositionedCheckbox.displayName = 'PositionedCheckbox';

var EventsSelect = _react.default.memo(function (_ref) {
  var checkState = _ref.checkState,
      timelineId = _ref.timelineId;
  return _react.default.createElement("div", {
    "data-test-subj": "events-select"
  }, _react.default.createElement(_eui.EuiSuperSelect, {
    className: "eventsSelectDropdown",
    "data-test-subj": "events-select-dropdown",
    itemClassName: "eventsSelectItem",
    onChange: _fp.noop,
    options: (0, _helpers.getEventsSelectOptions)()
  }), _react.default.createElement(CheckboxContainer, {
    "data-test-subj": "timeline-events-select-checkbox-container"
  }, _react.default.createElement(PositionedCheckbox, {
    "data-test-subj": "timeline-events-select-positioned-checkbox"
  }, _react.default.createElement(_eui.EuiCheckbox, {
    checked: checkState === 'checked',
    "data-test-subj": "events-select-checkbox",
    disabled: true,
    id: "timeline-".concat(timelineId, "-events-select"),
    indeterminate: checkState === 'indeterminate',
    onChange: _fp.noop
  }))), _react.default.createElement(EventsSelectGlobalStyle, null));
});

exports.EventsSelect = EventsSelect;
EventsSelect.displayName = 'EventsSelect';