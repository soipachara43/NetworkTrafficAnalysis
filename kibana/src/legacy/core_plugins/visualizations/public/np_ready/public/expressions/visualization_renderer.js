"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visualization = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _vis = require("./vis");

var _components = require("../components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var visualization = function visualization() {
  return {
    name: 'visualization',
    displayName: 'visualization',
    reuseDomNode: true,
    render: function () {
      var _render2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(domNode, config, handlers) {
        var visData, visConfig, params, visType, vis, uiState, listenOnChange;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                visData = config.visData, visConfig = config.visConfig, params = config.params;
                visType = config.visType || visConfig.type;
                vis = new _vis.ExprVis({
                  type: visType,
                  params: visConfig
                });
                vis.eventsSubject = {
                  next: handlers.event
                };
                uiState = handlers.uiState || vis.getUiState();
                handlers.onDestroy(function () {
                  (0, _reactDom.unmountComponentAtNode)(domNode);
                });
                listenOnChange = params ? params.listenOnChange : false;
                (0, _reactDom.render)(_react.default.createElement(_components.Visualization, {
                  vis: vis,
                  visData: visData,
                  visParams: vis.params,
                  uiState: uiState,
                  listenOnChange: listenOnChange,
                  onInit: handlers.done
                }), domNode);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function render(_x, _x2, _x3) {
        return _render2.apply(this, arguments);
      }

      return render;
    }()
  };
};

exports.visualization = visualization;