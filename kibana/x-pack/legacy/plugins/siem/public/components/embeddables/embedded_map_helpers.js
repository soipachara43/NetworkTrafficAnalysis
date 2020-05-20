"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findMatchingIndexPatterns = exports.createEmbeddable = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _react = _interopRequireDefault(require("react"));

var _reactReversePortal = require("react-reverse-portal");

var _minimatch = _interopRequireDefault(require("minimatch"));

var _public = require("../../../../../../../src/legacy/core_plugins/embeddable_api/public/np_ready/public");

var _map_config = require("./map_config");

var _constants = require("../../../../maps/common/constants");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Creates MapEmbeddable with provided initial configuration
 *
 * @param filters any existing global filters
 * @param indexPatterns list of index patterns to configure layers for
 * @param query initial query constraints as Query
 * @param startDate
 * @param endDate
 * @param setQuery function as provided by the GlobalTime component for reacting to refresh
 * @param portalNode wrapper for MapToolTip so it is not rendered in the embeddables component tree
 * @param embeddableApi
 *
 * @throws Error if EmbeddableFactory does not exist
 */
var createEmbeddable =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(filters, indexPatterns, query, startDate, endDate, setQuery, portalNode, embeddableApi) {
    var factory, state, input, renderTooltipContent, embeddableObject;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            factory = embeddableApi.getEmbeddableFactory(_constants.MAP_SAVED_OBJECT_TYPE);
            state = {
              layerList: (0, _map_config.getLayerList)(indexPatterns),
              title: i18n.MAP_TITLE
            };
            input = {
              id: _uuid.default.v4(),
              filters: filters,
              hidePanelTitles: true,
              query: query,
              refreshConfig: {
                value: 0,
                pause: true
              },
              timeRange: {
                from: new Date(startDate).toISOString(),
                to: new Date(endDate).toISOString()
              },
              viewMode: _public.ViewMode.VIEW,
              isLayerTOCOpen: false,
              openTOCDetails: [],
              hideFilterActions: false,
              mapCenter: {
                lon: -1.05469,
                lat: 15.96133,
                zoom: 1
              },
              disabledActions: ['CUSTOM_TIME_RANGE', 'CUSTOM_TIME_RANGE_BADGE']
            };

            renderTooltipContent = function renderTooltipContent(_ref2) {
              var addFilters = _ref2.addFilters,
                  closeTooltip = _ref2.closeTooltip,
                  features = _ref2.features,
                  isLocked = _ref2.isLocked,
                  getLayerName = _ref2.getLayerName,
                  loadFeatureProperties = _ref2.loadFeatureProperties,
                  loadFeatureGeometry = _ref2.loadFeatureGeometry;
              var props = {
                addFilters: addFilters,
                closeTooltip: closeTooltip,
                features: features,
                isLocked: isLocked,
                getLayerName: getLayerName,
                loadFeatureProperties: loadFeatureProperties,
                loadFeatureGeometry: loadFeatureGeometry
              };
              return _react.default.createElement(_reactReversePortal.OutPortal, _extends({
                node: portalNode
              }, props));
            }; // @ts-ignore method added in https://github.com/elastic/kibana/pull/43878


            _context.next = 6;
            return factory.createFromState(state, input, undefined, renderTooltipContent);

          case 6:
            embeddableObject = _context.sent;
            // Wire up to app refresh action
            setQuery({
              id: 'embeddedMap',
              // Scope to page type if using map elsewhere
              inspect: null,
              loading: false,
              refetch: function refetch() {
                return embeddableObject.reload();
              }
            });
            return _context.abrupt("return", embeddableObject);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createEmbeddable(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Returns kibanaIndexPatterns that wildcard match at least one of siemDefaultIndices
 *
 * @param kibanaIndexPatterns
 * @param siemDefaultIndices
 */


exports.createEmbeddable = createEmbeddable;

var findMatchingIndexPatterns = function findMatchingIndexPatterns(_ref3) {
  var kibanaIndexPatterns = _ref3.kibanaIndexPatterns,
      siemDefaultIndices = _ref3.siemDefaultIndices;

  try {
    return kibanaIndexPatterns.filter(function (kip) {
      return siemDefaultIndices.some(function (sdi) {
        return (0, _minimatch.default)(sdi, kip.attributes.title);
      });
    });
  } catch (_unused) {
    return [];
  }
};

exports.findMatchingIndexPatterns = findMatchingIndexPatterns;