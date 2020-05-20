"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MachineLearningFlyout = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../../../../../../../../src/plugins/kibana_react/public");

var _ml = require("../../../../../services/rest/ml");

var _MLJobLink = require("../../../../shared/Links/MachineLearningLinks/MLJobLink");

var _view = require("./view");

var _ApmPluginContext = require("../../../../../context/ApmPluginContext");

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

var MachineLearningFlyout =
/*#__PURE__*/
function (_Component) {
  _inherits(MachineLearningFlyout, _Component);

  function MachineLearningFlyout() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MachineLearningFlyout);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MachineLearningFlyout)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isCreatingJob: false
    });

    _defineProperty(_assertThisInitialized(_this), "onClickCreate",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref2) {
        var transactionType, http, serviceName, res, didSucceed;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                transactionType = _ref2.transactionType;

                _this.setState({
                  isCreatingJob: true
                });

                _context.prev = 2;
                http = _this.context.core.http;
                serviceName = _this.props.urlParams.serviceName;

                if (serviceName) {
                  _context.next = 7;
                  break;
                }

                throw new Error('Service name is required to create this ML job');

              case 7:
                _context.next = 9;
                return (0, _ml.startMLJob)({
                  http: http,
                  serviceName: serviceName,
                  transactionType: transactionType
                });

              case 9:
                res = _context.sent;
                didSucceed = res.datafeeds[0].success && res.jobs[0].success;

                if (didSucceed) {
                  _context.next = 13;
                  break;
                }

                throw new Error('Creating ML job failed');

              case 13:
                _this.addSuccessToast({
                  transactionType: transactionType
                });

                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](2);

                _this.addErrorToast();

              case 19:
                _this.setState({
                  isCreatingJob: false
                });

                _this.props.onClose();

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 16]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "addErrorToast", function () {
      var core = _this.context;
      var urlParams = _this.props.urlParams;
      var serviceName = urlParams.serviceName;

      if (!serviceName) {
        return;
      }

      core.notifications.toasts.addWarning({
        title: _i18n.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.jobCreationFailedNotificationTitle', {
          defaultMessage: 'Job creation failed'
        }),
        text: (0, _public.toMountPoint)(_react.default.createElement("p", null, _i18n.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.jobCreationFailedNotificationText', {
          defaultMessage: 'Your current license may not allow for creating machine learning jobs, or this job may already exist.'
        })))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "addSuccessToast", function (_ref3) {
      var transactionType = _ref3.transactionType;
      var core = _this.context.core;
      var urlParams = _this.props.urlParams;
      var serviceName = urlParams.serviceName;

      if (!serviceName) {
        return;
      }

      core.notifications.toasts.addSuccess({
        title: _i18n.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.jobCreatedNotificationTitle', {
          defaultMessage: 'Job successfully created'
        }),
        text: (0, _public.toMountPoint)(_react.default.createElement("p", null, _i18n.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.jobCreatedNotificationText', {
          defaultMessage: 'The analysis is now running for {serviceName} ({transactionType}). It might take a while before results are added to the response times graph.',
          values: {
            serviceName: serviceName,
            transactionType: transactionType
          }
        }), ' ', _react.default.createElement(_ApmPluginContext.ApmPluginContext.Provider, {
          value: _this.context
        }, _react.default.createElement(_MLJobLink.MLJobLink, {
          serviceName: serviceName,
          transactionType: transactionType
        }, _i18n.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.jobCreatedNotificationText.viewJobLinkText', {
          defaultMessage: 'View job'
        })))))
      });
    });

    return _this;
  }

  _createClass(MachineLearningFlyout, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isOpen = _this$props.isOpen,
          onClose = _this$props.onClose,
          urlParams = _this$props.urlParams;
      var serviceName = urlParams.serviceName;
      var isCreatingJob = this.state.isCreatingJob;

      if (!isOpen || !serviceName) {
        return null;
      }

      return _react.default.createElement(_view.MachineLearningFlyoutView, {
        isCreatingJob: isCreatingJob,
        onClickCreate: this.onClickCreate,
        onClose: onClose,
        urlParams: urlParams
      });
    }
  }]);

  return MachineLearningFlyout;
}(_react.Component);

exports.MachineLearningFlyout = MachineLearningFlyout;

_defineProperty(MachineLearningFlyout, "contextType", _ApmPluginContext.ApmPluginContext);