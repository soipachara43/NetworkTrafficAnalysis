"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = App;
exports.getAllIndexPatterns = getAllIndexPatterns;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _new_platform = require("ui/new_platform");

var _public = require("../../../../../../src/plugins/kibana_react/public");

var _public2 = require("../../../../../../src/plugins/saved_objects/public");

var _native_renderer = require("../native_renderer");

var _lens_ui_telemetry = require("../lens_ui_telemetry");

var _public3 = require("../../../../../../src/plugins/data/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function App(_ref) {
  var editorFrame = _ref.editorFrame,
      data = _ref.data,
      core = _ref.core,
      storage = _ref.storage,
      docId = _ref.docId,
      docStorage = _ref.docStorage,
      redirectTo = _ref.redirectTo,
      addToDashboardMode = _ref.addToDashboardMode;
  var language = storage.get('kibana.userQueryLanguage') || core.uiSettings.get('search:queryLanguage');

  var _useState = (0, _react.useState)(function () {
    var currentRange = data.query.timefilter.timefilter.getTime();
    return {
      isLoading: !!docId,
      isSaveModalVisible: false,
      indexPatternsForTopNav: [],
      query: {
        query: '',
        language: language
      },
      dateRange: {
        fromDate: currentRange.from,
        toDate: currentRange.to
      },
      filters: []
    };
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var lastKnownDoc = state.lastKnownDoc;
  (0, _react.useEffect)(function () {
    // Clear app-specific filters when navigating to Lens. Necessary because Lens
    // can be loaded without a full page refresh
    data.query.filterManager.setAppFilters([]);
    var filterSubscription = data.query.filterManager.getUpdates$().subscribe({
      next: function next() {
        setState(function (s) {
          return _objectSpread({}, s, {
            filters: data.query.filterManager.getFilters()
          });
        });
        (0, _lens_ui_telemetry.trackUiEvent)('app_filters_updated');
      }
    });
    var timeSubscription = data.query.timefilter.timefilter.getTimeUpdate$().subscribe({
      next: function next() {
        var currentRange = data.query.timefilter.timefilter.getTime();
        setState(function (s) {
          return _objectSpread({}, s, {
            dateRange: {
              fromDate: currentRange.from,
              toDate: currentRange.to
            }
          });
        });
      }
    });
    return function () {
      filterSubscription.unsubscribe();
      timeSubscription.unsubscribe();
    };
  }, []); // Sync Kibana breadcrumbs any time the saved document's title changes

  (0, _react.useEffect)(function () {
    core.chrome.setBreadcrumbs([{
      href: core.http.basePath.prepend("/app/kibana#/visualize"),
      text: _i18n.i18n.translate('xpack.lens.breadcrumbsTitle', {
        defaultMessage: 'Visualize'
      })
    }, {
      text: state.persistedDoc ? state.persistedDoc.title : _i18n.i18n.translate('xpack.lens.breadcrumbsCreate', {
        defaultMessage: 'Create'
      })
    }]);
  }, [state.persistedDoc && state.persistedDoc.title]);
  (0, _react.useEffect)(function () {
    if (docId && (!state.persistedDoc || state.persistedDoc.id !== docId)) {
      setState(function (s) {
        return _objectSpread({}, s, {
          isLoading: true
        });
      });
      docStorage.load(docId).then(function (doc) {
        getAllIndexPatterns(doc.state.datasourceMetaData.filterableIndexPatterns, data.indexPatterns, core.notifications).then(function (indexPatterns) {
          // Don't overwrite any pinned filters
          data.query.filterManager.setAppFilters(doc.state.filters);
          setState(function (s) {
            return _objectSpread({}, s, {
              isLoading: false,
              persistedDoc: doc,
              lastKnownDoc: doc,
              query: doc.state.query,
              indexPatternsForTopNav: indexPatterns
            });
          });
        }).catch(function () {
          setState(function (s) {
            return _objectSpread({}, s, {
              isLoading: false
            });
          });
          redirectTo();
        });
      }).catch(function () {
        setState(function (s) {
          return _objectSpread({}, s, {
            isLoading: false
          });
        });
        core.notifications.toasts.addDanger(_i18n.i18n.translate('xpack.lens.app.docLoadingError', {
          defaultMessage: 'Error loading saved document'
        }));
        redirectTo();
      });
    }
  }, [docId]);
  var isSaveable = lastKnownDoc && lastKnownDoc.expression && lastKnownDoc.expression.length > 0 && core.application.capabilities.visualize.save;
  var onError = (0, _react.useCallback)(function (e) {
    return core.notifications.toasts.addDanger({
      title: e.message
    });
  }, []);
  var TopNavMenu = _new_platform.npStart.plugins.navigation.ui.TopNavMenu;
  var confirmButton = addToDashboardMode ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.lens.app.saveAddToDashboard",
    defaultMessage: "Save and add to dashboard"
  }) : null;
  return _react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_public.KibanaContextProvider, {
    services: _objectSpread({
      appName: 'lens',
      data: data,
      storage: storage
    }, core)
  }, _react.default.createElement("div", {
    className: "lnsApp"
  }, _react.default.createElement("div", {
    className: "lnsApp__header"
  }, _react.default.createElement(TopNavMenu, {
    config: [{
      label: _i18n.i18n.translate('xpack.lens.app.save', {
        defaultMessage: 'Save'
      }),
      run: function run() {
        if (isSaveable && lastKnownDoc) {
          setState(function (s) {
            return _objectSpread({}, s, {
              isSaveModalVisible: true
            });
          });
        }
      },
      testId: 'lnsApp_saveButton',
      disableButton: !isSaveable
    }],
    "data-test-subj": "lnsApp_topNav",
    screenTitle: 'lens',
    onQuerySubmit: function onQuerySubmit(payload) {
      var dateRange = payload.dateRange,
          query = payload.query;

      if (dateRange.from !== state.dateRange.fromDate || dateRange.to !== state.dateRange.toDate) {
        data.query.timefilter.timefilter.setTime(dateRange);
        (0, _lens_ui_telemetry.trackUiEvent)('app_date_change');
      } else {
        (0, _lens_ui_telemetry.trackUiEvent)('app_query_change');
      }

      setState(function (s) {
        return _objectSpread({}, s, {
          dateRange: {
            fromDate: dateRange.from,
            toDate: dateRange.to
          },
          query: query || s.query
        });
      });
    },
    appName: 'lens',
    indexPatterns: state.indexPatternsForTopNav,
    showSearchBar: true,
    showDatePicker: true,
    showQueryBar: true,
    showFilterBar: true,
    showSaveQuery: core.application.capabilities.visualize.saveQuery,
    savedQuery: state.savedQuery,
    onSaved: function onSaved(savedQuery) {
      setState(function (s) {
        return _objectSpread({}, s, {
          savedQuery: savedQuery
        });
      });
    },
    onSavedQueryUpdated: function onSavedQueryUpdated(savedQuery) {
      var savedQueryFilters = savedQuery.attributes.filters || [];
      var globalFilters = data.query.filterManager.getGlobalFilters();
      data.query.filterManager.setFilters([].concat(_toConsumableArray(globalFilters), _toConsumableArray(savedQueryFilters)));
      setState(function (s) {
        return _objectSpread({}, s, {
          savedQuery: _objectSpread({}, savedQuery),
          // Shallow query for reference issues
          dateRange: savedQuery.attributes.timefilter ? {
            fromDate: savedQuery.attributes.timefilter.from,
            toDate: savedQuery.attributes.timefilter.to
          } : s.dateRange
        });
      });
    },
    onClearSavedQuery: function onClearSavedQuery() {
      data.query.filterManager.setFilters(data.query.filterManager.getGlobalFilters());
      setState(function (s) {
        return _objectSpread({}, s, {
          savedQuery: undefined,
          filters: data.query.filterManager.getGlobalFilters(),
          query: {
            query: '',
            language: storage.get('kibana.userQueryLanguage') || core.uiSettings.get('search:queryLanguage')
          }
        });
      });
    },
    query: state.query,
    dateRangeFrom: state.dateRange.fromDate,
    dateRangeTo: state.dateRange.toDate
  })), (!state.isLoading || state.persistedDoc) && _react.default.createElement(_native_renderer.NativeRenderer, {
    className: "lnsApp__frame",
    render: editorFrame.mount,
    nativeProps: {
      dateRange: state.dateRange,
      query: state.query,
      filters: state.filters,
      savedQuery: state.savedQuery,
      doc: state.persistedDoc,
      onError: onError,
      onChange: function onChange(_ref2) {
        var filterableIndexPatterns = _ref2.filterableIndexPatterns,
            doc = _ref2.doc;

        if (!_lodash.default.isEqual(state.persistedDoc, doc)) {
          setState(function (s) {
            return _objectSpread({}, s, {
              lastKnownDoc: doc
            });
          });
        } // Update the cached index patterns if the user made a change to any of them


        if (state.indexPatternsForTopNav.length !== filterableIndexPatterns.length || filterableIndexPatterns.find(function (_ref3) {
          var id = _ref3.id;
          return !state.indexPatternsForTopNav.find(function (indexPattern) {
            return indexPattern.id === id;
          });
        })) {
          getAllIndexPatterns(filterableIndexPatterns, data.indexPatterns, core.notifications).then(function (indexPatterns) {
            if (indexPatterns) {
              setState(function (s) {
                return _objectSpread({}, s, {
                  indexPatternsForTopNav: indexPatterns
                });
              });
            }
          });
        }
      }
    }
  })), lastKnownDoc && state.isSaveModalVisible && _react.default.createElement(_public2.SavedObjectSaveModal, {
    onSave: function onSave(props) {
      var _lastKnownDoc$state;

      var _$partition = _lodash.default.partition((_lastKnownDoc$state = lastKnownDoc.state) === null || _lastKnownDoc$state === void 0 ? void 0 : _lastKnownDoc$state.filters, _public3.esFilters.isFilterPinned),
          _$partition2 = _slicedToArray(_$partition, 2),
          pinnedFilters = _$partition2[0],
          appFilters = _$partition2[1];

      var lastDocWithoutPinned = (pinnedFilters === null || pinnedFilters === void 0 ? void 0 : pinnedFilters.length) ? _objectSpread({}, lastKnownDoc, {
        state: _objectSpread({}, lastKnownDoc.state, {
          filters: appFilters
        })
      }) : lastKnownDoc;

      var doc = _objectSpread({}, lastDocWithoutPinned, {
        id: props.newCopyOnSave ? undefined : lastKnownDoc.id,
        title: props.newTitle
      });

      docStorage.save(doc).then(function (_ref4) {
        var id = _ref4.id;

        // Prevents unnecessary network request and disables save button
        var newDoc = _objectSpread({}, doc, {
          id: id
        });

        setState(function (s) {
          return _objectSpread({}, s, {
            isSaveModalVisible: false,
            persistedDoc: newDoc,
            lastKnownDoc: newDoc
          });
        });

        if (docId !== id) {
          redirectTo(id);
        }
      }).catch(function (e) {
        // eslint-disable-next-line no-console
        console.dir(e);
        (0, _lens_ui_telemetry.trackUiEvent)('save_failed');
        core.notifications.toasts.addDanger(_i18n.i18n.translate('xpack.lens.app.docSavingError', {
          defaultMessage: 'Error saving document'
        }));
        setState(function (s) {
          return _objectSpread({}, s, {
            isSaveModalVisible: false
          });
        });
      });
    },
    onClose: function onClose() {
      return setState(function (s) {
        return _objectSpread({}, s, {
          isSaveModalVisible: false
        });
      });
    },
    title: lastKnownDoc.title || '',
    showCopyOnSave: !addToDashboardMode,
    objectType: _i18n.i18n.translate('xpack.lens.app.saveModalType', {
      defaultMessage: 'Lens visualization'
    }),
    showDescription: false,
    confirmButtonLabel: confirmButton
  })));
}

function getAllIndexPatterns(_x, _x2, _x3) {
  return _getAllIndexPatterns.apply(this, arguments);
}

function _getAllIndexPatterns() {
  _getAllIndexPatterns = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(ids, indexPatternsService, notifications) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Promise.all(ids.map(function (_ref5) {
              var id = _ref5.id;
              return indexPatternsService.get(id);
            }));

          case 3:
            return _context.abrupt("return", _context.sent);

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            notifications.toasts.addDanger(_i18n.i18n.translate('xpack.lens.app.indexPatternLoadingError', {
              defaultMessage: 'Error loading index patterns'
            }));
            throw new Error(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));
  return _getAllIndexPatterns.apply(this, arguments);
}