"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagsFilterPopover = exports.TagsFilterPopoverComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var i18n = _interopRequireWildcard(require("../../translations"));

var _toggle_selected_group = require("../../../../../components/ml_popover/jobs_table/filters/toggle_selected_group");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ScrollableDiv = _styledComponents.default.div.withConfig({
  displayName: "ScrollableDiv",
  componentId: "y3c26h-0"
})(["max-height:250px;overflow:auto;"]);
/**
 * Popover for selecting tags to filter on
 *
 * @param tags to display for filtering
 * @param onSelectedTagsChanged change listener to be notified when tag selection changes
 */


var TagsFilterPopoverComponent = function TagsFilterPopoverComponent(_ref) {
  var tags = _ref.tags,
      selectedTags = _ref.selectedTags,
      onSelectedTagsChanged = _ref.onSelectedTagsChanged;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isTagPopoverOpen = _useState2[0],
      setIsTagPopoverOpen = _useState2[1];

  return _react.default.createElement(_eui.EuiPopover, {
    ownFocus: true,
    button: _react.default.createElement(_eui.EuiFilterButton, {
      "data-test-subj": 'tags-filter-popover-button',
      iconType: "arrowDown",
      onClick: function onClick() {
        return setIsTagPopoverOpen(!isTagPopoverOpen);
      },
      isSelected: isTagPopoverOpen,
      hasActiveFilters: selectedTags.length > 0,
      numActiveFilters: selectedTags.length
    }, i18n.TAGS),
    isOpen: isTagPopoverOpen,
    closePopover: function closePopover() {
      return setIsTagPopoverOpen(!isTagPopoverOpen);
    },
    panelPaddingSize: "none"
  }, _react.default.createElement(ScrollableDiv, null, tags.map(function (tag, index) {
    return _react.default.createElement(_eui.EuiFilterSelectItem, {
      checked: selectedTags.includes(tag) ? 'on' : undefined,
      key: "".concat(index, "-").concat(tag),
      onClick: function onClick() {
        return (0, _toggle_selected_group.toggleSelectedGroup)(tag, selectedTags, onSelectedTagsChanged);
      }
    }, "".concat(tag));
  })), tags.length === 0 && _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "m",
    justifyContent: "spaceAround"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiText, null, i18n.NO_TAGS_AVAILABLE)))));
};

exports.TagsFilterPopoverComponent = TagsFilterPopoverComponent;
TagsFilterPopoverComponent.displayName = 'TagsFilterPopoverComponent';

var TagsFilterPopover = _react.default.memo(TagsFilterPopoverComponent);

exports.TagsFilterPopover = TagsFilterPopover;
TagsFilterPopover.displayName = 'TagsFilterPopover';