"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverflowField = exports.OverflowFieldComponent = exports.Popover = exports.PopoverComponent = exports.getRowItemOverflow = exports.getRowItemDraggables = exports.getRowItemDraggable = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _draggable_wrapper = require("../drag_and_drop/draggable_wrapper");

var _helpers = require("../drag_and_drop/helpers");

var _empty_value = require("../empty_value");

var _page = require("../page");

var _data_provider = require("../timeline/data_providers/data_provider");

var _provider = require("../timeline/data_providers/provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Subtext = _styledComponents.default.div.withConfig({
  displayName: "Subtext",
  componentId: "sc-1q9s102-0"
})(["font-size:", ";"], function (props) {
  return props.theme.eui.euiFontSizeXS;
});

var getRowItemDraggable = function getRowItemDraggable(_ref) {
  var rowItem = _ref.rowItem,
      attrName = _ref.attrName,
      idPrefix = _ref.idPrefix,
      _render = _ref.render,
      dragDisplayValue = _ref.dragDisplayValue;

  if (rowItem != null) {
    var id = (0, _helpers.escapeDataProviderId)("".concat(idPrefix, "-").concat(attrName, "-").concat(rowItem));
    return _react2.default.createElement(_draggable_wrapper.DraggableWrapper, {
      key: id,
      dataProvider: {
        and: [],
        enabled: true,
        id: id,
        name: rowItem,
        excluded: false,
        kqlQuery: '',
        queryMatch: {
          field: attrName,
          value: rowItem,
          displayValue: dragDisplayValue || rowItem,
          operator: _data_provider.IS_OPERATOR
        }
      },
      render: function render(dataProvider, _, snapshot) {
        return snapshot.isDragging ? _react2.default.createElement(_draggable_wrapper.DragEffects, null, _react2.default.createElement(_provider.Provider, {
          dataProvider: dataProvider
        })) : _react2.default.createElement(_react2.default.Fragment, null, _render ? _render(rowItem) : (0, _empty_value.defaultToEmptyTag)(rowItem));
      }
    });
  } else {
    return (0, _empty_value.getEmptyTagValue)();
  }
};

exports.getRowItemDraggable = getRowItemDraggable;

var getRowItemDraggables = function getRowItemDraggables(_ref2) {
  var rowItems = _ref2.rowItems,
      attrName = _ref2.attrName,
      idPrefix = _ref2.idPrefix,
      _render2 = _ref2.render,
      dragDisplayValue = _ref2.dragDisplayValue,
      _ref2$displayCount = _ref2.displayCount,
      displayCount = _ref2$displayCount === void 0 ? 5 : _ref2$displayCount,
      _ref2$maxOverflow = _ref2.maxOverflow,
      maxOverflow = _ref2$maxOverflow === void 0 ? 5 : _ref2$maxOverflow;

  if (rowItems != null && rowItems.length > 0) {
    var draggables = rowItems.slice(0, displayCount).map(function (rowItem, index) {
      var id = (0, _helpers.escapeDataProviderId)("".concat(idPrefix, "-").concat(attrName, "-").concat(rowItem, "-").concat(index));
      return _react2.default.createElement(_react2.default.Fragment, {
        key: id
      }, index !== 0 && _react2.default.createElement(_react2.default.Fragment, null, ',', _react2.default.createElement(_page.Spacer, null)), _react2.default.createElement(_draggable_wrapper.DraggableWrapper, {
        key: id,
        dataProvider: {
          and: [],
          enabled: true,
          id: id,
          name: rowItem,
          excluded: false,
          kqlQuery: '',
          queryMatch: {
            field: attrName,
            value: rowItem,
            displayValue: dragDisplayValue || rowItem,
            operator: _data_provider.IS_OPERATOR
          }
        },
        render: function render(dataProvider, _, snapshot) {
          return snapshot.isDragging ? _react2.default.createElement(_draggable_wrapper.DragEffects, null, _react2.default.createElement(_provider.Provider, {
            dataProvider: dataProvider
          })) : _react2.default.createElement(_react2.default.Fragment, null, _render2 ? _render2(rowItem) : (0, _empty_value.defaultToEmptyTag)(rowItem));
        }
      }));
    });
    return draggables.length > 0 ? _react2.default.createElement(_react2.default.Fragment, null, draggables, " ", getRowItemOverflow(rowItems, idPrefix, displayCount, maxOverflow)) : (0, _empty_value.getEmptyTagValue)();
  } else {
    return (0, _empty_value.getEmptyTagValue)();
  }
};

