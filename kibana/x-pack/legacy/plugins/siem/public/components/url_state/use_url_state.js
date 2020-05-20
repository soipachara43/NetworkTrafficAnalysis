"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUrlStateHooks = void 0;

var _fp = require("lodash/fp");

var _react = require("react");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _kibana = require("../../lib/kibana");

var _apollo_context = require("../../utils/apollo_context");

var _constants = require("./constants");

var _helpers = require("./helpers");

var _types = require("./types");

var _types2 = require("../../pages/home/types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function usePrevious(value) {
  var ref = (0, _react.useRef)(value);
  (0, _react.useEffect)(function () {
    ref.current = value;
  });
  return ref.current;
}

var useUrlStateHooks = function useUrlStateHooks(_ref) {
  var detailName = _ref.detailName,
      indexPattern = _ref.indexPattern,
      history = _ref.history,
      navTabs = _ref.navTabs,
      pageName = _ref.pageName,
      pathName = _ref.pathName,
      search = _ref.search,
      setInitialStateFromUrl = _ref.setInitialStateFromUrl,
      tabName = _ref.tabName,
      updateTimeline = _ref.updateTimeline,
      updateTimelineIsLoading = _ref.updateTimelineIsLoading,
      urlState = _ref.urlState;

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      isInitializing = _useState2[0],
      setIsInitializing = _useState2[1];

  var apolloClient = (0, _apollo_context.useApolloClient)();
  var _useKibana$services$d = (0, _kibana.useKibana)().services.data.query,
      filterManager = _useKibana$services$d.filterManager,
      savedQueries = _useKibana$services$d.savedQueries;
  var prevProps = usePrevious({
    pathName: pathName,
    pageName: pageName,
    urlState: urlState
  });

  var handleInitialize = function handleInitialize(type, needUpdate) {
    var mySearch = search;
    var urlStateToUpdate = [];

    _types.URL_STATE_KEYS[type].forEach(function (urlKey) {
      var _urlState$urlKey;

      var newUrlStateString = (0, _helpers.getParamFromQueryString)((0, _helpers.getQueryStringFromLocation)(mySearch), urlKey);

      if (newUrlStateString) {
        mySearch = (0, _helpers.updateUrlStateString)({
          history: history,
          isInitializing: isInitializing,
          newUrlStateString: newUrlStateString,
          pathName: pathName,
          search: mySearch,
          updateTimerange: (needUpdate !== null && needUpdate !== void 0 ? needUpdate : false) || isInitializing,
          urlKey: urlKey
        });

        if (isInitializing || needUpdate) {
          var _getParamFromQueryStr;

          var updatedUrlStateString = (_getParamFromQueryStr = (0, _helpers.getParamFromQueryString)((0, _helpers.getQueryStringFromLocation)(mySearch), urlKey)) !== null && _getParamFromQueryStr !== void 0 ? _getParamFromQueryStr : newUrlStateString;

          if (isInitializing || !(0, _fastDeepEqual.default)(updatedUrlStateString, newUrlStateString)) {
            urlStateToUpdate = [].concat(_toConsumableArray(urlStateToUpdate), [{
              urlKey: urlKey,
              newUrlStateString: updatedUrlStateString
            }]);
          }
        }
      } else if (urlKey === _constants.CONSTANTS.appQuery && urlState[urlKey] != null && ((_urlState$urlKey = urlState[urlKey]) === null || _urlState$urlKey === void 0 ? void 0 : _urlState$urlKey.query) === '') {
        mySearch = (0, _helpers.replaceStateInLocation)({
          history: history,
          pathName: pathName,
          search: mySearch,
          urlStateToReplace: '',
          urlStateKey: urlKey
        });
      } else if (urlKey === _constants.CONSTANTS.filters && (0, _fp.isEmpty)(urlState[urlKey])) {
        mySearch = (0, _helpers.replaceStateInLocation)({
          history: history,
          pathName: pathName,
          search: mySearch,
          urlStateToReplace: '',
          urlStateKey: urlKey
        });
      } else if (urlKey === _constants.CONSTANTS.timeline && urlState[urlKey] != null && urlState[urlKey].id === '') {
        mySearch = (0, _helpers.replaceStateInLocation)({
          history: history,
          pathName: pathName,
          search: mySearch,
          urlStateToReplace: '',
          urlStateKey: urlKey
        });
      } else {
        mySearch = (0, _helpers.replaceStateInLocation)({
          history: history,
          pathName: pathName,
          search: mySearch,
          urlStateToReplace: urlState[urlKey] || '',
          urlStateKey: urlKey
        });
      }
    });

    (0, _fp.difference)(_types.ALL_URL_STATE_KEYS, _types.URL_STATE_KEYS[type]).forEach(function (urlKey) {
      mySearch = (0, _helpers.replaceStateInLocation)({
        history: history,
        pathName: pathName,
        search: mySearch,
        urlStateToReplace: '',
        urlStateKey: urlKey
      });
    });
    setInitialStateFromUrl({
      apolloClient: apolloClient,
      detailName: detailName,
      filterManager: filterManager,
      indexPattern: indexPattern,
      pageName: pageName,
      savedQueries: savedQueries,
      updateTimeline: updateTimeline,
      updateTimelineIsLoading: updateTimelineIsLoading,
      urlStateToUpdate: urlStateToUpdate
    })();
  };

  (0, _react.useEffect)(function () {
    var type = (0, _helpers.getUrlType)(pageName);

    if (isInitializing && pageName != null && pageName !== '') {
      handleInitialize(type);
      setIsInitializing(false);
    } else if (!(0, _fastDeepEqual.default)(urlState, prevProps.urlState) && !isInitializing) {
      var mySearch = search;

      _types.URL_STATE_KEYS[type].forEach(function (urlKey) {
        var _urlState$urlKey2;

        if (urlKey === _constants.CONSTANTS.appQuery && urlState[urlKey] != null && ((_urlState$urlKey2 = urlState[urlKey]) === null || _urlState$urlKey2 === void 0 ? void 0 : _urlState$urlKey2.query) === '') {
          mySearch = (0, _helpers.replaceStateInLocation)({
            history: history,
            pathName: pathName,
            search: mySearch,
            urlStateToReplace: '',
            urlStateKey: urlKey
          });
        } else if (urlKey === _constants.CONSTANTS.filters && (0, _fp.isEmpty)(urlState[urlKey])) {
          mySearch = (0, _helpers.replaceStateInLocation)({
            history: history,
            pathName: pathName,
            search: mySearch,
            urlStateToReplace: '',
            urlStateKey: urlKey
          });
        } else if (urlKey === _constants.CONSTANTS.timeline && urlState[urlKey] != null && urlState[urlKey].id === '') {
          mySearch = (0, _helpers.replaceStateInLocation)({
            history: history,
            pathName: pathName,
            search: mySearch,
            urlStateToReplace: '',
            urlStateKey: urlKey
          });
        } else {
          mySearch = (0, _helpers.replaceStateInLocation)({
            history: history,
            pathName: pathName,
            search: mySearch,
            urlStateToReplace: urlState[urlKey] || '',
            urlStateKey: urlKey
          });
        }
      });
    } else if (pathName !== prevProps.pathName) {
      handleInitialize(type, pageName === _types2.SiemPageName.detections);
    }
  }, [isInitializing, history, pathName, pageName, prevProps, urlState]);
  (0, _react.useEffect)(function () {
    document.title = "".concat((0, _helpers.getTitle)(pageName, detailName, navTabs), " - Kibana");
  }, [pageName]);
  return null;
};

exports.useUrlStateHooks = useUrlStateHooks;