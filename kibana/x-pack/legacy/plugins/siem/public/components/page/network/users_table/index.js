"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTable = exports.usersTableId = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _network = require("../../../../store/network");

var _types = require("../../../../graphql/types");

var _store = require("../../../../store");

var _paginated_table = require("../../../paginated_table");

var _columns = require("./columns");

var i18n = _interopRequireWildcard(require("./translations"));

var _helpers = require("../../../../lib/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var tableType = _store.networkModel.IpDetailsTableType.users;
var rowItems = [{
  text: i18n.ROWS_5,
  numberOfRow: 5
}, {
  text: i18n.ROWS_10,
  numberOfRow: 10
}];
var usersTableId = 'users-table';
exports.usersTableId = usersTableId;

var UsersTableComponent = _react.default.memo(function (_ref) {
  var activePage = _ref.activePage,
      data = _ref.data,
      fakeTotalCount = _ref.fakeTotalCount,
      flowTarget = _ref.flowTarget,
      id = _ref.id,
      isInspect = _ref.isInspect,
      limit = _ref.limit,
      loading = _ref.loading,
      loadPage = _ref.loadPage,
      showMorePagesIndicator = _ref.showMorePagesIndicator,
      totalCount = _ref.totalCount,
      type = _ref.type,
      updateNetworkTable = _ref.updateNetworkTable,
      sort = _ref.sort;
  var updateLimitPagination = (0, _react.useCallback)(function (newLimit) {
    return updateNetworkTable({
      networkType: type,
      tableType: tableType,
      updates: {
        limit: newLimit
      }
    });
  }, [type, updateNetworkTable]);
  var updateActivePage = (0, _react.useCallback)(function (newPage) {
    return updateNetworkTable({
      networkType: type,
      tableType: tableType,
      updates: {
        activePage: newPage
      }
    });
  }, [type, updateNetworkTable]);
  var onChange = (0, _react.useCallback)(function (criteria) {
    if (criteria.sort != null) {
      var splitField = criteria.sort.field.split('.');
      var newUsersSort = {
        field: getSortFromString(splitField[splitField.length - 1]),
        direction: criteria.sort.direction
      };

      if (!(0, _fastDeepEqual.default)(newUsersSort, sort)) {
        updateNetworkTable({
          networkType: type,
          tableType: tableType,
          updates: {
            sort: newUsersSort
          }
        });
      }
    }
  }, [sort, type, updateNetworkTable]);
  var columns = (0, _react.useMemo)(function () {
    return (0, _columns.getUsersColumns)(flowTarget, usersTableId);
  }, [flowTarget, usersTableId]);
  return _react.default.createElement(_paginated_table.PaginatedTable, {
    activePage: activePage,
    columns: columns,
    dataTestSubj: "table-".concat(tableType),
    showMorePagesIndicator: showMorePagesIndicator,
    headerCount: totalCount,
    headerTitle: i18n.USERS,
    headerUnit: i18n.UNIT(totalCount),
    id: id,
    isInspect: isInspect,
    itemsPerRow: rowItems,
    limit: limit,
    loading: loading,
    loadPage: loadPage,
    onChange: onChange,
    pageOfItems: data,
    sorting: getSortField(sort),
    totalCount: fakeTotalCount,
    updateActivePage: updateActivePage,
    updateLimitPagination: updateLimitPagination
  });
});

UsersTableComponent.displayName = 'UsersTableComponent';

var makeMapStateToProps = function makeMapStateToProps() {
  var getUsersSelector = _store.networkSelectors.usersSelector();

  return function (state) {
    return _objectSpread({}, getUsersSelector(state));
  };
};

var mapDispatchToProps = {
  updateNetworkTable: _network.networkActions.updateNetworkTable
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var UsersTable = connector(UsersTableComponent);
exports.UsersTable = UsersTable;

var getSortField = function getSortField(sortField) {
  switch (sortField.field) {
    case _types.UsersFields.name:
      return {
        field: "node.user.".concat(sortField.field),
        direction: sortField.direction
      };

    case _types.UsersFields.count:
      return {
        field: "node.user.".concat(sortField.field),
        direction: sortField.direction
      };
  }

  return (0, _helpers.assertUnreachable)(sortField.field);
};

var getSortFromString = function getSortFromString(sortField) {
  switch (sortField) {
    case _types.UsersFields.name.valueOf():
      return _types.UsersFields.name;

    case _types.UsersFields.count.valueOf():
      return _types.UsersFields.count;

    default:
      return _types.UsersFields.name;
  }
};