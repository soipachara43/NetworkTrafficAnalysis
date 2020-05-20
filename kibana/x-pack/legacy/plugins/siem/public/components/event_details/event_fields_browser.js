"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventFieldsBrowser = void 0;

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _source = require("../../containers/source");

var _columns = require("./columns");

var _helpers = require("./helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** Renders a table view or JSON view of the `ECS` `data` */
var EventFieldsBrowser = _react.default.memo(function (_ref) {
  var browserFields = _ref.browserFields,
      columnHeaders = _ref.columnHeaders,
      data = _ref.data,
      eventId = _ref.eventId,
      onUpdateColumns = _ref.onUpdateColumns,
      timelineId = _ref.timelineId,
      toggleColumn = _ref.toggleColumn;
  var fieldsByName = (0, _react.useMemo)(function () {
    return (0, _source.getAllFieldsByName)(browserFields);
  }, [browserFields]);
  var items = (0, _react.useMemo)(function () {
    return (0, _lodash.sortBy)(data, ['field']).map(function (item) {
      return _objectSpread({}, item, {}, fieldsByName[item.field], {
        valuesConcatenated: item.values != null ? item.values.join() : ''
      });
    });
  }, [data, fieldsByName]);
  var columns = (0, _react.useMemo)(function () {
    return (0, _columns.getColumns)({
      browserFields: browserFields,
      columnHeaders: columnHeaders,
      eventId: eventId,
      onUpdateColumns: onUpdateColumns,
      contextId: timelineId,
      toggleColumn: toggleColumn
    });
  }, [browserFields, columnHeaders, eventId, onUpdateColumns, timelineId, toggleColumn]);
  return _react.default.createElement("div", {
    className: "euiTable--compressed"
  }, _react.default.createElement(_eui.EuiInMemoryTable // @ts-ignore items going in match Partial<BrowserField>, column `render` callbacks expect complete BrowserField
  , {
    items: items,
    columns: columns,
    pagination: false,
    search: _helpers.search,
    sorting: true
  }));
});

exports.EventFieldsBrowser = EventFieldsBrowser;
EventFieldsBrowser.displayName = 'EventFieldsBrowser';