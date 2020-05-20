"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Footer = exports.FooterComponent = exports.PagingControl = exports.PagingControlComponent = exports.EventsCount = exports.EventsCountComponent = exports.footerHeight = exports.ServerSideEventCount = exports.isCompactFooter = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _loading = require("../../loading");

var _last_updated = require("./last_updated");

var i18n = _interopRequireWildcard(require("./translations"));

var _timeline_context = require("../timeline_context");

var _event_details_width_context = require("../../events_viewer/event_details_width_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var isCompactFooter = function isCompactFooter(width) {
  return width < 600;
};

exports.isCompactFooter = isCompactFooter;

var FixedWidthLastUpdatedContainer = _react2.default.memo(function (_ref) {
  var updatedAt = _ref.updatedAt;
  var width = (0, _event_details_width_context.useEventDetailsWidthContext)();
  var compact = (0, _react2.useMemo)(function () {
    return isCompactFooter(width);
  }, [width]);
  return _react2.default.createElement(FixedWidthLastUpdated, {
    "data-test-subj": "fixed-width-last-updated",
    compact: compact
  }, _react2.default.createElement(_last_updated.LastUpdatedAt, {
    updatedAt: updatedAt,
    compact: compact
  }));
});

FixedWidthLastUpdatedContainer.displayName = 'FixedWidthLastUpdatedContainer';

var FixedWidthLastUpdated = _styledComponents.default.div.withConfig({
  displayName: "FixedWidthLastUpdated",
  componentId: "sc-13vqv53-0"
})(["width:", "px;overflow:hidden;text-align:end;"], function (_ref2) {
  var compact = _ref2.compact;
  return !compact ? 200 : 25;
});

FixedWidthLastUpdated.displayName = 'FixedWidthLastUpdated';
var FooterContainer = (0, _styledComponents.default)(_eui.EuiFlexGroup).attrs(function (_ref3) {
  var height = _ref3.height;
  return {
    style: {
      height: "".concat(height, "px")
    }
  };
}).withConfig({
  displayName: "FooterContainer",
  componentId: "sc-13vqv53-1"
})(["flex:0;"]);
FooterContainer.displayName = 'FooterContainer';
var FooterFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "FooterFlexGroup",
  componentId: "sc-13vqv53-2"
})(["height:35px;width:100%;"]);
FooterFlexGroup.displayName = 'FooterFlexGroup';

var LoadingPanelContainer = _styledComponents.default.div.withConfig({
  displayName: "LoadingPanelContainer",
  componentId: "sc-13vqv53-3"
})(["padding-top:3px;"]);

LoadingPanelContainer.displayName = 'LoadingPanelContainer';
var PopoverRowItems = (0, _styledComponents.default)(_eui.EuiPopover).withConfig({
  displayName: "PopoverRowItems",
  componentId: "sc-13vqv53-4"
})([".euiButtonEmpty__content{padding:0px 0px;}"]);
PopoverRowItems.displayName = 'PopoverRowItems';

var ServerSideEventCount = _styledComponents.default.div.withConfig({
  displayName: "ServerSideEventCount",
  componentId: "sc-13vqv53-5"
})(["margin:0 5px 0 5px;"]);

exports.ServerSideEventCount = ServerSideEventCount;
ServerSideEventCount.displayName = 'ServerSideEventCount';
/** The height of the footer, exported for use in height calculations */

var footerHeight = 40; // px

/** Displays the server-side count of events */

exports.footerHeight = footerHeight;

