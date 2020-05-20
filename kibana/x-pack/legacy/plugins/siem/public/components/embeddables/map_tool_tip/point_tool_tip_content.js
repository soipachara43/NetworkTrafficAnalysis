"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRenderedFieldValue = exports.PointToolTipContent = exports.PointToolTipContentComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _map_config = require("../map_config");

var _add_filter_to_global_search_bar = require("../../page/add_filter_to_global_search_bar");

var _empty_value = require("../../empty_value");

var _page = require("../../page");

var _links = require("../../links");

var _field_renderers = require("../../field_renderers/field_renderers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PointToolTipContentComponent = function PointToolTipContentComponent(_ref) {
  var contextId = _ref.contextId,
      featureProps = _ref.featureProps,
      closeTooltip = _ref.closeTooltip;
  var featureDescriptionListItems = featureProps.map(function (_ref2) {
    var key = _ref2._propertyKey,
        value = _ref2._rawValue;
    return {
      title: _map_config.sourceDestinationFieldMappings[key],
      description: _react.default.createElement(_add_filter_to_global_search_bar.AddFilterToGlobalSearchBar, {
        filter: (0, _add_filter_to_global_search_bar.createFilter)(key, Array.isArray(value) ? value[0] : value),
        onFilterAdded: closeTooltip,
        "data-test-subj": "add-to-kql-".concat(key)
      }, value != null ? _react.default.createElement(_field_renderers.DefaultFieldRenderer, {
        rowItems: Array.isArray(value) ? value : [value],
        attrName: key,
        idPrefix: "map-point-tooltip-".concat(contextId, "-").concat(key, "-").concat(value),
        render: function render(item) {
          return getRenderedFieldValue(key, item);
        }
      }) : (0, _empty_value.getEmptyTagValue)())
    };
  });
  return _react.default.createElement(_page.DescriptionListStyled, {
    listItems: featureDescriptionListItems
  });
};

exports.PointToolTipContentComponent = PointToolTipContentComponent;
PointToolTipContentComponent.displayName = 'PointToolTipContentComponent';

var PointToolTipContent = _react.default.memo(PointToolTipContentComponent);

exports.PointToolTipContent = PointToolTipContent;
PointToolTipContent.displayName = 'PointToolTipContent';

var getRenderedFieldValue = function getRenderedFieldValue(field, value) {
  if (value === '') {
    return (0, _empty_value.getOrEmptyTagFromValue)(value);
  } else if (['host.name'].includes(field)) {
    return _react.default.createElement(_links.HostDetailsLink, {
      hostName: value
    });
  } else if (['source.ip', 'destination.ip'].includes(field)) {
    var flowTarget = field.split('.')[0];
    return _react.default.createElement(_links.IPDetailsLink, {
      ip: value,
      flowTarget: flowTarget
    });
  }

  return _react.default.createElement(_react.default.Fragment, null, value);
};

exports.getRenderedFieldValue = getRenderedFieldValue;