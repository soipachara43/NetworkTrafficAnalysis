"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelinesPage = exports.TimelinesPageComponent = exports.DEFAULT_SEARCH_RESULTS_PER_PAGE = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui = require("@elastic/eui");

var _header_page = require("../../components/header_page");

var _open_timeline = require("../../components/open_timeline");

var _wrapper_page = require("../../components/wrapper_page");

var _spy_routes = require("../../utils/route/spy_routes");

var i18n = _interopRequireWildcard(require("./translations"));

var _kibana = require("../../lib/kibana");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TimelinesContainer = _styledComponents.default.div.withConfig({
  displayName: "TimelinesContainer",
  componentId: "sc-13xcnag-0"
})(["width:100%;"]);

var DEFAULT_SEARCH_RESULTS_PER_PAGE = 10;
exports.DEFAULT_SEARCH_RESULTS_PER_PAGE = DEFAULT_SEARCH_RESULTS_PER_PAGE;

var TimelinesPageComponent = function TimelinesPageComponent(_ref) {
  var apolloClient = _ref.apolloClient;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      importDataModalToggle = _useState2[0],
      setImportDataModalToggle = _useState2[1];

  var onImportTimelineBtnClick = (0, _react.useCallback)(function () {
    setImportDataModalToggle(true);
  }, [setImportDataModalToggle]);
  var uiCapabilities = (0, _kibana.useKibana)().services.application.capabilities;
  var capabilitiesCanUserCRUD = typeof uiCapabilities.siem.crud === 'boolean' ? uiCapabilities.siem.crud : false;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_wrapper_page.WrapperPage, null, _react.default.createElement(_header_page.HeaderPage, {
    border: true,
    title: i18n.PAGE_TITLE
  }, capabilitiesCanUserCRUD && _react.default.createElement(_eui.EuiButton, {
    iconType: "indexOpen",
    onClick: onImportTimelineBtnClick,
    "data-test-subj": "open-import-data-modal-btn"
  }, i18n.ALL_TIMELINES_IMPORT_TIMELINE_TITLE)), _react.default.createElement(TimelinesContainer, null, _react.default.createElement(_open_timeline.StatefulOpenTimeline, {
    apolloClient: apolloClient,
    defaultPageSize: DEFAULT_SEARCH_RESULTS_PER_PAGE,
    isModal: false,
    importDataModalToggle: importDataModalToggle && capabilitiesCanUserCRUD,
    setImportDataModalToggle: setImportDataModalToggle,
    title: i18n.ALL_TIMELINES_PANEL_TITLE,
    "data-test-subj": "stateful-open-timeline"
  }))), _react.default.createElement(_spy_routes.SpyRoute, null));
};

exports.TimelinesPageComponent = TimelinesPageComponent;

var TimelinesPage = _react.default.memo(TimelinesPageComponent);

exports.TimelinesPage = TimelinesPage;