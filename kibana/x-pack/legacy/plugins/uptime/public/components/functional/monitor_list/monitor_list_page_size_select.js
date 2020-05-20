"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitorListPageSizeSelectComponent = exports.MonitorListPageSizeSelect = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _hooks = require("../../../hooks");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PopoverButton = function PopoverButton(_ref) {
  var setIsOpen = _ref.setIsOpen,
      size = _ref.size;
  return _react.default.createElement(_eui.EuiButtonEmpty, {
    color: "text",
    "data-test-subj": "xpack.uptime.monitorList.pageSizeSelect.popoverOpen",
    iconType: "arrowDown",
    iconSide: "right",
    onClick: function onClick() {
      return setIsOpen(true);
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.monitorList.pageSizePopoverButtonText",
    defaultMessage: "Rows per page: {size}",
    values: {
      size: size
    }
  }));
};

var items = [{
  'data-test-subj': 'xpack.uptime.monitorList.pageSizeSelect.sizeSelectItem10',
  key: '10 rows',
  numRows: 10
}, {
  'data-test-subj': 'xpack.uptime.monitorList.pageSizeSelect.sizeSelectItem25',
  key: '25 rows',
  numRows: 25
}, {
  'data-test-subj': 'xpack.uptime.monitorList.pageSizeSelect.sizeSelectItem50',
  key: '50 rows',
  numRows: 50
}, {
  'data-test-subj': 'xpack.uptime.monitorList.pageSizeSelect.sizeSelectItem100',
  key: '100 rows',
  numRows: 100
}];
var LOCAL_STORAGE_KEY = 'xpack.uptime.monitorList.pageSize';

/**
 * This component wraps the underlying UI functionality to make the component more testable.
 * The features leveraged in this function are tested elsewhere, and are not novel to this component.
 */
var MonitorListPageSizeSelect = function MonitorListPageSizeSelect(_ref2) {
  var size = _ref2.size,
      setSize = _ref2.setSize;

  var _useUrlParams = (0, _hooks.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 2),
      setUrlParams = _useUrlParams2[1];

  (0, _react.useEffect)(function () {
    localStorage.setItem(LOCAL_STORAGE_KEY, size.toString());
  }, [size]);
  return _react.default.createElement(MonitorListPageSizeSelectComponent, {
    size: size,
    setSize: setSize,
    setUrlParams: setUrlParams
  });
};

exports.MonitorListPageSizeSelect = MonitorListPageSizeSelect;

/**
 * This function contains the UI functionality for the page select feature. It's agnostic to any
 * external services/features, and focuses only on providing the UI and handling user interaction.
 */
var MonitorListPageSizeSelectComponent = function MonitorListPageSizeSelectComponent(_ref3) {
  var size = _ref3.size,
      setSize = _ref3.setSize,
      setUrlParams = _ref3.setUrlParams;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      _setIsOpen = _useState2[1];

  return _react.default.createElement(_eui.EuiPopover, {
    button: _react.default.createElement(PopoverButton, {
      setIsOpen: function setIsOpen(value) {
        return _setIsOpen(value);
      },
      size: size
    }),
    isOpen: isOpen,
    closePopover: function closePopover() {
      return _setIsOpen(false);
    },
    anchorPosition: "upLeft"
  }, _react.default.createElement(_eui.EuiContextMenuPanel, {
    items: items.map(function (_ref4) {
      var dataTestSubj = _ref4['data-test-subj'],
          key = _ref4.key,
          numRows = _ref4.numRows;
      return _react.default.createElement(_eui.EuiContextMenuItem, {
        "data-test-subj": dataTestSubj,
        key: key,
        icon: size === numRows ? 'check' : 'empty',
        onClick: function onClick() {
          setSize(numRows); // reset pagination because the page size has changed

          setUrlParams({
            pagination: undefined
          });

          _setIsOpen(false);
        }
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.uptime.monitorList.pageSizeSelect.numRowsItemMessage",
        defaultMessage: "{numRows} rows",
        values: {
          numRows: numRows
        }
      }));
    })
  }));
};

exports.MonitorListPageSizeSelectComponent = MonitorListPageSizeSelectComponent;