"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HostOverview = void 0;

var _eui = require("@elastic/eui");

var _eui_theme_dark = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_dark.json"));

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _constants = require("../../../../../common/constants");

var _kibana = require("../../../../lib/kibana");

var _empty_value = require("../../../empty_value");

var _field_renderers = require("../../../field_renderers/field_renderers");

var _inspect = require("../../../inspect");

var _loader = require("../../../loader");

var _links = require("../../../links");

var _has_ml_user_permissions = require("../../../ml/permissions/has_ml_user_permissions");

var _use_ml_capabilities = require("../../../ml_popover/hooks/use_ml_capabilities");

var _anomaly_scores = require("../../../ml/score/anomaly_scores");

var _index = require("../../index");

var _first_last_seen_host = require("../first_last_seen_host");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getDescriptionList = function getDescriptionList(descriptionList, key) {
  return _react.default.createElement(_eui.EuiFlexItem, {
    key: key
  }, _react.default.createElement(_index.DescriptionListStyled, {
    listItems: descriptionList
  }));
};

var HostOverview = _react.default.memo(function (_ref) {
  var data = _ref.data,
      loading = _ref.loading,
      id = _ref.id,
      startDate = _ref.startDate,
      endDate = _ref.endDate,
      isLoadingAnomaliesData = _ref.isLoadingAnomaliesData,
      anomaliesData = _ref.anomaliesData,
      narrowDateRange = _ref.narrowDateRange;
  var capabilities = (0, _use_ml_capabilities.useMlCapabilities)();
  var userPermissions = (0, _has_ml_user_permissions.hasMlUserPermissions)(capabilities);

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_DARK_MODE),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      darkMode = _useUiSetting$2[0];

  var getDefaultRenderer = function getDefaultRenderer(fieldName, fieldData) {
    return _react.default.createElement(_field_renderers.DefaultFieldRenderer, {
      rowItems: (0, _fp.getOr)([], fieldName, fieldData),
      attrName: fieldName,
      idPrefix: "host-overview"
    });
  };

  var column = [{
    title: i18n.HOST_ID,
    description: data.host ? (0, _field_renderers.hostIdRenderer)({
      host: data.host,
      noLink: true
    }) : (0, _empty_value.getEmptyTagValue)()
  }, {
    title: i18n.FIRST_SEEN,
    description: data.host != null && data.host.name && data.host.name.length ? _react.default.createElement(_first_last_seen_host.FirstLastSeenHost, {
      hostname: data.host.name[0],
      type: _first_last_seen_host.FirstLastSeenHostType.FIRST_SEEN
    }) : (0, _empty_value.getEmptyTagValue)()
  }, {
    title: i18n.LAST_SEEN,
    description: data.host != null && data.host.name && data.host.name.length ? _react.default.createElement(_first_last_seen_host.FirstLastSeenHost, {
      hostname: data.host.name[0],
      type: _first_last_seen_host.FirstLastSeenHostType.LAST_SEEN
    }) : (0, _empty_value.getEmptyTagValue)()
  }];
  var firstColumn = userPermissions ? [].concat(column, [{
    title: i18n.MAX_ANOMALY_SCORE_BY_JOB,
    description: _react.default.createElement(_anomaly_scores.AnomalyScores, {
      anomalies: anomaliesData,
      startDate: startDate,
      endDate: endDate,
      isLoading: isLoadingAnomaliesData,
      narrowDateRange: narrowDateRange
    })
  }]) : column;
  var descriptionLists = [firstColumn, [{
    title: i18n.IP_ADDRESSES,
    description: _react.default.createElement(_field_renderers.DefaultFieldRenderer, {
      rowItems: (0, _fp.getOr)([], 'host.ip', data),
      attrName: 'host.ip',
      idPrefix: "host-overview",
      render: function render(ip) {
        return ip != null ? _react.default.createElement(_links.IPDetailsLink, {
          ip: ip
        }) : (0, _empty_value.getEmptyTagValue)();
      }
    })
  }, {
    title: i18n.MAC_ADDRESSES,
    description: getDefaultRenderer('host.mac', data)
  }, {
    title: i18n.PLATFORM,
    description: getDefaultRenderer('host.os.platform', data)
  }], [{
    title: i18n.OS,
    description: getDefaultRenderer('host.os.name', data)
  }, {
    title: i18n.FAMILY,
    description: getDefaultRenderer('host.os.family', data)
  }, {
    title: i18n.VERSION,
    description: getDefaultRenderer('host.os.version', data)
  }, {
    title: i18n.ARCHITECTURE,
    description: getDefaultRenderer('host.architecture', data)
  }], [{
    title: i18n.CLOUD_PROVIDER,
    description: getDefaultRenderer('cloud.provider', data)
  }, {
    title: i18n.REGION,
    description: getDefaultRenderer('cloud.region', data)
  }, {
    title: i18n.INSTANCE_ID,
    description: getDefaultRenderer('cloud.instance.id', data)
  }, {
    title: i18n.MACHINE_TYPE,
    description: getDefaultRenderer('cloud.machine.type', data)
  }]];
  return _react.default.createElement(_inspect.InspectButtonContainer, null, _react.default.createElement(_index.OverviewWrapper, null, _react.default.createElement(_inspect.InspectButton, {
    queryId: id,
    title: i18n.INSPECT_TITLE,
    inspectIndex: 0
  }), descriptionLists.map(function (descriptionList, index) {
    return getDescriptionList(descriptionList, index);
  }), loading && _react.default.createElement(_loader.Loader, {
    overlay: true,
    overlayBackground: darkMode ? _eui_theme_dark.default.euiPageBackgroundColor : _eui_theme_light.default.euiPageBackgroundColor,
    size: "xl"
  })));
});

exports.HostOverview = HostOverview;
HostOverview.displayName = 'HostOverview';