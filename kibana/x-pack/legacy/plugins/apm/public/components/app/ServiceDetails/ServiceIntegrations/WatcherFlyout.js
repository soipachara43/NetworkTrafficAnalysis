"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WatcherFlyout = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _react2 = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _public = require("../../../../../../../../../src/plugins/kibana_react/public");

var _KibanaLink = require("../../../shared/Links/KibanaLink");

var _createErrorGroupWatch = require("./createErrorGroupWatch");

var _ElasticDocsLink = require("../../../shared/Links/ElasticDocsLink");

var _ApmPluginContext = require("../../../../context/ApmPluginContext");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SmallInput = _styledComponents.default.div.withConfig({
  displayName: "SmallInput",
  componentId: "dlifd9-0"
})([".euiFormRow{max-width:85px;}.euiFormHelpText{width:200px;}"]);

var WatcherFlyout =
/*#__PURE__*/
function (_Component) {
  _inherits(WatcherFlyout, _Component);

  function WatcherFlyout() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, WatcherFlyout);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WatcherFlyout)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "context", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      schedule: 'daily',
      threshold: 10,
      actions: {
        slack: false,
        email: false
      },
      interval: {
        value: 10,
        unit: 'm'
      },
      daily: '08:00',
      emails: '',
      slackUrl: ''
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeSchedule", function (schedule) {
      _this.setState({
        schedule: schedule
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeThreshold", function (event) {
      _this.setState({
        threshold: parseInt(event.target.value, 10)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeDailyUnit", function (event) {
      _this.setState({
        daily: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeIntervalValue", function (event) {
      _this.setState({
        interval: {
          value: parseInt(event.target.value, 10),
          unit: _this.state.interval.unit
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeIntervalUnit", function (event) {
      _this.setState({
        interval: {
          value: _this.state.interval.value,
          unit: event.target.value
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeAction", function (actionName) {
      _this.setState({
        actions: _objectSpread({}, _this.state.actions, _defineProperty({}, actionName, !_this.state.actions[actionName]))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeEmails", function (event) {
      _this.setState({
        emails: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeSlackUrl", function (event) {
      _this.setState({
        slackUrl: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "createWatch", function (_ref) {
      var indexPatternTitle = _ref.indexPatternTitle;
      return function () {
        var serviceName = _this.props.urlParams.serviceName;
        var core = _this.context.core;

        if (!serviceName) {
          return;
        }

        var emails = _this.state.actions.email ? _this.state.emails.split(',').map(function (email) {
          return email.trim();
        }).filter(function (email) {
          return !!email;
        }) : [];
        var slackUrl = _this.state.actions.slack ? _this.state.slackUrl : '';
        var schedule = _this.state.schedule === 'interval' ? {
          interval: "".concat(_this.state.interval.value).concat(_this.state.interval.unit)
        } : {
          daily: {
            at: "".concat(_this.state.daily)
          }
        };
        var timeRange = _this.state.schedule === 'interval' ? {
          value: _this.state.interval.value,
          unit: _this.state.interval.unit
        } : {
          value: 24,
          unit: 'h'
        };
        return (0, _createErrorGroupWatch.createErrorGroupWatch)({
          http: core.http,
          emails: emails,
          schedule: schedule,
          serviceName: serviceName,
          slackUrl: slackUrl,
          threshold: _this.state.threshold,
          timeRange: timeRange,
          apmIndexPatternTitle: indexPatternTitle
        }).then(function (id) {
          _this.props.onClose();

          _this.addSuccessToast(id);
        }).catch(function (e) {
          // eslint-disable-next-line
          console.error(e);

          _this.addErrorToast();
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "addErrorToast", function () {
      var core = _this.context.core;
      core.notifications.toasts.addWarning({
        title: _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.watchCreationFailedNotificationTitle', {
          defaultMessage: 'Watch creation failed'
        }),
        text: (0, _public.toMountPoint)(_react2.default.createElement("p", null, _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.watchCreationFailedNotificationText', {
          defaultMessage: 'Make sure your user has permission to create watches.'
        })))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "addSuccessToast", function (id) {
      var core = _this.context.core;
      core.notifications.toasts.addSuccess({
        title: _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.watchCreatedNotificationTitle', {
          defaultMessage: 'New watch created!'
        }),
        text: (0, _public.toMountPoint)(_react2.default.createElement("p", null, _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.watchCreatedNotificationText', {
          defaultMessage: 'The watch is now ready and will send error reports for {serviceName}.',
          values: {
            serviceName: _this.props.urlParams.serviceName
          }
        }), ' ', _react2.default.createElement(_ApmPluginContext.ApmPluginContext.Provider, {
          value: _this.context
        }, _react2.default.createElement(_KibanaLink.KibanaLink, {
          path: "/management/elasticsearch/watcher/watches/watch/".concat(id)
        }, _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.watchCreatedNotificationText.viewWatchLinkText', {
          defaultMessage: 'View watch'
        })))))
      });
    });

    return _this;
  }

  _createClass(WatcherFlyout, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      if (!this.props.isOpen) {
        return null;
      }

      var dailyTime = this.state.daily;
      var inputTime = "".concat(dailyTime, "Z"); // Add tz to make into UTC

      var inputFormat = 'HH:mmZ'; // Parse as 24 hour w. tz

      var dailyTimeFormatted = (0, _momentTimezone.default)(inputTime, inputFormat).format('HH:mm'); // Format as 24h

      var dailyTime12HourFormatted = (0, _momentTimezone.default)(inputTime, inputFormat).format('hh:mm A (z)'); // Format as 12h w. tz
      // Generate UTC hours for Daily Report select field

      var intervalHours = (0, _lodash.range)(24).map(function (i) {
        var hour = (0, _lodash.padLeft)(i.toString(), 2, '0');
        return {
          value: "".concat(hour, ":00"),
          text: "".concat(hour, ":00 UTC")
        };
      });

      var flyoutBody = _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.apm.serviceDetails.enableErrorReportsPanel.formDescription",
        defaultMessage: "This form will assist in creating a Watch that can notify you of error occurrences from this service. To learn more about Watcher, please read our {documentationLink}.",
        values: {
          documentationLink: _react2.default.createElement(_ElasticDocsLink.ElasticDocsLink, {
            target: "_blank",
            section: "/x-pack",
            path: "/watcher-getting-started.html"
          }, _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.formDescription.documentationLinkText', {
            defaultMessage: 'documentation'
          }))
        }
      })), _react2.default.createElement(_eui.EuiForm, null, _react2.default.createElement("h4", null, _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.conditionTitle', {
        defaultMessage: 'Condition'
      })), _react2.default.createElement(_eui.EuiFormRow, {
        label: _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.occurrencesThresholdLabel', {
          defaultMessage: 'Occurrences threshold per error group'
        }),
        helpText: _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.occurrencesThresholdHelpText', {
          defaultMessage: 'Threshold to be met for error group to be included in report.'
        }),
        compressed: true
      }, _react2.default.createElement(_eui.EuiFieldNumber, {
        icon: "number",
        min: 1,
        value: this.state.threshold,
        onChange: this.onChangeThreshold
      })), _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react2.default.createElement("h4", null, _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.triggerScheduleTitle', {
        defaultMessage: 'Trigger schedule'
      })), _react2.default.createElement(_eui.EuiText, {
        size: "xs",
        color: "subdued"
      }, _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.triggerScheduleDescription', {
        defaultMessage: 'Choose the time interval for the report, when the threshold is exceeded.'
      })), _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react2.default.createElement(_eui.EuiRadio, {
        id: "daily",
        label: _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.dailyReportRadioButtonLabel', {
          defaultMessage: 'Daily report'
        }),
        onChange: function onChange() {
          return _this2.onChangeSchedule('daily');
        },
        checked: this.state.schedule === 'daily'
      }), _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react2.default.createElement(_eui.EuiFormRow, {
        helpText: _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.dailyReportHelpText', {
          defaultMessage: 'The daily report will be sent at {dailyTimeFormatted} / {dailyTime12HourFormatted}.',
          values: {
            dailyTimeFormatted: dailyTimeFormatted,
            dailyTime12HourFormatted: dailyTime12HourFormatted
          }
        }),
        compressed: true
      }, _react2.default.createElement(_eui.EuiSelect, {
        value: dailyTime,
        onChange: this.onChangeDailyUnit,
        options: intervalHours,
        disabled: this.state.schedule !== 'daily'
      })), _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react2.default.createElement(_eui.EuiRadio, {
        id: "interval",
        label: _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.intervalRadioButtonLabel', {
          defaultMessage: 'Interval'
        }),
        onChange: function onChange() {
          return _this2.onChangeSchedule('interval');
        },
        checked: this.state.schedule === 'interval'
      }), _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(SmallInput, null, _react2.default.createElement(_eui.EuiFormRow, {
        helpText: _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.intervalHelpText', {
          defaultMessage: 'Time interval between reports.'
        }),
        compressed: true
      }, _react2.default.createElement(_eui.EuiFieldNumber, {
        compressed: true,
        icon: "clock",
        min: 1,
        value: this.state.interval.value,
        onChange: this.onChangeIntervalValue,
        disabled: this.state.schedule !== 'interval'
      })))), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiFormRow, {
        compressed: true
      }, _react2.default.createElement(_eui.EuiSelect, {
        value: this.state.interval.unit,
        onChange: this.onChangeIntervalUnit,
        compressed: true,
        options: [{
          value: 'm',
          text: _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.intervalUnit.minsLabel', {
            defaultMessage: 'mins'
          })
        }, {
          value: 'h',
          text: _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.intervalUnit.hrsLabel', {
            defaultMessage: 'hrs'
          })
        }],
        disabled: this.state.schedule !== 'interval'
      })))), _react2.default.createElement("h4", null, _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.actionsTitle', {
        defaultMessage: 'Actions'
      })), _react2.default.createElement(_eui.EuiText, {
        size: "xs",
        color: "subdued"
      }, _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.actionsDescription', {
        defaultMessage: 'Reports can be sent by email or posted to a Slack channel. Each report will include the top 10 errors sorted by occurrence.'
      })), _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react2.default.createElement(_eui.EuiSwitch, {
        label: _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.sendEmailLabel', {
          defaultMessage: 'Send email'
        }),
        checked: this.state.actions.email,
        onChange: function onChange() {
          return _this2.onChangeAction('email');
        }
      }), _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), this.state.actions.email && _react2.default.createElement(_eui.EuiFormRow, {
        label: _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.recipientsLabel', {
          defaultMessage: 'Recipients (separated with comma)'
        }),
        compressed: true,
        helpText: _react2.default.createElement("span", null, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.apm.serviceDetails.enableErrorReportsPanel.recipientsHelpText",
          defaultMessage: "If you have not configured email, please see the {documentationLink}.",
          values: {
            documentationLink: _react2.default.createElement(_ElasticDocsLink.ElasticDocsLink, {
              target: "_blank",
              section: "/x-pack",
              path: "/actions-email.html#configuring-email"
            }, _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.recipientsHelpText.documentationLinkText', {
              defaultMessage: 'documentation'
            }))
          }
        }))
      }, _react2.default.createElement(_eui.EuiFieldText, {
        compressed: true,
        icon: "user",
        value: this.state.emails,
        onChange: this.onChangeEmails
      })), _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react2.default.createElement(_eui.EuiSwitch, {
        label: _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.sendSlackNotificationLabel', {
          defaultMessage: 'Send Slack notification'
        }),
        checked: this.state.actions.slack,
        onChange: function onChange() {
          return _this2.onChangeAction('slack');
        }
      }), _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), this.state.actions.slack && _react2.default.createElement(_eui.EuiFormRow, {
        label: _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.slackWebhookURLLabel', {
          defaultMessage: 'Slack Webhook URL'
        }),
        compressed: true,
        helpText: _react2.default.createElement("span", null, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.apm.serviceDetails.enableErrorReportsPanel.slackWebhookURLHelpText",
          defaultMessage: "To get a Slack webhook, please see the {documentationLink}.",
          values: {
            documentationLink: _react2.default.createElement(_eui.EuiLink, {
              target: "_blank",
              href: "https://get.slack.help/hc/en-us/articles/115005265063-Incoming-WebHooks-for-Slack"
            }, _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.slackWebhookURLHelpText.documentationLinkText', {
              defaultMessage: 'documentation'
            }))
          }
        }))
      }, _react2.default.createElement(_eui.EuiFieldText, {
        compressed: true,
        icon: "link",
        value: this.state.slackUrl,
        onChange: this.onChangeSlackUrl
      }))));

      return _react2.default.createElement(_eui.EuiFlyout, {
        onClose: this.props.onClose,
        size: "s"
      }, _react2.default.createElement(_eui.EuiFlyoutHeader, null, _react2.default.createElement(_eui.EuiTitle, null, _react2.default.createElement("h2", null, _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.enableErrorReportsTitle', {
        defaultMessage: 'Enable error reports'
      })))), _react2.default.createElement(_eui.EuiFlyoutBody, null, flyoutBody), _react2.default.createElement(_eui.EuiFlyoutFooter, null, _react2.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "flexEnd"
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_ApmPluginContext.ApmPluginContext.Consumer, null, function (_ref2) {
        var config = _ref2.config;
        return _react2.default.createElement(_eui.EuiButton, {
          onClick: _this2.createWatch(config),
          fill: true,
          disabled: !_this2.state.actions.email && !_this2.state.actions.slack
        }, _i18n.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.createWatchButtonLabel', {
          defaultMessage: 'Create watch'
        }));
      })))));
    }
  }]);

  return WatcherFlyout;
}(_react2.Component);

exports.WatcherFlyout = WatcherFlyout;

_defineProperty(WatcherFlyout, "contextType", _ApmPluginContext.ApmPluginContext);