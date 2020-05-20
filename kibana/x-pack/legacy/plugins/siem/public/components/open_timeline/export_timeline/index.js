"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditOneTimelineAction = exports.EditTimelineActions = exports.useExportTimeline = void 0;

var _react = _interopRequireWildcard(require("react"));

var _export_timeline = require("./export_timeline");

var _delete_timeline_modal = require("../delete_timeline_modal");

var _api = require("../../../containers/timeline/all/api");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useExportTimeline = function useExportTimeline() {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isEnableDownloader = _useState2[0],
      setIsEnableDownloader = _useState2[1];

  var enableExportTimelineDownloader = (0, _react.useCallback)(function () {
    setIsEnableDownloader(true);
  }, []);
  var disableExportTimelineDownloader = (0, _react.useCallback)(function () {
    setIsEnableDownloader(false);
  }, []);
  return {
    disableExportTimelineDownloader: disableExportTimelineDownloader,
    enableExportTimelineDownloader: enableExportTimelineDownloader,
    isEnableDownloader: isEnableDownloader
  };
};

exports.useExportTimeline = useExportTimeline;

var EditTimelineActionsComponent = function EditTimelineActionsComponent(_ref) {
  var deleteTimelines = _ref.deleteTimelines,
      ids = _ref.ids,
      isEnableDownloader = _ref.isEnableDownloader,
      isDeleteTimelineModalOpen = _ref.isDeleteTimelineModalOpen,
      onComplete = _ref.onComplete,
      title = _ref.title;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_export_timeline.TimelineDownloader, {
    exportedIds: ids,
    getExportedData: _api.exportSelectedTimeline,
    isEnableDownloader: isEnableDownloader,
    onComplete: onComplete
  }), deleteTimelines != null && _react.default.createElement(_delete_timeline_modal.DeleteTimelineModalOverlay, {
    deleteTimelines: deleteTimelines,
    isModalOpen: isDeleteTimelineModalOpen,
    onComplete: onComplete,
    savedObjectIds: ids,
    title: title
  }));
};

var EditTimelineActions = _react.default.memo(EditTimelineActionsComponent);

exports.EditTimelineActions = EditTimelineActions;

var EditOneTimelineAction = _react.default.memo(EditTimelineActionsComponent);

exports.EditOneTimelineAction = EditOneTimelineAction;