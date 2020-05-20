"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisLegend = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _legacy_imports = require("../../../legacy_imports");

var _models = require("./models");

var _legend_item = require("./legend_item");

var _pie_utils = require("./pie_utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VisLegend =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(VisLegend, _PureComponent);

  function VisLegend(props) {
    var _this;

    _classCallCheck(this, VisLegend);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VisLegend).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "legendId", (0, _eui.htmlIdGenerator)()('legend'));

    _defineProperty(_assertThisInitialized(_this), "getColor", function () {
      return '';
    });

    _defineProperty(_assertThisInitialized(_this), "toggleLegend", function () {
      var bwcAddLegend = _this.props.vis.params.addLegend;
      var bwcLegendStateDefault = bwcAddLegend == null ? true : bwcAddLegend;
      var newOpen = !_this.props.uiState.get('vis.legendOpen', bwcLegendStateDefault);

      _this.setState({
        open: newOpen
      }); // open should be applied on template before we update uiState


      setTimeout(function () {
        _this.props.uiState.set('vis.legendOpen', newOpen);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setColor", function (label, color) {
      return function (event) {
        if (event.keyCode && event.keyCode !== _eui.keyCodes.ENTER) {
          return;
        }

        var colors = _this.props.uiState.get('vis.colors') || {};
        if (colors[label] === color) delete colors[label];else colors[label] = color;

        _this.props.uiState.setSilent('vis.colors', null);

        _this.props.uiState.set('vis.colors', colors);

        _this.props.uiState.emit('colorChanged');

        _this.refresh();
      };
    });

    _defineProperty(_assertThisInitialized(_this), "filter", function (_ref, negate) {
      var data = _ref.values;

      _this.props.vis.API.events.filter({
        data: data,
        negate: negate
      });
    });

    _defineProperty(_assertThisInitialized(_this), "canFilter",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(item) {
        var filters;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_models.CUSTOM_LEGEND_VIS_TYPES.includes(_this.props.vislibVis.visConfigArgs.type)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", false);

              case 2:
                if (!(item.values && (0, _lodash.every)(item.values, _lodash.isUndefined))) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", false);

              case 4:
                _context.next = 6;
                return (0, _legacy_imports.createFiltersFromEvent)(item.values);

              case 6:
                filters = _context.sent;
                return _context.abrupt("return", Boolean(filters.length));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "toggleDetails", function (label) {
      return function (event) {
        if (event && event.keyCode && event.keyCode !== _eui.keyCodes.ENTER) {
          return;
        }

        _this.setState({
          selectedLabel: _this.state.selectedLabel === label ? null : label
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getSeriesLabels", function (data) {
      var values = data.map(function (chart) {
        return chart.series;
      }).reduce(function (a, b) {
        return a.concat(b);
      }, []);
      return (0, _lodash.compact)((0, _lodash.uniq)(values, 'label')).map(function (label) {
        return _objectSpread({}, label, {
          values: [label.values[0].seriesRaw]
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setFilterableLabels", function (items) {
      return new Promise(
      /*#__PURE__*/
      function () {
        var _ref3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3(resolve) {
          var filterableLabels;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  filterableLabels = new Set();
                  items.forEach(
                  /*#__PURE__*/
                  function () {
                    var _ref4 = _asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee2(item) {
                      var canFilter;
                      return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              _context2.next = 2;
                              return _this.canFilter(item);

                            case 2:
                              canFilter = _context2.sent;

                              if (canFilter) {
                                filterableLabels.add(item.label);
                              }

                            case 4:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2);
                    }));

                    return function (_x3) {
                      return _ref4.apply(this, arguments);
                    };
                  }());

                  _this.setState({
                    filterableLabels: filterableLabels
                  }, resolve);

                case 3:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x2) {
          return _ref3.apply(this, arguments);
        };
      }());
    });

    _defineProperty(_assertThisInitialized(_this), "setLabels", function (data, type) {
      var labels = [];

      if (_models.CUSTOM_LEGEND_VIS_TYPES.includes(type)) {
        var legendLabels = _this.props.vislibVis.getLegendLabels();

        if (legendLabels) {
          labels = (0, _lodash.map)(legendLabels, function (label) {
            return {
              label: label
            };
          });
        }
      } else {
        if (!data) return [];
        data = data.columns || data.rows || [data];
        labels = type === 'pie' ? (0, _pie_utils.getPieNames)(data) : _this.getSeriesLabels(data);
      }

      _this.setFilterableLabels(labels);

      _this.setState({
        labels: labels
      });
    });

    _defineProperty(_assertThisInitialized(_this), "refresh", function () {
      var vislibVis = _this.props.vislibVis;

      if (!vislibVis || !vislibVis.visConfig) {
        _this.setState({
          labels: [{
            label: _i18n.i18n.translate('visTypeVislib.vislib.legend.loadingLabel', {
              defaultMessage: 'loading…'
            })
          }]
        });

        return;
      } // make sure vislib is defined at this point


      if (_this.props.uiState.get('vis.legendOpen') == null && _this.props.vis.params.addLegend != null) {
        _this.setState({
          open: _this.props.vis.params.addLegend
        });
      }

      if (vislibVis.visConfig) {
        _this.getColor = _this.props.vislibVis.visConfig.data.getColorFunc();
      }

      _this.setLabels(_this.props.visData, vislibVis.visConfigArgs.type);
    });

    _defineProperty(_assertThisInitialized(_this), "highlight", function (event) {
      var el = event.currentTarget;
      var handler = _this.props.vislibVis && _this.props.vislibVis.handler; // there is no guarantee that a Chart will set the highlight-function on its handler

      if (!handler || typeof handler.highlight !== 'function') {
        return;
      }

      handler.highlight.call(el, handler.el);
    });

    _defineProperty(_assertThisInitialized(_this), "unhighlight", function (event) {
      var el = event.currentTarget;
      var handler = _this.props.vislibVis && _this.props.vislibVis.handler; // there is no guarantee that a Chart will set the unhighlight-function on its handler

      if (!handler || typeof handler.unHighlight !== 'function') {
        return;
      }

      handler.unHighlight.call(el, handler.el);
    });

    _defineProperty(_assertThisInitialized(_this), "getAnchorPosition", function () {
      var position = _this.props.position;

      switch (position) {
        case 'bottom':
          return 'upCenter';

        case 'left':
          return 'rightUp';

        case 'right':
          return 'leftUp';

        default:
          return 'downCenter';
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderLegend", function (anchorPosition) {
      return _react.default.createElement("ul", {
        className: "visLegend__list",
        id: _this.legendId
      }, _this.state.labels.map(function (item) {
        return _react.default.createElement(_legend_item.VisLegendItem, {
          item: item,
          key: item.label,
          anchorPosition: anchorPosition,
          selected: _this.state.selectedLabel === item.label,
          canFilter: _this.state.filterableLabels.has(item.label),
          onFilter: _this.filter,
          onSelect: _this.toggleDetails,
          legendId: _this.legendId,
          setColor: _this.setColor,
          getColor: _this.getColor,
          onHighlight: _this.highlight,
          onUnhighlight: _this.unhighlight
        });
      }));
    });

    var open = props.uiState.get('vis.legendOpen', true);
    _this.state = {
      open: open,
      labels: [],
      filterableLabels: new Set(),
      selectedLabel: null
    };
    return _this;
  }

  _createClass(VisLegend, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.refresh();
    }
  }, {
    key: "render",
    value: function render() {
      var open = this.state.open;
      var anchorPosition = this.getAnchorPosition();
      return _react.default.createElement("div", {
        className: "visLegend"
      }, _react.default.createElement("button", {
        type: "button",
        onClick: this.toggleLegend,
        className: (0, _classnames.default)('visLegend__toggle kbn-resetFocusState', {
          'visLegend__toggle--isOpen': open
        }),
        "aria-label": _i18n.i18n.translate('visTypeVislib.vislib.legend.toggleLegendButtonAriaLabel', {
          defaultMessage: 'Toggle legend'
        }),
        "aria-expanded": Boolean(open),
        "aria-controls": this.legendId,
        "data-test-subj": "vislibToggleLegend",
        title: _i18n.i18n.translate('visTypeVislib.vislib.legend.toggleLegendButtonTitle', {
          defaultMessage: 'Toggle legend'
        })
      }, _react.default.createElement(_eui.EuiIcon, {
        color: "text",
        type: "list"
      })), open && this.renderLegend(anchorPosition));
    }
  }]);

  return VisLegend;
}(_react.PureComponent);

exports.VisLegend = VisLegend;