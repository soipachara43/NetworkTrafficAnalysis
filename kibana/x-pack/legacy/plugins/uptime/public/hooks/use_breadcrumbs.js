"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBreadcrumbs = exports.makeBaseBreadcrumb = void 0;

var _i18n = require("@kbn/i18n");

var _react = require("react");

var _stringify_url_params = require("../lib/helper/stringify_url_params");

var _public = require("../../../../../../src/plugins/kibana_react/public");

var _ = require(".");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var makeBaseBreadcrumb = function makeBaseBreadcrumb(params) {
  var href = '#/';

  if (params) {
    var crumbParams = _objectSpread({}, params); // We don't want to encode this values because they are often set to Date.now(), the relative
    // values in dateRangeStart are better for a URL.


    delete crumbParams.absoluteDateRangeStart;
    delete crumbParams.absoluteDateRangeEnd;
    href += (0, _stringify_url_params.stringifyUrlParams)(crumbParams, true);
  }

  return {
    text: _i18n.i18n.translate('xpack.uptime.breadcrumbs.overviewBreadcrumbText', {
      defaultMessage: 'Uptime'
    }),
    href: href
  };
};

exports.makeBaseBreadcrumb = makeBaseBreadcrumb;

var useBreadcrumbs = function useBreadcrumbs(extraCrumbs) {
  var _useKibana$services$c;

  var params = (0, _.useUrlParams)()[0]();
  var setBreadcrumbs = (_useKibana$services$c = (0, _public.useKibana)().services.chrome) === null || _useKibana$services$c === void 0 ? void 0 : _useKibana$services$c.setBreadcrumbs;
  (0, _react.useEffect)(function () {
    if (setBreadcrumbs) {
      setBreadcrumbs([makeBaseBreadcrumb(params)].concat(extraCrumbs));
    }
  }, [extraCrumbs, params, setBreadcrumbs]);
};

exports.useBreadcrumbs = useBreadcrumbs;