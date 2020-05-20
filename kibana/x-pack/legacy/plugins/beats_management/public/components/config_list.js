"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigList = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _config_schemas = require("../../common/config_schemas");

var _config_schemas_translations_map = require("../../common/config_schemas_translations_map");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pagination = {
  pageSize: 5,
  hidePerPageOptions: true
};

var ConfigListUi = function ConfigListUi(props) {
  return _react2.default.createElement(_eui.EuiBasicTable, {
    items: props.configs.list || [],
    itemId: "id",
    pagination: _objectSpread({}, pagination, {
      totalItemCount: props.configs.total,
      pageIndex: props.configs.page
    }),
    onChange: function onChange() {
      var table = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        page: {
          index: 0,
          size: 5
        }
      };

      if (props.onTableChange) {
        props.onTableChange(table.page.index, table.page.size);
      }
    },
    columns: [{
      field: 'type',
      name: props.intl.formatMessage({
        id: 'xpack.beatsManagement.tagTable.typeColumnName',
        defaultMessage: 'Type'
      }),
      truncateText: false,
      render: function render(type, config) {
        var translatedConfig = (0, _config_schemas_translations_map.translateConfigSchema)(_config_schemas.configBlockSchemas).find(function (sc) {
          return sc.id === type;
        });
        return _react2.default.createElement(_eui.EuiLink, {
          onClick: function onClick() {
            return props.onConfigClick('edit', config);
          }
        }, translatedConfig ? translatedConfig.name : type);
      }
    }, {
      field: 'module',
      name: props.intl.formatMessage({
        id: 'xpack.beatsManagement.tagTable.moduleColumnName',
        defaultMessage: 'Module'
      }),
      truncateText: false,
      render: function render(value, config) {
        return config.config._sub_type || props.intl.formatMessage({
          id: 'xpack.beatsManagement.tagTable.moduleColumn.notAvailibaleLabel',
          defaultMessage: 'N/A'
        });
      }
    }, {
      field: 'description',
      name: props.intl.formatMessage({
        id: 'xpack.beatsManagement.tagTable.descriptionColumnName',
        defaultMessage: 'Description'
      })
    }, {
      name: props.intl.formatMessage({
        id: 'xpack.beatsManagement.tagTable.actionsColumnName',
        defaultMessage: 'Actions'
      }),
      actions: [{
        name: props.intl.formatMessage({
          id: 'xpack.beatsManagement.tagTable.actions.removeButtonAriaLabel',
          defaultMessage: 'Remove'
        }),
        description: props.intl.formatMessage({
          id: 'xpack.beatsManagement.tagTable.actions.removeTooltip',
          defaultMessage: 'Remove this config from tag'
        }),
        type: 'icon',
        icon: 'trash',
        onClick: function onClick(item) {
          return props.onConfigClick('delete', item);
        }
      }]
    }]
  });
};

var ConfigList = (0, _react.injectI18n)(ConfigListUi);
exports.ConfigList = ConfigList;