"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterPopover = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _uptime_filter_button = require("./uptime_filter_button");

var _toggle_selected_item = require("./toggle_selected_item");

var _monitor_list = require("../monitor_list");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var isItemSelected = function isItemSelected(selectedItems, item) {
  return selectedItems.find(function (selected) {
    return selected === item;
  }) ? 'on' : undefined;
};

var FilterPopover = function FilterPopover(_ref) {
  var fieldName = _ref.fieldName,
      id = _ref.id,
      disabled = _ref.disabled,
      loading = _ref.loading,
      items = _ref.items,
      onFilterFieldChange = _ref.onFilterFieldChange,
      selectedItems = _ref.selectedItems,
      title = _ref.title;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      itemsToDisplay = _useState4[0],
      setItemsToDisplay = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = _slicedToArray(_useState5, 2),
      searchQuery = _useState6[0],
      setSearchQuery = _useState6[1];

  var _useState7 = (0, _react.useState)(selectedItems),
      _useState8 = _slicedToArray(_useState7, 2),
      tempSelectedItems = _useState8[0],
      setTempSelectedItems = _useState8[1];

  (0, _react.useEffect)(function () {
    if (searchQuery !== '') {
      var toDisplay = items.filter(function (item) {
        return item.indexOf(searchQuery) >= 0;
      });
      setItemsToDisplay(toDisplay);
    } else {
      setItemsToDisplay(items);
    }
  }, [searchQuery, items]);
  return _react.default.createElement(_eui.EuiPopover, {
    button: _react.default.createElement(_uptime_filter_button.UptimeFilterButton, {
      isDisabled: disabled,
      isSelected: tempSelectedItems.length > 0,
      numFilters: items.length,
      numActiveFilters: tempSelectedItems.length,
      onClick: function onClick() {
        setIsOpen(!isOpen);
        onFilterFieldChange(fieldName, tempSelectedItems);
      },
      title: title
    }),
    closePopover: function closePopover() {
      setIsOpen(false);
      onFilterFieldChange(fieldName, tempSelectedItems);
    },
    "data-test-subj": "filter-popover_".concat(id),
    id: id,
    isOpen: isOpen,
    ownFocus: true,
    withTitle: true,
    zIndex: 1000
  }, _react.default.createElement(_eui.EuiPopoverTitle, null, _react.default.createElement(_eui.EuiFieldSearch, {
    incremental: true,
    disabled: items.length === 0,
    onSearch: function onSearch(query) {
      return setSearchQuery(query);
    },
    placeholder: loading ? _i18n.i18n.translate('xpack.uptime.filterPopout.loadingMessage', {
      defaultMessage: 'Loading...'
    }) : _i18n.i18n.translate('xpack.uptime.filterPopout.searchMessage', {
      defaultMessage: 'Search {title}',
      values: {
        title: title
      }
    })
  })), !loading && itemsToDisplay.map(function (item) {
    return _react.default.createElement(_eui.EuiFilterSelectItem, {
      checked: isItemSelected(tempSelectedItems, item),
      "data-test-subj": "filter-popover-item_".concat(item),
      key: item,
      onClick: function onClick() {
        return (0, _toggle_selected_item.toggleSelectedItems)(item, tempSelectedItems, setTempSelectedItems);
      }
    }, item);
  }), id === 'location' && items.length === 0 && _react.default.createElement(_monitor_list.LocationLink, null));
};

exports.FilterPopover = FilterPopover;