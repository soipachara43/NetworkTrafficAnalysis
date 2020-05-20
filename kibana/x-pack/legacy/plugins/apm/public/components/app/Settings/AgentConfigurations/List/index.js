"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgentConfigurationList = AgentConfigurationList;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _lodash = require("lodash");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _useFetcher = require("../../../../../hooks/useFetcher");

var _ManagedTable = require("../../../../shared/ManagedTable");

var _LoadingStatePrompt = require("../../../../shared/LoadingStatePrompt");

var _TimestampTooltip = require("../../../../shared/TimestampTooltip");

var _variables = require("../../../../../style/variables");

var _all_option = require("../../../../../../../../../plugins/apm/common/agent_configuration/all_option");

var _agentConfigurationLinks = require("../../../../shared/Links/apm/agentConfigurationLinks");

var _ConfirmDeleteModal = require("./ConfirmDeleteModal");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function AgentConfigurationList(_ref) {
  var status = _ref.status,
      data = _ref.data,
      refetch = _ref.refetch;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      configToBeDeleted = _useState2[0],
      setConfigToBeDeleted = _useState2[1];

  var emptyStatePrompt = _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "controlsHorizontal",
    title: _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.apm.agentConfig.configTable.emptyPromptTitle', {
      defaultMessage: 'No configurations found.'
    })),
    body: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.apm.agentConfig.configTable.emptyPromptText', {
      defaultMessage: "Let's change that! You can fine-tune agent configuration directly from Kibana without having to redeploy. Get started by creating your first configuration."
    }))),
    actions: _react.default.createElement(_eui.EuiButton, {
      color: "primary",
      fill: true,
      href: (0, _agentConfigurationLinks.createAgentConfigurationHref)()
    }, _i18n.i18n.translate('xpack.apm.agentConfig.configTable.createConfigButtonLabel', {
      defaultMessage: 'Create configuration'
    }))
  });

  var failurePrompt = _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "alert",
    body: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.apm.agentConfig.configTable.configTable.failurePromptText', {
      defaultMessage: 'The list of agent configurations could not be fetched. Your user may not have the sufficient permissions.'
    })))
  });

  if (status === _useFetcher.FETCH_STATUS.FAILURE) {
    return failurePrompt;
  }

  if (status === _useFetcher.FETCH_STATUS.SUCCESS && (0, _lodash.isEmpty)(data)) {
    return emptyStatePrompt;
  }

  var columns = [{
    field: 'applied_by_agent',
    align: 'center',
    width: (0, _variables.px)(_variables.units.double),
    name: '',
    sortable: true,
    render: function render(isApplied) {
      return _react.default.createElement(_eui.EuiToolTip, {
        content: isApplied ? _i18n.i18n.translate('xpack.apm.agentConfig.configTable.appliedTooltipMessage', {
          defaultMessage: 'Applied by at least one agent'
        }) : _i18n.i18n.translate('xpack.apm.agentConfig.configTable.notAppliedTooltipMessage', {
          defaultMessage: 'Not yet applied by any agents'
        })
      }, _react.default.createElement(_eui.EuiHealth, {
        color: isApplied ? 'success' : _eui_theme_light.default.euiColorLightShade
      }));
    }
  }, {
    field: 'service.name',
    name: _i18n.i18n.translate('xpack.apm.agentConfig.configTable.serviceNameColumnLabel', {
      defaultMessage: 'Service name'
    }),
    sortable: true,
    render: function render(_, config) {
      return _react.default.createElement(_eui.EuiButtonEmpty, {
        flush: "left",
        size: "s",
        color: "primary",
        href: (0, _agentConfigurationLinks.editAgentConfigurationHref)(config.service)
      }, (0, _all_option.getOptionLabel)(config.service.name));
    }
  }, {
    field: 'service.environment',
    name: _i18n.i18n.translate('xpack.apm.agentConfig.configTable.environmentColumnLabel', {
      defaultMessage: 'Service environment'
    }),
    sortable: true,
    render: function render(environment) {
      return (0, _all_option.getOptionLabel)(environment);
    }
  }, {
    align: 'right',
    field: '@timestamp',
    name: _i18n.i18n.translate('xpack.apm.agentConfig.configTable.lastUpdatedColumnLabel', {
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
    width: (0, _variables.px)(_variables.units.double),
    name: '',
    render: function render(config) {
      return _react.default.createElement(_eui.EuiButtonIcon, {
        "aria-label": "Edit",
        iconType: "pencil",
        href: (0, _agentConfigurationLinks.editAgentConfigurationHref)(config.service)
      });
    }
  }, {
    width: (0, _variables.px)(_variables.units.double),
    name: '',
    render: function render(config) {
      return _react.default.createElement(_eui.EuiButtonIcon, {
        "aria-label": "Delete",
        iconType: "trash",
        onClick: function onClick() {
          return setConfigToBeDeleted(config);
        }
      });
    }
  }];
  return _react.default.createElement(_react.default.Fragment, null, configToBeDeleted && _react.default.createElement(_ConfirmDeleteModal.ConfirmDeleteModal, {
    config: configToBeDeleted,
    onCancel: function onCancel() {
      return setConfigToBeDeleted(null);
    },
    onConfirm: function onConfirm() {
      setConfigToBeDeleted(null);
      refetch();
    }
  }), _react.default.createElement(_ManagedTable.ManagedTable, {
    noItemsMessage: _react.default.createElement(_LoadingStatePrompt.LoadingStatePrompt, null),
    columns: columns,
    items: data,
    initialSortField: "service.name",
    initialSortDirection: "asc",
    initialPageSize: 20
  }));
}