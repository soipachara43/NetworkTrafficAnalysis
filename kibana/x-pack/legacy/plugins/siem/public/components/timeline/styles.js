"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventsLoading = exports.EventsHeadingHandle = exports.EventsHeadingExtra = exports.EventsHeadingTitleSpan = exports.EventsHeadingTitleButton = exports.EventsHeading = exports.EventsTdContent = exports.EventsTd = exports.EventsTdGroupData = exports.EventsTdGroupActions = exports.EventsTrSupplement = exports.EventsTrSupplementContainer = exports.EventsTrData = exports.EventsTrGroup = exports.EventsTbody = exports.EventsThContent = exports.EventsTh = exports.EventsThGroupData = exports.EventsThGroupActions = exports.EventsTrHeader = exports.EventsThead = exports.EventsTable = exports.TimelineBody = exports.TimelineBodyGlobalStyle = void 0;

var _eui = require("@elastic/eui");

var _polished = require("polished");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _helpers = require("../drag_and_drop/helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  body.", " .siemTimeline__body {\n    overflow: hidden;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/**
 * TIMELINE BODY
 */
// SIDE EFFECT: the following creates a global class selector
var TimelineBodyGlobalStyle = (0, _styledComponents.createGlobalStyle)(_templateObject(), _helpers.IS_TIMELINE_FIELD_DRAGGING_CLASS_NAME);
exports.TimelineBodyGlobalStyle = TimelineBodyGlobalStyle;

var TimelineBody = _styledComponents.default.div.attrs(function (_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className;
  return {
    className: "siemTimeline__body ".concat(className)
  };
}).withConfig({
  displayName: "TimelineBody",
  componentId: "sc-173qfoz-0"
})(["height:", ";overflow:auto;scrollbar-width:thin;flex:1;&::-webkit-scrollbar{height:", ";width:", ";}&::-webkit-scrollbar-thumb{background-clip:content-box;background-color:", ";border:", " solid transparent;}&::-webkit-scrollbar-corner,&::-webkit-scrollbar-track{background-color:transparent;}"], function (_ref2) {
  var bodyHeight = _ref2.bodyHeight;
  return bodyHeight ? "".concat(bodyHeight, "px") : 'auto';
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.eui.euiScrollBar;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.eui.euiScrollBar;
}, function (_ref5) {
  var theme = _ref5.theme;
  return (0, _polished.rgba)(theme.eui.euiColorDarkShade, 0.5);
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.eui.euiScrollBarCorner;
});

exports.TimelineBody = TimelineBody;
TimelineBody.displayName = 'TimelineBody';
/**
 * EVENTS TABLE
 */

var EventsTable = _styledComponents.default.div.attrs(function (_ref7) {
  var _ref7$className = _ref7.className,
      className = _ref7$className === void 0 ? '' : _ref7$className,
      columnWidths = _ref7.columnWidths;
  return {
    className: "siemEventsTable ".concat(className),
    role: 'table',
    style: {
      minWidth: "".concat(columnWidths, "px")
    }
  };
}).withConfig({
  displayName: "EventsTable",
  componentId: "sc-173qfoz-1"
})([""]);
/* EVENTS HEAD */


exports.EventsTable = EventsTable;

var EventsThead = _styledComponents.default.div.attrs(function (_ref8) {
  var _ref8$className = _ref8.className,
      className = _ref8$className === void 0 ? '' : _ref8$className;
  return {
    className: "siemEventsTable__thead ".concat(className),
    role: 'rowgroup'
  };
}).withConfig({
  displayName: "EventsThead",
  componentId: "sc-173qfoz-2"
})(["background-color:", ";border-bottom:", " solid ", ";position:sticky;top:0;z-index:", ";"], function (_ref9) {
  var theme = _ref9.theme;
  return theme.eui.euiColorEmptyShade;
}, function (_ref10) {
  var theme = _ref10.theme;
  return theme.eui.euiBorderWidthThick;
}, function (_ref11) {
  var theme = _ref11.theme;
  return theme.eui.euiColorLightShade;
}, function (_ref12) {
  var theme = _ref12.theme;
  return theme.eui.euiZLevel1;
});

exports.EventsThead = EventsThead;

var EventsTrHeader = _styledComponents.default.div.attrs(function (_ref13) {
  var className = _ref13.className;
  return {
    className: "siemEventsTable__trHeader ".concat(className),
    role: 'row'
  };
}).withConfig({
  displayName: "EventsTrHeader",
  componentId: "sc-173qfoz-3"
})(["display:flex;"]);

exports.EventsTrHeader = EventsTrHeader;

var EventsThGroupActions = _styledComponents.default.div.attrs(function (_ref14) {
  var _ref14$className = _ref14.className,
      className = _ref14$className === void 0 ? '' : _ref14$className;
  return {
    className: "siemEventsTable__thGroupActions ".concat(className)
  };
}).withConfig({
  displayName: "EventsThGroupActions",
  componentId: "sc-173qfoz-4"
})(["display:flex;flex:0 0 ", ";justify-content:", ";min-width:0;"], function (_ref15) {
  var actionsColumnWidth = _ref15.actionsColumnWidth;
  return "".concat(actionsColumnWidth, "px");
}, function (_ref16) {
  var justifyContent = _ref16.justifyContent;
  return justifyContent;
});

exports.EventsThGroupActions = EventsThGroupActions;

var EventsThGroupData = _styledComponents.default.div.attrs(function (_ref17) {
  var _ref17$className = _ref17.className,
      className = _ref17$className === void 0 ? '' : _ref17$className;
  return {
    className: "siemEventsTable__thGroupData ".concat(className)
  };
}).withConfig({
  displayName: "EventsThGroupData",
  componentId: "sc-173qfoz-5"
})(["display:flex;> div:hover .siemEventsHeading__handle{display:", ";opacity:1;visibility:visible;}"], function (_ref18) {
  var isDragging = _ref18.isDragging;
  return isDragging ? 'none' : 'block';
});

exports.EventsThGroupData = EventsThGroupData;

var EventsTh = _styledComponents.default.div.attrs(function (_ref19) {
  var _ref19$className = _ref19.className,
      className = _ref19$className === void 0 ? '' : _ref19$className;
  return {
    className: "siemEventsTable__th ".concat(className),
    role: 'columnheader'
  };
}).withConfig({
  displayName: "EventsTh",
  componentId: "sc-173qfoz-6"
})(["align-items:center;display:flex;flex-shrink:0;min-width:0;.siemEventsTable__thGroupActions &:first-child:last-child{flex:1;}.siemEventsTable__thGroupData &:hover{background-color:", ";cursor:move;cursor:grab;}> div:focus{outline:0;}[data-rbd-placeholder-context-id]{display:none !important;}"], function (_ref20) {
  var theme = _ref20.theme;
  return theme.eui.euiTableHoverColor;
});

exports.EventsTh = EventsTh;

var EventsThContent = _styledComponents.default.div.attrs(function (_ref21) {
  var _ref21$className = _ref21.className,
      className = _ref21$className === void 0 ? '' : _ref21$className;
  return {
    className: "siemEventsTable__thContent ".concat(className)
  };
}).withConfig({
  displayName: "EventsThContent",
  componentId: "sc-173qfoz-7"
})(["font-size:", ";font-weight:", ";line-height:", ";min-width:0;padding:", ";text-align:", ";width:100%;"], function (_ref22) {
  var theme = _ref22.theme;
  return theme.eui.euiFontSizeXS;
}, function (_ref23) {
  var theme = _ref23.theme;
  return theme.eui.euiFontWeightSemiBold;
}, function (_ref24) {
  var theme = _ref24.theme;
  return theme.eui.euiLineHeight;
}, function (_ref25) {
  var theme = _ref25.theme;
  return theme.eui.paddingSizes.xs;
}, function (_ref26) {
  var textAlign = _ref26.textAlign;
  return textAlign;
});
/* EVENTS BODY */


exports.EventsThContent = EventsThContent;

var EventsTbody = _styledComponents.default.div.attrs(function (_ref27) {
  var _ref27$className = _ref27.className,
      className = _ref27$className === void 0 ? '' : _ref27$className;
  return {
    className: "siemEventsTable__tbody ".concat(className),
    role: 'rowgroup'
  };
}).withConfig({
  displayName: "EventsTbody",
  componentId: "sc-173qfoz-8"
})(["overflow-x:hidden;"]);

exports.EventsTbody = EventsTbody;

var EventsTrGroup = _styledComponents.default.div.attrs(function (_ref28) {
  var _ref28$className = _ref28.className,
      className = _ref28$className === void 0 ? '' : _ref28$className;
  return {
    className: "siemEventsTable__trGroup ".concat(className)
  };
}).withConfig({
  displayName: "EventsTrGroup",
  componentId: "sc-173qfoz-9"
})(["border-bottom:", " solid ", ";", ";&:hover{background-color:", ";}"], function (_ref29) {
  var theme = _ref29.theme;
  return theme.eui.euiBorderWidthThin;
}, function (_ref30) {
  var theme = _ref30.theme;
  return theme.eui.euiColorLightShade;
}, function (_ref31) {
  var theme = _ref31.theme,
      eventType = _ref31.eventType,
      showLeftBorder = _ref31.showLeftBorder;
  return showLeftBorder ? "border-left: 4px solid\n    ".concat(eventType === 'raw' ? theme.eui.euiColorLightShade : theme.eui.euiColorWarning) : '';
}, function (_ref32) {
  var theme = _ref32.theme;
  return theme.eui.euiTableHoverColor;
});

exports.EventsTrGroup = EventsTrGroup;

var EventsTrData = _styledComponents.default.div.attrs(function (_ref33) {
  var _ref33$className = _ref33.className,
      className = _ref33$className === void 0 ? '' : _ref33$className;
  return {
    className: "siemEventsTable__trData ".concat(className),
    role: 'row'
  };
}).withConfig({
  displayName: "EventsTrData",
  componentId: "sc-173qfoz-10"
})(["display:flex;"]);

exports.EventsTrData = EventsTrData;
var TIMELINE_EVENT_DETAILS_OFFSET = 40;

var EventsTrSupplementContainer = _styledComponents.default.div.attrs(function (_ref34) {
  var width = _ref34.width;
  return {
    style: {
      width: "".concat(width - TIMELINE_EVENT_DETAILS_OFFSET, "px")
    }
  };
}).withConfig({
  displayName: "EventsTrSupplementContainer",
  componentId: "sc-173qfoz-11"
})([""]);

exports.EventsTrSupplementContainer = EventsTrSupplementContainer;

var EventsTrSupplement = _styledComponents.default.div.attrs(function (_ref35) {
  var _ref35$className = _ref35.className,
      className = _ref35$className === void 0 ? '' : _ref35$className;
  return {
    className: "siemEventsTable__trSupplement ".concat(className)
  };
}).withConfig({
  displayName: "EventsTrSupplement",
  componentId: "sc-173qfoz-12"
})(["font-size:", ";line-height:", ";padding:0 ", " 0 ", ";"], function (_ref36) {
  var theme = _ref36.theme;
  return theme.eui.euiFontSizeXS;
}, function (_ref37) {
  var theme = _ref37.theme;
  return theme.eui.euiLineHeight;
}, function (_ref38) {
  var theme = _ref38.theme;
  return theme.eui.paddingSizes.xs;
}, function (_ref39) {
  var theme = _ref39.theme;
  return theme.eui.paddingSizes.xl;
});

exports.EventsTrSupplement = EventsTrSupplement;

var EventsTdGroupActions = _styledComponents.default.div.attrs(function (_ref40) {
  var _ref40$className = _ref40.className,
      className = _ref40$className === void 0 ? '' : _ref40$className;
  return {
    className: "siemEventsTable__tdGroupActions ".concat(className)
  };
}).withConfig({
  displayName: "EventsTdGroupActions",
  componentId: "sc-173qfoz-13"
})(["display:flex;justify-content:space-between;flex:0 0 ", ";min-width:0;"], function (_ref41) {
  var actionsColumnWidth = _ref41.actionsColumnWidth;
  return "".concat(actionsColumnWidth, "px");
});

exports.EventsTdGroupActions = EventsTdGroupActions;

var EventsTdGroupData = _styledComponents.default.div.attrs(function (_ref42) {
  var _ref42$className = _ref42.className,
      className = _ref42$className === void 0 ? '' : _ref42$className;
  return {
    className: "siemEventsTable__tdGroupData ".concat(className)
  };
}).withConfig({
  displayName: "EventsTdGroupData",
  componentId: "sc-173qfoz-14"
})(["display:flex;"]);

exports.EventsTdGroupData = EventsTdGroupData;

var EventsTd = _styledComponents.default.div.attrs(function (_ref43) {
  var _ref43$className = _ref43.className,
      className = _ref43$className === void 0 ? '' : _ref43$className,
      width = _ref43.width;
  return {
    className: "siemEventsTable__td ".concat(className),
    role: 'cell',
    style: {
      flexBasis: width ? "".concat(width, "px") : 'auto'
    }
  };
}).withConfig({
  displayName: "EventsTd",
  componentId: "sc-173qfoz-15"
})(["align-items:center;display:flex;flex-shrink:0;min-width:0;.siemEventsTable__tdGroupActions &:first-child:last-child{flex:1;}"]);

exports.EventsTd = EventsTd;

var EventsTdContent = _styledComponents.default.div.attrs(function (_ref44) {
  var className = _ref44.className;
  return {
    className: "siemEventsTable__tdContent ".concat(className)
  };
}).withConfig({
  displayName: "EventsTdContent",
  componentId: "sc-173qfoz-16"
})(["font-size:", ";line-height:", ";min-width:0;padding:", ";text-align:", ";width:100%;"], function (_ref45) {
  var theme = _ref45.theme;
  return theme.eui.euiFontSizeXS;
}, function (_ref46) {
  var theme = _ref46.theme;
  return theme.eui.euiLineHeight;
}, function (_ref47) {
  var theme = _ref47.theme;
  return theme.eui.paddingSizes.xs;
}, function (_ref48) {
  var textAlign = _ref48.textAlign;
  return textAlign;
});
/**
 * EVENTS HEADING
 */


exports.EventsTdContent = EventsTdContent;

var EventsHeading = _styledComponents.default.div.attrs(function (_ref49) {
  var _ref49$className = _ref49.className,
      className = _ref49$className === void 0 ? '' : _ref49$className;
  return {
    className: "siemEventsHeading ".concat(className)
  };
}).withConfig({
  displayName: "EventsHeading",
  componentId: "sc-173qfoz-17"
})(["align-items:center;display:flex;&:hover{cursor:", ";}"], function (_ref50) {
  var isLoading = _ref50.isLoading;
  return isLoading ? 'wait' : 'grab';
});

exports.EventsHeading = EventsHeading;

var EventsHeadingTitleButton = _styledComponents.default.button.attrs(function (_ref51) {
  var _ref51$className = _ref51.className,
      className = _ref51$className === void 0 ? '' : _ref51$className;
  return {
    className: "siemEventsHeading__title siemEventsHeading__title--aggregatable ".concat(className),
    type: 'button'
  };
}).withConfig({
  displayName: "EventsHeadingTitleButton",
  componentId: "sc-173qfoz-18"
})(["align-items:center;display:flex;font-weight:inherit;min-width:0;&:hover,&:focus{color:", ";text-decoration:underline;}&:hover{cursor:pointer;}& > * + *{margin-left:", ";}"], function (_ref52) {
  var theme = _ref52.theme;
  return theme.eui.euiColorPrimary;
}, function (_ref53) {
  var theme = _ref53.theme;
  return theme.eui.euiSizeXS;
});

exports.EventsHeadingTitleButton = EventsHeadingTitleButton;

var EventsHeadingTitleSpan = _styledComponents.default.span.attrs(function (_ref54) {
  var className = _ref54.className;
  return {
    className: "siemEventsHeading__title siemEventsHeading__title--notAggregatable ".concat(className)
  };
}).withConfig({
  displayName: "EventsHeadingTitleSpan",
  componentId: "sc-173qfoz-19"
})(["min-width:0;"]);

exports.EventsHeadingTitleSpan = EventsHeadingTitleSpan;

var EventsHeadingExtra = _styledComponents.default.div.attrs(function (_ref55) {
  var _ref55$className = _ref55.className,
      className = _ref55$className === void 0 ? '' : _ref55$className;
  return {
    className: "siemEventsHeading__extra ".concat(className)
  };
}).withConfig({
  displayName: "EventsHeadingExtra",
  componentId: "sc-173qfoz-20"
})(["margin-left:auto;&.siemEventsHeading__extra--close{opacity:0;transition:all ", " ease;visibility:hidden;.siemEventsTable__th:hover &{opacity:1;visibility:visible;}}"], function (_ref56) {
  var theme = _ref56.theme;
  return theme.eui.euiAnimSpeedNormal;
});

exports.EventsHeadingExtra = EventsHeadingExtra;

var EventsHeadingHandle = _styledComponents.default.div.attrs(function (_ref57) {
  var _ref57$className = _ref57.className,
      className = _ref57$className === void 0 ? '' : _ref57$className;
  return {
    className: "siemEventsHeading__handle ".concat(className)
  };
}).withConfig({
  displayName: "EventsHeadingHandle",
  componentId: "sc-173qfoz-21"
})(["background-color:", ";height:100%;opacity:0;transition:all ", " ease;visibility:hidden;width:", ";&:hover{background-color:", ";cursor:col-resize;}"], function (_ref58) {
  var theme = _ref58.theme;
  return theme.eui.euiBorderColor;
}, function (_ref59) {
  var theme = _ref59.theme;
  return theme.eui.euiAnimSpeedNormal;
}, function (_ref60) {
  var theme = _ref60.theme;
  return theme.eui.euiBorderWidthThick;
}, function (_ref61) {
  var theme = _ref61.theme;
  return theme.eui.euiColorPrimary;
});
/**
 * EVENTS LOADING
 */


exports.EventsHeadingHandle = EventsHeadingHandle;
var EventsLoading = (0, _styledComponents.default)(_eui.EuiLoadingSpinner).withConfig({
  displayName: "EventsLoading",
  componentId: "sc-173qfoz-22"
})(["margin:", ";vertical-align:top;"], function (_ref62) {
  var theme = _ref62.theme;
  return theme.eui.euiSizeXS;
});
exports.EventsLoading = EventsLoading;