"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSavedVisClass = createSavedVisClass;
exports.convertFromSerializedVis = exports.convertToSerializedVis = void 0;

var _public = require("../../../../../../../plugins/saved_objects/public");

var _vis_update_state = require("../legacy/vis_update_state");

var _saved_visualization_references = require("./saved_visualization_references");

var _public2 = require("../../../../../../../plugins/data/public");

var _public3 = require("../../../../../../../plugins/discover/public");

var _services = require("../services");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var convertToSerializedVis =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(savedVis) {
    var visState, searchSource, indexPattern, aggs;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            visState = savedVis.visState;
            _context.t0 = savedVis.searchSource;

            if (!_context.t0) {
              _context.next = 6;
              break;
            }

            _context.next = 5;
            return getSearchSource(savedVis.searchSource, savedVis.savedSearchId);

          case 5:
            _context.t0 = _context.sent;

          case 6:
            searchSource = _context.t0;
            indexPattern = searchSource && searchSource.getField('index') ? searchSource.getField('index').id : undefined;
            aggs = indexPattern ? visState.aggs || [] : visState.aggs;
            return _context.abrupt("return", {
              id: savedVis.id,
              title: savedVis.title,
              type: visState.type,
              description: savedVis.description,
              params: visState.params,
              uiState: JSON.parse(savedVis.uiStateJSON || '{}'),
              data: {
                indexPattern: indexPattern,
                aggs: aggs,
                searchSource: searchSource,
                savedSearchId: savedVis.savedSearchId
              }
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function convertToSerializedVis(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.convertToSerializedVis = convertToSerializedVis;

var convertFromSerializedVis = function convertFromSerializedVis(vis) {
  return {
    id: vis.id,
    title: vis.title,
    description: vis.description,
    visState: {
      type: vis.type,
      aggs: vis.data.aggs,
      params: vis.params
    },
    uiStateJSON: JSON.stringify(vis.uiState),
    searchSource: vis.data.searchSource,
    savedSearchId: vis.data.savedSearchId
  };
};

exports.convertFromSerializedVis = convertFromSerializedVis;

var getSearchSource =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(inputSearchSource, savedSearchId) {
    var searchSource, savedSearch;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            searchSource = inputSearchSource.createCopy ? inputSearchSource.createCopy() : new _public2.SearchSource(_objectSpread({}, inputSearchSource.fields));

            if (!savedSearchId) {
              _context2.next = 6;
              break;
            }

            _context2.next = 4;
            return (0, _public3.createSavedSearchesLoader)({
              savedObjectsClient: (0, _services.getSavedObjects)().client,
              indexPatterns: (0, _services.getIndexPatterns)(),
              chrome: (0, _services.getChrome)(),
              overlays: (0, _services.getOverlays)()
            }).get(savedSearchId);

          case 4:
            savedSearch = _context2.sent;
            searchSource.setParent(savedSearch.searchSource);

          case 6:
            searchSource.setField('size', 0);
            return _context2.abrupt("return", searchSource);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getSearchSource(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

function createSavedVisClass(services) {
  var SavedObjectClass = (0, _public.createSavedObjectClass)(services);

  var SavedVis =
  /*#__PURE__*/
  function (_SavedObjectClass) {
    _inherits(SavedVis, _SavedObjectClass);

    // Order these fields to the top, the rest are alphabetical
    function SavedVis() {
      var _this;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, SavedVis);

      if (_typeof(opts) !== 'object') {
        opts = {
          id: opts
        };
      }

      var visState = !opts.type ? null : {
        type: opts.type
      }; // Gives our SavedWorkspace the properties of a SavedObject

      _this = _possibleConstructorReturn(this, _getPrototypeOf(SavedVis).call(this, {
        type: SavedVis.type,
        mapping: SavedVis.mapping,
        searchSource: SavedVis.searchSource,
        extractReferences: _saved_visualization_references.extractReferences,
        injectReferences: _saved_visualization_references.injectReferences,
        id: opts.id || '',
        indexPattern: opts.indexPattern,
        defaults: {
          title: '',
          visState: visState,
          uiStateJSON: '{}',
          description: '',
          savedSearchId: opts.savedSearchId,
          version: 1
        },
        afterESResp: function () {
          var _afterESResp = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3(savedObject) {
            var savedVis;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    savedVis = savedObject;
                    _context3.next = 3;
                    return (0, _vis_update_state.updateOldState)(savedVis.visState);

                  case 3:
                    savedVis.visState = _context3.sent;

                    if (!(savedVis.savedSearchId && savedVis.searchSource)) {
                      _context3.next = 8;
                      break;
                    }

                    _context3.next = 7;
                    return getSearchSource(savedVis.searchSource, savedVis.savedSearchId);

                  case 7:
                    savedObject.searchSource = _context3.sent;

                  case 8:
                    return _context3.abrupt("return", savedVis);

                  case 9:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          function afterESResp(_x4) {
            return _afterESResp.apply(this, arguments);
          }

          return afterESResp;
        }()
      }));
      _this.showInRecentlyAccessed = true;

      _this.getFullPath = function () {
        return "/app/kibana#/visualize/edit/".concat(_this.id);
      };

      return _this;
    }

    return SavedVis;
  }(SavedObjectClass);

  _defineProperty(SavedVis, "type", 'visualization');

  _defineProperty(SavedVis, "mapping", {
    title: 'text',
    visState: 'json',
    uiStateJSON: 'text',
    description: 'text',
    savedSearchId: 'keyword',
    version: 'integer'
  });

  _defineProperty(SavedVis, "fieldOrder", ['title', 'description']);

  _defineProperty(SavedVis, "searchSource", true);

  return SavedVis;
}