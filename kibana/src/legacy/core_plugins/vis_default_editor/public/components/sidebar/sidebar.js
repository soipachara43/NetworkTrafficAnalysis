"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultEditorSideBar = DefaultEditorSideBar;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _navbar = require("./navbar");

var _controls = require("./controls");

var _state = require("./state");

var _sidebar_title = require("./sidebar_title");

var _public = require("../../../../../../plugins/data/public");

var _schemas = require("../../schemas");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function DefaultEditorSideBar(_ref) {
  var isCollapsed = _ref.isCollapsed,
      onClickCollapse = _ref.onClickCollapse,
      optionTabs = _ref.optionTabs,
      uiState = _ref.uiState,
      vis = _ref.vis,
      isLinkedSearch = _ref.isLinkedSearch,
      eventEmitter = _ref.eventEmitter,
      savedSearch = _ref.savedSearch;

  var _useState = (0, _react.useState)(optionTabs[0].name),
      _useState2 = _slicedToArray(_useState, 2),
      selectedTab = _useState2[0],
      setSelectedTab = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isDirty = _useState4[0],
      setDirty = _useState4[1];

  var _useEditorReducer = (0, _state.useEditorReducer)(vis, eventEmitter),
      _useEditorReducer2 = _slicedToArray(_useEditorReducer, 2),
      state = _useEditorReducer2[0],
      dispatch = _useEditorReducer2[1];

  var _useEditorFormState = (0, _state.useEditorFormState)(),
      formState = _useEditorFormState.formState,
      setTouched = _useEditorFormState.setTouched,
      setValidity = _useEditorFormState.setValidity,
      resetValidity = _useEditorFormState.resetValidity;

  var responseAggs = (0, _react.useMemo)(function () {
    return state.data.aggs ? state.data.aggs.getResponseAggs() : [];
  }, [state.data.aggs]);
  var metricSchemas = (0, _schemas.getSchemasByGroup)(vis.type.schemas.all || [], _public.AggGroupNames.Metrics).map(function (s) {
    return s.name;
  });
  var metricAggs = (0, _react.useMemo)(function () {
    return responseAggs.filter(function (agg) {
      return metricSchemas.includes((0, _lodash.get)(agg, 'schema'));
    });
  }, [responseAggs, metricSchemas]);
  var hasHistogramAgg = (0, _react.useMemo)(function () {
    return responseAggs.some(function (agg) {
      return agg.type.name === 'histogram';
    });
  }, [responseAggs]);
  var setStateValidity = (0, _react.useCallback)(function (value) {
    setValidity('visOptions', value);
  }, [setValidity]);
  var setStateValue = (0, _react.useCallback)(function (paramName, value) {
    var shouldUpdate = !(0, _lodash.isEqual)(state.params[paramName], value);

    if (shouldUpdate) {
      dispatch((0, _state.setStateParamValue)(paramName, value));
    }
  }, [dispatch, state.params]);
  var applyChanges = (0, _react.useCallback)(function () {
    if (formState.invalid || !isDirty) {
      setTouched(true);
      return;
    }

    vis.setState(_objectSpread({}, vis.serialize(), {
      params: state.params,
      data: {
        aggs: state.data.aggs ? state.data.aggs.aggs.map(function (agg) {
          return agg.toJSON();
        }) : []
      }
    }));
    eventEmitter.emit('updateVis');
    eventEmitter.emit('dirtyStateChange', {
      isDirty: false
    });
    setTouched(false);
  }, [vis, state, formState.invalid, setTouched, isDirty, eventEmitter]);
  var onSubmit = (0, _react.useCallback)(function (event) {
    if (event.ctrlKey && event.keyCode === _eui.keyCodes.ENTER) {
      event.preventDefault();
      event.stopPropagation();
      applyChanges();
    }
  }, [applyChanges]);
  (0, _react.useEffect)(function () {
    var changeHandler = function changeHandler(_ref2) {
      var dirty = _ref2.isDirty;
      setDirty(dirty);

      if (!dirty) {
        resetValidity();
      }
    };

    eventEmitter.on('dirtyStateChange', changeHandler);
    return function () {
      eventEmitter.off('dirtyStateChange', changeHandler);
    };
  }, [resetValidity, eventEmitter]); // subscribe on external vis changes using browser history, for example press back button

  (0, _react.useEffect)(function () {
    var resetHandler = function resetHandler() {
      return dispatch((0, _state.discardChanges)(vis));
    };

    eventEmitter.on('updateEditor', resetHandler);
    return function () {
      eventEmitter.off('updateEditor', resetHandler);
    };
  }, [dispatch, vis, eventEmitter]);
  var dataTabProps = {
    dispatch: dispatch,
    formIsTouched: formState.touched,
    metricAggs: metricAggs,
    state: state,
    schemas: vis.type.schemas,
    setValidity: setValidity,
    setTouched: setTouched,
    setStateValue: setStateValue
  };
  var optionTabProps = {
    aggs: state.data.aggs,
    hasHistogramAgg: hasHistogramAgg,
    stateParams: state.params,
    vis: vis,
    uiState: uiState,
    setValue: setStateValue,
    setValidity: setStateValidity,
    setTouched: setTouched
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    className: "visEditorSidebar",
    direction: "column",
    justifyContent: "spaceBetween",
    gutterSize: "none",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement("form", {
    className: "visEditorSidebar__form",
    name: "visualizeEditor",
    onKeyDownCapture: onSubmit
  }, vis.type.requiresSearch && _react.default.createElement(_sidebar_title.SidebarTitle, {
    isLinkedSearch: isLinkedSearch,
    savedSearch: savedSearch,
    vis: vis,
    eventEmitter: eventEmitter
  }), optionTabs.length > 1 && _react.default.createElement(_navbar.DefaultEditorNavBar, {
    optionTabs: optionTabs,
    selectedTab: selectedTab,
    setSelectedTab: setSelectedTab
  }), optionTabs.map(function (_ref3) {
    var Editor = _ref3.editor,
        name = _ref3.name;
    var isTabSelected = selectedTab === name;
    return _react.default.createElement("div", {
      key: name,
      className: "visEditorSidebar__config ".concat(isTabSelected ? '' : 'visEditorSidebar__config-isHidden')
    }, _react.default.createElement(Editor, _extends({
      isTabSelected: isTabSelected
    }, name === 'data' ? dataTabProps : optionTabProps)));
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_controls.DefaultEditorControls, {
    applyChanges: applyChanges,
    dispatch: dispatch,
    isDirty: isDirty,
    isTouched: formState.touched,
    isInvalid: formState.invalid,
    vis: vis
  }))), _react.default.createElement(_eui.EuiButtonIcon, {
    "aria-expanded": !isCollapsed,
    "aria-label": _i18n.i18n.translate('visDefaultEditor.sidebar.collapseButtonAriaLabel', {
      defaultMessage: 'Toggle sidebar'
    }),
    className: "visEditor__collapsibleSidebarButton",
    "data-test-subj": "collapseSideBarButton",
    color: "text",
    iconType: isCollapsed ? 'menuLeft' : 'menuRight',
    onClick: onClickCollapse
  }));
}