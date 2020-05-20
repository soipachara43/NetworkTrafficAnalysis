"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnrollBeat = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _react2 = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var EnrollBeat =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EnrollBeat, _React$Component);

  function EnrollBeat(props) {
    var _this;

    _classCallCheck(this, EnrollBeat);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EnrollBeat).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "pinging", false);

    _defineProperty(_assertThisInitialized(_this), "pingForBeatWithToken",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(token) {
        var beats, timeout;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _this.props.getBeatWithToken(token);

              case 3:
                beats = _context.sent;

                if (beats) {
                  _context.next = 6;
                  break;
                }

                throw new Error('no beats');

              case 6:
                return _context.abrupt("return", beats);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);

                if (!_this.pinging) {
                  _context.next = 18;
                  break;
                }

                timeout = function timeout(ms) {
                  return new Promise(function (res) {
                    return setTimeout(res, ms);
                  });
                };

                _context.next = 15;
                return timeout(5000);

              case 15:
                _context.next = 17;
                return _this.pingForBeatWithToken(token);

              case 17:
                return _context.abrupt("return", _context.sent);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "waitForTokenToEnrollBeat",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var enrolledBeat;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(_this.pinging || !_this.props.enrollmentToken)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              _this.pinging = true;
              _context2.next = 5;
              return _this.pingForBeatWithToken(_this.props.enrollmentToken);

            case 5:
              enrolledBeat = _context2.sent;

              _this.setState({
                enrolledBeat: enrolledBeat
              });

              _this.props.onBeatEnrolled(enrolledBeat);

              _this.pinging = false;

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _this.state = {
      enrolledBeat: null,
      hasPolledForBeat: false,
      command: 'sudo {{beatType}}',
      beatType: 'filebeat'
    };
    return _this;
  }

  _createClass(EnrollBeat, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.props.enrollmentToken) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return this.props.createEnrollmentToken();

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (!this.props.enrollmentToken && !this.state.enrolledBeat) {
        return null;
      }

      if (this.props.enrollmentToken && !this.state.enrolledBeat) {
        this.waitForTokenToEnrollBeat();
      }

      var cmdText = "".concat(this.state.command.replace('{{beatType}}', this.state.beatType).replace('{{beatTypeInCaps}}', (0, _lodash.capitalize)(this.state.beatType)), " enroll ").concat(window.location.protocol, "//").concat(window.location.host).concat(this.props.frameworkBasePath, " ").concat(this.props.enrollmentToken);
      return _react2.default.createElement(_react2.default.Fragment, null, !this.state.enrolledBeat && _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "s",
        alignItems: "center"
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiTitle, {
        size: "xs"
      }, _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.enrollBeat.beatTypeTitle",
        defaultMessage: "Beat type:"
      }))))), _react2.default.createElement(_eui.EuiSelect, {
        value: this.state.beatType,
        options: [{
          value: 'filebeat',
          text: 'Filebeat'
        }, {
          value: 'metricbeat',
          text: 'Metricbeat'
        }],
        onChange: function onChange(e) {
          return _this2.setState({
            beatType: e.target.value
          });
        },
        fullWidth: true
      }))), _react2.default.createElement("br", null), _react2.default.createElement("br", null), _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "s",
        alignItems: "center"
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiTitle, {
        size: "xs"
      }, _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.enrollBeat.platformTitle",
        defaultMessage: "Platform:"
      }))))), _react2.default.createElement(_eui.EuiSelect, {
        value: this.state.command,
        options: [{
          value: "sudo {{beatType}}",
          text: 'DEB / RPM'
        }, {
          value: "PS C:\\Program Files\\{{beatTypeInCaps}}> {{beatType}}.exe",
          text: 'Windows'
        }, {
          value: "./{{beatType}}",
          text: 'MacOS'
        }],
        onChange: function onChange(e) {
          return _this2.setState({
            command: e.target.value
          });
        },
        fullWidth: true
      }))), _react2.default.createElement("br", null), _react2.default.createElement("br", null), this.state.command && _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceBetween",
        alignItems: "flexEnd"
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiTitle, {
        size: "xs"
      }, _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.enrollBeat.yourBeatTypeHostTitle",
        defaultMessage: "On the host where your {beatType} is installed, run:",
        values: {
          beatType: (0, _lodash.capitalize)(this.state.beatType)
        }
      })))), _react2.default.createElement(_eui.EuiFlexItem, {
        className: "homTutorial__instruction",
        grow: false
      }, _react2.default.createElement(_eui.EuiCopy, {
        textToCopy: cmdText
      }, function (copy) {
        return _react2.default.createElement(_eui.EuiButton, {
          size: "s",
          onClick: copy
        }, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.beatsManagement.enrollBeat.copyButtonLabel",
          defaultMessage: "Copy command"
        }));
      }))), _react2.default.createElement("div", {
        className: "eui-textBreakAll"
      }, _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react2.default.createElement(_eui.EuiCodeBlock, {
        language: "sh"
      }, "$ ".concat(cmdText))), _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "s",
        alignItems: "center"
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiTitle, {
        size: "xs"
      }, _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.enrollBeat.waitingBeatTypeToEnrollTitle",
        defaultMessage: "Waiting for {beatType} to enroll\u2026",
        values: {
          beatType: (0, _lodash.capitalize)(this.state.beatType)
        }
      }))))))), _react2.default.createElement("br", null), _react2.default.createElement(_eui.EuiLoadingSpinner, {
        size: "l"
      })))), this.state.enrolledBeat && _react2.default.createElement(_eui.EuiModalBody, null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.enrollBeat.beatEnrolledTitle",
        defaultMessage: "The Beat is now enrolled in central management:"
      }), _react2.default.createElement("br", null), _react2.default.createElement("br", null), _react2.default.createElement("br", null), _react2.default.createElement(_eui.EuiBasicTable, {
        items: [this.state.enrolledBeat],
        columns: [{
          field: 'type',
          name: _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.beatsManagement.enrollBeat.beatTypeColumnName",
            defaultMessage: "Beat Type"
          }),
          sortable: false
        }, {
          field: 'version',
          name: _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.beatsManagement.enrollBeat.versionColumnName",
            defaultMessage: "Version"
          }),
          sortable: false
        }, {
          field: 'host_name',
          name: _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.beatsManagement.enrollBeat.hostnameColumnName",
            defaultMessage: "Hostname"
          }),
          sortable: false
        }]
      }), _react2.default.createElement("br", null), _react2.default.createElement("br", null)));
    }
  }]);

  return EnrollBeat;
}(_react2.default.Component);

exports.EnrollBeat = EnrollBeat;