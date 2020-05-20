"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualizationChart = void 0;

var _react = _interopRequireDefault(require("react"));

var Rx = _interopRequireWildcard(require("rxjs"));

var _operators = require("rxjs/operators");

var _public = require("../../../../../../../plugins/kibana_utils/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var VisualizationChart =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VisualizationChart, _React$Component);

  function VisualizationChart(props) {
    var _this;

    _classCallCheck(this, VisualizationChart);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VisualizationChart).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "resizeChecker", void 0);

    _defineProperty(_assertThisInitialized(_this), "visualization", void 0);

    _defineProperty(_assertThisInitialized(_this), "chartDiv", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "containerDiv", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "renderSubject", void 0);

    _defineProperty(_assertThisInitialized(_this), "renderSubscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "onUiStateChanged", function () {
      _this.startRenderVisualization();
    });

    _this.renderSubject = new Rx.Subject();

    var render$ = _this.renderSubject.asObservable().pipe((0, _operators.share)());

    var success$ = render$.pipe((0, _operators.filter)(function (_ref) {
      var vis = _ref.vis,
          visData = _ref.visData;
      return vis && (!vis.type.requiresSearch || visData);
    }), (0, _operators.debounceTime)(100), (0, _operators.switchMap)(
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref3) {
        var vis, visData, visParams;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                vis = _ref3.vis, visData = _ref3.visData, visParams = _ref3.visParams;

                if (_this.visualization) {
                  _context.next = 3;
                  break;
                }

                throw new Error('Visualization implementation was not initialized on first render.');

              case 3:
                return _context.abrupt("return", _this.visualization.render(visData, visParams));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }()));
    _this.renderSubscription = success$.subscribe(function () {
      if (_this.props.onInit) {
        _this.props.onInit();
      }
    });
    return _this;
  }

  _createClass(VisualizationChart, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "visChart__container kbn-resetFocusState",
        tabIndex: 0,
        ref: this.containerDiv
      }, _react.default.createElement("p", {
        className: "euiScreenReaderOnly"
      }, this.props.vis.type.title, " visualization, not yet accessible"), _react.default.createElement("div", {
        "aria-hidden": !this.props.vis.type.isAccessible,
        className: "visChart",
        ref: this.chartDiv
      }));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!this.chartDiv.current || !this.containerDiv.current) {
        throw new Error('chartDiv and currentDiv reference should always be present.');
      }

      var vis = this.props.vis;
      var Visualization = vis.type.visualization;
      this.visualization = new Visualization(this.chartDiv.current, vis); // We know that containerDiv.current will never be null, since we will always
      // have rendered and the div is always rendered into the tree (i.e. not
      // inside any condition).

      this.resizeChecker = new _public.ResizeChecker(this.containerDiv.current);
      this.resizeChecker.on('resize', function () {
        return _this2.startRenderVisualization();
      });

      if (this.props.listenOnChange) {
        this.props.uiState.on('change', this.onUiStateChanged);
      }

      this.startRenderVisualization();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.startRenderVisualization();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.renderSubscription) {
        this.renderSubscription.unsubscribe();
      }

      if (this.resizeChecker) {
        this.resizeChecker.destroy();
      }

      if (this.visualization) {
        this.visualization.destroy();
      }
    }
  }, {
    key: "startRenderVisualization",
    value: function startRenderVisualization() {
      if (this.containerDiv.current && this.chartDiv.current) {
        this.renderSubject.next({
          vis: this.props.vis,
          visData: this.props.visData,
          visParams: this.props.visParams
        });
      }
    }
  }]);

  return VisualizationChart;
}(_react.default.Component);

exports.VisualizationChart = VisualizationChart;