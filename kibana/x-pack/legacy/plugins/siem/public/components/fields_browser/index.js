"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatefulFieldsBrowser = exports.StatefulFieldsBrowserComponent = exports.INPUT_TIMEOUT = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _actions = require("../../store/actions");

var _default_headers = require("../timeline/body/column_headers/default_headers");

var _field_browser = require("./field_browser");

var _helpers = require("./helpers");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var fieldsButtonClassName = 'fields-button';
/** wait this many ms after the user completes typing before applying the filter input */

var INPUT_TIMEOUT = 250;
exports.INPUT_TIMEOUT = INPUT_TIMEOUT;

var FieldsBrowserButtonContainer = _styledComponents.default.div.withConfig({
  displayName: "FieldsBrowserButtonContainer",
  componentId: "sc-1mz0lp1-0"
})(["position:relative;"]);

FieldsBrowserButtonContainer.displayName = 'FieldsBrowserButtonContainer';
/**
 * Manages the state of the field browser
 */

var StatefulFieldsBrowserComponent = _react.default.memo(function (_ref) {
  var columnHeaders = _ref.columnHeaders,
      browserFields = _ref.browserFields,
      height = _ref.height,
      _ref$isEventViewer = _ref.isEventViewer,
      isEventViewer = _ref$isEventViewer === void 0 ? false : _ref$isEventViewer,
      onFieldSelected = _ref.onFieldSelected,
      onUpdateColumns = _ref.onUpdateColumns,
      timelineId = _ref.timelineId,
      toggleColumn = _ref.toggleColumn,
      width = _ref.width;

  /** tracks the latest timeout id from `setTimeout`*/
  var inputTimeoutId = (0, _react.useRef)(0);
  /** all field names shown in the field browser must contain this string (when specified) */

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      filterInput = _useState2[0],
      setFilterInput = _useState2[1];
  /** all fields in this collection have field names that match the filterInput */


  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      filteredBrowserFields = _useState4[0],
      setFilteredBrowserFields = _useState4[1];
  /** when true, show a spinner in the input to indicate the field browser is searching for matching field names */


  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isSearching = _useState6[0],
      setIsSearching = _useState6[1];
  /** this category will be displayed in the right-hand pane of the field browser */


  var _useState7 = (0, _react.useState)(_default_headers.DEFAULT_CATEGORY_NAME),
      _useState8 = _slicedToArray(_useState7, 2),
      selectedCategoryId = _useState8[0],
      setSelectedCategoryId = _useState8[1];
  /** show the field browser */


  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      show = _useState10[0],
      setShow = _useState10[1];

  (0, _react.useEffect)(function () {
    return function () {
      if (inputTimeoutId.current !== 0) {
        // ⚠️ mutation: cancel any remaining timers and zero-out the timer id:
        clearTimeout(inputTimeoutId.current);
        inputTimeoutId.current = 0;
      }
    };
  }, []);
  /** Shows / hides the field browser */

  var toggleShow = (0, _react.useCallback)(function () {
    setShow(!show);
  }, [show]);
  /** Invoked when the user types in the filter input */

  var updateFilter = (0, _react.useCallback)(function (newFilterInput) {
    setFilterInput(newFilterInput);
    setIsSearching(true);

    if (inputTimeoutId.current !== 0) {
      clearTimeout(inputTimeoutId.current); // ⚠️ mutation: cancel any previous timers
    } // ⚠️ mutation: schedule a new timer that will apply the filter when it fires:


    inputTimeoutId.current = window.setTimeout(function () {
      var newFilteredBrowserFields = (0, _helpers.filterBrowserFieldsByFieldName)({
        browserFields: (0, _helpers.mergeBrowserFieldsWithDefaultCategory)(browserFields),
        substring: newFilterInput
      });
      setFilteredBrowserFields(newFilteredBrowserFields);
      setIsSearching(false);
      var newSelectedCategoryId = newFilterInput === '' || Object.keys(newFilteredBrowserFields).length === 0 ? _default_headers.DEFAULT_CATEGORY_NAME : Object.keys(newFilteredBrowserFields).sort().reduce(function (selected, category) {
        return newFilteredBrowserFields[category].fields != null && newFilteredBrowserFields[selected].fields != null && Object.keys(newFilteredBrowserFields[category].fields).length > Object.keys(newFilteredBrowserFields[selected].fields).length ? category : selected;
      }, Object.keys(newFilteredBrowserFields)[0]);
      setSelectedCategoryId(newSelectedCategoryId);
    }, INPUT_TIMEOUT);
  }, [browserFields, filterInput, inputTimeoutId.current]);
  /**
   * Invoked when the user clicks a category name in the left-hand side of
   * the field browser
   */

  var updateSelectedCategoryId = (0, _react.useCallback)(function (categoryId) {
    setSelectedCategoryId(categoryId);
  }, []);
  /**
   * Invoked when the user clicks on the context menu to view a category's
   * columns in the timeline, this function dispatches the action that
   * causes the timeline display those columns.
   */

  var updateColumnsAndSelectCategoryId = (0, _react.useCallback)(function (columns) {
    onUpdateColumns(columns); // show the category columns in the timeline
  }, []);
  /** Invoked when the field browser should be hidden */

  var hideFieldBrowser = (0, _react.useCallback)(function () {
    setFilterInput('');
    setFilterInput('');
    setFilteredBrowserFields(null);
    setIsSearching(false);
    setSelectedCategoryId(_default_headers.DEFAULT_CATEGORY_NAME);
    setShow(false);
  }, []); // only merge in the default category if the field browser is visible

  var browserFieldsWithDefaultCategory = (0, _react.useMemo)(function () {
    return show ? (0, _helpers.mergeBrowserFieldsWithDefaultCategory)(browserFields) : {};
  }, [show, browserFields]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(FieldsBrowserButtonContainer, {
    "data-test-subj": "fields-browser-button-container"
  }, _react.default.createElement(_eui.EuiToolTip, {
    content: i18n.CUSTOMIZE_COLUMNS
  }, isEventViewer ? _react.default.createElement(_eui.EuiButtonIcon, {
    "aria-label": i18n.CUSTOMIZE_COLUMNS,
    className: fieldsButtonClassName,
    "data-test-subj": "show-field-browser-gear",
    iconType: "list",
    onClick: toggleShow
  }) : _react.default.createElement(_eui.EuiButtonEmpty, {
    className: fieldsButtonClassName,
    "data-test-subj": "show-field-browser",
    iconType: "list",
    onClick: toggleShow,
    size: "xs"
  }, i18n.FIELDS)), show && _react.default.createElement(_field_browser.FieldsBrowser, {
    browserFields: browserFieldsWithDefaultCategory,
    columnHeaders: columnHeaders,
    filteredBrowserFields: filteredBrowserFields != null ? filteredBrowserFields : browserFieldsWithDefaultCategory,
    height: height,
    isEventViewer: isEventViewer,
    isSearching: isSearching,
    onCategorySelected: updateSelectedCategoryId,
    onFieldSelected: onFieldSelected,
    onHideFieldBrowser: hideFieldBrowser,
    onOutsideClick: show ? hideFieldBrowser : _fp.noop,
    onSearchInputChange: updateFilter,
    onUpdateColumns: updateColumnsAndSelectCategoryId,
    searchInput: filterInput,
    selectedCategoryId: selectedCategoryId,
    timelineId: timelineId,
    toggleColumn: toggleColumn,
    width: width
  })));
});

exports.StatefulFieldsBrowserComponent = StatefulFieldsBrowserComponent;
var mapDispatchToProps = {
  removeColumn: _actions.timelineActions.removeColumn,
  upsertColumn: _actions.timelineActions.upsertColumn
};
var connector = (0, _reactRedux.connect)(null, mapDispatchToProps);
var StatefulFieldsBrowser = connector(_react.default.memo(StatefulFieldsBrowserComponent));
exports.StatefulFieldsBrowser = StatefulFieldsBrowser;