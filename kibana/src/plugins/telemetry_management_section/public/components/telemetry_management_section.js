"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TelemetryManagementSection = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _constants = require("../../../telemetry/common/constants");

var _opt_in_example_flyout = require("./opt_in_example_flyout");

var _public = require("../../../advanced_settings/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SEARCH_TERMS = ['telemetry', 'usage', 'data', 'usage data'];

var TelemetryManagementSection =
/*#__PURE__*/
function (_Component) {
  _inherits(TelemetryManagementSection, _Component);

  function TelemetryManagementSection() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TelemetryManagementSection);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TelemetryManagementSection)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      processing: false,
      showExample: false,
      queryMatches: null,
      enabled: _this.props.telemetryService.getIsOptedIn() || false
    });

    _defineProperty(_assertThisInitialized(_this), "maybeGetAppliesSettingMessage", function () {
      if (!_this.props.showAppliesSettingMessage) {
        return null;
      }

      return _react.default.createElement(_eui.EuiCallOut, {
        color: "primary",
        iconType: "spacesApp",
        title: _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "telemetry.callout.appliesSettingTitle",
          defaultMessage: "Changes to this setting apply to {allOfKibanaText} and are saved automatically.",
          values: {
            allOfKibanaText: _react.default.createElement("strong", null, _react.default.createElement(_react2.FormattedMessage, {
              id: "telemetry.callout.appliesSettingTitle.allOfKibanaText",
              defaultMessage: "all of Kibana"
            }))
          }
        }))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderDescription", function () {
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "telemetry.telemetryConfigAndLinkDescription",
        defaultMessage: "Enabling data usage collection helps us manage and improve our products and services. See our {privacyStatementLink} for more details.",
        values: {
          privacyStatementLink: _react.default.createElement(_eui.EuiLink, {
            href: _constants.PRIVACY_STATEMENT_URL,
            target: "_blank"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "telemetry.readOurUsageDataPrivacyStatementLinkText",
            defaultMessage: "Privacy Statement"
          }))
        }
      })), _react.default.createElement("p", null, _react.default.createElement(_eui.EuiLink, {
        onClick: _this.toggleExample
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "telemetry.seeExampleOfWhatWeCollectLinkText",
        defaultMessage: "See an example of what we collect"
      }))));
    });

    _defineProperty(_assertThisInitialized(_this), "toggleOptIn",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var _this$props, telemetryService, toasts, newOptInValue;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$props = _this.props, telemetryService = _this$props.telemetryService, toasts = _this$props.toasts;
              newOptInValue = !_this.state.enabled;
              return _context2.abrupt("return", new Promise(function (resolve, reject) {
                _this.setState({
                  processing: true,
                  enabled: newOptInValue
                },
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.prev = 0;
                          _context.next = 3;
                          return telemetryService.setOptIn(newOptInValue);

                        case 3:
                          _this.setState({
                            processing: false
                          });

                          toasts.addSuccess(newOptInValue ? _i18n.i18n.translate('telemetry.optInSuccessOn', {
                            defaultMessage: 'Usage data collection turned on.'
                          }) : _i18n.i18n.translate('telemetry.optInSuccessOff', {
                            defaultMessage: 'Usage data collection turned off.'
                          }));
                          resolve(true);
                          _context.next = 12;
                          break;

                        case 8:
                          _context.prev = 8;
                          _context.t0 = _context["catch"](0);

                          _this.setState({
                            processing: false
                          });

                          reject(_context.t0);

                        case 12:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[0, 8]]);
                })));
              }));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _defineProperty(_assertThisInitialized(_this), "toggleExample", function () {
      _this.setState({
        showExample: !_this.state.showExample
      });
    });

    return _this;
  }

  _createClass(TelemetryManagementSection, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var query = nextProps.query;
      var searchTerm = (query.text || '').toLowerCase();
      var searchTermMatches = SEARCH_TERMS.some(function (term) {
        return term.indexOf(searchTerm) >= 0;
      });

      if (searchTermMatches !== this.state.queryMatches) {
        this.setState({
          queryMatches: searchTermMatches
        }, function () {
          _this2.props.onQueryMatchChange(searchTermMatches);
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var telemetryService = this.props.telemetryService;
      var _this$state = this.state,
          showExample = _this$state.showExample,
          queryMatches = _this$state.queryMatches,
          enabled = _this$state.enabled,
          processing = _this$state.processing;

      if (!telemetryService.getCanChangeOptInStatus()) {
        return null;
      }

      if (queryMatches !== null && !queryMatches) {
        return null;
      }

      return _react.default.createElement(_react.Fragment, null, showExample && _react.default.createElement(_opt_in_example_flyout.OptInExampleFlyout, {
        fetchExample: telemetryService.fetchExample,
        onClose: this.toggleExample
      }), _react.default.createElement(_eui.EuiPanel, {
        paddingSize: "l"
      }, _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(_eui.EuiText, null, _react.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "baseline"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "telemetry.usageDataTitle",
        defaultMessage: "Usage Data"
      }))))), this.maybeGetAppliesSettingMessage(), _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react.default.createElement(_public.Field, {
        setting: {
          type: 'boolean',
          name: 'telemetry:enabled',
          displayName: _i18n.i18n.translate('telemetry.provideUsageStatisticsTitle', {
            defaultMessage: 'Provide usage statistics'
          }),
          value: enabled,
          description: this.renderDescription(),
          defVal: true,
          ariaName: _i18n.i18n.translate('telemetry.provideUsageStatisticsAriaName', {
            defaultMessage: 'Provide usage statistics'
          })
        },
        loading: processing,
        dockLinks: null,
        toasts: null,
        handleChange: this.toggleOptIn,
        enableSaving: this.props.enableSaving
      }))));
    }
  }]);

  return TelemetryManagementSection;
}(_react.Component);

exports.TelemetryManagementSection = TelemetryManagementSection;