"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceNodeOverviewLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _APMLink = require("./APMLink");

var _useUrlParams2 = require("../../../../hooks/useUrlParams");

var _pickKeys = require("../../../../utils/pickKeys");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ServiceNodeOverviewLink = function ServiceNodeOverviewLink(_ref) {
  var serviceName = _ref.serviceName,
      rest = _objectWithoutProperties(_ref, ["serviceName"]);

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams;

  var persistedFilters = (0, _pickKeys.pickKeys)(urlParams, 'host', 'containerId', 'podName', 'serviceVersion');
  return _react.default.createElement(_APMLink.APMLink, _extends({
    path: "/services/".concat(serviceName, "/nodes"),
    query: persistedFilters
  }, rest));
};

exports.ServiceNodeOverviewLink = ServiceNodeOverviewLink;