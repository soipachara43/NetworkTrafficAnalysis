"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericDownloader = exports.GenericDownloaderComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _fp = require("lodash/fp");

var i18n = _interopRequireWildcard(require("./translations"));

var _toasters = require("../toasters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var InvisibleAnchor = _styledComponents.default.a.withConfig({
  displayName: "InvisibleAnchor",
  componentId: "sc-1baab6f-0"
})(["display:none;"]);

/**
 * Component for downloading Rules as an exported .ndjson file. Download will occur on each update to `rules` param
 *
 * @param filename of file to be downloaded
 * @param payload Rule[]
 *
 */
var GenericDownloaderComponent = function GenericDownloaderComponent(_ref) {
  var exportSelectedData = _ref.exportSelectedData,
      filename = _ref.filename,
      ids = _ref.ids,
      onExportSuccess = _ref.onExportSuccess,
      onExportFailure = _ref.onExportFailure;
  var anchorRef = (0, _react.useRef)(null);

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  (0, _react.useEffect)(function () {
    var isSubscribed = true;
    var abortCtrl = new AbortController();

    var exportData =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var exportResponse, objectURL;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(anchorRef && anchorRef.current && ids != null && ids.length > 0)) {
                  _context.next = 11;
                  break;
                }

                _context.prev = 1;
                _context.next = 4;
                return exportSelectedData({
                  ids: ids,
                  signal: abortCtrl.signal
                });

              case 4:
                exportResponse = _context.sent;

                if (isSubscribed) {
                  // this is for supporting IE
                  if ((0, _fp.isFunction)(window.navigator.msSaveOrOpenBlob)) {
                    window.navigator.msSaveBlob(exportResponse);
                  } else {
                    objectURL = window.URL.createObjectURL(exportResponse); // These are safe-assignments as writes to anchorRef are isolated to exportData

                    anchorRef.current.href = objectURL; // eslint-disable-line require-atomic-updates

                    anchorRef.current.download = filename; // eslint-disable-line require-atomic-updates

                    anchorRef.current.click();
                    window.URL.revokeObjectURL(objectURL);
                  }

                  if (onExportSuccess != null) {
                    onExportSuccess(ids.length);
                  }
                }

                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);

                if (isSubscribed) {
                  if (onExportFailure != null) {
                    onExportFailure();
                  }

                  (0, _toasters.errorToToaster)({
                    title: i18n.EXPORT_FAILURE,
                    error: _context.t0,
                    dispatchToaster: dispatchToaster
                  });
                }

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      }));

      return function exportData() {
        return _ref2.apply(this, arguments);
      };
    }();

    exportData();
    return function () {
      isSubscribed = false;
      abortCtrl.abort();
    };
  }, [ids]);
  return _react.default.createElement(InvisibleAnchor, {
    ref: anchorRef
  });
};

exports.GenericDownloaderComponent = GenericDownloaderComponent;
GenericDownloaderComponent.displayName = 'GenericDownloaderComponent';

var GenericDownloader = _react.default.memo(GenericDownloaderComponent);

exports.GenericDownloader = GenericDownloader;
GenericDownloader.displayName = 'GenericDownloader';