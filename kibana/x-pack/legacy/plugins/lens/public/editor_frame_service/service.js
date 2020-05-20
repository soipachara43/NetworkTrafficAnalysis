"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorFrameService = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _react2 = require("@kbn/i18n/react");

var _editor_frame = require("./editor_frame");

var _merge_tables = require("./merge_tables");

var _format_column = require("./format_column");

var _embeddable_factory = require("./embeddable/embeddable_factory");

var _state_management = require("./editor_frame/state_management");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function collectAsyncDefinitions(_x) {
  return _collectAsyncDefinitions.apply(this, arguments);
}

function _collectAsyncDefinitions() {
  _collectAsyncDefinitions = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(definitions) {
    var resolvedDefinitions, definitionMap;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return Promise.all(definitions);

          case 2:
            resolvedDefinitions = _context3.sent;
            definitionMap = {};
            resolvedDefinitions.forEach(function (definition) {
              definitionMap[definition.id] = definition;
            });
            return _context3.abrupt("return", definitionMap);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _collectAsyncDefinitions.apply(this, arguments);
}

var EditorFrameService =
/*#__PURE__*/
function () {
  function EditorFrameService() {
    _classCallCheck(this, EditorFrameService);

    _defineProperty(this, "datasources", []);

    _defineProperty(this, "visualizations", []);
  }

  _createClass(EditorFrameService, [{
    key: "setup",
    value: function setup(core, plugins) {
      var _this = this;

      plugins.expressions.registerFunction(function () {
        return _merge_tables.mergeTables;
      });
      plugins.expressions.registerFunction(function () {
        return _format_column.formatColumn;
      });

      var getStartServices =
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var _ref2, _ref3, coreStart, deps;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return core.getStartServices();

                case 2:
                  _ref2 = _context.sent;
                  _ref3 = _slicedToArray(_ref2, 2);
                  coreStart = _ref3[0];
                  deps = _ref3[1];
                  return _context.abrupt("return", {
                    capabilities: coreStart.application.capabilities,
                    savedObjectsClient: coreStart.savedObjects.client,
                    coreHttp: coreStart.http,
                    timefilter: deps.data.query.timefilter.timefilter,
                    expressionRenderer: deps.expressions.ReactExpressionRenderer,
                    indexPatternService: deps.data.indexPatterns
                  });

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function getStartServices() {
          return _ref.apply(this, arguments);
        };
      }();

      plugins.embeddable.registerEmbeddableFactory('lens', new _embeddable_factory.EmbeddableFactory(getStartServices));
      return {
        registerDatasource: function registerDatasource(datasource) {
          _this.datasources.push(datasource);
        },
        registerVisualization: function registerVisualization(visualization) {
          _this.visualizations.push(visualization);
        }
      };
    }
  }, {
    key: "start",
    value: function start(core, plugins) {
      var _this2 = this;

      var createInstance =
      /*#__PURE__*/
      function () {
        var _ref4 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          var domElement, _ref5, _ref6, resolvedDatasources, resolvedVisualizations;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return Promise.all([collectAsyncDefinitions(_this2.datasources), collectAsyncDefinitions(_this2.visualizations)]);

                case 2:
                  _ref5 = _context2.sent;
                  _ref6 = _slicedToArray(_ref5, 2);
                  resolvedDatasources = _ref6[0];
                  resolvedVisualizations = _ref6[1];
                  return _context2.abrupt("return", {
                    mount: function mount(element, _ref7) {
                      var doc = _ref7.doc,
                          onError = _ref7.onError,
                          dateRange = _ref7.dateRange,
                          query = _ref7.query,
                          filters = _ref7.filters,
                          savedQuery = _ref7.savedQuery,
                          onChange = _ref7.onChange;
                      domElement = element;
                      var firstDatasourceId = Object.keys(resolvedDatasources)[0];
                      var firstVisualizationId = Object.keys(resolvedVisualizations)[0];
                      (0, _reactDom.render)(_react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_editor_frame.EditorFrame, {
                        "data-test-subj": "lnsEditorFrame",
                        onError: onError,
                        datasourceMap: resolvedDatasources,
                        visualizationMap: resolvedVisualizations,
                        initialDatasourceId: (0, _state_management.getActiveDatasourceIdFromDoc)(doc) || firstDatasourceId || null,
                        initialVisualizationId: doc && doc.visualizationType || firstVisualizationId || null,
                        core: core,
                        ExpressionRenderer: plugins.expressions.ReactExpressionRenderer,
                        doc: doc,
                        dateRange: dateRange,
                        query: query,
                        filters: filters,
                        savedQuery: savedQuery,
                        onChange: onChange
                      })), domElement);
                    },
                    unmount: function unmount() {
                      if (domElement) {
                        (0, _reactDom.unmountComponentAtNode)(domElement);
                      }
                    }
                  });

                case 7:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function createInstance() {
          return _ref4.apply(this, arguments);
        };
      }();

      return {
        createInstance: createInstance
      };
    }
  }]);

  return EditorFrameService;
}();

exports.EditorFrameService = EditorFrameService;