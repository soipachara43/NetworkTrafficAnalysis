"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterManager = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _rxjs = require("rxjs");

var _sort_filters = require("./lib/sort_filters");

var _map_and_flatten_filters = require("./lib/map_and_flatten_filters");

var _only_disabled = require("./lib/only_disabled");

var _common = require("../../../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FilterManager =
/*#__PURE__*/
function () {
  function FilterManager(uiSettings) {
    _classCallCheck(this, FilterManager);

    _defineProperty(this, "filters", []);

    _defineProperty(this, "updated$", new _rxjs.Subject());

    _defineProperty(this, "fetch$", new _rxjs.Subject());

    _defineProperty(this, "uiSettings", void 0);

    this.uiSettings = uiSettings;
  }

  _createClass(FilterManager, [{
    key: "mergeIncomingFilters",
    value: function mergeIncomingFilters(partitionedFilters) {
      var globalFilters = partitionedFilters.globalFilters;
      var appFilters = partitionedFilters.appFilters; // existing globalFilters should be mutated by appFilters
      // ignore original appFilters which are already inside globalFilters

      var cleanedAppFilters = [];

      _lodash.default.each(appFilters, function (filter, i) {
        var match = _lodash.default.find(globalFilters, function (globalFilter) {
          return (0, _common.compareFilters)(globalFilter, filter);
        }); // no match, do continue with app filter


        if (!match) {
          return cleanedAppFilters.push(filter);
        } // matching filter in globalState, update global and don't add from appState


        _lodash.default.assign(match.meta, filter.meta);
      });

      return FilterManager.mergeFilters(cleanedAppFilters, globalFilters);
    }
  }, {
    key: "handleStateUpdate",
    value: function handleStateUpdate(newFilters) {
      newFilters.sort(_sort_filters.sortFilters);
      var filtersUpdated = !(0, _common.compareFilters)(this.filters, newFilters, _common.COMPARE_ALL_OPTIONS);
      var updatedOnlyDisabledFilters = (0, _only_disabled.onlyDisabledFiltersChanged)(newFilters, this.filters);
      this.filters = newFilters;

      if (filtersUpdated) {
        this.updated$.next();

        if (!updatedOnlyDisabledFilters) {
          this.fetch$.next();
        }
      }
    }
    /* Getters */

  }, {
    key: "getFilters",
    value: function getFilters() {
      return _lodash.default.cloneDeep(this.filters);
    }
  }, {
    key: "getAppFilters",
    value: function getAppFilters() {
      var _this$getPartitionedF = this.getPartitionedFilters(),
          appFilters = _this$getPartitionedF.appFilters;

      return appFilters;
    }
  }, {
    key: "getGlobalFilters",
    value: function getGlobalFilters() {
      var _this$getPartitionedF2 = this.getPartitionedFilters(),
          globalFilters = _this$getPartitionedF2.globalFilters;

      return globalFilters;
    }
  }, {
    key: "getPartitionedFilters",
    value: function getPartitionedFilters() {
      return FilterManager.partitionFilters(this.getFilters());
    }
  }, {
    key: "getUpdates$",
    value: function getUpdates$() {
      return this.updated$.asObservable();
    }
  }, {
    key: "getFetches$",
    value: function getFetches$() {
      return this.fetch$.asObservable();
    }
    /* Setters */

  }, {
    key: "addFilters",
    value: function addFilters(filters) {
      var _currentFilters$appFi, _currentFilters$globa;

      var pinFilterStatus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.uiSettings.get('filters:pinnedByDefault');

      if (!Array.isArray(filters)) {
        filters = [filters];
      }

      if (filters.length === 0) {
        return;
      }

      var store = pinFilterStatus ? _common.FilterStateStore.GLOBAL_STATE : _common.FilterStateStore.APP_STATE;
      FilterManager.setFiltersStore(filters, store);
      var mappedFilters = (0, _map_and_flatten_filters.mapAndFlattenFilters)(filters); // This is where we add new filters to the correct place (app \ global)

      var newPartitionedFilters = FilterManager.partitionFilters(mappedFilters);
      var currentFilters = this.getPartitionedFilters();

      (_currentFilters$appFi = currentFilters.appFilters).push.apply(_currentFilters$appFi, _toConsumableArray(newPartitionedFilters.appFilters));

      (_currentFilters$globa = currentFilters.globalFilters).push.apply(_currentFilters$globa, _toConsumableArray(newPartitionedFilters.globalFilters));

      var newFilters = this.mergeIncomingFilters(currentFilters);
      this.handleStateUpdate(newFilters);
    }
  }, {
    key: "setFilters",
    value: function setFilters(newFilters) {
      var pinFilterStatus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.uiSettings.get('filters:pinnedByDefault');
      var store = pinFilterStatus ? _common.FilterStateStore.GLOBAL_STATE : _common.FilterStateStore.APP_STATE;
      FilterManager.setFiltersStore(newFilters, store);
      var mappedFilters = (0, _map_and_flatten_filters.mapAndFlattenFilters)(newFilters);
      var newPartitionedFilters = FilterManager.partitionFilters(mappedFilters);
      var mergedFilters = this.mergeIncomingFilters(newPartitionedFilters);
      this.handleStateUpdate(mergedFilters);
    }
    /**
     * Sets new global filters and leaves app filters untouched,
     * Removes app filters for which there is a duplicate within new global filters
     * @param newGlobalFilters
     */

  }, {
    key: "setGlobalFilters",
    value: function setGlobalFilters(newGlobalFilters) {
      newGlobalFilters = (0, _map_and_flatten_filters.mapAndFlattenFilters)(newGlobalFilters);
      FilterManager.setFiltersStore(newGlobalFilters, _common.FilterStateStore.GLOBAL_STATE, true);

      var _this$getPartitionedF3 = this.getPartitionedFilters(),
          appFilters = _this$getPartitionedF3.appFilters;

      var newFilters = this.mergeIncomingFilters({
        appFilters: appFilters,
        globalFilters: newGlobalFilters
      });
      this.handleStateUpdate(newFilters);
    }
    /**
     * Sets new app filters and leaves global filters untouched,
     * Removes app filters for which there is a duplicate within new global filters
     * @param newAppFilters
     */

  }, {
    key: "setAppFilters",
    value: function setAppFilters(newAppFilters) {
      newAppFilters = (0, _map_and_flatten_filters.mapAndFlattenFilters)(newAppFilters);
      FilterManager.setFiltersStore(newAppFilters, _common.FilterStateStore.APP_STATE, true);

      var _this$getPartitionedF4 = this.getPartitionedFilters(),
          globalFilters = _this$getPartitionedF4.globalFilters;

      var newFilters = this.mergeIncomingFilters({
        globalFilters: globalFilters,
        appFilters: newAppFilters
      });
      this.handleStateUpdate(newFilters);
    }
  }, {
    key: "removeFilter",
    value: function removeFilter(filter) {
      var filterIndex = _lodash.default.findIndex(this.filters, function (item) {
        return _lodash.default.isEqual(item.meta, filter.meta) && _lodash.default.isEqual(item.query, filter.query);
      });

      if (filterIndex >= 0) {
        var newFilters = _lodash.default.cloneDeep(this.filters);

        newFilters.splice(filterIndex, 1);
        this.handleStateUpdate(newFilters);
      }
    }
  }, {
    key: "removeAll",
    value: function removeAll() {
      this.setFilters([]);
    }
  }], [{
    key: "mergeFilters",
    value: function mergeFilters(appFilters, globalFilters) {
      return (0, _common.uniqFilters)(appFilters.reverse().concat(globalFilters.reverse())).reverse();
    }
  }, {
    key: "partitionFilters",
    value: function partitionFilters(filters) {
      var _$partition = _lodash.default.partition(filters, _common.isFilterPinned),
          _$partition2 = _slicedToArray(_$partition, 2),
          globalFilters = _$partition2[0],
          appFilters = _$partition2[1];

      return {
        globalFilters: globalFilters,
        appFilters: appFilters
      };
    }
  }, {
    key: "setFiltersStore",
    value: function setFiltersStore(filters, store) {
      var shouldOverrideStore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      _lodash.default.map(filters, function (filter) {
        // Override status only for filters that didn't have state in the first place.
        // or if shouldOverrideStore is explicitly true
        if (shouldOverrideStore || filter.$state === undefined) {
          filter.$state = {
            store: store
          };
        }
      });
    }
  }]);

  return FilterManager;
}();

exports.FilterManager = FilterManager;