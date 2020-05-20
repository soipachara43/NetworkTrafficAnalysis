"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmbeddedMap = exports.EmbeddedMapComponent = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _reactReversePortal = require("react-reverse-portal");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _public = require("../../../../../../../src/legacy/core_plugins/embeddable_api/public/np_ready/public");

var _legacy = require("../../../../../../../src/legacy/core_plugins/embeddable_api/public/np_ready/public/legacy");

var _constants = require("../../../common/constants");

var _helpers = require("../../hooks/api/helpers");

var _use_index_patterns = require("../../hooks/use_index_patterns");

var _loader = require("../loader");

var _toasters = require("../toasters");

var _embeddable = require("./embeddable");

var _embeddable_header = require("./embeddable_header");

var _embedded_map_helpers = require("./embedded_map_helpers");

var _index_patterns_missing_prompt = require("./index_patterns_missing_prompt");

var _map_tool_tip = require("./map_tool_tip/map_tool_tip");

var i18n = _interopRequireWildcard(require("./translations"));

var _kibana = require("../../lib/kibana");

var _public2 = require("../../../../../../../src/plugins/saved_objects/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var EmbeddableMap = _styledComponents.default.div.attrs(function () {
  return {
    className: 'siemEmbeddable__map'
  };
}).withConfig({
  displayName: "EmbeddableMap",
  componentId: "n4y6cz-0"
})([".embPanel{border:none;box-shadow:none;}.mapToolbarOverlay__button{display:none;}", ""], function (_ref) {
  var maintainRatio = _ref.maintainRatio;
  return maintainRatio && (0, _styledComponents.css)(["padding-top:calc(3 / 4 * 100%);position:relative;@media only screen and (min-width:", "){padding-top:calc(9 / 32 * 100%);}@media only screen and (min-width:1441px) and (min-height:901px){padding-top:calc(9 / 21 * 100%);}.embPanel{bottom:0;left:0;position:absolute;right:0;top:0;}"], function (_ref2) {
    var theme = _ref2.theme;
    return theme.eui.euiBreakpoints.m;
  });
});

EmbeddableMap.displayName = 'EmbeddableMap';

