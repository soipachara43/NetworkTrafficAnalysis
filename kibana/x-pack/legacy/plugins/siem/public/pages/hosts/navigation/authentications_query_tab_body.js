"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticationsQueryTabBody = exports.authMatrixDataMappingFields = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _authentications_table = require("../../../components/page/hosts/authentications_table");

var _manage_query = require("../../../components/page/manage_query");

var _authentications = require("../../../containers/authentications");

var _hosts = require("../../../store/hosts");

var _matrix_histogram = require("../../../components/matrix_histogram");

var _types = require("../../../components/page/hosts/kpi_hosts/types");

var i18n = _interopRequireWildcard(require("../translations"));

var _types2 = require("../../../graphql/types");

var _authMatrixDataMappin, _authStackByOptions$f;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AuthenticationTableManage = (0, _manage_query.manageQuery)(_authentications_table.AuthenticationTable);
var ID = 'authenticationsOverTimeQuery';
var authStackByOptions = [{
  text: 'event.outcome',
  value: 'event.outcome'
}];
var DEFAULT_STACK_BY = 'event.outcome';
var AuthMatrixDataGroup;

(function (AuthMatrixDataGroup) {
  AuthMatrixDataGroup["authSuccess"] = "success";
  AuthMatrixDataGroup["authFailure"] = "failure";
})(AuthMatrixDataGroup || (AuthMatrixDataGroup = {}));

var authMatrixDataMappingFields = (_authMatrixDataMappin = {}, _defineProperty(_authMatrixDataMappin, AuthMatrixDataGroup.authSuccess, {
  key: AuthMatrixDataGroup.authSuccess,
  value: null,
  color: _types.KpiHostsChartColors.authSuccess
}), _defineProperty(_authMatrixDataMappin, AuthMatrixDataGroup.authFailure, {
  key: AuthMatrixDataGroup.authFailure,
  value: null,
  color: _types.KpiHostsChartColors.authFailure
}), _authMatrixDataMappin);
exports.authMatrixDataMappingFields = authMatrixDataMappingFields;
var histogramConfigs = {
  defaultStackByOption: (_authStackByOptions$f = authStackByOptions.find(function (o) {
    return o.text === DEFAULT_STACK_BY;
  })) !== null && _authStackByOptions$f !== void 0 ? _authStackByOptions$f : authStackByOptions[0],
  errorMessage: i18n.ERROR_FETCHING_AUTHENTICATIONS_DATA,
  histogramType: _types2.HistogramType.authentications,
  mapping: authMatrixDataMappingFields,
  stackByOptions: authStackByOptions,
  title: i18n.NAVIGATION_AUTHENTICATIONS_TITLE
};

var AuthenticationsQueryTabBody = function AuthenticationsQueryTabBody(_ref) {
  var deleteQuery = _ref.deleteQuery,
      endDate = _ref.endDate,
      filterQuery = _ref.filterQuery,
      skip = _ref.skip,
      setQuery = _ref.setQuery,
      startDate = _ref.startDate,
      type = _ref.type;
  (0, _react.useEffect)(function () {
    return function () {
      if (deleteQuery) {
        deleteQuery({
          id: ID
        });
      }
    };
  }, [deleteQuery]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_matrix_histogram.MatrixHistogramContainer, _extends({
    endDate: endDate,
    filterQuery: filterQuery,
    id: ID,
    setQuery: setQuery,
    sourceId: "default",
    startDate: startDate,
    type: _hosts.hostsModel.HostsType.page
  }, histogramConfigs)), _react.default.createElement(_authentications.AuthenticationsQuery, {
    endDate: endDate,
    filterQuery: filterQuery,
    skip: skip,
    sourceId: "default",
    startDate: startDate,
    type: type
  }, function (_ref2) {
    var authentications = _ref2.authentications,
        totalCount = _ref2.totalCount,
        loading = _ref2.loading,
        pageInfo = _ref2.pageInfo,
        loadPage = _ref2.loadPage,
        id = _ref2.id,
        inspect = _ref2.inspect,
        isInspected = _ref2.isInspected,
        refetch = _ref2.refetch;
    return _react.default.createElement(AuthenticationTableManage, {
      data: authentications,
      deleteQuery: deleteQuery,
      fakeTotalCount: (0, _fp.getOr)(50, 'fakeTotalCount', pageInfo),
      id: id,
      inspect: inspect,
      isInspect: isInspected,
      loading: loading,
      loadPage: loadPage,
      refetch: refetch,
      showMorePagesIndicator: (0, _fp.getOr)(false, 'showMorePagesIndicator', pageInfo),
      setQuery: setQuery,
      totalCount: totalCount,
      type: type
    });
  }));
};

exports.AuthenticationsQueryTabBody = AuthenticationsQueryTabBody;
AuthenticationsQueryTabBody.displayName = 'AuthenticationsQueryTabBody';