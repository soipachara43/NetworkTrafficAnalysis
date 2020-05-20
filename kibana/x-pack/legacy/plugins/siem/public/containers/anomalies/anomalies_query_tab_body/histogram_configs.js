"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.histogramConfigs = exports.anomaliesStackByOptions = void 0;

var i18n = _interopRequireWildcard(require("./translations"));

var _types = require("../../../graphql/types");

var _anomaliesStackByOpti;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var anomaliesStackByOptions = [{
  text: i18n.ANOMALIES_STACK_BY_JOB_ID,
  value: 'job_id'
}];
exports.anomaliesStackByOptions = anomaliesStackByOptions;
var DEFAULT_STACK_BY = i18n.ANOMALIES_STACK_BY_JOB_ID;
var histogramConfigs = {
  defaultStackByOption: (_anomaliesStackByOpti = anomaliesStackByOptions.find(function (o) {
    return o.text === DEFAULT_STACK_BY;
  })) !== null && _anomaliesStackByOpti !== void 0 ? _anomaliesStackByOpti : anomaliesStackByOptions[0],
  errorMessage: i18n.ERROR_FETCHING_ANOMALIES_DATA,
  hideHistogramIfEmpty: true,
  histogramType: _types.HistogramType.anomalies,
  stackByOptions: anomaliesStackByOptions,
  subtitle: undefined,
  title: i18n.ANOMALIES_TITLE
};
exports.histogramConfigs = histogramConfigs;