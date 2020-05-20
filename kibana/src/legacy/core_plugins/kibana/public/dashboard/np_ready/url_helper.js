"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrlVars = getUrlVars;
exports.addEmbeddableToDashboardUrl = addEmbeddableToDashboardUrl;
exports.getLensUrlFromDashboardAbsoluteUrl = getLensUrlFromDashboardAbsoluteUrl;

var _url = require("url");

var _legacy_imports = require("../legacy_imports");

var _dashboard_constants = require("./dashboard_constants");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Return query params from URL
 * @param url given url
 */
function getUrlVars(url) {
  var vars = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = url.matchAll(/[?&]+([^=&]+)=([^&]*)/gi)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 3),
          key = _step$value[1],
          value = _step$value[2];

      vars[key] = decodeURIComponent(value);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return vars;
}
/** *
 * Returns dashboard URL with added embeddableType and embeddableId query params
 * eg.
 * input: url: http://localhost:5601/lib/app/kibana#/dashboard?_g=(refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now)), embeddableId: 12345, embeddableType: 'lens'
 * output: http://localhost:5601/lib/app/kibana#dashboard?addEmbeddableType=lens&addEmbeddableId=12345&_g=(refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))
 * @param url dasbhoard absolute url
 * @param embeddableId id of the saved visualization
 * @param basePath current base path
 * @param urlVars url query params (optional)
 * @param embeddableType 'lens' or 'visualization' (optional, default is 'lens')
 */


function addEmbeddableToDashboardUrl(url, basePath, embeddableId, urlVars, embeddableType) {
  if (!url) {
    return null;
  }

  var dashboardUrl = getUrlWithoutQueryParams(url);
  var dashboardParsedUrl = (0, _legacy_imports.absoluteToParsedUrl)(dashboardUrl, basePath);

  if (urlVars) {
    var keys = Object.keys(urlVars).sort();
    keys.forEach(function (key) {
      dashboardParsedUrl.addQueryParameter(key, urlVars[key]);
    });
  }

  dashboardParsedUrl.addQueryParameter(_dashboard_constants.DashboardConstants.ADD_EMBEDDABLE_TYPE, embeddableType || 'lens');
  dashboardParsedUrl.addQueryParameter(_dashboard_constants.DashboardConstants.ADD_EMBEDDABLE_ID, embeddableId);
  return dashboardParsedUrl.getAbsoluteUrl();
}
/**
 * Return Lens URL from dashboard absolute URL
 * @param dashboardAbsoluteUrl
 * @param basePath current base path
 * @param id Lens id
 */


function getLensUrlFromDashboardAbsoluteUrl(dashboardAbsoluteUrl, basePath, id) {
  if (!dashboardAbsoluteUrl || basePath === null || basePath === undefined) {
    return null;
  }

  var _parse = (0, _url.parse)(dashboardAbsoluteUrl),
      host = _parse.host,
      protocol = _parse.protocol;

  return "".concat(protocol, "//").concat(host).concat(basePath, "/app/kibana#/lens/edit/").concat(id);
}
/**
 * Returns the portion of the URL without query params
 * eg.
 * input: http://localhost:5601/lib/app/kibana#/dashboard?param1=x&param2=y&param3=z
 * output:http://localhost:5601/lib/app/kibana#/dashboard
 * input: http://localhost:5601/lib/app/kibana#/dashboard/39292992?param1=x&param2=y&param3=z
 * output: http://localhost:5601/lib/app/kibana#/dashboard/39292992
 * @param url url to parse
 */


function getUrlWithoutQueryParams(url) {
  return url.split('?')[0];
}