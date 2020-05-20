"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expressionsPluginMock = void 0;

var _react = _interopRequireDefault(require("react"));

var _ = require(".");

var _mocks = require("../../../core/public/mocks");

var _mocks2 = require("../../inspector/public/mocks");

var _mocks3 = require("../../bfetch/public/mocks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createSetupContract = function createSetupContract() {
  var setupContract = {
    fork: jest.fn(),
    getFunction: jest.fn(),
    getFunctions: jest.fn(),
    getRenderer: jest.fn(),
    getRenderers: jest.fn(),
    getType: jest.fn(),
    getTypes: jest.fn(),
    registerFunction: jest.fn(),
    registerRenderer: jest.fn(),
    registerType: jest.fn(),
    run: jest.fn(),
    __LEGACY: {
      functions: {
        register: function register() {}
      },
      renderers: {
        register: function register() {}
      },
      types: {
        register: function register() {}
      },
      getExecutor: function getExecutor() {
        return {
          interpreter: {
            interpretAst: function () {}
          }
        };
      },
      loadLegacyServerFunctionWrappers: function loadLegacyServerFunctionWrappers() {
        return Promise.resolve();
      }
    }
  };
  return setupContract;
};

var createStartContract = function createStartContract() {
  return {
    execute: jest.fn(),
    ExpressionLoader: jest.fn(),
    ExpressionRenderHandler: jest.fn(),
    fork: jest.fn(),
    getFunction: jest.fn(),
    getFunctions: jest.fn(),
    getRenderer: jest.fn(),
    getRenderers: jest.fn(),
    getType: jest.fn(),
    getTypes: jest.fn(),
    loader: jest.fn(),
    ReactExpressionRenderer: jest.fn(function (props) {
      return _react.default.createElement(_react.default.Fragment, null);
    }),
    render: jest.fn(),
    run: jest.fn()
  };
};

var createPlugin =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var pluginInitializerContext, coreSetup, coreStart, plugin, setup;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            pluginInitializerContext = _mocks.coreMock.createPluginInitializerContext();
            coreSetup = _mocks.coreMock.createSetup();
            coreStart = _mocks.coreMock.createStart();
            plugin = (0, _.plugin)(pluginInitializerContext);
            _context2.next = 6;
            return plugin.setup(coreSetup, {
              bfetch: _mocks3.bfetchPluginMock.createSetupContract(),
              inspector: _mocks2.inspectorPluginMock.createSetupContract()
            });

          case 6:
            setup = _context2.sent;
            return _context2.abrupt("return", {
              pluginInitializerContext: pluginInitializerContext,
              coreSetup: coreSetup,
              coreStart: coreStart,
              plugin: plugin,
              setup: setup,
              doStart: function () {
                var _doStart = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return plugin.start(coreStart, {
                            bfetch: _mocks3.bfetchPluginMock.createStartContract(),
                            inspector: _mocks2.inspectorPluginMock.createStartContract()
                          });

                        case 2:
                          return _context.abrupt("return", _context.sent);

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                function doStart() {
                  return _doStart.apply(this, arguments);
                }

                return doStart;
              }()
            });

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createPlugin() {
    return _ref.apply(this, arguments);
  };
}();

var expressionsPluginMock = {
  createSetupContract: createSetupContract,
  createStartContract: createStartContract,
  createPlugin: createPlugin
};
exports.expressionsPluginMock = expressionsPluginMock;