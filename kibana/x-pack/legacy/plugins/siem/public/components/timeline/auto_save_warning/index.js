"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoSaveWarningMsg = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _store = require("../../../store");

var _actions = require("../../../store/inputs/actions");

var i18n = _interopRequireWildcard(require("./translations"));

var _timeline = require("../../../store/timeline");

var _toasters = require("../../toasters");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AutoSaveWarningMsgComponent = _react.default.memo(function (_ref) {
  var newTimelineModel = _ref.newTimelineModel,
      setTimelineRangeDatePicker = _ref.setTimelineRangeDatePicker,
      timelineId = _ref.timelineId,
      updateAutoSaveMsg = _ref.updateAutoSaveMsg,
      updateTimeline = _ref.updateTimeline;
  var dispatchToaster = (0, _toasters.useStateToaster)()[1];

  if (timelineId != null && newTimelineModel != null) {
    var toast = {
      id: 'AutoSaveWarningMsg',
      title: i18n.TITLE,
      color: 'warning',
      iconType: 'alert',
      toastLifeTimeMs: 10000,
      text: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("p", null, i18n.DESCRIPTION), _react.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "flexEnd",
        gutterSize: "s"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButton, {
        size: "s",
        onClick: function onClick() {
          updateTimeline({
            id: timelineId,
            timeline: newTimelineModel
          });
          updateAutoSaveMsg({
            timelineId: null,
            newTimelineModel: null
          });
          setTimelineRangeDatePicker({
            from: (0, _fp.getOr)(0, 'dateRange.start', newTimelineModel),
            to: (0, _fp.getOr)(0, 'dateRange.end', newTimelineModel)
          });
        }
      }, i18n.REFRESH_TIMELINE))))
    };
    dispatchToaster({
      type: 'addToaster',
      toast: toast
    });
  }

  return null;
});

AutoSaveWarningMsgComponent.displayName = 'AutoSaveWarningMsgComponent';

var mapStateToProps = function mapStateToProps(state) {
  var autoSaveMessage = _store.timelineSelectors.autoSaveMsgSelector(state);

  return {
    timelineId: autoSaveMessage.timelineId,
    newTimelineModel: autoSaveMessage.newTimelineModel
  };
};

var mapDispatchToProps = {
  setTimelineRangeDatePicker: _actions.setTimelineRangeDatePicker,
  updateAutoSaveMsg: _timeline.timelineActions.updateAutoSaveMsg,
  updateTimeline: _timeline.timelineActions.updateTimeline
};
var connector = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);
var AutoSaveWarningMsg = connector(AutoSaveWarningMsgComponent);
exports.AutoSaveWarningMsg = AutoSaveWarningMsg;