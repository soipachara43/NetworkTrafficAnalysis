"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IpOverview = void 0;

var _eui = require("@elastic/eui");

var _eui_theme_dark = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_dark.json"));

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _react = _interopRequireDefault(require("react"));

var _constants = require("../../../../../common/constants");

var _kibana = require("../../../../lib/kibana");

var _empty_value = require("../../../empty_value");

var _field_renderers = require("../../../field_renderers/field_renderers");

var i18n = _interopRequireWildcard(require("./translations"));

var _index = require("../../index");

var _loader = require("../../../loader");

var _anomaly_scores = require("../../../ml/score/anomaly_scores");

var _use_ml_capabilities = require("../../../ml_popover/hooks/use_ml_capabilities");

var _has_ml_user_permissions = require("../../../ml/permissions/has_ml_user_permissions");

var _inspect = require("../../../inspect");

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

var IpOverview = _react.default.memo(function (_ref) {
  var id = _ref.id,
      ip = _ref.ip,
      data = _ref.data,
      loading = _ref.loading,
      flowTarget = _ref.flowTarget,
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

  var typeData = data[flowTarget];
  var column = [{
    title: i18n.LOCATION,
    description: (0, _field_renderers.locationRenderer)(["".concat(flowTarget, ".geo.city_name"), "".concat(flowTarget, ".geo.region_name")], data)
  }, {
    title: i18n.AUTONOMOUS_SYSTEM,
    description: typeData ? (0, _field_renderers.autonomousSystemRenderer)(typeData.autonomousSystem, flowTarget) : (0, _empty_value.getEmptyTagValue)()
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
    title: i18n.FIRST_SEEN,
    description: typeData ? (0, _field_renderers.dateRenderer)(typeData.firstSeen) : (0, _empty_value.getEmptyTagValue)()
  }, {
    title: i18n.LAST_SEEN,
    description: typeData ? (0, _field_renderers.dateRenderer)(typeData.lastSeen) : (0, _empty_value.getEmptyTagValue)()
  }], [{
    title: i18n.HOST_ID,
    description: typeData ? (0, _field_renderers.hostIdRenderer)({
      host: data.host,
      ipFilter: ip
    }) : (0, _empty_value.getEmptyTagValue)()
  }, {
    title: i18n.HOST_NAME,
    description: typeData ? (0, _field_renderers.hostNameRenderer)(data.host, ip) : (0, _empty_value.getEmptyTagValue)()
  }], [{
    title: i18n.WHOIS,
    description: (0, _field_renderers.whoisRenderer)(ip)
  }, {
    title: i18n.REPUTATION,
    description: (0, _field_renderers.reputationRenderer)(ip)
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

exports.IpOverview = IpOverview;
IpOverview.displayName = 'IpOverview';