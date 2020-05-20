"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapToolTip = exports.MapToolTipComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _tooltip_footer = require("./tooltip_footer");

var _line_tool_tip_content = require("./line_tool_tip_content");

var _point_tool_tip_content = require("./point_tool_tip_content");

var _loader = require("../../loader");

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MapToolTipComponent = function MapToolTipComponent(_ref) {
  var addFilters = _ref.addFilters,
      closeTooltip = _ref.closeTooltip,
      _ref$features = _ref.features,
      features = _ref$features === void 0 ? [] : _ref$features,
      isLocked = _ref.isLocked,
      getLayerName = _ref.getLayerName,
      loadFeatureProperties = _ref.loadFeatureProperties,
      loadFeatureGeometry = _ref.loadFeatureGeometry;

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isLoadingNextFeature = _useState4[0],
      setIsLoadingNextFeature = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isError = _useState6[0],
      setIsError = _useState6[1];

  var _useState7 = (0, _react.useState)(0),
      _useState8 = _slicedToArray(_useState7, 2),
      featureIndex = _useState8[0],
      setFeatureIndex = _useState8[1];

  var _useState9 = (0, _react.useState)([]),
      _useState10 = _slicedToArray(_useState9, 2),
      featureProps = _useState10[0],
      setFeatureProps = _useState10[1];

  var _useState11 = (0, _react.useState)(null),
      _useState12 = _slicedToArray(_useState11, 2),
      featureGeometry = _useState12[0],
      setFeatureGeometry = _useState12[1];

  var _useState13 = (0, _react.useState)(''),
      _useState14 = _slicedToArray(_useState13, 2),
      setLayerName = _useState14[1];

  (0, _react.useEffect)(function () {
    // Early return if component doesn't yet have props -- result of mounting in portal before actual rendering
    if (features.length === 0 || getLayerName == null || loadFeatureProperties == null || loadFeatureGeometry == null) {
      return;
    } // Separate loaders for initial load vs loading next feature to keep tooltip from drastically resizing


    if (!isLoadingNextFeature) {
      setIsLoading(true);
    }

    setIsError(false);

    var fetchFeatureProps =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var layerId, featureId, featureGeo, _ref3, _ref4, featureProperties, layerNameString;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(features[featureIndex] != null)) {
                  _context.next = 23;
                  break;
                }

                layerId = features[featureIndex].layerId;
                featureId = features[featureIndex].id;
                _context.prev = 3;
                featureGeo = loadFeatureGeometry({
                  layerId: layerId,
                  featureId: featureId
                });
                _context.next = 7;
                return Promise.all([loadFeatureProperties({
                  layerId: layerId,
                  featureId: featureId
                }), getLayerName(layerId)]);

              case 7:
                _ref3 = _context.sent;
                _ref4 = _slicedToArray(_ref3, 2);
                featureProperties = _ref4[0];
                layerNameString = _ref4[1];
                setFeatureProps(featureProperties);
                setFeatureGeometry(featureGeo);
                setLayerName(layerNameString);
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](3);
                setIsError(true);

              case 19:
                _context.prev = 19;
                setIsLoading(false);
                setIsLoadingNextFeature(false);
                return _context.finish(19);

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 16, 19, 23]]);
      }));

      return function fetchFeatureProps() {
        return _ref2.apply(this, arguments);
      };
    }();

    fetchFeatureProps();
  }, [featureIndex, features.map(function (f) {
    return "".concat(f.id, "-").concat(f.layerId);
  }).sort().join()]);

  if (isError) {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      justifyContent: "spaceAround"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, i18n.MAP_TOOL_TIP_ERROR));
  }

  return isLoading && !isLoadingNextFeature ? _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceAround"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "m"
  }))) : _react.default.createElement(_eui.EuiOutsideClickDetector, {
    onOutsideClick: function onOutsideClick() {
      if (closeTooltip != null) {
        closeTooltip();
        setFeatureIndex(0);
      }
    }
  }, _react.default.createElement("div", null, featureGeometry != null && featureGeometry.type === 'LineString' ? _react.default.createElement(_line_tool_tip_content.LineToolTipContent, {
    contextId: "".concat(features[featureIndex].layerId, "-").concat(features[featureIndex].id, "-").concat(featureIndex),
    featureProps: featureProps
  }) : _react.default.createElement(_point_tool_tip_content.PointToolTipContent, {
    contextId: "".concat(features[featureIndex].layerId, "-").concat(features[featureIndex].id, "-").concat(featureIndex),
    featureProps: featureProps,
    closeTooltip: closeTooltip
  }), features.length > 1 && _react.default.createElement(_tooltip_footer.ToolTipFooter, {
    featureIndex: featureIndex,
    totalFeatures: features.length,
    previousFeature: function previousFeature() {
      setFeatureIndex(featureIndex - 1);
      setIsLoadingNextFeature(true);
    },
    nextFeature: function nextFeature() {
      setFeatureIndex(featureIndex + 1);
      setIsLoadingNextFeature(true);
    }
  }), isLoadingNextFeature && _react.default.createElement(_loader.Loader, {
    "data-test-subj": "loading-panel",
    overlay: true,
    size: "m"
  })));
};

exports.MapToolTipComponent = MapToolTipComponent;
MapToolTipComponent.displayName = 'MapToolTipComponent';

var MapToolTip = _react.default.memo(MapToolTipComponent);

exports.MapToolTip = MapToolTip;
MapToolTip.displayName = 'MapToolTip';