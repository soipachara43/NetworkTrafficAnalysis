"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEditTimelinBatchActions = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _fp = require("lodash/fp");

var i18n = _interopRequireWildcard(require("./translations"));

var _export_timeline = require("./export_timeline");

var _edit_timeline_actions = require("./edit_timeline_actions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getExportedIds = function getExportedIds(selectedTimelines) {
  var array = Array.isArray(selectedTimelines) ? selectedTimelines : [selectedTimelines];
  return array.reduce(function (acc, item) {
    return item.savedObjectId != null ? [].concat(_toConsumableArray(acc), [item.savedObjectId]) : _toConsumableArray(acc);
  }, []);
};

var useEditTimelinBatchActions = function useEditTimelinBatchActions(_ref) {
  var deleteTimelines = _ref.deleteTimelines,
      selectedItems = _ref.selectedItems,
      tableRef = _ref.tableRef;

  var _useEditTimelineActio = (0, _edit_timeline_actions.useEditTimelineActions)(),
      enableExportTimelineDownloader = _useEditTimelineActio.enableExportTimelineDownloader,
      disableExportTimelineDownloader = _useEditTimelineActio.disableExportTimelineDownloader,
      isEnableDownloader = _useEditTimelineActio.isEnableDownloader,
      isDeleteTimelineModalOpen = _useEditTimelineActio.isDeleteTimelineModalOpen,
      onOpenDeleteTimelineModal = _useEditTimelineActio.onOpenDeleteTimelineModal,
      onCloseDeleteTimelineModal = _useEditTimelineActio.onCloseDeleteTimelineModal;

  var onCompleteBatchActions = (0, _react.useCallback)(function (closePopover) {
    if (closePopover != null) closePopover();

    if (tableRef != null && tableRef.current != null) {
      tableRef.current.changeSelection([]);
    }

    disableExportTimelineDownloader();
    onCloseDeleteTimelineModal();
  }, [disableExportTimelineDownloader, onCloseDeleteTimelineModal, tableRef.current]);
  var selectedIds = (0, _react.useMemo)(function () {
    return getExportedIds(selectedItems !== null && selectedItems !== void 0 ? selectedItems : []);
  }, [selectedItems]);
  var handleEnableExportTimelineDownloader = (0, _react.useCallback)(function () {
    return enableExportTimelineDownloader();
  }, [enableExportTimelineDownloader]);
  var handleOnOpenDeleteTimelineModal = (0, _react.useCallback)(function () {
    return onOpenDeleteTimelineModal();
  }, [onOpenDeleteTimelineModal]);
  var getBatchItemsPopoverContent = (0, _react.useCallback)(function (closePopover) {
    var _ref2, _ref3, _selectedItems$;

    var isDisabled = (0, _fp.isEmpty)(selectedItems);
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_export_timeline.EditTimelineActions, {
      deleteTimelines: deleteTimelines,
      ids: selectedIds,
      isEnableDownloader: isEnableDownloader,
      isDeleteTimelineModalOpen: isDeleteTimelineModalOpen,
      onComplete: onCompleteBatchActions.bind(null, closePopover),
      title: (selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems.length) !== 1 ? i18n.SELECTED_TIMELINES((_ref2 = selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems.length) !== null && _ref2 !== void 0 ? _ref2 : 0) : (_ref3 = (_selectedItems$ = selectedItems[0]) === null || _selectedItems$ === void 0 ? void 0 : _selectedItems$.title) !== null && _ref3 !== void 0 ? _ref3 : ''
    }), _react.default.createElement(_eui.EuiContextMenuPanel, {
      items: [_react.default.createElement(_eui.EuiContextMenuItem, {
        disabled: isDisabled,
        icon: "exportAction",
        key: "ExportItemKey",
        onClick: handleEnableExportTimelineDownloader
      }, i18n.EXPORT_SELECTED), _react.default.createElement(_eui.EuiContextMenuItem, {
        disabled: isDisabled,
        icon: "trash",
        key: "DeleteItemKey",
        onClick: handleOnOpenDeleteTimelineModal
      }, i18n.DELETE_SELECTED)]
    }));
  }, [deleteTimelines, isEnableDownloader, isDeleteTimelineModalOpen, selectedIds, selectedItems, handleEnableExportTimelineDownloader, handleOnOpenDeleteTimelineModal, onCompleteBatchActions]);
  return {
    onCompleteBatchActions: onCompleteBatchActions,
    getBatchItemsPopoverContent: getBatchItemsPopoverContent
  };
};

exports.useEditTimelinBatchActions = useEditTimelinBatchActions;