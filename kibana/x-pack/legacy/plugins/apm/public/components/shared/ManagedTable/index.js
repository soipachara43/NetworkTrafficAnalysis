"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnoptimizedManagedTable = UnoptimizedManagedTable;
exports.ManagedTable = void 0;

var _eui = require("@elastic/eui");

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _useUrlParams2 = require("../../../hooks/useUrlParams");

var _history = require("../../../utils/history");

var _url_helpers = require("../Links/url_helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function UnoptimizedManagedTable(props) {
  var _props$columns$;

  var items = props.items,
      columns = props.columns,
      _props$initialPageInd = props.initialPageIndex,
      initialPageIndex = _props$initialPageInd === void 0 ? 0 : _props$initialPageInd,
      _props$initialPageSiz = props.initialPageSize,
      initialPageSize = _props$initialPageSiz === void 0 ? 10 : _props$initialPageSiz,
      _props$initialSortFie = props.initialSortField,
      initialSortField = _props$initialSortFie === void 0 ? ((_props$columns$ = props.columns[0]) === null || _props$columns$ === void 0 ? void 0 : _props$columns$.field) || '' : _props$initialSortFie,
      _props$initialSortDir = props.initialSortDirection,
      initialSortDirection = _props$initialSortDir === void 0 ? 'asc' : _props$initialSortDir,
      _props$hidePerPageOpt = props.hidePerPageOptions,
      hidePerPageOptions = _props$hidePerPageOpt === void 0 ? true : _props$hidePerPageOpt,
      noItemsMessage = props.noItemsMessage,
      _props$sortItems = props.sortItems,
      sortItems = _props$sortItems === void 0 ? true : _props$sortItems;

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      _useUrlParams$urlPara = _useUrlParams.urlParams,
      _useUrlParams$urlPara2 = _useUrlParams$urlPara.page,
      page = _useUrlParams$urlPara2 === void 0 ? initialPageIndex : _useUrlParams$urlPara2,
      _useUrlParams$urlPara3 = _useUrlParams$urlPara.pageSize,
      pageSize = _useUrlParams$urlPara3 === void 0 ? initialPageSize : _useUrlParams$urlPara3,
      _useUrlParams$urlPara4 = _useUrlParams$urlPara.sortField,
      sortField = _useUrlParams$urlPara4 === void 0 ? initialSortField : _useUrlParams$urlPara4,
      _useUrlParams$urlPara5 = _useUrlParams$urlPara.sortDirection,
      sortDirection = _useUrlParams$urlPara5 === void 0 ? initialSortDirection : _useUrlParams$urlPara5;

  var renderedItems = (0, _react.useMemo)(function () {
    // TODO: Use _.orderBy once we upgrade to lodash 4+
    var sortedItems = sortItems ? (0, _lodash.sortByOrder)(items, sortField, sortDirection) : items;
    return sortedItems.slice(page * pageSize, (page + 1) * pageSize);
  }, [page, pageSize, sortField, sortDirection, items, sortItems]);
  var sort = (0, _react.useMemo)(function () {
    return {
      sort: {
        field: sortField,
        direction: sortDirection
      }
    };
  }, [sortField, sortDirection]);
  var onTableChange = (0, _react.useCallback)(function (options) {
    _history.history.push(_objectSpread({}, _history.history.location, {
      search: (0, _url_helpers.fromQuery)(_objectSpread({}, (0, _url_helpers.toQuery)(_history.history.location.search), {
        page: options.page.index,
        pageSize: options.page.size,
        sortField: options.sort.field,
        sortDirection: options.sort.direction
      }))
    }));
  }, []);
  var pagination = (0, _react.useMemo)(function () {
    return {
      hidePerPageOptions: hidePerPageOptions,
      totalItemCount: items.length,
      pageIndex: page,
      pageSize: pageSize
    };
  }, [hidePerPageOptions, items, page, pageSize]);
  return _react.default.createElement(_eui.EuiBasicTable, {
    noItemsMessage: noItemsMessage,
    items: renderedItems,
    columns: columns // EuiBasicTableColumn is stricter than ITableColumn
    ,
    pagination: pagination,
    sorting: sort,
    onChange: onTableChange
  });
}

var ManagedTable = _react.default.memo(UnoptimizedManagedTable);

exports.ManagedTable = ManagedTable;