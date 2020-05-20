"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatefulNewsFeed = void 0;

var _react = _interopRequireWildcard(require("react"));

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _helpers = require("./helpers");

var _kibana = require("../../lib/kibana");

var _news_feed = require("./news_feed");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var StatefulNewsFeed = _react.default.memo(function (_ref) {
  var enableNewsFeedSetting = _ref.enableNewsFeedSetting,
      newsFeedSetting = _ref.newsFeedSetting;
  var kibanaNewsfeedEnabled = (0, _kibana.useKibana)().services.newsfeed;

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(enableNewsFeedSetting),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      enableNewsFeed = _useUiSetting$2[0];

  var _useUiSetting$3 = (0, _kibana.useUiSetting$)(newsFeedSetting),
      _useUiSetting$4 = _slicedToArray(_useUiSetting$3, 1),
      newsFeedUrlSetting = _useUiSetting$4[0];

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      news = _useState2[0],
      setNews = _useState2[1]; // respect kibana's global newsfeed.enabled setting


  var newsfeedEnabled = kibanaNewsfeedEnabled && enableNewsFeed;
  var newsFeedUrl = (0, _helpers.getNewsFeedUrl)({
    newsFeedUrlSetting: newsFeedUrlSetting,
    getKibanaVersion: _chrome.default.getKibanaVersion
  });
  (0, _react.useEffect)(function () {
    var canceled = false;

    var fetchData =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var apiResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return (0, _helpers.fetchNews)({
                  newsFeedUrl: newsFeedUrl
                });

              case 3:
                apiResponse = _context.sent;

                if (!canceled) {
                  setNews((0, _helpers.getNewsItemsFromApiResponse)(apiResponse));
                }

                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);

                if (!canceled) {
                  setNews([]);
                }

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      return function fetchData() {
        return _ref2.apply(this, arguments);
      };
    }();

    if (newsfeedEnabled) {
      fetchData();
    }

    return function () {
      canceled = true;
    };
  }, [newsfeedEnabled, newsFeedUrl]);
  return _react.default.createElement(_react.default.Fragment, null, newsfeedEnabled ? _react.default.createElement(_news_feed.NewsFeed, {
    news: news
  }) : null);
});

exports.StatefulNewsFeed = StatefulNewsFeed;
StatefulNewsFeed.displayName = 'StatefulNewsFeed';