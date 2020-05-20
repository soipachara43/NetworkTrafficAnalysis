"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterPopover = exports.FilterPopoverComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var ScrollableDiv = _styledComponents.default.div.withConfig({
  displayName: "ScrollableDiv",
  componentId: "sc-1y3jbsa-0"
})(["max-height:250px;overflow:auto;"]);

var toggleSelectedGroup = function toggleSelectedGroup(group, selectedGroups) {
  var selectedGroupIndex = selectedGroups.indexOf(group);

  if (selectedGroupIndex >= 0) {
    return [].concat(_toConsumableArray(selectedGroups.slice(0, selectedGroupIndex)), _toConsumableArray(selectedGroups.slice(selectedGroupIndex + 1)));
  }

  return [].concat(_toConsumableArray(selectedGroups), [group]);
};
/**
 * Popover for selecting a field to filter on
 *
 * @param buttonLabel label on dropdwon button
 * @param onSelectedOptionsChanged change listener to be notified when option selection changes
 * @param options to display for filtering
 * @param optionsEmptyLabel shows when options empty
 * @param selectedOptions manage state of selectedOptions
 */


var FilterPopoverComponent = function FilterPopoverComponent(_ref) {
  var buttonLabel = _ref.buttonLabel,
      onSelectedOptionsChanged = _ref.onSelectedOptionsChanged,
      options = _ref.options,
      optionsEmptyLabel = _ref.optionsEmptyLabel,
      selectedOptions = _ref.selectedOptions;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setIsPopoverOpen = _useState2[1];

  var setIsPopoverOpenCb = (0, _react.useCallback)(function () {
    return setIsPopoverOpen(!isPopoverOpen);
  }, [isPopoverOpen]);
  var toggleSelectedGroupCb = (0, _react.useCallback)(function (option) {
    return onSelectedOptionsChanged(toggleSelectedGroup(option, selectedOptions));
  }, [selectedOptions, onSelectedOptionsChanged]);
  return _react.default.createElement(_eui.EuiPopover, {
    ownFocus: true,
    button: _react.default.createElement(_eui.EuiFilterButton, {
      "data-test-subj": "options-filter-popover-button-".concat(buttonLabel),
      iconType: "arrowDown",
      onClick: setIsPopoverOpenCb,
      isSelected: isPopoverOpen,
      numFilters: options.length,
      hasActiveFilters: selectedOptions.length > 0,
      numActiveFilters: selectedOptions.length,
      "aria-label": buttonLabel
    }, buttonLabel),
    isOpen: isPopoverOpen,
    closePopover: setIsPopoverOpenCb,
    panelPaddingSize: "none"
  }, _react.default.createElement(ScrollableDiv, null, options.map(function (option, index) {
    return _react.default.createElement(_eui.EuiFilterSelectItem, {
      checked: selectedOptions.includes(option) ? 'on' : undefined,
      key: "".concat(index, "-").concat(option),
      onClick: toggleSelectedGroupCb.bind(null, option)
    }, option);
  })), options.length === 0 && _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "m",
    justifyContent: "spaceAround"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiText, null, optionsEmptyLabel)))));
};

exports.FilterPopoverComponent = FilterPopoverComponent;
FilterPopoverComponent.displayName = 'FilterPopoverComponent';

var FilterPopover = _react.default.memo(FilterPopoverComponent);

exports.FilterPopover = FilterPopover;
FilterPopover.displayName = 'FilterPopover';