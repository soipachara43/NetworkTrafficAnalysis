"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showNewsItem = exports.fetchNews = exports.getNewsItemsFromApiResponse = exports.getLocale = exports.NEWS_FEED_FALLBACK_LANGUAGE = exports.getNewsFeedUrl = exports.removeSnapshotFromVersion = void 0;

var _fp = require("lodash/fp");

var _moment = _interopRequireDefault(require("moment"));

var _uuid = _interopRequireDefault(require("uuid"));

var _kibana = require("../../lib/kibana");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Removes the `-SNAPSHOT` that is sometimes appended to the Kibana version,
 * (e.g. `8.0.0-SNAPSHOT`), which is typically only seen in non-production
 * environments
 */
var removeSnapshotFromVersion = function removeSnapshotFromVersion(kibanaVersion) {
  var _ref;

  return (_ref = kibanaVersion === null || kibanaVersion === void 0 ? void 0 : kibanaVersion.replace(/-SNAPSHOT/gi, '')) !== null && _ref !== void 0 ? _ref : kibanaVersion;
};
/**
 * Combines the URL specified in the `newsFeedUrlSetting`, e.g.
 * `https://feeds.elastic.co/security-solution` with the Kibana version
 * returned from `getKibanaVersion` (e.g. `8.0.0`) to form a complete path to
 * the news specific to the current version of Kibana, (e.g.
 * `https://feeds.elastic.co/security-solution/v8.0.0.json`)
 */


exports.removeSnapshotFromVersion = removeSnapshotFromVersion;

var getNewsFeedUrl = function getNewsFeedUrl(_ref2) {
  var newsFeedUrlSetting = _ref2.newsFeedUrlSetting,
      getKibanaVersion = _ref2.getKibanaVersion;
  return [newsFeedUrlSetting === null || newsFeedUrlSetting === void 0 ? void 0 : newsFeedUrlSetting.trim().replace(/\/$/, ''), "v".concat(removeSnapshotFromVersion(getKibanaVersion()), ".json")].join('/');
};
/** Fall back to this language when extracting i18n news items from the feed */


exports.getNewsFeedUrl = getNewsFeedUrl;
var NEWS_FEED_FALLBACK_LANGUAGE = 'en';
/**
 * Returns the current locale of the browser as specified in the `document`,
 * or the value of `fallback` if the locale could not be retrieved
 */

exports.NEWS_FEED_FALLBACK_LANGUAGE = NEWS_FEED_FALLBACK_LANGUAGE;

var getLocale = function getLocale(fallback) {
  var _document$documentEle;

  if (document.documentElement.lang === '') {
    return fallback;
  }

  return (_document$documentEle = document.documentElement.lang) !== null && _document$documentEle !== void 0 ? _document$documentEle : fallback; // use the `lang` attribute of the `html` tag
};

exports.getLocale = getLocale;
var NO_NEWS_ITEMS = [];
/**
 * Transforms a `RawNewsApiResponse` from the news feed API to a collection of
 * `NewsItem`s
 */

var getNewsItemsFromApiResponse = function getNewsItemsFromApiResponse(response) {
  var locale = getLocale(NEWS_FEED_FALLBACK_LANGUAGE);

  if (response == null || response.items == null) {
    return NO_NEWS_ITEMS;
  }

  return response.items.filter(function (x) {
    return x != null;
  }).map(function (x) {
    var _ref3, _get, _x$expire_on, _x$hash, _ref4, _get2, _ref5, _get3, _x$publish_on, _ref6, _get4;

    return {
      description: (_ref3 = (_get = (0, _fp.get)(locale, x.description)) !== null && _get !== void 0 ? _get : (0, _fp.get)(NEWS_FEED_FALLBACK_LANGUAGE, x.description)) !== null && _ref3 !== void 0 ? _ref3 : '',
      expireOn: new Date((_x$expire_on = x.expire_on) !== null && _x$expire_on !== void 0 ? _x$expire_on : ''),
      hash: (_x$hash = x.hash) !== null && _x$hash !== void 0 ? _x$hash : _uuid.default.v4(),
      imageUrl: (_ref4 = (_get2 = (0, _fp.get)(locale, x.image_url)) !== null && _get2 !== void 0 ? _get2 : (0, _fp.get)(NEWS_FEED_FALLBACK_LANGUAGE, x.image_url)) !== null && _ref4 !== void 0 ? _ref4 : null,
      linkUrl: (_ref5 = (_get3 = (0, _fp.get)(locale, x.link_url)) !== null && _get3 !== void 0 ? _get3 : (0, _fp.get)(NEWS_FEED_FALLBACK_LANGUAGE, x.link_url)) !== null && _ref5 !== void 0 ? _ref5 : '',
      publishOn: new Date((_x$publish_on = x.publish_on) !== null && _x$publish_on !== void 0 ? _x$publish_on : ''),
      title: (_ref6 = (_get4 = (0, _fp.get)(locale, x.title)) !== null && _get4 !== void 0 ? _get4 : (0, _fp.get)(NEWS_FEED_FALLBACK_LANGUAGE, x.title)) !== null && _ref6 !== void 0 ? _ref6 : ''
    };
  });
};
/**
 * Fetches `RawNewsApiResponse` from the specified `newsFeedUrl`, via a
 * cross-origin (CORS) request. This function throws an error if the request
 * fails
 */


exports.getNewsItemsFromApiResponse = getNewsItemsFromApiResponse;

var fetchNews =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref8) {
    var newsFeedUrl;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newsFeedUrl = _ref8.newsFeedUrl;
            return _context.abrupt("return", _kibana.KibanaServices.get().http.fetch(newsFeedUrl, {
              method: 'GET',
              credentials: 'omit',
              mode: 'cors'
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchNews(_x) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 * Returns true when "now" is after the publishOn date and before the expireOn
 * date
 */


exports.fetchNews = fetchNews;

var showNewsItem = function showNewsItem(_ref9) {
  var publishOn = _ref9.publishOn,
      expireOn = _ref9.expireOn;
  return (0, _moment.default)(Date.now()).isAfter(publishOn) && (0, _moment.default)(Date.now()).isBefore(expireOn);
};

exports.showNewsItem = showNewsItem;