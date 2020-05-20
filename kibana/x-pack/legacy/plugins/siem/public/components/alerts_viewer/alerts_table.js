"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertsTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _events_viewer = require("../events_viewer");

var i18n = _interopRequireWildcard(require("./translations"));

var _default_headers = require("./default_headers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var ALERTS_TABLE_ID = 'alerts-table';
var defaultAlertsFilters = [{
  meta: {
    alias: null,
    negate: false,
    disabled: false,
    type: 'phrase',
    key: 'event.kind',
    params: {
      query: 'alert'
    }
  },
  query: {
    bool: {
      filter: [{
        bool: {
          should: [{
            match: {
              'event.kind': 'alert'
            }
          }],
          minimum_should_match: 1
        }
      }]
    }
  }
}];

var AlertsTableComponent = function AlertsTableComponent(_ref) {
  var endDate = _ref.endDate,
      startDate = _ref.startDate,
      _ref$pageFilters = _ref.pageFilters,
      pageFilters = _ref$pageFilters === void 0 ? [] : _ref$pageFilters;
  var alertsFilter = (0, _react.useMemo)(function () {
    return [].concat(defaultAlertsFilters, _toConsumableArray(pageFilters));
  }, [pageFilters]);
  var timelineTypeContext = (0, _react.useMemo)(function () {
    return {
      documentType: i18n.ALERTS_DOCUMENT_TYPE,
      footerText: i18n.TOTAL_COUNT_OF_ALERTS,
      title: i18n.ALERTS_TABLE_TITLE,
      unit: i18n.UNIT
    };
  }, []);
  return _react.default.createElement(_events_viewer.StatefulEventsViewer, {
    pageFilters: alertsFilter,
    defaultModel: _default_headers.alertsDefaultModel,
    end: endDate,
    id: ALERTS_TABLE_ID,
    start: startDate,
    timelineTypeContext: timelineTypeContext
  });
};

var AlertsTable = _react.default.memo(AlertsTableComponent);

exports.AlertsTable = AlertsTable;