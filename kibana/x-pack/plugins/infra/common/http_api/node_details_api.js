"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeDetailsRequestRT = exports.NodeDetailsMetricDataResponseRT = exports.NodeDetailsMetricDataRT = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _types = require("../inventory_models/types");

var _snapshot_api = require("./snapshot_api");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const NodeDetailsDataPointRT = rt.intersection([rt.type({
  timestamp: rt.number
}), rt.partial({
  value: rt.union([rt.number, rt.null])
})]);
const NodeDetailsDataSeries = rt.type({
  id: rt.string,
  label: rt.string,
  data: rt.array(NodeDetailsDataPointRT)
});
const NodeDetailsMetricDataRT = rt.intersection([rt.partial({
  id: rt.union([_types.InventoryMetricRT, rt.null])
}), rt.type({
  series: rt.array(NodeDetailsDataSeries)
})]);
exports.NodeDetailsMetricDataRT = NodeDetailsMetricDataRT;
const NodeDetailsMetricDataResponseRT = rt.type({
  metrics: rt.array(NodeDetailsMetricDataRT)
});
exports.NodeDetailsMetricDataResponseRT = NodeDetailsMetricDataResponseRT;
const NodeDetailsRequestRT = rt.intersection([rt.type({
  nodeType: _types.ItemTypeRT,
  nodeId: rt.string,
  metrics: rt.array(_types.InventoryMetricRT),
  timerange: _snapshot_api.InfraTimerangeInputRT,
  sourceId: rt.string
}), rt.partial({
  cloudId: rt.union([rt.string, rt.null])
})]); // export type NodeDetailsRequest = InfraWrappableRequest<NodesArgs & SourceArgs>;

exports.NodeDetailsRequestRT = NodeDetailsRequestRT;