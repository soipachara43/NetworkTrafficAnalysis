"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceOverviewLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _APMLink = require("./APMLink");

var _useUrlParams2 = require("../../../../hooks/useUrlParams");

var _pickKeys = require("../../../../utils/pickKeys");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ServiceOverviewLink = function ServiceOverviewLink(props) {
  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams;

  var persistedFilters = (0, _pickKeys.pickKeys)(urlParams, 'host', 'agentName');
  return _react.default.createElement(_APMLink.APMLink, _extends({
    path: "/services",
    query: persistedFilters
  }, props));
};

exports.ServiceOverviewLink = ServiceOverviewLink;