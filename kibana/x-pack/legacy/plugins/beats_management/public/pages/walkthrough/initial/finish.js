"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FinishWalkthroughPage = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

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

var FinishWalkthrough =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FinishWalkthrough, _React$Component);

  function FinishWalkthrough(props) {
    var _this;

    _classCallCheck(this, FinishWalkthrough);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FinishWalkthrough).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "assignTagToBeat",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var intl, beat;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              intl = _this.props.intl;

              if (_this.props.urlState.enrollmentToken) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", alert(intl.formatMessage({
                id: 'xpack.beatsManagement.enrollBeat.assignTagToBeatInvalidURLNoTokenFountTitle',
                defaultMessage: 'Invalid URL, no enrollmentToken found'
              })));

            case 3:
              if (_this.props.urlState.createdTag) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", alert(intl.formatMessage({
                id: 'xpack.beatsManagement.enrollBeat.assignTagToBeatInvalidURLNoTagFoundTitle',
                defaultMessage: 'Invalid URL, no createdTag found'
              })));

            case 5:
              _context.next = 7;
              return _this.props.libs.beats.getBeatWithToken(_this.props.urlState.enrollmentToken);

            case 7:
              beat = _context.sent;

              if (beat) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", alert(intl.formatMessage({
                id: 'xpack.beatsManagement.enrollBeat.assignTagToBeatNotEnrolledProperlyTitle',
                defaultMessage: 'Error: Beat not enrolled properly'
              })));

            case 10:
              _context.next = 12;
              return _this.props.containers.beats.assignTagsToBeats([beat], _this.props.urlState.createdTag);

            case 12:
              _this.props.setUrlState({
                createdTag: '',
                enrollmentToken: ''
              });

              return _context.abrupt("return", true);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _this.state = {
      assigned: false
    };
    return _this;
  }

  _createClass(FinishWalkthrough, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var done;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2.assignTagToBeat();

              case 2:
                done = _context2.sent;

                if (done) {
                  _this2.setState({
                    assigned: true
                  });
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })), 300);
    }
  }, {
    key: "render",
    value: function render() {
      var goTo = this.props.goTo;
      return _react2.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceAround"
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiPageContent, null, _react2.default.createElement(_eui.EuiEmptyPrompt, {
        iconType: "logoBeats",
        title: _react2.default.createElement("h2", null, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.beatsManagement.enrollBeat.nextStepTitle",
          defaultMessage: "Your Beat is enrolled. What's next?"
        })),
        body: _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.beatsManagement.enrollBeat.nextStepDescription",
          defaultMessage: "Start your Beat to check for configuration errors, then click Done."
        }))),
        actions: _react2.default.createElement(_eui.EuiButton, {
          fill: true,
          disabled: !this.state.assigned,
          onClick:
          /*#__PURE__*/
          _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    goTo('/overview/enrolled_beats');

                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }))
        }, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.beatsManagement.enrollBeat.firstBeatEnrollingDoneButtonLabel",
          defaultMessage: "Done"
        }))
      }))));
    }
  }]);

  return FinishWalkthrough;
}(_react2.default.Component);

var FinishWalkthroughPage = (0, _react.injectI18n)(FinishWalkthrough);
exports.FinishWalkthroughPage = FinishWalkthroughPage;