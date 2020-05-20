"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScalingForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _single_field_select = require("../../../components/single_field_select");

var _kibana_services = require("../../../kibana_services");

var _validated_range = require("../../../components/validated_range");

var _constants = require("../../../../common/constants");

var _load_index_settings = require("./load_index_settings");

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

var ScalingForm =
/*#__PURE__*/
function (_Component) {
  _inherits(ScalingForm, _Component);

  function ScalingForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ScalingForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScalingForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      maxInnerResultWindow: _constants.DEFAULT_MAX_INNER_RESULT_WINDOW,
      maxResultWindow: _constants.DEFAULT_MAX_RESULT_WINDOW
    });

    _defineProperty(_assertThisInitialized(_this), "_isMounted", false);

    _defineProperty(_assertThisInitialized(_this), "_onScalingTypeChange", function (optionId) {
      var layerType = optionId === _constants.SCALING_TYPES.CLUSTERS ? _constants.LAYER_TYPE.BLENDED_VECTOR : _constants.LAYER_TYPE.VECTOR;

      _this.props.onChange({
        propName: 'scalingType',
        value: optionId,
        newLayerType: layerType
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onFilterByMapBoundsChange", function (event) {
      _this.props.onChange({
        propName: 'filterByMapBounds',
        value: event.target.checked
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onTopHitsSplitFieldChange", function (topHitsSplitField) {
      _this.props.onChange({
        propName: 'topHitsSplitField',
        value: topHitsSplitField
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onTopHitsSizeChange", function (size) {
      _this.props.onChange({
        propName: 'topHitsSize',
        value: size
      });
    });

    return _this;
  }

  _createClass(ScalingForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
      this.loadIndexSettings();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: "loadIndexSettings",
    value: function () {
      var _loadIndexSettings2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var indexPattern, _ref, maxInnerResultWindow, maxResultWindow;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _kibana_services.indexPatternService.get(this.props.indexPatternId);

              case 3:
                indexPattern = _context.sent;
                _context.next = 6;
                return (0, _load_index_settings.loadIndexSettings)(indexPattern.title);

              case 6:
                _ref = _context.sent;
                maxInnerResultWindow = _ref.maxInnerResultWindow;
                maxResultWindow = _ref.maxResultWindow;

                if (this._isMounted) {
                  this.setState({
                    maxInnerResultWindow: maxInnerResultWindow,
                    maxResultWindow: maxResultWindow
                  });
                }

                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return");

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 12]]);
      }));

      function loadIndexSettings() {
        return _loadIndexSettings2.apply(this, arguments);
      }

      return loadIndexSettings;
    }()
  }, {
    key: "_renderTopHitsForm",
    value: function _renderTopHitsForm() {
      var sizeSlider;

      if (this.props.topHitsSplitField) {
        sizeSlider = _react.default.createElement(_eui.EuiFormRow, {
          label: _i18n.i18n.translate('xpack.maps.source.esSearch.topHitsSizeLabel', {
            defaultMessage: 'Documents per entity'
          }),
          display: "columnCompressed"
        }, _react.default.createElement(_validated_range.ValidatedRange, {
          min: 1,
          max: this.state.maxInnerResultWindow,
          step: 1,
          value: this.props.topHitsSize,
          onChange: this._onTopHitsSizeChange,
          showLabels: true,
          showInput: true,
          showRange: true,
          "data-test-subj": "layerPanelTopHitsSize",
          compressed: true
        }));
      }

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
        label: _i18n.i18n.translate('xpack.maps.source.esSearch.topHitsSplitFieldLabel', {
          defaultMessage: 'Entity'
        }),
        display: "columnCompressed"
      }, _react.default.createElement(_single_field_select.SingleFieldSelect, {
        placeholder: _i18n.i18n.translate('xpack.maps.source.esSearch.topHitsSplitFieldSelectPlaceholder', {
          defaultMessage: 'Select entity field'
        }),
        value: this.props.topHitsSplitField,
        onChange: this._onTopHitsSplitFieldChange,
        fields: this.props.termFields,
        compressed: true
      })), sizeSlider);
    }
  }, {
    key: "render",
    value: function render() {
      var scalingOptions = [{
        id: _constants.SCALING_TYPES.LIMIT,
        label: _i18n.i18n.translate('xpack.maps.source.esSearch.limitScalingLabel', {
          defaultMessage: 'Limit results to {maxResultWindow}.',
          values: {
            maxResultWindow: this.state.maxResultWindow
          }
        })
      }, {
        id: _constants.SCALING_TYPES.TOP_HITS,
        label: _i18n.i18n.translate('xpack.maps.source.esSearch.useTopHitsLabel', {
          defaultMessage: 'Show top hits per entity.'
        })
      }];

      if (this.props.supportsClustering) {
        scalingOptions.push({
          id: _constants.SCALING_TYPES.CLUSTERS,
          label: _i18n.i18n.translate('xpack.maps.source.esSearch.clusterScalingLabel', {
            defaultMessage: 'Show clusters when results exceed {maxResultWindow}.',
            values: {
              maxResultWindow: this.state.maxResultWindow
            }
          })
        });
      }

      var filterByBoundsSwitch;

      if (this.props.scalingType !== _constants.SCALING_TYPES.CLUSTERS) {
        filterByBoundsSwitch = _react.default.createElement(_eui.EuiFormRow, null, _react.default.createElement(_eui.EuiSwitch, {
          label: _i18n.i18n.translate('xpack.maps.source.esSearch.extentFilterLabel', {
            defaultMessage: 'Dynamically filter for data in the visible map area'
          }),
          checked: this.props.filterByMapBounds,
          onChange: this._onFilterByMapBoundsChange,
          compressed: true
        }));
      }

      var scalingForm = null;

      if (this.props.scalingType === _constants.SCALING_TYPES.TOP_HITS) {
        scalingForm = _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiHorizontalRule, {
          margin: "xs"
        }), this._renderTopHitsForm());
      }

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
        size: "xs"
      }, _react.default.createElement("h5", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.maps.esSearch.scaleTitle",
        defaultMessage: "Scaling"
      }))), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react.default.createElement(_eui.EuiFormRow, null, _react.default.createElement(_eui.EuiRadioGroup, {
        options: scalingOptions,
        idSelected: this.props.scalingType,
        onChange: this._onScalingTypeChange
      })), filterByBoundsSwitch, scalingForm);
    }
  }]);

  return ScalingForm;
}(_react.Component);

exports.ScalingForm = ScalingForm;