var EmbeddedMapComponent = function EmbeddedMapComponent(_ref3) {
  var endDate = _ref3.endDate,
      filters = _ref3.filters,
      query = _ref3.query,
      setQuery = _ref3.setQuery,
      startDate = _ref3.startDate;

  var _React$useState = _react.default.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      embeddable = _React$useState2[0],
      setEmbeddable = _React$useState2[1];

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isError = _useState4[0],
      setIsError = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isIndexError = _useState6[0],
      setIsIndexError = _useState6[1];

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var _useIndexPatterns = (0, _use_index_patterns.useIndexPatterns)(),
      _useIndexPatterns2 = _slicedToArray(_useIndexPatterns, 2),
      loadingKibanaIndexPatterns = _useIndexPatterns2[0],
      kibanaIndexPatterns = _useIndexPatterns2[1];

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_INDEX_KEY),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      siemDefaultIndices = _useUiSetting$2[0]; // This portalNode provided by react-reverse-portal allows us re-parent the MapToolTip within our
  // own component tree instead of the embeddables (default). This is necessary to have access to
  // the Redux store, theme provider, etc, which is required to register and un-register the draggable
  // Search InPortal/OutPortal for implementation touch points


  var portalNode = _react.default.useMemo(function () {
    return (0, _reactReversePortal.createPortalNode)();
  }, []);

  var _useKibana = (0, _kibana.useKibana)(),
      services = _useKibana.services; // Initial Load useEffect


  (0, _react.useEffect)(function () {
    var isSubscribed = true;

    function setupEmbeddable() {
      return _setupEmbeddable.apply(this, arguments);
    }

    function _setupEmbeddable() {
      _setupEmbeddable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var matchingIndexPatterns, embeddableObject;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Ensure at least one `siem:defaultIndex` kibana index pattern exists before creating embeddable
                matchingIndexPatterns = (0, _embedded_map_helpers.findMatchingIndexPatterns)({
                  kibanaIndexPatterns: kibanaIndexPatterns,
                  siemDefaultIndices: siemDefaultIndices
                });

                if (!(matchingIndexPatterns.length === 0 && isSubscribed)) {
                  _context.next = 5;
                  break;
                }

                setIsLoading(false);
                setIsIndexError(true);
                return _context.abrupt("return");

              case 5:
                _context.prev = 5;
                _context.next = 8;
                return (0, _embedded_map_helpers.createEmbeddable)(filters, (0, _helpers.getIndexPatternTitleIdMapping)(matchingIndexPatterns), query, startDate, endDate, setQuery, portalNode, services.embeddable);

              case 8:
                embeddableObject = _context.sent;

                if (isSubscribed) {
                  setEmbeddable(embeddableObject);
                }

                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](5);

                if (isSubscribed) {
                  (0, _toasters.displayErrorToast)(i18n.ERROR_CREATING_EMBEDDABLE, [_context.t0.message], dispatchToaster);
                  setIsError(true);
                }

              case 15:
                if (isSubscribed) {
                  setIsLoading(false);
                }

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 12]]);
      }));
      return _setupEmbeddable.apply(this, arguments);
    }

    if (!loadingKibanaIndexPatterns) {
      setupEmbeddable();
    }

    return function () {
      isSubscribed = false;
    };
  }, [loadingKibanaIndexPatterns, kibanaIndexPatterns]); // queryExpression updated useEffect

  (0, _react.useEffect)(function () {
    if (embeddable != null) {
      embeddable.updateInput({
        query: query
      });
    }
  }, [query]);
  (0, _react.useEffect)(function () {
    if (embeddable != null) {
      embeddable.updateInput({
        filters: filters
      });
    }
  }, [filters]); // DateRange updated useEffect

  (0, _react.useEffect)(function () {
    if (embeddable != null && startDate != null && endDate != null) {
      var timeRange = {
        from: new Date(startDate).toISOString(),
        to: new Date(endDate).toISOString()
      };
      embeddable.updateInput({
        timeRange: timeRange
      });
    }
  }, [startDate, endDate]);
  return isError ? null : _react.default.createElement(_embeddable.Embeddable, null, _react.default.createElement(_embeddable_header.EmbeddableHeader, {
    title: i18n.EMBEDDABLE_HEADER_TITLE
  }, _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, _react.default.createElement(_eui.EuiLink, {
    href: "".concat(services.docLinks.ELASTIC_WEBSITE_URL, "guide/en/siem/guide/").concat(services.docLinks.DOC_LINK_VERSION, "/conf-map-ui.html"),
    target: "_blank"
  }, i18n.EMBEDDABLE_HEADER_HELP))), _react.default.createElement(_reactReversePortal.InPortal, {
    node: portalNode
  }, _react.default.createElement(_map_tool_tip.MapToolTip, null)), _react.default.createElement(EmbeddableMap, {
    maintainRatio: !isIndexError
  }, embeddable != null ? _react.default.createElement(_public.EmbeddablePanel, {
    "data-test-subj": "embeddable-panel",
    embeddable: embeddable,
    getActions: services.uiActions.getTriggerCompatibleActions,
    getEmbeddableFactory: _legacy.start.getEmbeddableFactory,
    getAllEmbeddableFactories: _legacy.start.getEmbeddableFactories,
    notifications: services.notifications,
    overlays: services.overlays,
    inspector: services.inspector,
    SavedObjectFinder: (0, _public2.getSavedObjectFinder)(services.savedObjects, services.uiSettings)
  }) : !isLoading && isIndexError ? _react.default.createElement(_index_patterns_missing_prompt.IndexPatternsMissingPrompt, {
    "data-test-subj": "missing-prompt"
  }) : _react.default.createElement(_loader.Loader, {
    "data-test-subj": "loading-panel",
    overlay: true,
    size: "xl"
  })));
};

exports.EmbeddedMapComponent = EmbeddedMapComponent;
EmbeddedMapComponent.displayName = 'EmbeddedMapComponent';

var EmbeddedMap = _react.default.memo(EmbeddedMapComponent);

exports.EmbeddedMap = EmbeddedMap;
EmbeddedMap.displayName = 'EmbeddedMap';