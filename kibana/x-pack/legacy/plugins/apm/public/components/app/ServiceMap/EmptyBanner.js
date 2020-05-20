"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyBanner = EmptyBanner;

var _eui = require("@elastic/eui");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ElasticDocsLink = require("../../shared/Links/ElasticDocsLink");

var _Cytoscape = require("./Cytoscape");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var EmptyBannerContainer = _styledComponents.default.div.withConfig({
  displayName: "EmptyBannerContainer",
  componentId: "sc-1nk7dcr-0"
})(["margin:", ";left:calc( ", " + ", " );position:absolute;z-index:1;"], _eui_theme_light.default.gutterTypes.gutterSmall, _eui_theme_light.default.gutterTypes.gutterExtraLarge, _eui_theme_light.default.gutterTypes.gutterSmall);

function EmptyBanner() {
  var cy = (0, _react.useContext)(_Cytoscape.CytoscapeContext);

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      nodeCount = _useState2[0],
      setNodeCount = _useState2[1];

  (0, _react.useEffect)(function () {
    var handler = function handler(event) {
      return setNodeCount(event.cy.nodes().length);
    };

    if (cy) {
      cy.on('add remove', 'node', handler);
    }

    return function () {
      if (cy) {
        cy.removeListener('add remove', 'node', handler);
      }
    };
  }, [cy]); // Only show if there's a single node.

  if (!cy || nodeCount !== 1) {
    return null;
  } // Since we're absolutely positioned, we need to get the full width and
  // subtract the space for controls and margins.


  var width = cy.width() - parseInt(_eui_theme_light.default.gutterTypes.gutterExtraLarge, 10) - parseInt(_eui_theme_light.default.gutterTypes.gutterLarge, 10);
  return _react.default.createElement(EmptyBannerContainer, {
    style: {
      width: width
    }
  }, _react.default.createElement(_eui.EuiCallOut, {
    title: _i18n.i18n.translate('xpack.apm.serviceMap.emptyBanner.title', {
      defaultMessage: "Looks like there's only a single service."
    })
  }, _i18n.i18n.translate('xpack.apm.serviceMap.emptyBanner.message', {
    defaultMessage: "We will map out connected services and external requests if we can detect them. Please make sure you're running the latest version of the APM agent."
  }), ' ', _react.default.createElement(_ElasticDocsLink.ElasticDocsLink, {
    section: "/apm/get-started",
    path: "/agents.html"
  }, _i18n.i18n.translate('xpack.apm.serviceMap.emptyBanner.docsLink', {
    defaultMessage: 'Learn more in the docs'
  }))));
}