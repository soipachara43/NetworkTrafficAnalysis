"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Snapshot = exports.Container = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _hooks = require("../../../hooks");

var _actions = require("../../../state/actions");

var _snapshot = require("../../functional/snapshot");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Container = function Container(_ref) {
  var count = _ref.count,
      height = _ref.height,
      lastRefresh = _ref.lastRefresh,
      loading = _ref.loading,
      esKuery = _ref.esKuery,
      loadSnapshotCount = _ref.loadSnapshotCount;

  var _useUrlParams = (0, _hooks.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 1),
      getUrlParams = _useUrlParams2[0];

  var _getUrlParams = getUrlParams(),
      dateRangeStart = _getUrlParams.dateRangeStart,
      dateRangeEnd = _getUrlParams.dateRangeEnd,
      statusFilter = _getUrlParams.statusFilter;

  (0, _react.useEffect)(function () {
    loadSnapshotCount({
      dateRangeStart: dateRangeStart,
      dateRangeEnd: dateRangeEnd,
      filters: esKuery,
      statusFilter: statusFilter
    });
  }, [dateRangeStart, dateRangeEnd, esKuery, lastRefresh, loadSnapshotCount, statusFilter]);
  return _react.default.createElement(_snapshot.SnapshotComponent, {
    count: count,
    height: height,
    loading: loading
  });
};
/**
 * Provides state to connected component.
 * @param state the root app state
 */


exports.Container = Container;

var mapStateToProps = function mapStateToProps(_ref2) {
  var _ref2$snapshot = _ref2.snapshot,
      count = _ref2$snapshot.count,
      loading = _ref2$snapshot.loading,
      _ref2$ui = _ref2.ui,
      lastRefresh = _ref2$ui.lastRefresh,
      esKuery = _ref2$ui.esKuery;
  return {
    count: count,
    lastRefresh: lastRefresh,
    loading: loading,
    esKuery: esKuery
  };
};
/**
 * Used for fetching snapshot counts.
 * @param dispatch redux-provided action dispatcher
 */


var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    loadSnapshotCount: function loadSnapshotCount(params) {
      return dispatch((0, _actions.getSnapshotCountAction)(params));
    }
  };
};

var Snapshot = (0, _reactRedux.connect)( // @ts-ignore connect is expecting null | undefined for some reason
mapStateToProps, mapDispatchToProps)(Container);
exports.Snapshot = Snapshot;