var EventsCountComponent = function EventsCountComponent(_ref4) {
  var _timelineTypeContext$, _timelineTypeContext$2;

  var closePopover = _ref4.closePopover,
      isOpen = _ref4.isOpen,
      items = _ref4.items,
      itemsCount = _ref4.itemsCount,
      onClick = _ref4.onClick,
      serverSideEventCount = _ref4.serverSideEventCount;
  var timelineTypeContext = (0, _timeline_context.useTimelineTypeContext)();
  return _react2.default.createElement("h5", null, _react2.default.createElement(PopoverRowItems, {
    className: "footer-popover",
    id: "customizablePagination",
    "data-test-subj": "timelineSizeRowPopover",
    button: _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiBadge, {
      "data-test-subj": "local-events-count",
      color: "hollow"
    }, itemsCount, _react2.default.createElement(_eui.EuiButtonEmpty, {
      size: "s",
      color: "text",
      iconType: "arrowDown",
      iconSide: "right",
      onClick: onClick
    })), " ".concat(i18n.OF, " ")),
    isOpen: isOpen,
    closePopover: closePopover,
    panelPaddingSize: "none"
  }, _react2.default.createElement(_eui.EuiContextMenuPanel, {
    items: items,
    "data-test-subj": "timelinePickSizeRow"
  })), _react2.default.createElement(_eui.EuiToolTip, {
    content: "".concat(serverSideEventCount, " ").concat((_timelineTypeContext$ = timelineTypeContext.footerText) !== null && _timelineTypeContext$ !== void 0 ? _timelineTypeContext$ : i18n.TOTAL_COUNT_OF_EVENTS)
  }, _react2.default.createElement(ServerSideEventCount, null, _react2.default.createElement(_eui.EuiBadge, {
    color: "hollow",
    "data-test-subj": "server-side-event-count"
  }, serverSideEventCount), ' ', (_timelineTypeContext$2 = timelineTypeContext.documentType) !== null && _timelineTypeContext$2 !== void 0 ? _timelineTypeContext$2 : i18n.EVENTS)));
};

exports.EventsCountComponent = EventsCountComponent;
EventsCountComponent.displayName = 'EventsCountComponent';

var EventsCount = _react2.default.memo(EventsCountComponent);

exports.EventsCount = EventsCount;
EventsCount.displayName = 'EventsCount';

var PagingControlComponent = function PagingControlComponent(_ref5) {
  var hasNextPage = _ref5.hasNextPage,
      isLoading = _ref5.isLoading,
      loadMore = _ref5.loadMore;
  return _react2.default.createElement(_react2.default.Fragment, null, hasNextPage && _react2.default.createElement(_eui.EuiButton, {
    "data-test-subj": "TimelineMoreButton",
    isLoading: isLoading,
    onClick: loadMore,
    size: "s"
  }, isLoading ? "".concat(i18n.LOADING, "...") : i18n.LOAD_MORE));
};

exports.PagingControlComponent = PagingControlComponent;
PagingControlComponent.displayName = 'PagingControlComponent';

var PagingControl = _react2.default.memo(PagingControlComponent);

exports.PagingControl = PagingControl;
PagingControl.displayName = 'PagingControl';

