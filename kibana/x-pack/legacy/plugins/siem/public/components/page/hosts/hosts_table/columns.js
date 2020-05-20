"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHostsColumns = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _draggable_wrapper = require("../../../drag_and_drop/draggable_wrapper");

var _helpers = require("../../../drag_and_drop/helpers");

var _empty_value = require("../../../empty_value");

var _links = require("../../../links");

var _formatted_date = require("../../../formatted_date");

var _data_provider = require("../../../timeline/data_providers/data_provider");

var _provider = require("../../../timeline/data_providers/provider");

var _add_filter_to_global_search_bar = require("../../add_filter_to_global_search_bar");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getHostsColumns = function getHostsColumns() {
  return [{
    field: 'node.host.name',
    name: i18n.NAME,
    truncateText: false,
    hideForMobile: false,
    sortable: true,
    render: function render(hostName) {
      if (hostName != null && hostName.length > 0) {
        var id = (0, _helpers.escapeDataProviderId)("hosts-table-hostName-".concat(hostName[0]));
        return _react.default.createElement(_draggable_wrapper.DraggableWrapper, {
          key: id,
          dataProvider: {
            and: [],
            enabled: true,
            excluded: false,
            id: id,
            name: hostName[0],
            kqlQuery: '',
            queryMatch: {
              field: 'host.name',
              value: hostName[0],
              operator: _data_provider.IS_OPERATOR
            }
          },
          render: function render(dataProvider, _, snapshot) {
            return snapshot.isDragging ? _react.default.createElement(_draggable_wrapper.DragEffects, null, _react.default.createElement(_provider.Provider, {
              dataProvider: dataProvider
            })) : _react.default.createElement(_add_filter_to_global_search_bar.AddFilterToGlobalSearchBar, {
              filter: (0, _add_filter_to_global_search_bar.createFilter)('host.name', hostName[0])
            }, _react.default.createElement(_links.HostDetailsLink, {
              hostName: hostName[0]
            }));
          }
        });
      }

      return (0, _empty_value.getEmptyTagValue)();
    },
    width: '35%'
  }, {
    field: 'node.lastSeen',
    name: _react.default.createElement(_eui.EuiToolTip, {
      content: i18n.FIRST_LAST_SEEN_TOOLTIP
    }, _react.default.createElement(_react.default.Fragment, null, i18n.LAST_SEEN, ' ', _react.default.createElement(_eui.EuiIcon, {
      size: "s",
      color: "subdued",
      type: "iInCircle",
      className: "eui-alignTop"
    }))),
    truncateText: false,
    hideForMobile: false,
    sortable: true,
    render: function render(lastSeen) {
      if (lastSeen != null) {
        return _react.default.createElement(_formatted_date.FormattedRelativePreferenceDate, {
          value: lastSeen
        });
      }

      return (0, _empty_value.getEmptyTagValue)();
    }
  }, {
    field: 'node.host.os.name',
    name: i18n.OS,
    truncateText: false,
    hideForMobile: false,
    sortable: false,
    render: function render(hostOsName) {
      if (hostOsName != null) {
        return _react.default.createElement(_add_filter_to_global_search_bar.AddFilterToGlobalSearchBar, {
          filter: (0, _add_filter_to_global_search_bar.createFilter)('host.os.name', hostOsName)
        }, _react.default.createElement(_react.default.Fragment, null, hostOsName));
      }

      return (0, _empty_value.getEmptyTagValue)();
    }
  }, {
    field: 'node.host.os.version',
    name: i18n.VERSION,
    truncateText: false,
    hideForMobile: false,
    sortable: false,
    render: function render(hostOsVersion) {
      if (hostOsVersion != null) {
        return _react.default.createElement(_add_filter_to_global_search_bar.AddFilterToGlobalSearchBar, {
          filter: (0, _add_filter_to_global_search_bar.createFilter)('host.os.version', hostOsVersion)
        }, _react.default.createElement(_react.default.Fragment, null, hostOsVersion));
      }

      return (0, _empty_value.getEmptyTagValue)();
    }
  }];
};

exports.getHostsColumns = getHostsColumns;