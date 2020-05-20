"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepTimeField = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _lib = require("../../lib");

var _header = require("./components/header");

var _time_field = require("./components/time_field");

var _advanced_options = require("./components/advanced_options");

var _action_buttons = require("./components/action_buttons");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

var StepTimeField =
/*#__PURE__*/
function (_Component) {
  _inherits(StepTimeField, _Component);

  function StepTimeField(props) {
    var _this;

    _classCallCheck(this, StepTimeField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StepTimeField).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      error: '',
      timeFields: [],
      selectedTimeField: undefined,
      timeFieldSet: false,
      isAdvancedOptionsVisible: false,
      isFetchingTimeFields: false,
      isCreating: false,
      indexPatternId: '',
      indexPatternType: '',
      indexPatternName: ''
    });

    _defineProperty(_assertThisInitialized(_this), "mounted", false);

    _defineProperty(_assertThisInitialized(_this), "fetchTimeFields",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _this$props, indexPatternsService, pattern, getFetchForWildcardOptions, indexPattern, fields, timeFields;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, indexPatternsService = _this$props.indexPatternsService, pattern = _this$props.indexPattern;
              getFetchForWildcardOptions = _this.props.indexPatternCreationType.getFetchForWildcardOptions;
              _context.next = 4;
              return indexPatternsService.make();

            case 4:
              indexPattern = _context.sent;
              indexPattern.title = pattern;

              _this.setState({
                isFetchingTimeFields: true
              });

              _context.next = 9;
              return (0, _lib.ensureMinimumTime)(indexPattern.fieldsFetcher.fetchForWildcard(pattern, getFetchForWildcardOptions()));

            case 9:
              fields = _context.sent;
              timeFields = (0, _lib.extractTimeFields)(fields);

              _this.setState({
                timeFields: timeFields,
                isFetchingTimeFields: false
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "onTimeFieldChanged", function (e) {
      var value = e.target.value; // Find the time field based on the selected value

      var timeField = _this.state.timeFields.find(function (timeFld) {
        return timeFld.fieldName === value;
      }); // If the value is an empty string, it's not a valid selection


      var validSelection = value !== '';

      _this.setState({
        selectedTimeField: timeField ? timeField.fieldName : undefined,
        timeFieldSet: validSelection
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeIndexPatternId", function (e) {
      _this.setState({
        indexPatternId: e.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggleAdvancedOptions", function () {
      _this.setState(function (state) {
        return {
          isAdvancedOptionsVisible: !state.isAdvancedOptionsVisible
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "createIndexPattern",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var createIndexPattern, _this$state, selectedTimeField, indexPatternId;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              createIndexPattern = _this.props.createIndexPattern;
              _this$state = _this.state, selectedTimeField = _this$state.selectedTimeField, indexPatternId = _this$state.indexPatternId;

              _this.setState({
                isCreating: true
              });

              _context2.prev = 3;
              _context2.next = 6;
              return createIndexPattern(selectedTimeField, indexPatternId);

            case 6:
              _context2.next = 13;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](3);

              if (_this.mounted) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return");

            case 12:
              _this.setState({
                error: _context2.t0 instanceof Error ? _context2.t0.message : String(_context2.t0),
                isCreating: false
              });

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 8]]);
    })));

    _this.state.indexPatternType = props.indexPatternCreationType.getIndexPatternType() || '';
    _this.state.indexPatternName = props.indexPatternCreationType.getIndexPatternName();
    return _this;
  }

  _createClass(StepTimeField, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
      this.fetchTimeFields();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
    }
  }, {
    key: "formatErrorMessage",
    value: function formatErrorMessage(message) {
      // `createIndexPattern` throws "Conflict" when index pattern ID already exists.
      return message === 'Conflict' ? _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.management.createIndexPattern.stepTime.patterAlreadyExists",
        defaultMessage: "Custom index pattern ID already exists."
      }) : message;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          timeFields = _this$state2.timeFields,
          selectedTimeField = _this$state2.selectedTimeField,
          timeFieldSet = _this$state2.timeFieldSet,
          isAdvancedOptionsVisible = _this$state2.isAdvancedOptionsVisible,
          indexPatternId = _this$state2.indexPatternId,
          isCreating = _this$state2.isCreating,
          isFetchingTimeFields = _this$state2.isFetchingTimeFields,
          indexPatternName = _this$state2.indexPatternName;

      if (isCreating) {
        return _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiFlexGroup, {
          alignItems: "center"
        }, _react.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react.default.createElement(_eui.EuiLoadingSpinner, null)), _react.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react.default.createElement(_eui.EuiText, null, _react.default.createElement(_react2.FormattedMessage, {
          id: "kbn.management.createIndexPattern.stepTime.creatingLabel",
          defaultMessage: "Creating index pattern\u2026"
        })))));
      }

      var _this$props2 = this.props,
          indexPattern = _this$props2.indexPattern,
          goToPreviousStep = _this$props2.goToPreviousStep;
      var timeFieldOptions = timeFields.length > 0 ? [{
        text: '',
        value: ''
      }].concat(_toConsumableArray(timeFields.map(function (timeField) {
        return {
          text: timeField.display,
          value: timeField.fieldName,
          disabled: timeFields.isDisabled
        };
      }))) : [];
      var showTimeField = !timeFields || timeFields.length > 1;
      var submittable = !showTimeField || timeFieldSet;
      var error = this.state.error ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
        title: _react.default.createElement(_react2.FormattedMessage, {
          id: "kbn.management.createIndexPattern.stepTime.error",
          defaultMessage: "Error"
        }),
        color: "danger",
        iconType: "cross"
      }, _react.default.createElement("p", null, this.formatErrorMessage(this.state.error))), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      })) : null;
      return _react.default.createElement(_eui.EuiPanel, {
        paddingSize: "l"
      }, _react.default.createElement(_header.Header, {
        indexPattern: indexPattern,
        indexPatternName: indexPatternName
      }), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react.default.createElement(_time_field.TimeField, {
        isVisible: showTimeField,
        fetchTimeFields: this.fetchTimeFields,
        timeFieldOptions: timeFieldOptions,
        isLoading: isFetchingTimeFields,
        selectedTimeField: selectedTimeField,
        onTimeFieldChanged: this.onTimeFieldChanged
      }), _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react.default.createElement(_advanced_options.AdvancedOptions, {
        isVisible: isAdvancedOptionsVisible,
        indexPatternId: indexPatternId,
        toggleAdvancedOptions: this.toggleAdvancedOptions,
        onChangeIndexPatternId: this.onChangeIndexPatternId
      }), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), error, _react.default.createElement(_action_buttons.ActionButtons, {
        goToPreviousStep: goToPreviousStep,
        submittable: submittable,
        createIndexPattern: this.createIndexPattern
      }));
    }
  }]);

  return StepTimeField;
}(_react.Component);

exports.StepTimeField = StepTimeField;