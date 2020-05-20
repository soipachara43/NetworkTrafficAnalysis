"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeatsInitialEnrollmentPage = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _enroll_beats = require("../../../components/enroll_beats");

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

var BeatsInitialEnrollmentPage =
/*#__PURE__*/
function (_Component) {
  _inherits(BeatsInitialEnrollmentPage, _Component);

  function BeatsInitialEnrollmentPage(props) {
    var _this;

    _classCallCheck(this, BeatsInitialEnrollmentPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BeatsInitialEnrollmentPage).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onBeatEnrolled", function () {
      _this.setState({
        readyToContinue: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "createEnrollmentToken",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var enrollmentToken;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.props.libs.tokens.createEnrollmentTokens();

            case 2:
              enrollmentToken = _context.sent;

              _this.props.setUrlState({
                enrollmentToken: enrollmentToken[0]
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _this.state = {
      readyToContinue: false
    };
    return _this;
  }

  _createClass(BeatsInitialEnrollmentPage, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_enroll_beats.EnrollBeat, {
        frameworkBasePath: this.props.libs.framework.info.basePath,
        enrollmentToken: this.props.urlState.enrollmentToken || '',
        getBeatWithToken: this.props.libs.beats.getBeatWithToken,
        createEnrollmentToken: this.createEnrollmentToken,
        onBeatEnrolled: this.onBeatEnrolled
      }), this.state.readyToContinue && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiButton, {
        size: "s",
        color: "primary",
        style: {
          marginLeft: 10
        },
        onClick:
        /*#__PURE__*/
        _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _this2.props.goTo('/walkthrough/initial/tag');

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))
      }, "Continue")));
    }
  }]);

  return BeatsInitialEnrollmentPage;
}(_react.Component);

exports.BeatsInitialEnrollmentPage = BeatsInitialEnrollmentPage;