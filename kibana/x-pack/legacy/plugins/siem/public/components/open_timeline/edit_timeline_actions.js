"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEditTimelineActions = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useEditTimelineActions = function useEditTimelineActions() {
  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      actionItem = _useState2[0],
      setActionTimeline = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isDeleteTimelineModalOpen = _useState4[0],
      setIsDeleteTimelineModalOpen = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isEnableDownloader = _useState6[0],
      setIsEnableDownloader = _useState6[1]; // Handle Delete Modal


  var onCloseDeleteTimelineModal = (0, _react.useCallback)(function () {
    setIsDeleteTimelineModalOpen(false);
    setActionTimeline(null);
  }, [actionItem]);
  var onOpenDeleteTimelineModal = (0, _react.useCallback)(function (selectedActionItem) {
    setIsDeleteTimelineModalOpen(true);

    if (selectedActionItem != null) {
      setActionTimeline(selectedActionItem);
    }
  }, []); // Handle Downloader Modal

  var enableExportTimelineDownloader = (0, _react.useCallback)(function (selectedActionItem) {
    setIsEnableDownloader(true);

    if (selectedActionItem != null) {
      setActionTimeline(selectedActionItem);
    }
  }, []);
  var disableExportTimelineDownloader = (0, _react.useCallback)(function () {
    setIsEnableDownloader(false);
    setActionTimeline(null);
  }, []); // On Compete every tasks

  var onCompleteEditTimelineAction = (0, _react.useCallback)(function () {
    setIsDeleteTimelineModalOpen(false);
    setIsEnableDownloader(false);
    setActionTimeline(null);
  }, []);
  return {
    actionItem: actionItem,
    onCompleteEditTimelineAction: onCompleteEditTimelineAction,
    isDeleteTimelineModalOpen: isDeleteTimelineModalOpen,
    onCloseDeleteTimelineModal: onCloseDeleteTimelineModal,
    onOpenDeleteTimelineModal: onOpenDeleteTimelineModal,
    isEnableDownloader: isEnableDownloader,
    enableExportTimelineDownloader: enableExportTimelineDownloader,
    disableExportTimelineDownloader: disableExportTimelineDownloader
  };
};

exports.useEditTimelineActions = useEditTimelineActions;