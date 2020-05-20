"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineDownloader = void 0;

var _react = _interopRequireWildcard(require("react"));

var _uuid = _interopRequireDefault(require("uuid"));

var _generic_downloader = require("../../generic_downloader");

var i18n = _interopRequireWildcard(require("../translations"));

var _toasters = require("../../toasters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ExportTimeline = function ExportTimeline(_ref) {
  var onComplete = _ref.onComplete,
      isEnableDownloader = _ref.isEnableDownloader,
      exportedIds = _ref.exportedIds,
      getExportedData = _ref.getExportedData;

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var onExportSuccess = (0, _react.useCallback)(function (exportCount) {
    if (onComplete != null) {
      onComplete();
    }

    dispatchToaster({
      type: 'addToaster',
      toast: {
        id: _uuid.default.v4(),
        title: i18n.SUCCESSFULLY_EXPORTED_TIMELINES(exportCount),
        color: 'success',
        iconType: 'check'
      }
    });
  }, [dispatchToaster, onComplete]);
  var onExportFailure = (0, _react.useCallback)(function () {
    if (onComplete != null) {
      onComplete();
    }
  }, [onComplete]);
  return _react.default.createElement(_react.default.Fragment, null, exportedIds != null && isEnableDownloader && _react.default.createElement(_generic_downloader.GenericDownloader, {
    "data-test-subj": "export-timeline-downloader",
    exportSelectedData: getExportedData,
    filename: "".concat(i18n.EXPORT_FILENAME, ".ndjson"),
    ids: exportedIds,
    onExportSuccess: onExportSuccess,
    onExportFailure: onExportFailure
  }));
};

ExportTimeline.displayName = 'ExportTimeline';

var TimelineDownloader = _react.default.memo(ExportTimeline);

exports.TimelineDownloader = TimelineDownloader;