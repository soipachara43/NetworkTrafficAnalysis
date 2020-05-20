"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomLinkTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _lodash = require("lodash");

var _variables = require("../../../../../style/variables");

var _ManagedTable = require("../../../../shared/ManagedTable");

var _TimestampTooltip = require("../../../../shared/TimestampTooltip");

var _LoadingStatePrompt = require("../../../../shared/LoadingStatePrompt");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CustomLinkTable = function CustomLinkTable(_ref) {
  var _ref$items = _ref.items,
      items = _ref$items === void 0 ? [] : _ref$items,
      onCustomLinkSelected = _ref.onCustomLinkSelected;

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      searchTerm = _useState2[0],
      setSearchTerm = _useState2[1];

  var columns = [{
    field: 'label',
    name: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.table.name', {
      defaultMessage: 'Name'
    }),
    truncateText: true
  }, {
    field: 'url',
    name: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.table.url', {
      defaultMessage: 'URL'
    }),
    truncateText: true
  }, {
    width: (0, _variables.px)(160),
    align: 'right',
    field: '@timestamp',
    name: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.table.lastUpdated', {
      defaultMessage: 'Last updated'
    }),
    sortable: true,
    render: function render(value) {
      return _react.default.createElement(_TimestampTooltip.TimestampTooltip, {
        time: value,
        timeUnit: "minutes"
      });
    }
  }, {
    width: (0, _variables.px)(_variables.units.triple),
    name: '',
    actions: [{
      name: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.table.editButtonLabel', {
        defaultMessage: 'Edit'
      }),
      description: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.table.editButtonDescription', {
        defaultMessage: 'Edit this custom link'
      }),
      icon: 'pencil',
      color: 'primary',
      type: 'icon',
      onClick: function onClick(customLink) {
        onCustomLinkSelected(customLink);
      }
    }]
  }];
  var filteredItems = items.filter(function (_ref2) {
    var label = _ref2.label,
        url = _ref2.url;
    return label.toLowerCase().includes(searchTerm) || url.toLowerCase().includes(searchTerm);
  });
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFieldSearch, {
    fullWidth: true,
    onChange: function onChange(e) {
      return setSearchTerm(e.target.value);
    },
    placeholder: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.searchInput.filter', {
      defaultMessage: 'Filter links by Name and URL...'
    })
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_ManagedTable.ManagedTable, {
    noItemsMessage: (0, _lodash.isEmpty)(items) ? _react.default.createElement(_LoadingStatePrompt.LoadingStatePrompt, null) : _react.default.createElement(NoResultFound, {
      value: searchTerm
    }),
    items: filteredItems,
    columns: columns,
    initialPageSize: 10,
    initialSortField: "@timestamp",
    initialSortDirection: "desc"
  }));
};

exports.CustomLinkTable = CustomLinkTable;

var NoResultFound = function NoResultFound(_ref3) {
  var value = _ref3.value;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceAround"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.table.noResultFound', {
    defaultMessage: "No results for \"{value}\".",
    values: {
      value: value
    }
  }))));
};