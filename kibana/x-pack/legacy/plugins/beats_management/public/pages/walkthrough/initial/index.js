"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitialWalkthroughPage = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _no_data = require("../../../components/layouts/no_data");

var _walkthrough = require("../../../components/layouts/walkthrough");

var _child_routes = require("../../../components/navigation/child_routes");

var _connected_link = require("../../../components/navigation/connected_link");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var InitialWalkthroughPageComponent = function InitialWalkthroughPageComponent(props) {
  if (props.location.pathname === '/walkthrough/initial') {
    return _react2.default.createElement(_no_data.NoDataLayout, {
      title: _react2.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "center",
        gutterSize: "m"
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, 'Beats central management '), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiBetaBadge, {
        label: _i18n.i18n.translate('xpack.beatsManagement.walkthrough.initial.betaBadgeText', {
          defaultMessage: 'Beta'
        })
      }))),
      actionSection: _react2.default.createElement(_connected_link.ConnectedLink, {
        path: "/walkthrough/initial/beat"
      }, _react2.default.createElement(_eui.EuiButton, {
        color: "primary",
        fill: true
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.enrollBeat.enrollBeatButtonLabel",
        defaultMessage: "Enroll Beat"
      }), ' '))
    }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.beatsManagement.enrollBeat.beatsCentralManagementDescription",
      defaultMessage: "Manage your configurations in a central location."
    })));
  }

  return _react2.default.createElement(_walkthrough.WalkthroughLayout, {
    title: props.intl.formatMessage({
      id: 'xpack.beatsManagement.enrollBeat.getStartedBeatsCentralManagementTitle',
      defaultMessage: 'Get started with Beats central management'
    }),
    walkthroughSteps: [{
      id: '/walkthrough/initial/beat',
      name: props.intl.formatMessage({
        id: 'xpack.beatsManagement.enrollBeat.enrollBeatStepLabel',
        defaultMessage: 'Enroll Beat'
      })
    }, {
      id: '/walkthrough/initial/tag',
      name: props.intl.formatMessage({
        id: 'xpack.beatsManagement.enrollBeat.createTagStepLabel',
        defaultMessage: 'Create tag'
      })
    }, {
      id: '/walkthrough/initial/finish',
      name: props.intl.formatMessage({
        id: 'xpack.beatsManagement.enrollBeat.finishStepLabel',
        defaultMessage: 'Finish'
      })
    }],
    goTo: function goTo() {// FIXME implament goto
    },
    activePath: props.location.pathname
  }, _react2.default.createElement(_child_routes.ChildRoutes, _extends({
    routes: props.routes
  }, props)));
};

var InitialWalkthroughPage = (0, _react.injectI18n)(InitialWalkthroughPageComponent);
exports.InitialWalkthroughPage = InitialWalkthroughPage;