"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteTimelineModal = exports.DELETE_TIMELINE_MODAL_WIDTH = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _fp = require("lodash/fp");

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DELETE_TIMELINE_MODAL_WIDTH = 600; // px

/**
 * Renders a modal that confirms deletion of a timeline
 */

exports.DELETE_TIMELINE_MODAL_WIDTH = DELETE_TIMELINE_MODAL_WIDTH;

var DeleteTimelineModal = _react2.default.memo(function (_ref) {
  var title = _ref.title,
      closeModal = _ref.closeModal,
      onDelete = _ref.onDelete;
  var getTitle = (0, _react2.useCallback)(function () {
    var trimmedTitle = title != null ? title.trim() : '';
    var titleResult = !(0, _fp.isEmpty)(trimmedTitle) ? trimmedTitle : i18n.UNTITLED_TIMELINE;
    return _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.open.timeline.deleteTimelineModalTitle",
      defaultMessage: "Delete \"{title}\"?",
      "data-test-subj": "title",
      values: {
        title: titleResult
      }
    });
  }, [title]);
  return _react2.default.createElement(_eui.EuiConfirmModal, {
    buttonColor: "danger",
    cancelButtonText: i18n.CANCEL,
    confirmButtonText: i18n.DELETE,
    defaultFocusedButton: _eui.EUI_MODAL_CONFIRM_BUTTON,
    onCancel: closeModal,
    onConfirm: onDelete,
    title: getTitle()
  }, _react2.default.createElement("div", {
    "data-test-subj": "warning"
  }, i18n.DELETE_WARNING));
});

exports.DeleteTimelineModal = DeleteTimelineModal;
DeleteTimelineModal.displayName = 'DeleteTimelineModal';