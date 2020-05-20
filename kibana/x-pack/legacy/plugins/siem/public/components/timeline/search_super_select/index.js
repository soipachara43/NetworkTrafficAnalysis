"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchTimelineSuperSelect = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _selectable_timeline = require("../selectable_timeline");

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  .euiPopover__panel.euiPopover__panel-isOpen.timeline-search-super-select-popover__popoverPanel {\n    visibility: hidden;\n    z-index: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SearchTimelineSuperSelectGlobalStyle = (0, _styledComponents.createGlobalStyle)(_templateObject());
var basicSuperSelectOptions = [{
  value: '-1',
  inputDisplay: i18n.DEFAULT_TIMELINE_TITLE
}];

var getBasicSelectableOptions = function getBasicSelectableOptions(timelineId) {
  return [{
    description: i18n.DEFAULT_TIMELINE_DESCRIPTION,
    favorite: [],
    label: i18n.DEFAULT_TIMELINE_TITLE,
    id: undefined,
    title: i18n.DEFAULT_TIMELINE_TITLE,
    checked: timelineId === '-1' ? 'on' : undefined
  }];
};

var SearchTimelineSuperSelectComponent = function SearchTimelineSuperSelectComponent(_ref) {
  var isDisabled = _ref.isDisabled,
      _ref$hideUntitled = _ref.hideUntitled,
      hideUntitled = _ref$hideUntitled === void 0 ? false : _ref$hideUntitled,
      timelineId = _ref.timelineId,
      timelineTitle = _ref.timelineTitle,
      onTimelineChange = _ref.onTimelineChange;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setIsPopoverOpen = _useState2[1];

  var handleClosePopover = (0, _react.useCallback)(function () {
    setIsPopoverOpen(false);
  }, []);
  var handleOpenPopover = (0, _react.useCallback)(function () {
    setIsPopoverOpen(true);
  }, []);
  var superSelect = (0, _react.useMemo)(function () {
    return _react.default.createElement(_eui.EuiSuperSelect, {
      disabled: isDisabled,
      onFocus: handleOpenPopover,
      options: timelineId == null ? basicSuperSelectOptions : [{
        value: timelineId,
        inputDisplay: timelineTitle
      }],
      valueOfSelected: timelineId == null ? '-1' : timelineId,
      itemLayoutAlign: "top",
      hasDividers: false,
      popoverClassName: "timeline-search-super-select-popover"
    });
  }, [handleOpenPopover, isDisabled, timelineId, timelineTitle]);
  var handleGetSelectableOptions = (0, _react.useCallback)(function (_ref2) {
    var timelines = _ref2.timelines,
        onlyFavorites = _ref2.onlyFavorites,
        searchTimelineValue = _ref2.searchTimelineValue;
    return [].concat(_toConsumableArray(!onlyFavorites && searchTimelineValue === '' ? getBasicSelectableOptions(timelineId == null ? '-1' : timelineId) : []), _toConsumableArray(timelines.filter(function (t) {
      return !hideUntitled || t.title !== '';
    }).map(function (t, index) {
      return {
        description: t.description,
        favorite: t.favorite,
        label: t.title,
        id: t.savedObjectId,
        key: "".concat(t.title, "-").concat(index),
        title: t.title,
        checked: t.savedObjectId === timelineId ? 'on' : undefined
      };
    })));
  }, [hideUntitled, timelineId]);
  return _react.default.createElement(_eui.EuiInputPopover, {
    id: "searchTimelinePopover",
    input: superSelect,
    isOpen: isPopoverOpen,
    closePopover: handleClosePopover
  }, _react.default.createElement(_selectable_timeline.SelectableTimeline, {
    hideUntitled: hideUntitled,
    getSelectableOptions: handleGetSelectableOptions,
    onClosePopover: handleClosePopover,
    onTimelineChange: onTimelineChange
  }), _react.default.createElement(SearchTimelineSuperSelectGlobalStyle, null));
};

var SearchTimelineSuperSelect = (0, _react.memo)(SearchTimelineSuperSelectComponent);
exports.SearchTimelineSuperSelect = SearchTimelineSuperSelect;