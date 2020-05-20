"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popover = Popover;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _elasticsearch_fieldnames = require("../../../../../../../../plugins/apm/common/elasticsearch_fieldnames");

var _Cytoscape = require("../Cytoscape");

var _Contents = require("./Contents");

var _cytoscapeOptions = require("../cytoscapeOptions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Popover(_ref) {
  var _ref2, _ref3, _ref5, _ref6, _ref7, _ref8;

  var focusedServiceName = _ref.focusedServiceName;
  var cy = (0, _react.useContext)(_Cytoscape.CytoscapeContext);

  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      selectedNode = _useState2[0],
      setSelectedNode = _useState2[1];

  var deselect = (0, _react.useCallback)(function () {
    if (cy) {
      cy.elements().unselect();
    }

    setSelectedNode(undefined);
  }, [cy, setSelectedNode]);
  var renderedHeight = (_ref2 = selectedNode === null || selectedNode === void 0 ? void 0 : selectedNode.renderedHeight()) !== null && _ref2 !== void 0 ? _ref2 : 0;
  var renderedWidth = (_ref3 = selectedNode === null || selectedNode === void 0 ? void 0 : selectedNode.renderedWidth()) !== null && _ref3 !== void 0 ? _ref3 : 0;

  var _ref4 = (_ref5 = selectedNode === null || selectedNode === void 0 ? void 0 : selectedNode.renderedPosition()) !== null && _ref5 !== void 0 ? _ref5 : {
    x: -10000,
    y: -10000
  },
      x = _ref4.x,
      y = _ref4.y;

  var isOpen = !!selectedNode;
  var isService = (selectedNode === null || selectedNode === void 0 ? void 0 : selectedNode.data(_elasticsearch_fieldnames.SERVICE_NAME)) !== undefined;
  var triggerStyle = {
    background: 'transparent',
    height: renderedHeight,
    position: 'absolute',
    width: renderedWidth
  };

  var trigger = _react.default.createElement("div", {
    style: triggerStyle
  });

  var zoom = (_ref6 = cy === null || cy === void 0 ? void 0 : cy.zoom()) !== null && _ref6 !== void 0 ? _ref6 : 1;
  var height = (_ref7 = selectedNode === null || selectedNode === void 0 ? void 0 : selectedNode.height()) !== null && _ref7 !== void 0 ? _ref7 : 0;
  var translateY = y - (zoom + 1) * height / 4;
  var popoverStyle = {
    position: 'absolute',
    transform: "translate(".concat(x, "px, ").concat(translateY, "px)")
  };
  var selectedNodeData = (_ref8 = selectedNode === null || selectedNode === void 0 ? void 0 : selectedNode.data()) !== null && _ref8 !== void 0 ? _ref8 : {};
  var selectedNodeServiceName = selectedNodeData.id;
  var label = selectedNodeData.label || selectedNodeServiceName;
  var popoverRef = (0, _react.useRef)(null); // Set up Cytoscape event handlers

  (0, _react.useEffect)(function () {
    var selectHandler = function selectHandler(event) {
      setSelectedNode(event.target);
    };

    if (cy) {
      cy.on('select', 'node', selectHandler);
      cy.on('unselect', 'node', deselect);
      cy.on('data viewport', deselect);
    }

    return function () {
      if (cy) {
        cy.removeListener('select', 'node', selectHandler);
        cy.removeListener('unselect', 'node', deselect);
        cy.removeListener('data viewport', undefined, deselect);
      }
    };
  }, [cy, deselect]); // Handle positioning of popover. This makes it so the popover positions
  // itself correctly and the arrows are always pointing to where they should.

  (0, _react.useEffect)(function () {
    if (popoverRef.current) {
      popoverRef.current.positionPopoverFluid();
    }
  }, [popoverRef, x, y]);
  var centerSelectedNode = (0, _react.useCallback)(function () {
    if (cy) {
      cy.animate(_objectSpread({}, _cytoscapeOptions.animationOptions, {
        center: {
          eles: cy.getElementById(selectedNodeServiceName)
        }
      }));
    }
  }, [cy, selectedNodeServiceName]);
  var isAlreadyFocused = focusedServiceName === selectedNodeServiceName;
  return _react.default.createElement(_eui.EuiPopover, {
    anchorPosition: 'upCenter',
    button: trigger,
    closePopover: function closePopover() {},
    isOpen: isOpen,
    ref: popoverRef,
    style: popoverStyle
  }, _react.default.createElement(_Contents.Contents, {
    isService: isService,
    label: label,
    onFocusClick: isAlreadyFocused ? centerSelectedNode : deselect,
    selectedNodeData: selectedNodeData,
    selectedNodeServiceName: selectedNodeServiceName
  }));
}