exports.getRowItemDraggables = getRowItemDraggables;

var getRowItemOverflow = function getRowItemOverflow(rowItems, idPrefix) {
  var overflowIndexStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
  var maxOverflowItems = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;
  return _react2.default.createElement(_react2.default.Fragment, null, rowItems.length > overflowIndexStart && _react2.default.createElement(Popover, {
    count: rowItems.length - overflowIndexStart,
    idPrefix: idPrefix
  }, _react2.default.createElement(_eui.EuiText, {
    size: "xs"
  }, _react2.default.createElement("ul", null, rowItems.slice(overflowIndexStart, overflowIndexStart + maxOverflowItems).map(function (rowItem) {
    return _react2.default.createElement("li", {
      key: "".concat(idPrefix, "-").concat(rowItem)
    }, (0, _empty_value.defaultToEmptyTag)(rowItem));
  })), rowItems.length > overflowIndexStart + maxOverflowItems && _react2.default.createElement("p", {
    "data-test-subj": "popover-additional-overflow"
  }, _react2.default.createElement(_eui.EuiTextColor, {
    color: "subdued"
  }, rowItems.length - overflowIndexStart - maxOverflowItems, ' ', _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.siem.tables.rowItemHelper.moreDescription",
    defaultMessage: "more not shown"
  }))))));
};

exports.getRowItemOverflow = getRowItemOverflow;

var PopoverComponent = function PopoverComponent(_ref3) {
  var children = _ref3.children,
      count = _ref3.count,
      idPrefix = _ref3.idPrefix;

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  return _react2.default.createElement(Subtext, null, _react2.default.createElement(_eui.EuiPopover, {
    button: _react2.default.createElement(_eui.EuiLink, {
      onClick: function onClick() {
        return setIsOpen(!isOpen);
      }
    }, "+".concat(count, " More")),
    closePopover: function closePopover() {
      return setIsOpen(!isOpen);
    },
    id: "".concat(idPrefix, "-popover"),
    isOpen: isOpen
  }, children));
};

exports.PopoverComponent = PopoverComponent;
PopoverComponent.displayName = 'PopoverComponent';

var Popover = _react2.default.memo(PopoverComponent);

exports.Popover = Popover;
Popover.displayName = 'Popover';

var OverflowFieldComponent = function OverflowFieldComponent(_ref4) {
  var value = _ref4.value,
      _ref4$showToolTip = _ref4.showToolTip,
      showToolTip = _ref4$showToolTip === void 0 ? true : _ref4$showToolTip,
      _ref4$overflowLength = _ref4.overflowLength,
      overflowLength = _ref4$overflowLength === void 0 ? 50 : _ref4$overflowLength;
  return _react2.default.createElement("span", null, showToolTip ? _react2.default.createElement(_eui.EuiToolTip, {
    "data-test-subj": 'message-tooltip',
    content: 'message'
  }, _react2.default.createElement(_react2.default.Fragment, null, value.substring(0, overflowLength))) : _react2.default.createElement(_react2.default.Fragment, null, value.substring(0, overflowLength)), value.length > overflowLength && _react2.default.createElement(_eui.EuiToolTip, {
    content: value
  }, _react2.default.createElement(_page.MoreRowItems, {
    type: "boxesHorizontal"
  })));
};

exports.OverflowFieldComponent = OverflowFieldComponent;
OverflowFieldComponent.displayName = 'OverflowFieldComponent';

var OverflowField = _react2.default.memo(OverflowFieldComponent);

exports.OverflowField = OverflowField;
OverflowField.displayName = 'OverflowField';