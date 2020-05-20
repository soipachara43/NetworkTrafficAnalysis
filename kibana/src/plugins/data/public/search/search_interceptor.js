"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchInterceptor = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _utils = require("../../common/utils");

var _request_timeout_error = require("./request_timeout_error");

var _long_query_notification = require("./long_query_notification");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SearchInterceptor =
/**
 * `abortController` used to signal all searches to abort.
 */

/**
 * The number of pending search requests.
 */

/**
 * Observable that emits when the number of pending requests changes.
 */

/**
 * The subscriptions from scheduling the automatic timeout for each request.
 */

/**
 * The current long-running toast (if there is one).
 */

/**
 * This class should be instantiated with a `requestTimeout` corresponding with how many ms after
 * requests are initiated that they should automatically cancel.
 * @param toasts The `core.notifications.toasts` service
 * @param application  The `core.application` service
 * @param requestTimeout Usually config value `elasticsearch.requestTimeout`
 */
function SearchInterceptor(toasts, application, requestTimeout) {
  var _this = this;

  _classCallCheck(this, SearchInterceptor);

  this.toasts = toasts;
  this.application = application;
  this.requestTimeout = requestTimeout;

  _defineProperty(this, "abortController", new AbortController());

  _defineProperty(this, "pendingCount", 0);

  _defineProperty(this, "pendingCount$", new _rxjs.BehaviorSubject(this.pendingCount));

  _defineProperty(this, "timeoutSubscriptions", new Set());

  _defineProperty(this, "longRunningToast", void 0);

  _defineProperty(this, "getPendingCount$", function () {
    return _this.pendingCount$.asObservable();
  });

  _defineProperty(this, "search", function (search, request, options) {
    // Defer the following logic until `subscribe` is actually called
    return (0, _rxjs.defer)(function () {
      _this.pendingCount$.next(++_this.pendingCount); // Schedule this request to automatically timeout after some interval


      var timeoutController = new AbortController();
      var timeoutSignal = timeoutController.signal;
      var timeout$ = (0, _rxjs.timer)(_this.requestTimeout);
      var subscription = timeout$.subscribe(function () {
        return timeoutController.abort();
      });

      _this.timeoutSubscriptions.add(subscription); // If the request timed out, throw a `RequestTimeoutError`


      var timeoutError$ = (0, _rxjs.fromEvent)(timeoutSignal, 'abort').pipe((0, _operators.mergeMapTo)((0, _rxjs.throwError)(new _request_timeout_error.RequestTimeoutError()))); // Schedule the notification to allow users to cancel or wait beyond the timeout

      var notificationSubscription = (0, _rxjs.timer)(10000).subscribe(_this.showToast); // Get a combined `AbortSignal` that will be aborted whenever the first of the following occurs:
      // 1. The user manually aborts (via `cancelPending`)
      // 2. The request times out
      // 3. The passed-in signal aborts (e.g. when re-fetching, or whenever the app determines)

      var signals = [_this.abortController.signal, timeoutSignal].concat(_toConsumableArray((options === null || options === void 0 ? void 0 : options.signal) ? [options.signal] : []));
      var combinedSignal = (0, _utils.getCombinedSignal)(signals);
      return search(request, _objectSpread({}, options, {
        signal: combinedSignal
      })).pipe((0, _operators.takeUntil)(timeoutError$), (0, _operators.finalize)(function () {
        _this.pendingCount$.next(--_this.pendingCount);

        _this.timeoutSubscriptions.delete(subscription);

        notificationSubscription.unsubscribe();
      }));
    });
  });

  _defineProperty(this, "showToast", function () {
    if (_this.longRunningToast) return;
    _this.longRunningToast = _this.toasts.addInfo({
      title: 'Your query is taking awhile',
      text: (0, _long_query_notification.getLongQueryNotification)({
        application: _this.application
      })
    }, {
      toastLifeTimeMs: 1000000
    });
  });

  _defineProperty(this, "hideToast", function () {
    if (_this.longRunningToast) {
      _this.toasts.remove(_this.longRunningToast);

      delete _this.longRunningToast;
    }
  });

  // When search requests go out, a notification is scheduled allowing users to continue the
  // request past the timeout. When all search requests complete, we remove the notification.
  this.getPendingCount$().pipe((0, _operators.filter)(function (count) {
    return count === 0;
  })).subscribe(this.hideToast);
}
/**
 * Returns an `Observable` over the current number of pending searches. This could mean that one
 * of the search requests is still in flight, or that it has only received partial responses.
 */
;

exports.SearchInterceptor = SearchInterceptor;