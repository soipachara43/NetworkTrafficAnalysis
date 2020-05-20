"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpressionsPublicPlugin = void 0;

var _common = require("../common");

var _services = require("./services");

var _react_expression_renderer = require("./react_expression_renderer");

var _loader = require("./loader");

var _render = require("./render");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ExpressionsPublicPlugin =
/*#__PURE__*/
function () {
  function ExpressionsPublicPlugin(initializerContext) {
    _classCallCheck(this, ExpressionsPublicPlugin);

    _defineProperty(this, "expressions", new _common.ExpressionsService());
  }

  _createClass(ExpressionsPublicPlugin, [{
    key: "configureExecutor",
    value: function configureExecutor(core) {
      var executor = this.expressions.executor;

      var getSavedObject =
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(type, id) {
          var _ref2, _ref3, start;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return core.getStartServices();

                case 2:
                  _ref2 = _context.sent;
                  _ref3 = _slicedToArray(_ref2, 1);
                  start = _ref3[0];
                  return _context.abrupt("return", start.savedObjects.client.get(type, id));

                case 6:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function getSavedObject(_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }();

      executor.extendContext({
        environment: 'client',
        getSavedObject: getSavedObject
      });
    }
  }, {
    key: "setup",
    value: function setup(core, _ref4) {
      var inspector = _ref4.inspector,
          bfetch = _ref4.bfetch;
      this.configureExecutor(core);
      var expressions = this.expressions;
      var executor = expressions.executor,
          renderers = expressions.renderers;
      (0, _services.setRenderersRegistry)(renderers);
      (0, _services.setExpressionsService)(this.expressions);
      var expressionsSetup = expressions.setup(); // This is legacy. Should go away when we get rid of __LEGACY.

      var getExecutor = function getExecutor() {
        return {
          interpreter: {
            interpretAst: expressionsSetup.run
          }
        };
      };

      (0, _services.setInterpreter)(getExecutor().interpreter);
      var cached = null;

      var loadLegacyServerFunctionWrappers =
      /*#__PURE__*/
      function () {
        var _ref5 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3() {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!cached) {
                    cached = _asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee2() {
                      var serverFunctionList, batchedFunction, _serializeProvider, serialize;

                      return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              _context2.next = 2;
                              return core.http.get("/api/interpreter/fns");

                            case 2:
                              serverFunctionList = _context2.sent;
                              batchedFunction = bfetch.batchedFunction({
                                url: "/api/interpreter/fns"
                              });
                              _serializeProvider = (0, _common.serializeProvider)(executor.getTypes()), serialize = _serializeProvider.serialize; // For every sever-side function, register a client-side
                              // function that matches its definition, but which simply
                              // calls the server-side function endpoint.

                              Object.keys(serverFunctionList).forEach(function (functionName) {
                                if (expressionsSetup.getFunction(functionName)) {
                                  return;
                                }

                                var fn = function fn() {
                                  return _objectSpread({}, serverFunctionList[functionName], {
                                    fn: function fn(input, args) {
                                      return batchedFunction({
                                        functionName: functionName,
                                        args: args,
                                        context: serialize(input)
                                      });
                                    }
                                  });
                                };

                                expressionsSetup.registerFunction(fn);
                              });

                            case 6:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2);
                    }))();
                  }

                  return _context3.abrupt("return", cached);

                case 2:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function loadLegacyServerFunctionWrappers() {
          return _ref5.apply(this, arguments);
        };
      }();

      var setup = _objectSpread({}, expressionsSetup, {
        __LEGACY: {
          types: executor.types,
          functions: executor.functions,
          renderers: renderers,
          getExecutor: getExecutor,
          loadLegacyServerFunctionWrappers: loadLegacyServerFunctionWrappers
        }
      });

      return Object.freeze(setup);
    }
  }, {
    key: "start",
    value: function start(core, _ref7) {
      var inspector = _ref7.inspector,
          bfetch = _ref7.bfetch;
      (0, _services.setCoreStart)(core);
      (0, _services.setInspector)(inspector);
      (0, _services.setNotifications)(core.notifications);
      var expressions = this.expressions;

      var start = _objectSpread({}, expressions.start(), {
        ExpressionLoader: _loader.ExpressionLoader,
        ExpressionRenderHandler: _render.ExpressionRenderHandler,
        loader: _loader.loader,
        ReactExpressionRenderer: _react_expression_renderer.ReactExpressionRenderer,
        render: _render.render
      });

      return Object.freeze(start);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.expressions.stop();
    }
  }]);

  return ExpressionsPublicPlugin;
}();

exports.ExpressionsPublicPlugin = ExpressionsPublicPlugin;