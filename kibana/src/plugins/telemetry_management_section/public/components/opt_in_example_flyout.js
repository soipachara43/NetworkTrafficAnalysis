"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptInExampleFlyout = void 0;

var React = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

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

/**
 * React component for displaying the example data associated with the Telemetry opt-in banner.
 */
var OptInExampleFlyout =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(OptInExampleFlyout, _React$PureComponent);

  function OptInExampleFlyout() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, OptInExampleFlyout);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(OptInExampleFlyout)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      data: null,
      isLoading: true,
      hasPrivilegeToRead: false
    });

    return _this;
  }

  _createClass(OptInExampleFlyout, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var fetchExample, clusters;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                fetchExample = this.props.fetchExample;
                _context.next = 4;
                return fetchExample();

              case 4:
                clusters = _context.sent;
                this.setState({
                  data: Array.isArray(clusters) ? clusters : null,
                  isLoading: false,
                  hasPrivilegeToRead: true
                });
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                this.setState({
                  isLoading: false,
                  hasPrivilegeToRead: _context.t0.status !== 403
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "renderBody",
    value: function renderBody(_ref) {
      var data = _ref.data,
          isLoading = _ref.isLoading,
          hasPrivilegeToRead = _ref.hasPrivilegeToRead;

      if (isLoading) {
        return React.createElement(_eui.EuiFlexGroup, {
          justifyContent: "spaceAround"
        }, React.createElement(_eui.EuiFlexItem, {
          grow: false
        }, React.createElement(_eui.EuiLoadingSpinner, {
          size: "xl"
        })));
      }

      if (!hasPrivilegeToRead) {
        return React.createElement(_eui.EuiCallOut, {
          title: React.createElement(_react2.FormattedMessage, {
            id: "telemetry.callout.errorUnprivilegedUserTitle",
            defaultMessage: "Error displaying cluster statistics"
          }),
          color: "danger",
          iconType: "cross"
        }, React.createElement(_react2.FormattedMessage, {
          id: "telemetry.callout.errorUnprivilegedUserDescription",
          defaultMessage: "You do not have access to see unencrypted cluster statistics."
        }));
      }

      if (data === null) {
        return React.createElement(_eui.EuiCallOut, {
          title: React.createElement(_react2.FormattedMessage, {
            id: "telemetry.callout.errorLoadingClusterStatisticsTitle",
            defaultMessage: "Error loading cluster statistics"
          }),
          color: "danger",
          iconType: "cross"
        }, React.createElement(_react2.FormattedMessage, {
          id: "telemetry.callout.errorLoadingClusterStatisticsDescription",
          defaultMessage: "An unexpected error occured while attempting to fetch the cluster statistics. This can occur because Elasticsearch failed, Kibana failed, or there is a network error. Check Kibana, then reload the page and try again."
        }));
      }

      return React.createElement(_eui.EuiCodeBlock, {
        language: "js"
      }, JSON.stringify(data, null, 2));
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_eui.EuiPortal, null, React.createElement(_eui.EuiFlyout, {
        ownFocus: true,
        onClose: this.props.onClose,
        maxWidth: true
      }, React.createElement(_eui.EuiFlyoutHeader, null, React.createElement(_eui.EuiTitle, null, React.createElement("h2", null, React.createElement(_react2.FormattedMessage, {
        id: "telemetry.callout.clusterStatisticsTitle",
        defaultMessage: "Cluster statistics"
      }))), React.createElement(_eui.EuiTextColor, {
        color: "subdued"
      }, React.createElement(_eui.EuiText, null, React.createElement(_react2.FormattedMessage, {
        id: "telemetry.callout.clusterStatisticsDescription",
        defaultMessage: "This is an example of the basic cluster statistics that we'll collect. It includes the number of indices, shards, and nodes. It also includes high-level usage statistics, such as whether monitoring is turned on."
      })))), React.createElement(_eui.EuiFlyoutBody, null, this.renderBody(this.state))));
    }
  }]);

  return OptInExampleFlyout;
}(React.PureComponent);

exports.OptInExampleFlyout = OptInExampleFlyout;