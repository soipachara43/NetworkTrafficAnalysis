"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountriesColumnsCurated = exports.getNetworkTopCountriesColumns = void 0;

var _fp = require("lodash/fp");

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _react = _interopRequireDefault(require("react"));

var _country_flag = require("../../../source_destination/country_flag");

var _types = require("../../../../graphql/types");

var _store = require("../../../../store");

var _draggable_wrapper = require("../../../drag_and_drop/draggable_wrapper");

var _helpers = require("../../../drag_and_drop/helpers");

var _empty_value = require("../../../empty_value");

var _data_provider = require("../../../timeline/data_providers/data_provider");

var _provider = require("../../../timeline/data_providers/provider");

var i18n = _interopRequireWildcard(require("./translations"));

var _formatted_bytes = require("../../../formatted_bytes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getNetworkTopCountriesColumns = function getNetworkTopCountriesColumns(indexPattern, flowTarget, type, tableId) {
  return [{
    name: i18n.COUNTRY,
    render: function render(_ref) {
      var node = _ref.node;
      var geo = (0, _fp.get)("".concat(flowTarget, ".country"), node);
      var geoAttr = "".concat(flowTarget, ".geo.country_iso_code");
      var id = (0, _helpers.escapeDataProviderId)("".concat(tableId, "-table-").concat(flowTarget, "-country-").concat(geo));

      if (geo != null) {
        return _react.default.createElement(_draggable_wrapper.DraggableWrapper, {
          key: id,
          dataProvider: {
            and: [],
            enabled: true,
            id: id,
            name: geo,
            excluded: false,
            kqlQuery: '',
            queryMatch: {
              field: geoAttr,
              value: geo,
              operator: _data_provider.IS_OPERATOR
            }
          },
          render: function render(dataProvider, _, snapshot) {
            return snapshot.isDragging ? _react.default.createElement(_draggable_wrapper.DragEffects, null, _react.default.createElement(_provider.Provider, {
              dataProvider: dataProvider
            })) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_country_flag.CountryFlagAndName, {
              countryCode: geo
            }));
          }
        });
      } else {
        return (0, _empty_value.getEmptyTagValue)();
      }
    },
    width: '20%'
  }, {
    align: 'right',
    field: 'node.network.bytes_in',
    name: i18n.BYTES_IN,
    sortable: true,
    render: function render(bytes) {
      if (bytes != null) {
        return _react.default.createElement(_formatted_bytes.PreferenceFormattedBytes, {
          value: bytes
        });
      } else {
        return (0, _empty_value.getEmptyTagValue)();
      }
    }
  }, {
    align: 'right',
    field: 'node.network.bytes_out',
    name: i18n.BYTES_OUT,
    sortable: true,
    render: function render(bytes) {
      if (bytes != null) {
        return _react.default.createElement(_formatted_bytes.PreferenceFormattedBytes, {
          value: bytes
        });
      } else {
        return (0, _empty_value.getEmptyTagValue)();
      }
    }
  }, {
    align: 'right',
    field: "node.".concat(flowTarget, ".flows"),
    name: i18n.FLOWS,
    sortable: true,
    render: function render(flows) {
      if (flows != null) {
        return (0, _numeral.default)(flows).format('0,000');
      } else {
        return (0, _empty_value.getEmptyTagValue)();
      }
    }
  }, {
    align: 'right',
    field: "node.".concat(flowTarget, ".").concat(flowTarget, "_ips"),
    name: flowTarget === _types.FlowTargetSourceDest.source ? i18n.SOURCE_IPS : i18n.DESTINATION_IPS,
    sortable: true,
    render: function render(ips) {
      if (ips != null) {
        return (0, _numeral.default)(ips).format('0,000');
      } else {
        return (0, _empty_value.getEmptyTagValue)();
      }
    }
  }, {
    align: 'right',
    field: "node.".concat(flowTarget, ".").concat(getOppositeField(flowTarget), "_ips"),
    name: getOppositeField(flowTarget) === _types.FlowTargetSourceDest.source ? i18n.SOURCE_IPS : i18n.DESTINATION_IPS,
    sortable: true,
    render: function render(ips) {
      if (ips != null) {
        return (0, _numeral.default)(ips).format('0,000');
      } else {
        return (0, _empty_value.getEmptyTagValue)();
      }
    }
  }];
};

exports.getNetworkTopCountriesColumns = getNetworkTopCountriesColumns;

var getCountriesColumnsCurated = function getCountriesColumnsCurated(indexPattern, flowTarget, type, tableId) {
  var columns = getNetworkTopCountriesColumns(indexPattern, flowTarget, type, tableId); // Columns to exclude from host details pages

  if (type === _store.networkModel.NetworkType.details) {
    columns.pop();
    return columns;
  }

  return columns;
};

exports.getCountriesColumnsCurated = getCountriesColumnsCurated;

var getOppositeField = function getOppositeField(flowTarget) {
  return flowTarget === _types.FlowTargetSourceDest.source ? _types.FlowTargetSourceDest.destination : _types.FlowTargetSourceDest.source;
};