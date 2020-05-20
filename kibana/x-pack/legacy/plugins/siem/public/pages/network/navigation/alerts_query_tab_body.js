"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkAlertsQueryTabBody = exports.filterNetworkData = void 0;

var _react = _interopRequireDefault(require("react"));

var _alerts_viewer = require("../../../components/alerts_viewer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var filterNetworkData = [{
  query: {
    bool: {
      filter: [{
        bool: {
          should: [{
            bool: {
              should: [{
                exists: {
                  field: 'source.ip'
                }
              }],
              minimum_should_match: 1
            }
          }, {
            bool: {
              should: [{
                exists: {
                  field: 'destination.ip'
                }
              }],
              minimum_should_match: 1
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
    value: '{"bool":{"filter":[{"bool":{"should":[{"bool":{"should":[{"exists":{"field": "source.ip"}}],"minimum_should_match":1}},{"bool":{"should":[{"exists":{"field": "destination.ip"}}],"minimum_should_match":1}}],"minimum_should_match":1}}]}}'
  }
}];
exports.filterNetworkData = filterNetworkData;

var NetworkAlertsQueryTabBody = _react.default.memo(function (alertsProps) {
  return _react.default.createElement(_alerts_viewer.AlertsView, _extends({}, alertsProps, {
    pageFilters: filterNetworkData
  }));
});

exports.NetworkAlertsQueryTabBody = NetworkAlertsQueryTabBody;
NetworkAlertsQueryTabBody.displayName = 'NetworkAlertsQueryTabBody';