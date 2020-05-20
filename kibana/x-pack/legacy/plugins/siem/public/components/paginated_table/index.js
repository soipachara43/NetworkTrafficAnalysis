"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginatedTable = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _header_section = require("../header_section");

var _loader = require("../loader");

var _toasters = require("../toasters");

var _constants = require("../../../common/constants");

var i18n = _interopRequireWildcard(require("./translations"));

var _panel = require("../panel");

var _inspect = require("../inspect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DEFAULT_DATA_TEST_SUBJ = 'paginated-table';

var PaginatedTableComponent = function PaginatedTableComponent(_ref) {
  var activePage = _ref.activePage,
      columns = _ref.columns,
      _ref$dataTestSubj = _ref.dataTestSubj,
      dataTestSubj = _ref$dataTestSubj === void 0 ? DEFAULT_DATA_TEST_SUBJ : _ref$dataTestSubj,
      headerCount = _ref.headerCount,
      headerSupplement = _ref.headerSupplement,
      headerTitle = _ref.headerTitle,
      headerTooltip = _ref.headerTooltip,
      headerUnit = _ref.headerUnit,
      id = _ref.id,
      isInspect = _ref.isInspect,
      itemsPerRow = _ref.itemsPerRow,
      limit = _ref.limit,
      loading = _ref.loading,
      loadPage = _ref.loadPage,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? _fp.noop : _ref$onChange,
      pageOfItems = _ref.pageOfItems,
      showMorePagesIndicator = _ref.showMorePagesIndicator,
      _ref$sorting = _ref.sorting,
      sorting = _ref$sorting === void 0 ? null : _ref$sorting,
      totalCount = _ref.totalCount,
      updateActivePage = _ref.updateActivePage,
      updateLimitPagination = _ref.updateLimitPagination;

  var _useState = (0, _react.useState)(loading),
      _useState2 = _slicedToArray(_useState, 2),
      myLoading = _useState2[0],
      setMyLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(activePage),
      _useState4 = _slicedToArray(_useState3, 2),
      myActivePage = _useState4[0],
      setActivePage = _useState4[1];

  var _useState5 = (0, _react.useState)(headerCount === -1),
      _useState6 = _slicedToArray(_useState5, 2),
      loadingInitial = _useState6[0],
      setLoadingInitial = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isPopoverOpen = _useState8[0],
      setPopoverOpen = _useState8[1];

  var pageCount = Math.ceil(totalCount / limit);
  var dispatchToaster = (0, _toasters.useStateToaster)()[1];
  (0, _react.useEffect)(function () {
    setActivePage(activePage);
  }, [activePage]);
  (0, _react.useEffect)(function () {
    if (headerCount >= 0 && loadingInitial) {
      setLoadingInitial(false);
    }
  }, [loadingInitial, headerCount]);
  (0, _react.useEffect)(function () {
    setMyLoading(loading);
  }, [loading]);

  var onButtonClick = function onButtonClick() {
    setPopoverOpen(!isPopoverOpen);
  };

  var closePopover = function closePopover() {
    setPopoverOpen(false);
  };

  var goToPage = function goToPage(newActivePage) {
    if ((newActivePage + 1) * limit >= _constants.DEFAULT_MAX_TABLE_QUERY_SIZE) {
      var toast = {
        id: 'PaginationWarningMsg',
        title: headerTitle + i18n.TOAST_TITLE,
        color: 'warning',
        iconType: 'alert',
        toastLifeTimeMs: 10000,
        text: i18n.TOAST_TEXT
      };
      return dispatchToaster({
        type: 'addToaster',
        toast: toast
      });
    }

    setActivePage(newActivePage);
    loadPage(newActivePage);
    updateActivePage(newActivePage);
  };

  var button = _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "xs",
    color: "text",
    iconType: "arrowDown",
    iconSide: "right",
    onClick: onButtonClick
  }, "".concat(i18n.ROWS, ": ").concat(limit));

  var rowItems = itemsPerRow && itemsPerRow.map(function (item) {
    return _react.default.createElement(_eui.EuiContextMenuItem, {
      key: item.text,
      icon: limit === item.numberOfRow ? 'check' : 'empty',
      onClick: function onClick() {
        closePopover();
        updateLimitPagination(item.numberOfRow);
        updateActivePage(0); // reset results to first page
      }
    }, item.text);
  });
  var PaginationWrapper = showMorePagesIndicator ? PaginationEuiFlexItem : _eui.EuiFlexItem;
  return _react.default.createElement(_inspect.InspectButtonContainer, {
    show: !loadingInitial
  }, _react.default.createElement(_panel.Panel, {
    "data-test-subj": "".concat(dataTestSubj, "-loading-").concat(loading),
    loading: loading
  }, _react.default.createElement(_header_section.HeaderSection, {
    id: id,
    subtitle: !loadingInitial && "".concat(i18n.SHOWING, ": ").concat(headerCount >= 0 ? headerCount.toLocaleString() : 0, " ").concat(headerUnit),
    title: headerTitle,
    tooltip: headerTooltip
  }, !loadingInitial && headerSupplement), loadingInitial ? _react.default.createElement(_eui.EuiLoadingContent, {
    "data-test-subj": "initialLoadingPanelPaginatedTable",
    lines: 10
  }) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(BasicTable // @ts-ignore `Columns` interface differs from EUI's `column` type and is used all over this plugin, so ignore the differences instead of refactoring a lot of code
  , {
    columns: columns,
    compressed: true,
    items: pageOfItems,
    onChange: onChange // @ts-ignore TS complains sorting.field is type `never`
    ,
    sorting: sorting ? {
      sort: {
        field: sorting.field,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        direction: sorting.direction
      }
    } : undefined
  }), _react.default.createElement(FooterAction, null, _react.default.createElement(_eui.EuiFlexItem, null, itemsPerRow && itemsPerRow.length > 0 && totalCount >= itemsPerRow[0].numberOfRow && _react.default.createElement(_eui.EuiPopover, {
    id: "customizablePagination",
    "data-test-subj": "loadingMoreSizeRowPopover",
    button: button,
    isOpen: isPopoverOpen,
    closePopover: closePopover,
    panelPaddingSize: "none"
  }, _react.default.createElement(_eui.EuiContextMenuPanel, {
    items: rowItems,
    "data-test-subj": "loadingMorePickSizeRow"
  }))), _react.default.createElement(PaginationWrapper, {
    grow: false
  }, _react.default.createElement(_eui.EuiPagination, {
    "data-test-subj": "numberedPagination",
    pageCount: pageCount,
    activePage: myActivePage,
    onPageClick: goToPage
  }))), (isInspect || myLoading) && _react.default.createElement(_loader.Loader, {
    "data-test-subj": "loadingPanelPaginatedTable",
    overlay: true,
    size: "xl"
  }))));
};

