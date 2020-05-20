"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterGroupComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _filter_popover = require("./filter_popover");

var _filter_status_button = require("./filter_status_button");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var FilterGroupComponent = function FilterGroupComponent(_ref) {
  var currentFilter = _ref.currentFilter,
      overviewFilters = _ref.overviewFilters,
      loading = _ref.loading,
      onFilterUpdate = _ref.onFilterUpdate;
  var locations = overviewFilters.locations,
      ports = overviewFilters.ports,
      schemes = overviewFilters.schemes,
      tags = overviewFilters.tags;
  var filterKueries;

  try {
    filterKueries = new Map(JSON.parse(currentFilter));
  } catch (_unused) {
    filterKueries = new Map();
  }
  /**
   * Handle an added or removed value to filter against for an uptime field.
   * @param fieldName the name of the field to filter against
   * @param values the list of values to use when filter a field
   */


  var onFilterFieldChange = function onFilterFieldChange(fieldName, values) {
    // add new term to filter map, toggle it off if already present
    var updatedFilterMap = new Map(filterKueries);
    updatedFilterMap.set(fieldName, values);
    Array.from(updatedFilterMap.keys()).forEach(function (key) {
      var value = updatedFilterMap.get(key);

      if (value && value.length === 0) {
        updatedFilterMap.delete(key);
      }
    }); // store the new set of filters

    var persistedFilters = Array.from(updatedFilterMap);
    onFilterUpdate(persistedFilters.length === 0 ? '' : JSON.stringify(persistedFilters));
  };

  var getSelectedItems = function getSelectedItems(fieldName) {
    return filterKueries.get(fieldName) || [];
  };

  var filterPopoverProps = [{
    loading: loading,
    onFilterFieldChange: onFilterFieldChange,
    fieldName: 'observer.geo.name',
    id: 'location',
    items: locations,
    selectedItems: getSelectedItems('observer.geo.name'),
    title: _i18n.i18n.translate('xpack.uptime.filterBar.options.location.name', {
      defaultMessage: 'Location'
    })
  }, {
    loading: loading,
    onFilterFieldChange: onFilterFieldChange,
    fieldName: 'url.port',
    id: 'port',
    disabled: ports.length === 0,
    items: ports.map(function (p) {
      return p.toString();
    }),
    selectedItems: getSelectedItems('url.port'),
    title: _i18n.i18n.translate('xpack.uptime.filterBar.options.portLabel', {
      defaultMessage: 'Port'
    })
  }, {
    loading: loading,
    onFilterFieldChange: onFilterFieldChange,
    fieldName: 'monitor.type',
    id: 'scheme',
    disabled: schemes.length === 0,
    items: schemes,
    selectedItems: getSelectedItems('monitor.type'),
    title: _i18n.i18n.translate('xpack.uptime.filterBar.options.schemeLabel', {
      defaultMessage: 'Scheme'
    })
  }, {
    loading: loading,
    onFilterFieldChange: onFilterFieldChange,
    fieldName: 'tags',
    id: 'tags',
    disabled: tags.length === 0,
    items: tags,
    selectedItems: getSelectedItems('tags'),
    title: _i18n.i18n.translate('xpack.uptime.filterBar.options.tagsLabel', {
      defaultMessage: 'Tags'
    })
  }];
  return _react.default.createElement(_eui.EuiFilterGroup, null, _react.default.createElement(_filter_status_button.FilterStatusButton, {
    content: _i18n.i18n.translate('xpack.uptime.filterBar.filterUpLabel', {
      defaultMessage: 'Up'
    }),
    dataTestSubj: "xpack.uptime.filterBar.filterStatusUp",
    value: "up",
    withNext: true
  }), _react.default.createElement(_filter_status_button.FilterStatusButton, {
    content: _i18n.i18n.translate('xpack.uptime.filterBar.filterDownLabel', {
      defaultMessage: 'Down'
    }),
    dataTestSubj: "xpack.uptime.filterBar.filterStatusDown",
    value: "down",
    withNext: false
  }), filterPopoverProps.map(function (item) {
    return _react.default.createElement(_filter_popover.FilterPopover, _extends({
      key: item.id
    }, item));
  }));
};

exports.FilterGroupComponent = FilterGroupComponent;