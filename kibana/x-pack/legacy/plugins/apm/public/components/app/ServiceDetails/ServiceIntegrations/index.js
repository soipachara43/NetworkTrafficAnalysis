"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceIntegrations = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _LicenseContext = require("../../../../context/LicenseContext");

var _MachineLearningFlyout = require("./MachineLearningFlyout");

var _WatcherFlyout = require("./WatcherFlyout");

var _ApmPluginContext = require("../../../../context/ApmPluginContext");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ServiceIntegrations =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ServiceIntegrations, _React$Component);

  function ServiceIntegrations() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ServiceIntegrations);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ServiceIntegrations)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "context", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isPopoverOpen: false,
      activeFlyout: null
    });

    _defineProperty(_assertThisInitialized(_this), "getPanelItems", (0, _lodash.memoize)(function (mlAvailable) {
      var panelItems = [];

      if (mlAvailable) {
        panelItems = panelItems.concat(_this.getMLPanelItems());
      }

      return panelItems.concat(_this.getWatcherPanelItems());
    }));

    _defineProperty(_assertThisInitialized(_this), "getMLPanelItems", function () {
      return [{
        name: _i18n.i18n.translate('xpack.apm.serviceDetails.integrationsMenu.enableMLAnomalyDetectionButtonLabel', {
          defaultMessage: 'Enable ML anomaly detection'
        }),
        icon: 'machineLearningApp',
        toolTipContent: _i18n.i18n.translate('xpack.apm.serviceDetails.integrationsMenu.enableMLAnomalyDetectionButtonTooltip', {
          defaultMessage: 'Set up a machine learning job for this service'
        }),
        onClick: function onClick() {
          _this.closePopover();

          _this.openFlyout('ML');
        }
      }];
    });

    _defineProperty(_assertThisInitialized(_this), "getWatcherPanelItems", function () {
      var core = _this.context.core;
      return [{
        name: _i18n.i18n.translate('xpack.apm.serviceDetails.integrationsMenu.enableWatcherErrorReportsButtonLabel', {
          defaultMessage: 'Enable watcher error reports'
        }),
        icon: 'watchesApp',
        onClick: function onClick() {
          _this.closePopover();

          _this.openFlyout('Watcher');
        }
      }, {
        name: _i18n.i18n.translate('xpack.apm.serviceDetails.integrationsMenu.viewWatchesButtonLabel', {
          defaultMessage: 'View existing watches'
        }),
        icon: 'watchesApp',
        href: core.http.basePath.prepend('/app/kibana#/management/elasticsearch/watcher'),
        target: '_blank',
        onClick: function onClick() {
          return _this.closePopover();
        }
      }];
    });

    _defineProperty(_assertThisInitialized(_this), "openPopover", function () {
      return _this.setState({
        isPopoverOpen: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closePopover", function () {
      return _this.setState({
        isPopoverOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "openFlyout", function (name) {
      return _this.setState({
        activeFlyout: name
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closeFlyouts", function () {
      return _this.setState({
        activeFlyout: null
      });
    });

    return _this;
  }

  _createClass(ServiceIntegrations, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var button = _react.default.createElement(_eui.EuiButtonEmpty, {
        iconType: "arrowDown",
        iconSide: "right",
        onClick: this.openPopover
      }, _i18n.i18n.translate('xpack.apm.serviceDetails.integrationsMenu.integrationsButtonLabel', {
        defaultMessage: 'Integrations'
      }));

      return _react.default.createElement(_LicenseContext.LicenseContext.Consumer, null, function (license) {
        return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiPopover, {
          id: "integrations-menu",
          button: button,
          isOpen: _this2.state.isPopoverOpen,
          closePopover: _this2.closePopover,
          panelPaddingSize: "none",
          anchorPosition: "downRight"
        }, _react.default.createElement(_eui.EuiContextMenu, {
          initialPanelId: 0,
          panels: [{
            id: 0,
            items: _this2.getPanelItems(license === null || license === void 0 ? void 0 : license.getFeature('ml').isAvailable)
          }]
        })), _react.default.createElement(_MachineLearningFlyout.MachineLearningFlyout, {
          isOpen: _this2.state.activeFlyout === 'ML',
          onClose: _this2.closeFlyouts,
          urlParams: _this2.props.urlParams
        }), _react.default.createElement(_WatcherFlyout.WatcherFlyout, {
          isOpen: _this2.state.activeFlyout === 'Watcher',
          onClose: _this2.closeFlyouts,
          urlParams: _this2.props.urlParams
        }));
      });
    }
  }]);

  return ServiceIntegrations;
}(_react.default.Component);

exports.ServiceIntegrations = ServiceIntegrations;

_defineProperty(ServiceIntegrations, "contextType", _ApmPluginContext.ApmPluginContext);