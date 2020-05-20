"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryBarDefineRule = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _rxjs = require("rxjs");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _public = require("../../../../../../../../../../src/plugins/data/public");

var _open_timeline_modal = require("../../../../../components/open_timeline/open_timeline_modal");

var _query_bar = require("../../../../../components/query_bar");

var _helpers = require("../../../../../components/timeline/helpers");

var _query_bar2 = require("../../../../../components/timeline/query_bar");

var _keury = require("../../../../../lib/keury");

var _kibana = require("../../../../../lib/kibana");

var _saved_query_services = require("../../../../../utils/saved_query_services");

var _shared_imports = require("../../../../../shared_imports");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var StyledEuiFormRow = (0, _styledComponents.default)(_eui.EuiFormRow).withConfig({
  displayName: "StyledEuiFormRow",
  componentId: "x3fzg3-0"
})([".kbnTypeahead__items{max-height:45vh !important;}.globalQueryBar{padding:4px 0px 0px 0px;.kbnQueryBar{& > div:first-child{margin:0px 0px 0px 4px;}}}"]); // TODO need to add disabled in the SearchBar

var QueryBarDefineRule = function QueryBarDefineRule(_ref) {
  var browserFields = _ref.browserFields,
      dataTestSubj = _ref.dataTestSubj,
      field = _ref.field,
      idAria = _ref.idAria,
      indexPattern = _ref.indexPattern,
      _ref$isLoading = _ref.isLoading,
      isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading,
      onCloseTimelineSearch = _ref.onCloseTimelineSearch,
      _ref$openTimelineSear = _ref.openTimelineSearch,
      openTimelineSearch = _ref$openTimelineSear === void 0 ? false : _ref$openTimelineSear,
      resizeParentContainer = _ref.resizeParentContainer;

  var _useState = (0, _react.useState)(-1),
      _useState2 = _slicedToArray(_useState, 2),
      originalHeight = _useState2[0],
      setOriginalHeight = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      loadingTimeline = _useState4[0],
      setLoadingTimeline = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      savedQuery = _useState6[0],
      setSavedQuery = _useState6[1];

  var _useState7 = (0, _react.useState)({
    query: '',
    language: 'kuery'
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      queryDraft = _useState8[0],
      setQueryDraft = _useState8[1];

  var _getFieldValidityAndE = (0, _shared_imports.getFieldValidityAndErrorMessage)(field),
      isInvalid = _getFieldValidityAndE.isInvalid,
      errorMessage = _getFieldValidityAndE.errorMessage;

  var kibana = (0, _kibana.useKibana)();

  var _useState9 = (0, _react.useState)(new _public.FilterManager(kibana.services.uiSettings)),
      _useState10 = _slicedToArray(_useState9, 1),
      filterManager = _useState10[0];

  var savedQueryServices = (0, _saved_query_services.useSavedQueryServices)();
  (0, _react.useEffect)(function () {
    var isSubscribed = true;
    var subscriptions = new _rxjs.Subscription();
    filterManager.setFilters([]);
    subscriptions.add(filterManager.getUpdates$().subscribe({
      next: function next() {
        if (isSubscribed) {
          var newFilters = filterManager.getFilters();
          var _ref2 = field.value,
              filters = _ref2.filters;

          if (!(0, _fastDeepEqual.default)(filters, newFilters)) {
            field.setValue(_objectSpread({}, field.value, {
              filters: newFilters
            }));
          }
        }
      }
    }));
    return function () {
      isSubscribed = false;
      subscriptions.unsubscribe();
    };
  }, [field.value]);
  (0, _react.useEffect)(function () {
    var isSubscribed = true;

    function updateFilterQueryFromValue() {
      return _updateFilterQueryFromValue.apply(this, arguments);
    }

    function _updateFilterQueryFromValue() {
      _updateFilterQueryFromValue = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref3, filters, query, savedId, mySavedQuery;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref3 = field.value, filters = _ref3.filters, query = _ref3.query, savedId = _ref3.saved_id;

                if (!(0, _fastDeepEqual.default)(query, queryDraft)) {
                  setQueryDraft(query);
                }

                if (!(0, _fastDeepEqual.default)(filters, filterManager.getFilters())) {
                  filterManager.setFilters(filters);
                }

                if (!(savedId != null && savedQuery != null && savedId !== savedQuery.id || savedId != null && savedQuery == null)) {
                  _context.next = 16;
                  break;
                }

                _context.prev = 4;
                _context.next = 7;
                return savedQueryServices.getSavedQuery(savedId);

              case 7:
                mySavedQuery = _context.sent;

                if (isSubscribed && mySavedQuery != null) {
                  setSavedQuery(mySavedQuery);
                }

                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](4);
                setSavedQuery(null);

              case 14:
                _context.next = 17;
                break;

              case 16:
                if (savedId == null && savedQuery != null) {
                  setSavedQuery(null);
                }

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 11]]);
      }));
      return _updateFilterQueryFromValue.apply(this, arguments);
    }

    updateFilterQueryFromValue();
    return function () {
      isSubscribed = false;
    };
  }, [field.value]);
  var onSubmitQuery = (0, _react.useCallback)(function (newQuery, timefilter) {
    var _ref4 = field.value,
        query = _ref4.query;

    if (!(0, _fastDeepEqual.default)(query, newQuery)) {
      field.setValue(_objectSpread({}, field.value, {
        query: newQuery
      }));
    }
  }, [field]);
  var onChangedQuery = (0, _react.useCallback)(function (newQuery) {
    var _ref5 = field.value,
        query = _ref5.query;

    if (!(0, _fastDeepEqual.default)(query, newQuery)) {
      field.setValue(_objectSpread({}, field.value, {
        query: newQuery
      }));
    }
  }, [field]);
  var onSavedQuery = (0, _react.useCallback)(function (newSavedQuery) {
    if (newSavedQuery != null) {
      var _ref6 = field.value,
          savedId = _ref6.saved_id;

      if (newSavedQuery.id !== savedId) {
        setSavedQuery(newSavedQuery);
        field.setValue({
          filters: newSavedQuery.attributes.filters,
          query: newSavedQuery.attributes.query,
          saved_id: newSavedQuery.id
        });
      }
    }
  }, [field.value]);
  var onCloseTimelineModal = (0, _react.useCallback)(function () {
    setLoadingTimeline(true);
    onCloseTimelineSearch();
  }, [onCloseTimelineSearch]);
  var onOpenTimeline = (0, _react.useCallback)(function (timeline) {
    var _ref7, _timeline$kqlQuery$fi, _timeline$kqlQuery$fi2, _ref8, _timeline$kqlQuery$fi3, _timeline$kqlQuery$fi4, _timeline$filters;

    setLoadingTimeline(false);
    var newQuery = {
      query: (_ref7 = (_timeline$kqlQuery$fi = timeline.kqlQuery.filterQuery) === null || _timeline$kqlQuery$fi === void 0 ? void 0 : (_timeline$kqlQuery$fi2 = _timeline$kqlQuery$fi.kuery) === null || _timeline$kqlQuery$fi2 === void 0 ? void 0 : _timeline$kqlQuery$fi2.expression) !== null && _ref7 !== void 0 ? _ref7 : '',
      language: (_ref8 = (_timeline$kqlQuery$fi3 = timeline.kqlQuery.filterQuery) === null || _timeline$kqlQuery$fi3 === void 0 ? void 0 : (_timeline$kqlQuery$fi4 = _timeline$kqlQuery$fi3.kuery) === null || _timeline$kqlQuery$fi4 === void 0 ? void 0 : _timeline$kqlQuery$fi4.kind) !== null && _ref8 !== void 0 ? _ref8 : 'kuery'
    };
    var dataProvidersDsl = timeline.dataProviders != null && timeline.dataProviders.length > 0 ? (0, _keury.convertKueryToElasticSearchQuery)((0, _helpers.buildGlobalQuery)(timeline.dataProviders, browserFields), indexPattern) : '';
    var newFilters = (_timeline$filters = timeline.filters) !== null && _timeline$filters !== void 0 ? _timeline$filters : [];
    field.setValue({
      filters: dataProvidersDsl !== '' ? [].concat(_toConsumableArray(newFilters), [(0, _query_bar2.getDataProviderFilter)(dataProvidersDsl)]) : newFilters,
      query: newQuery,
      saved_id: ''
    });
  }, [browserFields, field, indexPattern]);

  var onMutation = function onMutation(event, observer) {
    if (resizeParentContainer != null) {
      var suggestionContainer = document.getElementById('kbnTypeahead__items');

      if (suggestionContainer != null) {
        var box = suggestionContainer.getBoundingClientRect();
        var accordionContainer = document.getElementById('define-rule');

        if (accordionContainer != null) {
          var accordionBox = accordionContainer.getBoundingClientRect();

          if (originalHeight === -1 || accordionBox.height < originalHeight + box.height) {
            resizeParentContainer(originalHeight + box.height - 100);
          }

          if (originalHeight === -1) {
            setOriginalHeight(accordionBox.height);
          }
        }
      } else {
        resizeParentContainer(-1);
      }
    }
  };

  var actionTimelineToHide = (0, _react.useMemo)(function () {
    return ['duplicate'];
  }, []);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(StyledEuiFormRow, {
    label: field.label,
    labelAppend: field.labelAppend,
    helpText: field.helpText,
    error: errorMessage,
    isInvalid: isInvalid,
    fullWidth: true,
    "data-test-subj": dataTestSubj,
    describedByIds: idAria ? [idAria] : undefined
  }, _react.default.createElement(_eui.EuiMutationObserver, {
    observerOptions: {
      subtree: true,
      attributes: true,
      childList: true
    },
    onMutation: onMutation
  }, function (mutationRef) {
    return _react.default.createElement("div", {
      ref: mutationRef
    }, _react.default.createElement(_query_bar.QueryBar, {
      indexPattern: indexPattern,
      isLoading: isLoading || loadingTimeline,
      isRefreshPaused: false,
      filterQuery: queryDraft,
      filterManager: filterManager,
      filters: filterManager.getFilters() || [],
      onChangedQuery: onChangedQuery,
      onSubmitQuery: onSubmitQuery,
      savedQuery: savedQuery,
      onSavedQuery: onSavedQuery,
      hideSavedQuery: false
    }));
  })), openTimelineSearch ? _react.default.createElement(_open_timeline_modal.OpenTimelineModal, {
    hideActions: actionTimelineToHide,
    modalTitle: i18n.IMPORT_TIMELINE_MODAL,
    onClose: onCloseTimelineModal,
    onOpen: onOpenTimeline
  }) : null);
};

exports.QueryBarDefineRule = QueryBarDefineRule;