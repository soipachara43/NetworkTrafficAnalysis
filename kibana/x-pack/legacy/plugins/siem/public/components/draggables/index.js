"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DraggableBadge = exports.Badge = exports.DefaultDraggable = exports.getDefaultWhenTooltipIsUnspecified = exports.tooltipContentIsExplicitlyNull = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _draggable_wrapper = require("../drag_and_drop/draggable_wrapper");

var _helpers = require("../drag_and_drop/helpers");

var _empty_value = require("../empty_value");

var _data_provider = require("../timeline/data_providers/data_provider");

var _provider = require("../timeline/data_providers/provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Only returns true if the specified tooltipContent is exactly `null`.
 * Example input / output:
 * `bob -> false`
 * `undefined -> false`
 * `<span>thing</span> -> false`
 * `null -> true`
 */
var tooltipContentIsExplicitlyNull = function tooltipContentIsExplicitlyNull(tooltipContent) {
  return tooltipContent === null;
}; // an explicit / exact null check

/**
 * Derives the tooltip content from the field name if no tooltip was specified
 */


exports.tooltipContentIsExplicitlyNull = tooltipContentIsExplicitlyNull;

var getDefaultWhenTooltipIsUnspecified = function getDefaultWhenTooltipIsUnspecified(_ref) {
  var field = _ref.field,
      tooltipContent = _ref.tooltipContent;
  return tooltipContent != null ? tooltipContent : field;
};
/**
 * Renders the content of the draggable, wrapped in a tooltip
 */


exports.getDefaultWhenTooltipIsUnspecified = getDefaultWhenTooltipIsUnspecified;

var Content = _react.default.memo(function (_ref2) {
  var children = _ref2.children,
      field = _ref2.field,
      tooltipContent = _ref2.tooltipContent,
      value = _ref2.value;
  return !tooltipContentIsExplicitlyNull(tooltipContent) ? _react.default.createElement(_eui.EuiToolTip, {
    "data-test-subj": "".concat(field, "-tooltip"),
    content: getDefaultWhenTooltipIsUnspecified({
      tooltipContent: tooltipContent,
      field: field
    })
  }, _react.default.createElement(_react.default.Fragment, null, children ? children : value)) : _react.default.createElement(_react.default.Fragment, null, children ? children : value);
});

Content.displayName = 'Content';
/**
 * Draggable text (or an arbitrary visualization specified by `children`)
 * that's only displayed when the specified value is non-`null`.
 *
 * @param id - a unique draggable id, which typically follows the format `${contextId}-${eventId}-${field}-${value}`
 * @param field - the name of the field, e.g. `network.transport`
 * @param value - value of the field e.g. `tcp`
 * @param name - defaulting to `field`, this optional human readable name is used by the `DataProvider` that represents the data
 * @param children - defaults to displaying `value`, this allows an arbitrary visualization to be displayed in lieu of the default behavior
 * @param tooltipContent - defaults to displaying `field`, pass `null` to
 * prevent a tooltip from being displayed, or pass arbitrary content
 * @param queryValue - defaults to `value`, this query overrides the `queryMatch.value` used by the `DataProvider` that represents the data
 */

var DefaultDraggable = _react.default.memo(function (_ref3) {
  var id = _ref3.id,
      field = _ref3.field,
      value = _ref3.value,
      name = _ref3.name,
      children = _ref3.children,
      tooltipContent = _ref3.tooltipContent,
      queryValue = _ref3.queryValue;
  return value != null ? _react.default.createElement(_draggable_wrapper.DraggableWrapper, {
    dataProvider: {
      and: [],
      enabled: true,
      id: (0, _helpers.escapeDataProviderId)(id),
      name: name ? name : value,
      excluded: false,
      kqlQuery: '',
      queryMatch: {
        field: field,
        value: queryValue ? queryValue : value,
        operator: _data_provider.IS_OPERATOR
      }
    },
    render: function render(dataProvider, _, snapshot) {
      return snapshot.isDragging ? _react.default.createElement(_draggable_wrapper.DragEffects, null, _react.default.createElement(_provider.Provider, {
        dataProvider: dataProvider
      })) : _react.default.createElement(Content, {
        field: field,
        tooltipContent: tooltipContent,
        value: value
      }, children);
    }
  }) : null;
});

exports.DefaultDraggable = DefaultDraggable;
DefaultDraggable.displayName = 'DefaultDraggable';
var Badge = (0, _styledComponents.default)(_eui.EuiBadge).withConfig({
  displayName: "Badge",
  componentId: "sc-3qfaax-0"
})(["vertical-align:top;"]);
exports.Badge = Badge;
Badge.displayName = 'Badge';

/**
 * A draggable badge that's only displayed when the specified value is non-`null`.
 *
 * @param contextId - used as part of the formula to derive a unique draggable id, this describes the context e.g. `event-fields-browser` in which the badge is displayed
 * @param eventId - uniquely identifies an event, as specified in the `_id` field of the document
 * @param field - the name of the field, e.g. `network.transport`
 * @param value - value of the field e.g. `tcp`
 * @param iconType -the (optional) type of icon e.g. `snowflake` to display on the badge
 * @param name - defaulting to `field`, this optional human readable name is used by the `DataProvider` that represents the data
 * @param color - defaults to `hollow`, optionally overwrite the color of the badge icon
 * @param children - defaults to displaying `value`, this allows an arbitrary visualization to be displayed in lieu of the default behavior
 * @param tooltipContent - defaults to displaying `field`, pass `null` to
 * prevent a tooltip from being displayed, or pass arbitrary content
 * @param queryValue - defaults to `value`, this query overrides the `queryMatch.value` used by the `DataProvider` that represents the data
 */
var DraggableBadge = _react.default.memo(function (_ref4) {
  var contextId = _ref4.contextId,
      eventId = _ref4.eventId,
      field = _ref4.field,
      value = _ref4.value,
      iconType = _ref4.iconType,
      name = _ref4.name,
      _ref4$color = _ref4.color,
      color = _ref4$color === void 0 ? 'hollow' : _ref4$color,
      children = _ref4.children,
      tooltipContent = _ref4.tooltipContent,
      queryValue = _ref4.queryValue;
  return value != null ? _react.default.createElement(DefaultDraggable, {
    id: "draggable-badge-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(field, "-").concat(value),
    field: field,
    name: name,
    value: value,
    tooltipContent: tooltipContent,
    queryValue: queryValue
  }, _react.default.createElement(Badge, {
    iconType: iconType,
    color: color
  }, children ? children : value !== '' ? value : (0, _empty_value.getEmptyStringTag)())) : null;
});

exports.DraggableBadge = DraggableBadge;
DraggableBadge.displayName = 'DraggableBadge';