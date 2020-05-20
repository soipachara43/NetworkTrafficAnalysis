"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Providers = exports.getDraggableId = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _data_provider = require("./data_provider");

var _empty = require("./empty");

var _provider_item_and_drag_drop = require("./provider_item_and_drag_drop");

var _provider_item_badge = require("./provider_item_badge");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * This fixed height prevents the timeline's droppable area from growing,
 * (growth causes layout thrashing) when the AND drop target in a row
 * of data providers is revealed.
 */
var ROW_OF_DATA_PROVIDERS_HEIGHT = 43; // px

var PanelProviders = _styledComponents.default.div.withConfig({
  displayName: "PanelProviders",
  componentId: "sc-75pv4d-0"
})(["position:relative;display:flex;flex-direction:row;min-height:100px;padding:5px 10px 15px 0px;overflow-y:auto;align-items:stretch;justify-content:flex-start;"]);

PanelProviders.displayName = 'PanelProviders';
var PanelProvidersGroupContainer = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "PanelProvidersGroupContainer",
  componentId: "sc-75pv4d-1"
})(["position:relative;flex-grow:unset;.euiFlexItem{flex:1 0 auto;}.euiFlexItem--flexGrowZero{flex:0 0 auto;}"]);
PanelProvidersGroupContainer.displayName = 'PanelProvidersGroupContainer';
/** A row of data providers in the timeline drop zone */

var PanelProviderGroupContainer = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "PanelProviderGroupContainer",
  componentId: "sc-75pv4d-2"
})(["height:", "px;min-height:", "px;margin:5px 0px;"], ROW_OF_DATA_PROVIDERS_HEIGHT, ROW_OF_DATA_PROVIDERS_HEIGHT);
PanelProviderGroupContainer.displayName = 'PanelProviderGroupContainer';
var PanelProviderItemContainer = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "PanelProviderItemContainer",
  componentId: "sc-75pv4d-3"
})(["position:relative;"]);
PanelProviderItemContainer.displayName = 'PanelProviderItemContainer';
var TimelineEuiFormHelpText = (0, _styledComponents.default)(_eui.EuiFormHelpText).withConfig({
  displayName: "TimelineEuiFormHelpText",
  componentId: "sc-75pv4d-4"
})(["padding-top:0px;position:absolute;bottom:0px;left:5px;"]);
TimelineEuiFormHelpText.displayName = 'TimelineEuiFormHelpText';

var getDraggableId = function getDraggableId(_ref) {
  var id = _ref.id,
      dataProviderId = _ref.dataProviderId;
  return "draggableId.timeline.".concat(id, ".dataProvider.").concat(dataProviderId);
};
/**
 * Renders an interactive card representation of the data providers. It also
 * affords uniform UI controls for the following actions:
 * 1) removing a data provider
 * 2) temporarily disabling a data provider
 * 3) applying boolean negation to the data provider
 */


exports.getDraggableId = getDraggableId;

var Providers = _react.default.memo(function (_ref2) {
  var browserFields = _ref2.browserFields,
      id = _ref2.id,
      dataProviders = _ref2.dataProviders,
      onChangeDataProviderKqlQuery = _ref2.onChangeDataProviderKqlQuery,
      onChangeDroppableAndProvider = _ref2.onChangeDroppableAndProvider,
      onDataProviderEdited = _ref2.onDataProviderEdited,
      onDataProviderRemoved = _ref2.onDataProviderRemoved,
      onToggleDataProviderEnabled = _ref2.onToggleDataProviderEnabled,
      onToggleDataProviderExcluded = _ref2.onToggleDataProviderExcluded;
  return _react.default.createElement(PanelProviders, {
    className: "timeline-drop-area",
    "data-test-subj": "providers"
  }, _react.default.createElement(_empty.Empty, {
    showSmallMsg: dataProviders.length > 0
  }), _react.default.createElement(PanelProvidersGroupContainer, {
    direction: "column",
    className: "provider-items-container",
    alignItems: "flexStart",
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, dataProviders.map(function (dataProvider, i) {
    var deleteProvider = function deleteProvider() {
      return onDataProviderRemoved(dataProvider.id);
    };

    var toggleEnabledProvider = function toggleEnabledProvider() {
      return onToggleDataProviderEnabled({
        providerId: dataProvider.id,
        enabled: !dataProvider.enabled
      });
    };

    var toggleExcludedProvider = function toggleExcludedProvider() {
      return onToggleDataProviderExcluded({
        providerId: dataProvider.id,
        excluded: !dataProvider.excluded
      });
    };

    return (// Providers are a special drop target that can't be drag-and-dropped
      // to another destination, so it doesn't use our DraggableWrapper
      _react.default.createElement(PanelProviderGroupContainer, {
        key: dataProvider.id,
        direction: "row",
        gutterSize: "none",
        justifyContent: "flexStart",
        alignItems: "center"
      }, _react.default.createElement(PanelProviderItemContainer, {
        className: "provider-item-filter-container",
        grow: false
      }, _react.default.createElement(_reactBeautifulDnd.Draggable, {
        draggableId: getDraggableId({
          id: id,
          dataProviderId: dataProvider.id
        }),
        index: i
      }, function (provided) {
        return _react.default.createElement("div", _extends({}, provided.draggableProps, provided.dragHandleProps, {
          ref: provided.innerRef,
          "data-test-subj": "providerContainer"
        }), _react.default.createElement(_provider_item_badge.ProviderItemBadge, {
          browserFields: browserFields,
          field: dataProvider.queryMatch.displayField || dataProvider.queryMatch.field,
          kqlQuery: dataProvider.kqlQuery,
          isEnabled: dataProvider.enabled,
          isExcluded: dataProvider.excluded,
          deleteProvider: deleteProvider,
          operator: dataProvider.queryMatch.operator || _data_provider.IS_OPERATOR,
          onDataProviderEdited: onDataProviderEdited,
          timelineId: id,
          toggleEnabledProvider: toggleEnabledProvider,
          toggleExcludedProvider: toggleExcludedProvider,
          providerId: dataProvider.id,
          val: dataProvider.queryMatch.displayValue || dataProvider.queryMatch.value
        }));
      })), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_provider_item_and_drag_drop.ProviderItemAndDragDrop, {
        browserFields: browserFields,
        dataProvider: dataProvider,
        onChangeDataProviderKqlQuery: onChangeDataProviderKqlQuery,
        onChangeDroppableAndProvider: onChangeDroppableAndProvider,
        onDataProviderEdited: onDataProviderEdited,
        onDataProviderRemoved: onDataProviderRemoved,
        onToggleDataProviderEnabled: onToggleDataProviderEnabled,
        onToggleDataProviderExcluded: onToggleDataProviderExcluded,
        timelineId: id
      })))
    );
  }))), _react.default.createElement(TimelineEuiFormHelpText, null, _react.default.createElement("span", null, i18n.DROP_HERE, " ", i18n.TO_BUILD_AN, " ", i18n.OR.toLocaleUpperCase(), " ", i18n.QUERY)));
});

exports.Providers = Providers;
Providers.displayName = 'Providers';