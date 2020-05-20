"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APMIndicesPermission = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _useFetcher2 = require("../../../hooks/useFetcher");

var _variables = require("../../../style/variables");

var _ElasticDocsLink = require("../../shared/Links/ElasticDocsLink");

var _SetupInstructionsLink = require("../../shared/Links/SetupInstructionsLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var APMIndicesPermission = function APMIndicesPermission(_ref) {
  var children = _ref.children;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPermissionWarningDismissed = _useState2[0],
      setIsPermissionWarningDismissed = _useState2[1];

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    return callApmApi({
      pathname: '/api/apm/security/indices_privileges'
    });
  }, []),
      _useFetcher$data = _useFetcher.data,
      indicesPrivileges = _useFetcher$data === void 0 ? {} : _useFetcher$data,
      status = _useFetcher.status; // Return null until receive the reponse of the api.


  if (status === _useFetcher2.FETCH_STATUS.LOADING || status === _useFetcher2.FETCH_STATUS.PENDING) {
    return null;
  }

  var indicesWithoutPermission = Object.keys(indicesPrivileges).filter(function (index) {
    return !indicesPrivileges[index].read;
  }); // Show permission warning when a user has at least one index without Read privilege,
  // and he has not manually dismissed the warning

  if (!(0, _lodash.isEmpty)(indicesWithoutPermission) && !isPermissionWarningDismissed) {
    return _react.default.createElement(PermissionWarning, {
      indicesWithoutPermission: indicesWithoutPermission,
      onEscapeHatchClick: function onEscapeHatchClick() {
        return setIsPermissionWarningDismissed(true);
      }
    });
  }

  return _react.default.createElement(_react.default.Fragment, null, children);
};

exports.APMIndicesPermission = APMIndicesPermission;

var CentralizedContainer = _styledComponents.default.div.withConfig({
  displayName: "CentralizedContainer",
  componentId: "sc-1ubu6cb-0"
})(["height:", ";display:flex;justify-content:center;align-items:center;"], (0, _variables.pct)(100));

var EscapeHatch = _styledComponents.default.div.withConfig({
  displayName: "EscapeHatch",
  componentId: "sc-1ubu6cb-1"
})(["width:", ";margin-top:", ";justify-content:center;display:flex;"], (0, _variables.pct)(100), (0, _variables.px)(_variables.units.plus));

var PermissionWarning = function PermissionWarning(_ref2) {
  var indicesWithoutPermission = _ref2.indicesWithoutPermission,
      onEscapeHatchClick = _ref2.onEscapeHatchClick;
  return _react.default.createElement("div", {
    style: {
      height: (0, _variables.pct)(95)
    }
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement("h1", null, _i18n.i18n.translate('xpack.apm.permission.apm', {
    defaultMessage: 'APM'
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_SetupInstructionsLink.SetupInstructionsLink, null))), _react.default.createElement(CentralizedContainer, null, _react.default.createElement("div", null, _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "none"
  }, _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "apmApp",
    iconColor: '',
    title: _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.apm.permission.title', {
      defaultMessage: 'Missing permissions to access APM'
    })),
    body: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.apm.permission.description', {
      defaultMessage: "Your user doesn't have access to all APM indices. You can still use the APM app but some data may be missing. You must be granted access to the following indices:"
    })), _react.default.createElement("ul", {
      style: {
        listStyleType: 'none'
      }
    }, indicesWithoutPermission.map(function (index) {
      return _react.default.createElement("li", {
        key: index,
        style: {
          marginTop: _variables.units.half
        }
      }, _react.default.createElement(_eui.EuiText, {
        size: "s"
      }, index));
    }))),
    actions: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ElasticDocsLink.ElasticDocsLink, {
      section: "/apm/server",
      path: "/feature-roles.html"
    }, function (href) {
      return _react.default.createElement(_eui.EuiButton, {
        color: "primary",
        fill: true,
        href: href
      }, _i18n.i18n.translate('xpack.apm.permission.learnMore', {
        defaultMessage: 'Learn more about APM permissions'
      }));
    }), _react.default.createElement(EscapeHatch, null, _react.default.createElement(_eui.EuiLink, {
      color: "subdued",
      onClick: onEscapeHatchClick,
      style: {
        fontSize: _variables.fontSize
      }
    }, _i18n.i18n.translate('xpack.apm.permission.dismissWarning', {
      defaultMessage: 'Dismiss'
    }))))
  })))));
};