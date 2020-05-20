"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVislibVisController = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _react = _interopRequireDefault(require("react"));

var _vis = require("./vislib/vis");

var _utils = require("../../../../core/public/utils");

var _legend = require("./vislib/components/legend");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var legendClassName = {
  top: 'visLib--legend-top',
  bottom: 'visLib--legend-bottom',
  left: 'visLib--legend-left',
  right: 'visLib--legend-right'
};

var createVislibVisController = function createVislibVisController(deps) {
  var _temp;

  return _temp =
  /*#__PURE__*/
  function () {
    function VislibVisController(el, vis) {
      _classCallCheck(this, VislibVisController);

      this.el = el;
      this.vis = vis;

      _defineProperty(this, "unmount", null);

      _defineProperty(this, "visParams", void 0);

      _defineProperty(this, "legendRef", void 0);

      _defineProperty(this, "container", void 0);

      _defineProperty(this, "chartEl", void 0);

      _defineProperty(this, "legendEl", void 0);

      _defineProperty(this, "vislibVis", void 0);

      this.el = el;
      this.vis = vis;
      this.unmount = null;
      this.legendRef = _react.default.createRef(); // vis mount point

      this.container = document.createElement('div');
      this.container.className = 'visLib';
      this.el.appendChild(this.container); // chart mount point

      this.chartEl = document.createElement('div');
      this.chartEl.className = 'visLib__chart';
      this.container.appendChild(this.chartEl); // legend mount point

      this.legendEl = document.createElement('div');
      this.legendEl.className = 'visLib__legend';
      this.container.appendChild(this.legendEl);
    }

    _createClass(VislibVisController, [{
      key: "render",
      value: function render(esResponse, visParams) {
        var _this = this;

        if (this.vislibVis) {
          this.destroy();
        }

        return new Promise(
        /*#__PURE__*/
        function () {
          var _ref = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(resolve) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(_this.el.clientWidth === 0 || _this.el.clientHeight === 0)) {
                      _context.next = 2;
                      break;
                    }

                    return _context.abrupt("return", resolve());

                  case 2:
                    _this.vislibVis = new _vis.Vis(_this.chartEl, visParams, deps);

                    _this.vislibVis.on('brush', _this.vis.API.events.brush);

                    _this.vislibVis.on('click', _this.vis.API.events.filter);

                    _this.vislibVis.on('renderComplete', resolve);

                    _this.vislibVis.initVisConfig(esResponse, _this.vis.getUiState());

                    if (visParams.addLegend) {
                      (0, _jquery.default)(_this.container).attr('class', function (i, cls) {
                        return cls.replace(/visLib--legend-\S+/g, '');
                      }).addClass(legendClassName[visParams.legendPosition]);

                      _this.mountLegend(esResponse, visParams.legendPosition);
                    }

                    _this.vislibVis.render(esResponse, _this.vis.getUiState()); // refreshing the legend after the chart is rendered.
                    // this is necessary because some visualizations
                    // provide data necessary for the legend only after a render cycle.


                    if (visParams.addLegend && _legend.CUSTOM_LEGEND_VIS_TYPES.includes(_this.vislibVis.visConfigArgs.type)) {
                      _this.unmountLegend();

                      _this.mountLegend(esResponse, visParams.legendPosition);

                      _this.vislibVis.render(esResponse, _this.vis.getUiState());
                    }

                  case 10:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
      }
    }, {
      key: "mountLegend",
      value: function mountLegend(visData, position) {
        this.unmount = (0, _utils.mountReactNode)(_react.default.createElement(_legend.VisLegend, {
          ref: this.legendRef,
          vis: this.vis,
          vislibVis: this.vislibVis,
          visData: visData,
          position: position,
          uiState: this.vis.getUiState()
        }))(this.legendEl);
      }
    }, {
      key: "unmountLegend",
      value: function unmountLegend() {
        if (this.unmount) {
          this.unmount();
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.unmount) {
          this.unmount();
        }

        if (this.vislibVis) {
          this.vislibVis.off('brush', this.vis.API.events.brush);
          this.vislibVis.off('click', this.vis.API.events.filter);
          this.vislibVis.destroy();
          delete this.vislibVis;
        }
      }
    }]);

    return VislibVisController;
  }(), _temp;
};

exports.createVislibVisController = createVislibVisController;