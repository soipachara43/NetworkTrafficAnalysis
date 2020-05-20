"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalTime = exports.connector = exports.GlobalTimeComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _store = require("../../store");

var _actions = require("../../store/actions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var GlobalTimeComponent = function GlobalTimeComponent(_ref) {
  var children = _ref.children,
      deleteAllQuery = _ref.deleteAllQuery,
      deleteOneQuery = _ref.deleteOneQuery,
      from = _ref.from,
      to = _ref.to,
      setGlobalQuery = _ref.setGlobalQuery;

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      isInitializing = _useState2[0],
      setIsInitializing = _useState2[1];

  var setQuery = (0, _react.useCallback)(function (_ref2) {
    var id = _ref2.id,
        inspect = _ref2.inspect,
        loading = _ref2.loading,
        refetch = _ref2.refetch;
    return setGlobalQuery({
      inputId: 'global',
      id: id,
      inspect: inspect,
      loading: loading,
      refetch: refetch
    });
  }, [setGlobalQuery]);
  var deleteQuery = (0, _react.useCallback)(function (_ref3) {
    var id = _ref3.id;
    return deleteOneQuery({
      inputId: 'global',
      id: id
    });
  }, [deleteOneQuery]);
  (0, _react.useEffect)(function () {
    if (isInitializing) {
      setIsInitializing(false);
    }

    return function () {
      deleteAllQuery({
        id: 'global'
      });
    };
  }, []);
  return _react.default.createElement(_react.default.Fragment, null, children({
    isInitializing: isInitializing,
    from: from,
    to: to,
    setQuery: setQuery,
    deleteQuery: deleteQuery
  }));
};

exports.GlobalTimeComponent = GlobalTimeComponent;

var mapStateToProps = function mapStateToProps(state) {
  var timerange = _store.inputsSelectors.globalTimeRangeSelector(state);

  return {
    from: timerange.from,
    to: timerange.to
  };
};

var mapDispatchToProps = {
  deleteAllQuery: _actions.inputsActions.deleteAllQuery,
  deleteOneQuery: _actions.inputsActions.deleteOneQuery,
  setGlobalQuery: _actions.inputsActions.setQuery
};
var connector = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);
exports.connector = connector;
var GlobalTime = connector(_react.default.memo(GlobalTimeComponent));
exports.GlobalTime = GlobalTime;