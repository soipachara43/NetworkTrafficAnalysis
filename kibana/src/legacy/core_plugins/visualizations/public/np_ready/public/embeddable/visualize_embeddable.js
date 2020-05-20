"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualizeEmbeddable = void 0;

var _lodash = _interopRequireWildcard(require("lodash"));

var Rx = _interopRequireWildcard(require("rxjs"));

var _constants = require("./constants");

var _public = require("../../../../../../../plugins/data/public");

var _public2 = require("../../../../../../../plugins/embeddable/public");

var _public3 = require("../../../../../../../plugins/kibana_utils/public");

var _build_pipeline = require("../legacy/build_pipeline");

var _services = require("../services");

var _events = require("./events");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getKeys = function getKeys(o) {
  return Object.keys(o);
};

var VisualizeEmbeddable =
/*#__PURE__*/
function (_Embeddable) {
  _inherits(VisualizeEmbeddable, _Embeddable);

  function VisualizeEmbeddable(timefilter, _ref, initialInput, parent) {
    var _this;

    var vis = _ref.vis,
        editUrl = _ref.editUrl,
        indexPatterns = _ref.indexPatterns,
        editable = _ref.editable;

    _classCallCheck(this, VisualizeEmbeddable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VisualizeEmbeddable).call(this, initialInput, {
      defaultTitle: vis.title,
      editUrl: editUrl,
      indexPatterns: indexPatterns,
      editable: editable,
      visTypeName: vis.type.name
    }, parent));

    _defineProperty(_assertThisInitialized(_this), "handler", void 0);

    _defineProperty(_assertThisInitialized(_this), "timefilter", void 0);

    _defineProperty(_assertThisInitialized(_this), "timeRange", void 0);

    _defineProperty(_assertThisInitialized(_this), "query", void 0);

    _defineProperty(_assertThisInitialized(_this), "title", void 0);

    _defineProperty(_assertThisInitialized(_this), "filters", void 0);

    _defineProperty(_assertThisInitialized(_this), "visCustomizations", void 0);

    _defineProperty(_assertThisInitialized(_this), "subscriptions", []);

    _defineProperty(_assertThisInitialized(_this), "expression", '');

    _defineProperty(_assertThisInitialized(_this), "vis", void 0);

    _defineProperty(_assertThisInitialized(_this), "domNode", void 0);

    _defineProperty(_assertThisInitialized(_this), "type", _constants.VISUALIZE_EMBEDDABLE_TYPE);

    _defineProperty(_assertThisInitialized(_this), "autoRefreshFetchSubscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "abortController", void 0);

    _defineProperty(_assertThisInitialized(_this), "getInspectorAdapters", function () {
      if (!_this.handler) {
        return undefined;
      }

      return _this.handler.inspect();
    });

    _defineProperty(_assertThisInitialized(_this), "openInspector", function () {
      if (_this.handler) {
        return _this.handler.openInspector(_this.getTitle() || '');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "hasInspector", function () {
      var visTypesWithoutInspector = ['markdown', 'input_control_vis', 'metrics', 'vega', 'timelion'];

      if (visTypesWithoutInspector.includes(_this.vis.type.name)) {
        return false;
      }

      return _this.getInspectorAdapters();
    });

    _defineProperty(_assertThisInitialized(_this), "reload", function () {
      _this.handleVisUpdate();
    });

    _defineProperty(_assertThisInitialized(_this), "handleVisUpdate",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.updateHandler();

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "uiStateChangeHandler", function () {
      _this.updateInput(_objectSpread({}, _this.vis.uiState.toJSON()));
    });

    _this.timefilter = timefilter;
    _this.vis = vis;

    _this.vis.uiState.on('change', _this.uiStateChangeHandler);

    _this.autoRefreshFetchSubscription = timefilter.getAutoRefreshFetch$().subscribe(_this.updateHandler.bind(_assertThisInitialized(_this)));

    _this.subscriptions.push(Rx.merge(_this.getOutput$(), _this.getInput$()).subscribe(function () {
      _this.handleChanges();
    }));

    return _this;
  }

  _createClass(VisualizeEmbeddable, [{
    key: "getVisualizationDescription",
    value: function getVisualizationDescription() {
      return this.vis.description;
    }
  }, {
    key: "transferCustomizationsToUiState",

    /**
     * Transfers all changes in the containerState.customization into
     * the uiState of this visualization.
     */
    value: function transferCustomizationsToUiState() {
      var _this2 = this;

      // Check for changes that need to be forwarded to the uiState
      // Since the vis has an own listener on the uiState we don't need to
      // pass anything from here to the handler.update method
      var visCustomizations = this.input.vis;

      if (visCustomizations) {
        if (!_lodash.default.isEqual(visCustomizations, this.visCustomizations)) {
          this.visCustomizations = visCustomizations; // Turn this off or the uiStateChangeHandler will fire for every modification.

          this.vis.uiState.off('change', this.uiStateChangeHandler);
          this.vis.uiState.clearAllKeys();
          this.vis.uiState.set('vis', visCustomizations);
          getKeys(visCustomizations).forEach(function (key) {
            _this2.vis.uiState.set(key, visCustomizations[key]);
          });
          this.vis.uiState.on('change', this.uiStateChangeHandler);
        }
      } else if (this.parent) {
        this.vis.uiState.clearAllKeys();
      }
    }
  }, {
    key: "handleChanges",
    value: function () {
      var _handleChanges = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var dirty;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.transferCustomizationsToUiState();
                dirty = false; // Check if timerange has changed

                if (!_lodash.default.isEqual(this.input.timeRange, this.timeRange)) {
                  this.timeRange = _lodash.default.cloneDeep(this.input.timeRange);
                  dirty = true;
                } // Check if filters has changed


                if (!_public.esFilters.onlyDisabledFiltersChanged(this.input.filters, this.filters)) {
                  this.filters = this.input.filters;
                  dirty = true;
                } // Check if query has changed


                if (!_lodash.default.isEqual(this.input.query, this.query)) {
                  this.query = this.input.query;
                  dirty = true;
                }

                if (this.output.title !== this.title) {
                  this.title = this.output.title;

                  if (this.domNode) {
                    this.domNode.setAttribute('data-title', this.title || '');
                  }
                }

                if (this.vis.description && this.domNode) {
                  this.domNode.setAttribute('data-description', this.vis.description);
                }

                if (this.handler && dirty) {
                  this.updateHandler();
                }

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleChanges() {
        return _handleChanges.apply(this, arguments);
      }

      return handleChanges;
    }() // this is a hack to make editor still work, will be removed once we clean up editor
    // @ts-ignore

  }, {
    key: "render",

    /**
     *
     * @param {Element} domNode
     */
    value: function () {
      var _render = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(domNode) {
        var _this3 = this;

        var div, expressions;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.timeRange = _lodash.default.cloneDeep(this.input.timeRange);
                this.transferCustomizationsToUiState();
                div = document.createElement('div');
                div.className = "visualize panel-content panel-content--fullWidth";
                domNode.appendChild(div);
                this.domNode = div;
                expressions = (0, _services.getExpressions)();
                this.handler = new expressions.ExpressionLoader(this.domNode);
                this.subscriptions.push(this.handler.events$.subscribe(
                /*#__PURE__*/
                function () {
                  var _ref3 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee3(event) {
                    var agg, triggerId, context;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            if (!(event.name === 'bounds')) {
                              _context3.next = 4;
                              break;
                            }

                            agg = _this3.vis.data.aggs.aggs.find(function (a) {
                              return (0, _lodash.get)(a, 'type.dslName') === 'geohash_grid';
                            });

                            if (agg && agg.params.precision !== event.data.precision || agg && !_lodash.default.isEqual(agg.params.boundingBox, event.data.boundingBox)) {
                              agg.params.boundingBox = event.data.boundingBox;
                              agg.params.precision = event.data.precision;

                              _this3.reload();
                            }

                            return _context3.abrupt("return");

                          case 4:
                            if (!_this3.input.disableTriggers) {
                              triggerId = event.name === 'brush' ? _events.VIS_EVENT_TO_TRIGGER.brush : _events.VIS_EVENT_TO_TRIGGER.filter;
                              context = {
                                embeddable: _this3,
                                timeFieldName: _this3.vis.data.indexPattern.timeFieldName,
                                data: event.data
                              };
                              (0, _services.getUiActions)().getTrigger(triggerId).exec(context);
                            }

                          case 5:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x2) {
                    return _ref3.apply(this, arguments);
                  };
                }()));
                div.setAttribute('data-title', this.output.title || '');

                if (this.vis.description) {
                  div.setAttribute('data-description', this.vis.description);
                }

                div.setAttribute('data-test-subj', 'visualizationLoader');
                div.setAttribute('data-shared-item', '');
                div.setAttribute('data-rendering-count', '0');
                div.setAttribute('data-render-complete', 'false');
                this.subscriptions.push(this.handler.loading$.subscribe(function () {
                  div.setAttribute('data-render-complete', 'false');
                  div.setAttribute('data-loading', '');
                }));
                this.subscriptions.push(this.handler.render$.subscribe(function (count) {
                  div.removeAttribute('data-loading');
                  div.setAttribute('data-render-complete', 'true');
                  div.setAttribute('data-rendering-count', count.toString());
                  (0, _public3.dispatchRenderComplete)(div);
                }));
                this.updateHandler();

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function render(_x) {
        return _render.apply(this, arguments);
      }

      return render;
    }()
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(VisualizeEmbeddable.prototype), "destroy", this).call(this);

      this.subscriptions.forEach(function (s) {
        return s.unsubscribe();
      });
      this.vis.uiState.off('change', this.uiStateChangeHandler);

      if (this.handler) {
        this.handler.destroy();
        this.handler.getElement().remove();
      }

      this.autoRefreshFetchSubscription.unsubscribe();
    }
  }, {
    key: "updateHandler",
    value: function () {
      var _updateHandler = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var expressionParams;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                expressionParams = {
                  searchContext: {
                    timeRange: this.timeRange,
                    query: this.input.query,
                    filters: this.input.filters
                  },
                  uiState: this.vis.uiState
                };

                if (this.abortController) {
                  this.abortController.abort();
                }

                this.abortController = new AbortController();
                _context5.next = 5;
                return (0, _build_pipeline.buildPipeline)(this.vis, {
                  timefilter: this.timefilter,
                  timeRange: this.timeRange,
                  abortSignal: this.abortController.signal
                });

              case 5:
                this.expression = _context5.sent;

                if (this.handler) {
                  this.handler.update(this.expression, expressionParams);
                }

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function updateHandler() {
        return _updateHandler.apply(this, arguments);
      }

      return updateHandler;
    }()
  }, {
    key: "supportedTriggers",
    value: function supportedTriggers() {
      // TODO: Report a correct list of triggers for each vis_type.
      switch (this.vis.type.name) {
        case 'area':
        case 'heatmap':
        case 'histogram':
        case 'horizontal_bar':
        case 'line':
        case 'pie':
        case 'table':
        case 'tagcloud':
          return [_events.VIS_EVENT_TO_TRIGGER.filter];

        case 'gauge':
        case 'goal':
        case 'input_control_vis':
        case 'markdown':
        case 'metric':
        case 'metrics':
        case 'region_map':
        case 'tile_map':
        case 'timelion':
        case 'vega':
        default:
          return [];
      }
    }
  }]);

  return VisualizeEmbeddable;
}(_public2.Embeddable);

exports.VisualizeEmbeddable = VisualizeEmbeddable;