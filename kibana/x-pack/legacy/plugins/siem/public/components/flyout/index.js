"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Flyout = exports.FlyoutComponent = exports.Badge = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _store = require("../../store");

var _button = require("./button");

var _pane = require("./pane");

var _actions = require("../../store/actions");

var _constants = require("../timeline/body/constants");

var _timeline = require("../timeline");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Badge = (0, _styledComponents.default)(_eui.EuiBadge).withConfig({
  displayName: "Badge",
  componentId: "egiy76-0"
})(["position:absolute;padding-left:4px;padding-right:4px;right:0%;top:0%;border-bottom-left-radius:5px;"]);
exports.Badge = Badge;
Badge.displayName = 'Badge';

var Visible = _styledComponents.default.div.withConfig({
  displayName: "Visible",
  componentId: "egiy76-1"
})(["visibility:", ";"], function (_ref) {
  var show = _ref.show;
  return show ? 'visible' : 'hidden';
});

Visible.displayName = 'Visible';

var FlyoutComponent = _react.default.memo(function (_ref2) {
  var dataProviders = _ref2.dataProviders,
      flyoutHeight = _ref2.flyoutHeight,
      show = _ref2.show,
      showTimeline = _ref2.showTimeline,
      timelineId = _ref2.timelineId,
      usersViewing = _ref2.usersViewing,
      width = _ref2.width;
  var handleClose = (0, _react.useCallback)(function () {
    return showTimeline({
      id: timelineId,
      show: false
    });
  }, [showTimeline, timelineId]);
  var handleOpen = (0, _react.useCallback)(function () {
    return showTimeline({
      id: timelineId,
      show: true
    });
  }, [showTimeline, timelineId]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(Visible, {
    show: show
  }, _react.default.createElement(_pane.Pane, {
    flyoutHeight: flyoutHeight,
    onClose: handleClose,
    timelineId: timelineId,
    width: width
  }, _react.default.createElement(_timeline.StatefulTimeline, {
    onClose: handleClose,
    usersViewing: usersViewing,
    id: timelineId
  }))), _react.default.createElement(_button.FlyoutButton, {
    dataProviders: dataProviders,
    show: !show,
    timelineId: timelineId,
    onOpen: handleOpen
  }));
});

exports.FlyoutComponent = FlyoutComponent;
FlyoutComponent.displayName = 'FlyoutComponent';
var DEFAULT_DATA_PROVIDERS = [];
var DEFAULT_TIMELINE_BY_ID = {};

var mapStateToProps = function mapStateToProps(state, _ref3) {
  var _timelineSelectors$ti, _timelineById$timelin, _timelineById$timelin2, _ref4, _timelineById$timelin3, _ref5, _timelineById$timelin4;

  var timelineId = _ref3.timelineId;
  var timelineById = (_timelineSelectors$ti = _store.timelineSelectors.timelineByIdSelector(state)) !== null && _timelineSelectors$ti !== void 0 ? _timelineSelectors$ti : DEFAULT_TIMELINE_BY_ID;
  /*
    In case timelineById[timelineId]?.dataProviders is an empty array it will cause unnecessary rerender
    of StatefulTimeline which can be expensive, so to avoid that return DEFAULT_DATA_PROVIDERS
  */

  var dataProviders = ((_timelineById$timelin = timelineById[timelineId]) === null || _timelineById$timelin === void 0 ? void 0 : _timelineById$timelin.dataProviders.length) ? (_timelineById$timelin2 = timelineById[timelineId]) === null || _timelineById$timelin2 === void 0 ? void 0 : _timelineById$timelin2.dataProviders : DEFAULT_DATA_PROVIDERS;
  var show = (_ref4 = (_timelineById$timelin3 = timelineById[timelineId]) === null || _timelineById$timelin3 === void 0 ? void 0 : _timelineById$timelin3.show) !== null && _ref4 !== void 0 ? _ref4 : false;
  var width = (_ref5 = (_timelineById$timelin4 = timelineById[timelineId]) === null || _timelineById$timelin4 === void 0 ? void 0 : _timelineById$timelin4.width) !== null && _ref5 !== void 0 ? _ref5 : _constants.DEFAULT_TIMELINE_WIDTH;
  return {
    dataProviders: dataProviders,
    show: show,
    width: width
  };
};

var mapDispatchToProps = {
  showTimeline: _actions.timelineActions.showTimeline
};
var connector = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);
var Flyout = connector(FlyoutComponent);
exports.Flyout = Flyout;
Flyout.displayName = 'Flyout';