var PaginatedTable = (0, _react.memo)(PaginatedTableComponent);
exports.PaginatedTable = PaginatedTable;
// eslint-disable-line @typescript-eslint/no-explicit-any
var BasicTable = (0, _styledComponents.default)(_eui.EuiBasicTable).withConfig({
  displayName: "BasicTable",
  componentId: "r014wl-0"
})(["tbody{th,td{vertical-align:top;}.euiTableCellContent{display:block;}}"]); // eslint-disable-line @typescript-eslint/no-explicit-any

BasicTable.displayName = 'BasicTable';
var FooterAction = (0, _styledComponents.default)(_eui.EuiFlexGroup).attrs(function () {
  return {
    alignItems: 'center',
    responsive: false
  };
}).withConfig({
  displayName: "FooterAction",
  componentId: "r014wl-1"
})(["margin-top:", ";"], function (_ref2) {
  var theme = _ref2.theme;
  return theme.eui.euiSizeXS;
});
FooterAction.displayName = 'FooterAction';
var PaginationEuiFlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "PaginationEuiFlexItem",
  componentId: "r014wl-2"
})(["@media only screen and (min-width:", "){.euiButtonIcon:last-child{margin-left:28px;}.euiPagination{position:relative;}.euiPagination::before{bottom:0;color:", ";content:'\\2026';font-size:", ";padding:5px ", ";position:absolute;right:", ";}}"], function (_ref3) {
  var theme = _ref3.theme;
  return theme.eui.euiBreakpoints.m;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.eui.euiButtonColorDisabled;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.eui.euiFontSizeS;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.eui.euiSizeS;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.eui.euiSizeL;
});
PaginationEuiFlexItem.displayName = 'PaginationEuiFlexItem';