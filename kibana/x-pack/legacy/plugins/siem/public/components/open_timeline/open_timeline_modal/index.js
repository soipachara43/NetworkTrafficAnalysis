"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenTimelineModal = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _apollo_context = require("../../../utils/apollo_context");

var i18n = _interopRequireWildcard(require("../translations"));

var _ = require("..");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DEFAULT_SEARCH_RESULTS_PER_PAGE = 10;
var OPEN_TIMELINE_MODAL_WIDTH = 1000; // px

var OpenTimelineModal = _react.default.memo(function (_ref) {
  var _ref$hideActions = _ref.hideActions,
      hideActions = _ref$hideActions === void 0 ? [] : _ref$hideActions,
      modalTitle = _ref.modalTitle,
      onClose = _ref.onClose,
      onOpen = _ref.onOpen;
  var apolloClient = (0, _apollo_context.useApolloClient)();
  if (!apolloClient) return null;
  return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiModal, {
    "data-test-subj": "open-timeline-modal",
    maxWidth: OPEN_TIMELINE_MODAL_WIDTH,
    onClose: onClose
  }, _react.default.createElement(_.StatefulOpenTimeline, {
    apolloClient: apolloClient,
    closeModalTimeline: onClose,
    hideActions: hideActions,
    isModal: true,
    defaultPageSize: DEFAULT_SEARCH_RESULTS_PER_PAGE,
    onOpenTimeline: onOpen,
    title: modalTitle !== null && modalTitle !== void 0 ? modalTitle : i18n.OPEN_TIMELINE_TITLE
  })));
});

exports.OpenTimelineModal = OpenTimelineModal;
OpenTimelineModal.displayName = 'OpenTimelineModal';