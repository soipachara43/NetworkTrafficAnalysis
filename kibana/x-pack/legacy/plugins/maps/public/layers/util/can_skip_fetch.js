"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDueToExtent = updateDueToExtent;
exports.canSkipSourceUpdate = canSkipSourceUpdate;
exports.canSkipStyleMetaUpdate = canSkipStyleMetaUpdate;
exports.canSkipFormattersUpdate = canSkipFormattersUpdate;

var _lodash = _interopRequireDefault(require("lodash"));

var _turf = _interopRequireDefault(require("turf"));

var _booleanContains = _interopRequireDefault(require("@turf/boolean-contains"));

var _is_refresh_only_query = require("./is_refresh_only_query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var SOURCE_UPDATE_REQUIRED = true;
var NO_SOURCE_UPDATE_REQUIRED = false;

function updateDueToExtent(source) {
  var prevMeta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var nextMeta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var extentAware = source.isFilterByMapBounds();

  if (!extentAware) {
    return NO_SOURCE_UPDATE_REQUIRED;
  }

  var previousBuffer = prevMeta.buffer;
  var newBuffer = nextMeta.buffer;

  if (!previousBuffer || !previousBuffer || !newBuffer) {
    return SOURCE_UPDATE_REQUIRED;
  }

  if (_lodash.default.isEqual(previousBuffer, newBuffer)) {
    return NO_SOURCE_UPDATE_REQUIRED;
  }

  var previousBufferGeometry = _turf.default.bboxPolygon([previousBuffer.minLon, previousBuffer.minLat, previousBuffer.maxLon, previousBuffer.maxLat]);

  var newBufferGeometry = _turf.default.bboxPolygon([newBuffer.minLon, newBuffer.minLat, newBuffer.maxLon, newBuffer.maxLat]);

  var doesPreviousBufferContainNewBuffer = (0, _booleanContains.default)(previousBufferGeometry, newBufferGeometry);

  var isTrimmed = _lodash.default.get(prevMeta, 'areResultsTrimmed', false);

  return doesPreviousBufferContainNewBuffer && !isTrimmed ? NO_SOURCE_UPDATE_REQUIRED : SOURCE_UPDATE_REQUIRED;
}

function canSkipSourceUpdate(_x) {
  return _canSkipSourceUpdate.apply(this, arguments);
}

function _canSkipSourceUpdate() {
  _canSkipSourceUpdate = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref3) {
    var source, prevDataRequest, nextMeta, timeAware, refreshTimerAware, extentAware, isFieldAware, isQueryAware, isGeoGridPrecisionAware, prevMeta, updateDueToTime, updateDueToRefreshTimer, updateDueToFields, updateDueToQuery, updateDueToFilters, updateDueToSourceQuery, updateDueToApplyGlobalQuery, updateDueToPrecisionChange, updateDueToExtentChange, updateDueToSourceMetaChange;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            source = _ref3.source, prevDataRequest = _ref3.prevDataRequest, nextMeta = _ref3.nextMeta;
            _context.next = 3;
            return source.isTimeAware();

          case 3:
            timeAware = _context.sent;
            _context.next = 6;
            return source.isRefreshTimerAware();

          case 6:
            refreshTimerAware = _context.sent;
            extentAware = source.isFilterByMapBounds();
            isFieldAware = source.isFieldAware();
            isQueryAware = source.isQueryAware();
            isGeoGridPrecisionAware = source.isGeoGridPrecisionAware();

            if (!(!timeAware && !refreshTimerAware && !extentAware && !isFieldAware && !isQueryAware && !isGeoGridPrecisionAware)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", !!prevDataRequest && prevDataRequest.hasDataOrRequestInProgress());

          case 13:
            if (prevDataRequest) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", false);

          case 15:
            prevMeta = prevDataRequest.getMeta();

            if (prevMeta) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", false);

          case 18:
            updateDueToTime = false;

            if (timeAware) {
              updateDueToTime = !_lodash.default.isEqual(prevMeta.timeFilters, nextMeta.timeFilters);
            }

            updateDueToRefreshTimer = false;

            if (refreshTimerAware && nextMeta.refreshTimerLastTriggeredAt) {
              updateDueToRefreshTimer = !_lodash.default.isEqual(prevMeta.refreshTimerLastTriggeredAt, nextMeta.refreshTimerLastTriggeredAt);
            }

            updateDueToFields = false;

            if (isFieldAware) {
              updateDueToFields = !_lodash.default.isEqual(prevMeta.fieldNames, nextMeta.fieldNames);
            }

            updateDueToQuery = false;
            updateDueToFilters = false;
            updateDueToSourceQuery = false;
            updateDueToApplyGlobalQuery = false;

            if (isQueryAware) {
              updateDueToApplyGlobalQuery = prevMeta.applyGlobalQuery !== nextMeta.applyGlobalQuery;
              updateDueToSourceQuery = !_lodash.default.isEqual(prevMeta.sourceQuery, nextMeta.sourceQuery);

              if (nextMeta.applyGlobalQuery) {
                updateDueToQuery = !_lodash.default.isEqual(prevMeta.query, nextMeta.query);
                updateDueToFilters = !_lodash.default.isEqual(prevMeta.filters, nextMeta.filters);
              } else {
                // Global filters and query are not applied to layer search request so no re-fetch required.
                // Exception is "Refresh" query.
                updateDueToQuery = (0, _is_refresh_only_query.isRefreshOnlyQuery)(prevMeta.query, nextMeta.query);
              }
            }

            updateDueToPrecisionChange = false;

            if (isGeoGridPrecisionAware) {
              updateDueToPrecisionChange = !_lodash.default.isEqual(prevMeta.geogridPrecision, nextMeta.geogridPrecision);
            }

            updateDueToExtentChange = updateDueToExtent(source, prevMeta, nextMeta);
            updateDueToSourceMetaChange = !_lodash.default.isEqual(prevMeta.sourceMeta, nextMeta.sourceMeta);
            return _context.abrupt("return", !updateDueToTime && !updateDueToRefreshTimer && !updateDueToExtentChange && !updateDueToFields && !updateDueToQuery && !updateDueToFilters && !updateDueToSourceQuery && !updateDueToApplyGlobalQuery && !updateDueToPrecisionChange && !updateDueToSourceMetaChange);

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _canSkipSourceUpdate.apply(this, arguments);
}

function canSkipStyleMetaUpdate(_ref) {
  var prevDataRequest = _ref.prevDataRequest,
      nextMeta = _ref.nextMeta;

  if (!prevDataRequest) {
    return false;
  }

  var prevMeta = prevDataRequest.getMeta();

  if (!prevMeta) {
    return false;
  }

  var updateDueToFields = !_lodash.default.isEqual(prevMeta.dynamicStyleFields, nextMeta.dynamicStyleFields);
  var updateDueToSourceQuery = !_lodash.default.isEqual(prevMeta.sourceQuery, nextMeta.sourceQuery);
  var updateDueToIsTimeAware = nextMeta.isTimeAware !== prevMeta.isTimeAware;
  var updateDueToTime = nextMeta.isTimeAware ? !_lodash.default.isEqual(prevMeta.timeFilters, nextMeta.timeFilters) : false;
  return !updateDueToFields && !updateDueToSourceQuery && !updateDueToIsTimeAware && !updateDueToTime;
}

function canSkipFormattersUpdate(_ref2) {
  var prevDataRequest = _ref2.prevDataRequest,
      nextMeta = _ref2.nextMeta;

  if (!prevDataRequest) {
    return false;
  }

  var prevMeta = prevDataRequest.getMeta();

  if (!prevMeta) {
    return false;
  }

  return _lodash.default.isEqual(prevMeta.fieldNames, nextMeta.fieldNames);
}