"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.histogramConfigs = exports.alertsStackByOptions = void 0;

var i18n = _interopRequireWildcard(require("./translations"));

var _types = require("../../graphql/types");

var _alertsStackByOptions;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var alertsStackByOptions = [{
  text: 'event.category',
  value: 'event.category'
}, {
  text: 'event.module',
  value: 'event.module'
}];
exports.alertsStackByOptions = alertsStackByOptions;
var DEFAULT_STACK_BY = 'event.module';
var histogramConfigs = {
  defaultStackByOption: (_alertsStackByOptions = alertsStackByOptions.find(function (o) {
    return o.text === DEFAULT_STACK_BY;
  })) !== null && _alertsStackByOptions !== void 0 ? _alertsStackByOptions : alertsStackByOptions[1],
  errorMessage: i18n.ERROR_FETCHING_ALERTS_DATA,
  histogramType: _types.HistogramType.alerts,
  stackByOptions: alertsStackByOptions,
  subtitle: undefined,
  title: i18n.ALERTS_GRAPH_TITLE
};
exports.histogramConfigs = histogramConfigs;