"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepIndexPattern = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _public = require("../../../../../../../../../../plugins/data/public");

var _constants = require("../../constants");

var _lib = require("../../lib");

var _loading_indices = require("./components/loading_indices");

var _status_message = require("./components/status_message");

var _indices_list = require("./components/indices_list");

var _header = require("./components/header");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var StepIndexPattern =
/*#__PURE__*/
function (_Component) {
  _inherits(StepIndexPattern, _Component);

  function StepIndexPattern(props) {
    var _this;

    _classCallCheck(this, StepIndexPattern);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StepIndexPattern).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      partialMatchedIndices: [],
      exactMatchedIndices: [],
      isLoadingIndices: false,
      existingIndexPatterns: [],
      indexPatternExists: false,
      query: '',
      appendedWildcard: false,
      showingIndexPatternQueryErrors: false,
      indexPatternName: ''
    });

    _defineProperty(_assertThisInitialized(_this), "ILLEGAL_CHARACTERS", _toConsumableArray(_public.indexPatterns.ILLEGAL_CHARACTERS));

    _defineProperty(_assertThisInitialized(_this), "lastQuery", void 0);

    _defineProperty(_assertThisInitialized(_this), "fetchExistingIndexPatterns",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _ref2, savedObjects, existingIndexPatterns;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.props.savedObjectsClient.find({
                type: 'index-pattern',
                fields: ['title'],
                perPage: 10000
              });

            case 2:
              _ref2 = _context.sent;
              savedObjects = _ref2.savedObjects;
              existingIndexPatterns = savedObjects.map(function (obj) {
                return obj && obj.attributes ? obj.attributes.title : '';
              });

              _this.setState({
                existingIndexPatterns: existingIndexPatterns
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "fetchIndices",
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(query) {
        var _this$props, esService, indexPatternCreationType, existingIndexPatterns, _exactMatchedIndices, _ref4, _ref5, partialMatchedIndices, exactMatchedIndices;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props = _this.props, esService = _this$props.esService, indexPatternCreationType = _this$props.indexPatternCreationType;
                existingIndexPatterns = _this.state.existingIndexPatterns;

                if (!existingIndexPatterns.includes(query)) {
                  _context2.next = 5;
                  break;
                }

                _this.setState({
                  indexPatternExists: true
                });

                return _context2.abrupt("return");

              case 5:
                _this.setState({
                  isLoadingIndices: true,
                  indexPatternExists: false
                });

                if (!query.endsWith('*')) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 9;
                return (0, _lib.ensureMinimumTime)((0, _lib.getIndices)(esService, indexPatternCreationType, query, _constants.MAX_SEARCH_SIZE));

              case 9:
                _exactMatchedIndices = _context2.sent;

                if (!(query !== _this.lastQuery)) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return");

              case 12:
                _this.setState({
                  exactMatchedIndices: _exactMatchedIndices,
                  isLoadingIndices: false
                });

                return _context2.abrupt("return");

              case 14:
                _context2.next = 16;
                return (0, _lib.ensureMinimumTime)([(0, _lib.getIndices)(esService, indexPatternCreationType, "".concat(query, "*"), _constants.MAX_SEARCH_SIZE), (0, _lib.getIndices)(esService, indexPatternCreationType, query, _constants.MAX_SEARCH_SIZE)]);

              case 16:
                _ref4 = _context2.sent;
                _ref5 = _slicedToArray(_ref4, 2);
                partialMatchedIndices = _ref5[0];
                exactMatchedIndices = _ref5[1];

                if (!(query !== _this.lastQuery)) {
                  _context2.next = 22;
                  break;
                }

                return _context2.abrupt("return");

              case 22:
                _this.setState({
                  partialMatchedIndices: partialMatchedIndices,
                  exactMatchedIndices: exactMatchedIndices,
                  isLoadingIndices: false
                });

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "onQueryChanged", function (e) {
      var appendedWildcard = _this.state.appendedWildcard;
      var target = e.target;
      var query = target.value;

      if (query.length === 1 && (0, _lib.canAppendWildcard)(query)) {
        query += '*';

        _this.setState({
          appendedWildcard: true
        });

        setTimeout(function () {
          return target.setSelectionRange(1, 1);
        });
      } else {
        if (query === '*' && appendedWildcard) {
          query = '';

          _this.setState({
            appendedWildcard: false
          });
        }
      }

      _this.lastQuery = query;

      _this.setState({
        query: query,
        showingIndexPatternQueryErrors: !!query.length
      });

      _this.fetchIndices(query);
    });

    var _this$props2 = _this.props,
        _indexPatternCreationType = _this$props2.indexPatternCreationType,
        initialQuery = _this$props2.initialQuery;
    _this.state.query = initialQuery || props.uiSettings.get('indexPattern:placeholder');
    _this.state.indexPatternName = _indexPatternCreationType.getIndexPatternName();
    return _this;
  }

  _createClass(StepIndexPattern, [{
    key: "UNSAFE_componentWillMount",
    value: function () {
      var _UNSAFE_componentWillMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.fetchExistingIndexPatterns();

                if (this.state.query) {
                  this.lastQuery = this.state.query;
                  this.fetchIndices(this.state.query);
                }

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function UNSAFE_componentWillMount() {
        return _UNSAFE_componentWillMount.apply(this, arguments);
      }

      return UNSAFE_componentWillMount;
    }()
  }, {
    key: "renderLoadingState",
    value: function renderLoadingState() {
      var isLoadingIndices = this.state.isLoadingIndices;

      if (!isLoadingIndices) {
        return null;
      }

      return _react.default.createElement(_loading_indices.LoadingIndices, {
        "data-test-subj": "createIndexPatternStep1Loading"
      });
    }
  }, {
    key: "renderStatusMessage",
    value: function renderStatusMessage(matchedIndices) {
      var _this$props3 = this.props,
          indexPatternCreationType = _this$props3.indexPatternCreationType,
          isIncludingSystemIndices = _this$props3.isIncludingSystemIndices;
      var _this$state = this.state,
          query = _this$state.query,
          isLoadingIndices = _this$state.isLoadingIndices,
          indexPatternExists = _this$state.indexPatternExists;

      if (isLoadingIndices || indexPatternExists) {
        return null;
      }

      return _react.default.createElement(_status_message.StatusMessage, {
        matchedIndices: matchedIndices,
        showSystemIndices: indexPatternCreationType.getShowSystemIndices(),
        isIncludingSystemIndices: isIncludingSystemIndices,
        query: query
      });
    }
  }, {
    key: "renderList",
    value: function renderList(_ref6) {
      var visibleIndices = _ref6.visibleIndices,
          allIndices = _ref6.allIndices;
      var _this$state2 = this.state,
          query = _this$state2.query,
          isLoadingIndices = _this$state2.isLoadingIndices,
          indexPatternExists = _this$state2.indexPatternExists;

      if (isLoadingIndices || indexPatternExists) {
        return null;
      }

      var indicesToList = query.length ? visibleIndices : allIndices;
      return _react.default.createElement(_indices_list.IndicesList, {
        "data-test-subj": "createIndexPatternStep1IndicesList",
        query: query,
        indices: indicesToList
      });
    }
  }, {
    key: "renderIndexPatternExists",
    value: function renderIndexPatternExists() {
      var _this$state3 = this.state,
          indexPatternExists = _this$state3.indexPatternExists,
          query = _this$state3.query;

      if (!indexPatternExists) {
        return null;
      }

      return _react.default.createElement(_eui.EuiCallOut, {
        title: _react.default.createElement(_react2.FormattedMessage, {
          id: "kbn.management.createIndexPattern.step.warningHeader",
          defaultMessage: "There's already an index pattern called {query}",
          values: {
            query: query
          }
        }),
        iconType: "help",
        color: "warning"
      });
    }
  }, {
    key: "renderHeader",
    value: function renderHeader(_ref7) {
      var indices = _ref7.exactMatchedIndices;
      var _this$props4 = this.props,
          goToNextStep = _this$props4.goToNextStep,
          indexPatternCreationType = _this$props4.indexPatternCreationType;
      var _this$state4 = this.state,
          query = _this$state4.query,
          showingIndexPatternQueryErrors = _this$state4.showingIndexPatternQueryErrors,
          indexPatternExists = _this$state4.indexPatternExists,
          indexPatternName = _this$state4.indexPatternName;
      var containsErrors = false;
      var errors = [];
      var characterList = this.ILLEGAL_CHARACTERS.slice(0, this.ILLEGAL_CHARACTERS.length - 1).join(', ');
      var checkIndices = indexPatternCreationType.checkIndicesForErrors(indices);

      if (!query || !query.length || query === '.' || query === '..') {
        // This is an error scenario but do not report an error
        containsErrors = true;
      } else if ((0, _lib.containsIllegalCharacters)(query, _public.indexPatterns.ILLEGAL_CHARACTERS)) {
        var errorMessage = _i18n.i18n.translate('kbn.management.createIndexPattern.step.invalidCharactersErrorMessage', {
          defaultMessage: 'A {indexPatternName} cannot contain spaces or the characters: {characterList}',
          values: {
            characterList: characterList,
            indexPatternName: indexPatternName
          }
        });

        errors.push(errorMessage);
        containsErrors = true;
      } else if (checkIndices) {
        errors.push.apply(errors, _toConsumableArray(checkIndices));
        containsErrors = true;
      }

      var isInputInvalid = showingIndexPatternQueryErrors && containsErrors && errors.length > 0;
      var isNextStepDisabled = containsErrors || indices.length === 0 || indexPatternExists;
      return _react.default.createElement(_header.Header, {
        "data-test-subj": "createIndexPatternStep1Header",
        isInputInvalid: isInputInvalid,
        errors: errors,
        characterList: characterList,
        query: query,
        onQueryChanged: this.onQueryChanged,
        goToNextStep: goToNextStep,
        isNextStepDisabled: isNextStepDisabled
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          isIncludingSystemIndices = _this$props5.isIncludingSystemIndices,
          allIndices = _this$props5.allIndices;
      var _this$state5 = this.state,
          partialMatchedIndices = _this$state5.partialMatchedIndices,
          exactMatchedIndices = _this$state5.exactMatchedIndices;
      var matchedIndices = (0, _lib.getMatchedIndices)(allIndices, partialMatchedIndices, exactMatchedIndices, isIncludingSystemIndices);
      return _react.default.createElement(_eui.EuiPanel, {
        paddingSize: "l"
      }, this.renderHeader(matchedIndices), _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), this.renderLoadingState(), this.renderIndexPatternExists(), this.renderStatusMessage(matchedIndices), _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), this.renderList(matchedIndices));
    }
  }]);

  return StepIndexPattern;
}(_react.Component);

exports.StepIndexPattern = StepIndexPattern;