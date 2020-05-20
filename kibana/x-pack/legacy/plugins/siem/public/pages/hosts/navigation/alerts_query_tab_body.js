"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HostAlertsQueryTabBody = exports.filterHostData = void 0;

var _react = _interopRequireWildcard(require("react"));

var _alerts_viewer = require("../../../components/alerts_viewer");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var filterHostData = [{
  query: {
    bool: {
      filter: [{
        bool: {
          should: [{
            exists: {
              field: 'host.name'
            }
          }],
          minimum_should_match: 1
        }
      }]
    }
  },
  meta: {
    alias: '',
    disabled: false,
    key: 'bool',
    negate: false,
    type: 'custom',
    value: '{"query": {"bool": {"filter": [{"bool": {"should": [{"exists": {"field": "host.name"}}],"minimum_should_match": 1}}]}}}'
  }
}];
exports.filterHostData = filterHostData;

var HostAlertsQueryTabBody = _react.default.memo(function (alertsProps) {
  var pageFilters = alertsProps.pageFilters,
      rest = _objectWithoutProperties(alertsProps, ["pageFilters"]);

  var hostPageFilters = (0, _react.useMemo)(function () {
    return pageFilters != null ? [].concat(filterHostData, _toConsumableArray(pageFilters)) : filterHostData;
  }, [pageFilters]);
  return _react.default.createElement(_alerts_viewer.AlertsView, _extends({}, rest, {
    pageFilters: hostPageFilters
  }));
});

exports.HostAlertsQueryTabBody = HostAlertsQueryTabBody;
HostAlertsQueryTabBody.displayName = 'HostAlertsQueryTabBody';