/** Renders a loading indicator and paging controls */
var FooterComponent = function FooterComponent(_ref6) {
  var getUpdatedAt = _ref6.getUpdatedAt,
      hasNextPage = _ref6.hasNextPage,
      height = _ref6.height,
      isLive = _ref6.isLive,
      isLoading = _ref6.isLoading,
      itemsCount = _ref6.itemsCount,
      itemsPerPage = _ref6.itemsPerPage,
      itemsPerPageOptions = _ref6.itemsPerPageOptions,
      nextCursor = _ref6.nextCursor,
      onChangeItemsPerPage = _ref6.onChangeItemsPerPage,
      onLoadMore = _ref6.onLoadMore,
      serverSideEventCount = _ref6.serverSideEventCount,
      tieBreaker = _ref6.tieBreaker;

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setIsPopoverOpen = _useState2[1];

  var _useState3 = (0, _react2.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      paginationLoading = _useState4[0],
      setPaginationLoading = _useState4[1];

  var _useState5 = (0, _react2.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      updatedAt = _useState6[0],
      setUpdatedAt = _useState6[1];

  var timelineTypeContext = (0, _timeline_context.useTimelineTypeContext)();
  var loadMore = (0, _react2.useCallback)(function () {
    setPaginationLoading(true);
    onLoadMore(nextCursor, tieBreaker);
  }, [nextCursor, tieBreaker, onLoadMore, setPaginationLoading]);
  var onButtonClick = (0, _react2.useCallback)(function () {
    return setIsPopoverOpen(!isPopoverOpen);
  }, [isPopoverOpen, setIsPopoverOpen]);
  var closePopover = (0, _react2.useCallback)(function () {
    return setIsPopoverOpen(false);
  }, [setIsPopoverOpen]);
  (0, _react2.useEffect)(function () {
    if (paginationLoading && !isLoading) {
      setPaginationLoading(false);
      setUpdatedAt(getUpdatedAt());
    }

    if (updatedAt === null || !isLoading) {
      setUpdatedAt(getUpdatedAt());
    }
  }, [isLoading]);

  if (isLoading && !paginationLoading) {
    var _timelineTypeContext$3;

    return _react2.default.createElement(LoadingPanelContainer, null, _react2.default.createElement(_loading.LoadingPanel, {
      "data-test-subj": "LoadingPanelTimeline",
      height: "35px",
      showBorder: false,
      text: "".concat((_timelineTypeContext$3 = timelineTypeContext.loadingText) !== null && _timelineTypeContext$3 !== void 0 ? _timelineTypeContext$3 : i18n.LOADING_TIMELINE_DATA, "..."),
      width: "100%"
    }));
  }

  var rowItems = itemsPerPageOptions && itemsPerPageOptions.map(function (item) {
    return _react2.default.createElement(_eui.EuiContextMenuItem, {
      key: item,
      icon: itemsPerPage === item ? 'check' : 'empty',
      onClick: function onClick() {
        closePopover();
        onChangeItemsPerPage(item);
      }
    }, "".concat(item, " ").concat(i18n.ROWS));
  });
  return _react2.default.createElement(FooterContainer, {
    "data-test-subj": "timeline-footer",
    direction: "column",
    gutterSize: "none",
    height: height,
    justifyContent: "spaceAround"
  }, _react2.default.createElement(FooterFlexGroup, {
    alignItems: "center",
    "data-test-subj": "footer-flex-group",
    direction: "row",
    gutterSize: "none",
    justifyContent: "spaceBetween"
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "event-count-container",
    grow: false
  }, _react2.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    "data-test-subj": "events-count",
    direction: "row",
    gutterSize: "none"
  }, _react2.default.createElement(EventsCount, {
    closePopover: closePopover,
    isOpen: isPopoverOpen,
    items: rowItems,
    itemsCount: itemsCount,
    onClick: onButtonClick,
    serverSideEventCount: serverSideEventCount
  }))), _react2.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "paging-control-container",
    grow: false
  }, isLive ? _react2.default.createElement(_eui.EuiText, {
    size: "s",
    "data-test-subj": "is-live-on-message"
  }, _react2.default.createElement("b", null, i18n.AUTO_REFRESH_ACTIVE, ' ', _react2.default.createElement(_eui.EuiIconTip, {
    color: "subdued",
    content: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.siem.footer.autoRefreshActiveTooltip",
      defaultMessage: "While auto-refresh is enabled, timeline will show you the latest {numberOfItems} events that match your query.",
      values: {
        numberOfItems: itemsCount
      }
    }),
    type: "iInCircle"
  }))) : _react2.default.createElement(PagingControl, {
    "data-test-subj": "paging-control",
    hasNextPage: hasNextPage,
    isLoading: isLoading,
    loadMore: loadMore
  })), _react2.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "last-updated-container",
    grow: false
  }, _react2.default.createElement(FixedWidthLastUpdatedContainer, {
    updatedAt: updatedAt || getUpdatedAt()
  }))));
};

exports.FooterComponent = FooterComponent;
FooterComponent.displayName = 'FooterComponent';

var Footer = _react2.default.memo(FooterComponent);

exports.Footer = Footer;
Footer.displayName = 'Footer';