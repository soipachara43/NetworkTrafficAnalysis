"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmbeddedMap = void 0;

var _react = _interopRequireWildcard(require("react"));

var _uuid = _interopRequireDefault(require("uuid"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _legacy = require("../../../../../../../../../src/legacy/core_plugins/embeddable_api/public/np_ready/public/legacy");

var i18n = _interopRequireWildcard(require("./translations"));

var _constants = require("../../../../../../maps/common/constants");

var _map_config = require("./map_config");

var _contexts = require("../../../../contexts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var EmbeddedPanel = _styledComponents.default.div.withConfig({
  displayName: "EmbeddedPanel",
  componentId: "sc-1vznppb-0"
})(["z-index:auto;flex:1;display:flex;flex-direction:column;height:100%;position:relative;.embPanel__content{display:flex;flex:1 1 100%;z-index:1;min-height:0;}&&& .mapboxgl-canvas{animation:none !important;}"]);

var EmbeddedMap = _react.default.memo(function (_ref) {
  var upPoints = _ref.upPoints,
      downPoints = _ref.downPoints;

  var _useContext = (0, _react.useContext)(_contexts.UptimeThemeContext),
      colors = _useContext.colors;

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      embeddable = _useState2[0],
      setEmbeddable = _useState2[1];

  var embeddableRoot = (0, _react.useRef)(null);

  var factory = _legacy.start.getEmbeddableFactory(_constants.MAP_SAVED_OBJECT_TYPE);

  var input = {
    id: _uuid.default.v4(),
    filters: [],
    hidePanelTitles: true,
    refreshConfig: {
      value: 0,
      pause: false
    },
    viewMode: 'view',
    isLayerTOCOpen: false,
    hideFilterActions: true,
    // Zoom Lat/Lon values are set to make sure map is in center in the panel
    // It wil also omit Greenland/Antarctica etc
    mapCenter: {
      lon: 11,
      lat: 20,
      zoom: 0
    },
    disableInteractive: true,
    disableTooltipControl: true,
    hideToolbarOverlay: true,
    hideLayerControl: true,
    hideViewControl: true
  };
  (0, _react.useEffect)(function () {
    function setupEmbeddable() {
      return _setupEmbeddable.apply(this, arguments);
    }

    function _setupEmbeddable() {
      _setupEmbeddable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var mapState, embeddableObject;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                mapState = {
                  layerList: (0, _map_config.getLayerList)(upPoints, downPoints, colors),
                  title: i18n.MAP_TITLE
                }; // @ts-ignore

                _context.next = 3;
                return factory.createFromState(mapState, input, undefined);

              case 3:
                embeddableObject = _context.sent;
                setEmbeddable(embeddableObject);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _setupEmbeddable.apply(this, arguments);
    }

    setupEmbeddable(); // we want this effect to execute exactly once after the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // update map layers based on points

  (0, _react.useEffect)(function () {
    if (embeddable) {
      embeddable.setLayerList((0, _map_config.getLayerList)(upPoints, downPoints, colors));
    }
  }, [upPoints, downPoints, embeddable, colors]); // We can only render after embeddable has already initialized

  (0, _react.useEffect)(function () {
    if (embeddableRoot.current && embeddable) {
      embeddable.render(embeddableRoot.current);
    }
  }, [embeddable, embeddableRoot]);
  return _react.default.createElement(EmbeddedPanel, null, _react.default.createElement("div", {
    className: "embPanel__content",
    ref: embeddableRoot
  }));
});

exports.EmbeddedMap = EmbeddedMap;
EmbeddedMap.displayName = 'EmbeddedMap';