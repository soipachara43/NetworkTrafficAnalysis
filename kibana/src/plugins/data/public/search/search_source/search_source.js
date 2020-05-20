"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchSource = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _normalize_sort_request = require("./normalize_sort_request");

var _filter_docvalue_fields = require("./filter_docvalue_fields");

var _public = require("../../../../kibana_utils/public");

var _fetch2 = require("../fetch");

var _services = require("../../services");

var _common = require("../../../common");

var _field_formats = require("../../../common/field_formats");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SearchSource =
/*#__PURE__*/
function () {
  function SearchSource() {
    var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SearchSource);

    this.fields = fields;

    _defineProperty(this, "id", _lodash.default.uniqueId('data_source'));

    _defineProperty(this, "searchStrategyId", void 0);

    _defineProperty(this, "parent", void 0);

    _defineProperty(this, "requestStartHandlers", []);

    _defineProperty(this, "inheritOptions", {});

    _defineProperty(this, "history", []);
  }
  /** ***
   * PUBLIC API
   *****/


  _createClass(SearchSource, [{
    key: "setPreferredSearchStrategyId",
    value: function setPreferredSearchStrategyId(searchStrategyId) {
      this.searchStrategyId = searchStrategyId;
    }
  }, {
    key: "setFields",
    value: function setFields(newFields) {
      this.fields = newFields;
      return this;
    }
  }, {
    key: "setField",
    value: function setField(field, value) {
      if (value == null) {
        delete this.fields[field];
      } else {
        this.fields[field] = value;
      }

      return this;
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.id;
    }
  }, {
    key: "getFields",
    value: function getFields() {
      return _objectSpread({}, this.fields);
    }
    /**
     * Get fields from the fields
     */

  }, {
    key: "getField",
    value: function getField(field) {
      var recurse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!recurse || this.fields[field] !== void 0) {
        return this.fields[field];
      }

      var parent = this.getParent();
      return parent && parent.getField(field);
    }
    /**
     * Get the field from our own fields, don't traverse up the chain
     */

  }, {
    key: "getOwnField",
    value: function getOwnField(field) {
      return this.getField(field, false);
    }
  }, {
    key: "create",
    value: function create() {
      return new SearchSource();
    }
  }, {
    key: "createCopy",
    value: function createCopy() {
      var newSearchSource = new SearchSource();
      newSearchSource.setFields(_objectSpread({}, this.fields)); // when serializing the internal fields we lose the internal classes used in the index
      // pattern, so we have to set it again to workaround this behavior

      newSearchSource.setField('index', this.getField('index'));
      newSearchSource.setParent(this.getParent());
      return newSearchSource;
    }
  }, {
    key: "createChild",
    value: function createChild() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var childSearchSource = new SearchSource();
      childSearchSource.setParent(this, options);
      return childSearchSource;
    }
    /**
     * Set a searchSource that this source should inherit from
     * @param  {SearchSource} parent - the parent searchSource
     * @param  {SearchSourceOptions} options - the inherit options
     * @return {this} - chainable
     */

  }, {
    key: "setParent",
    value: function setParent(parent) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.parent = parent;
      this.inheritOptions = options;
      return this;
    }
    /**
     * Get the parent of this SearchSource
     * @return {undefined|searchSource}
     */

  }, {
    key: "getParent",
    value: function getParent() {
      return this.parent;
    }
    /**
     * Fetch this source and reject the returned Promise on error
     *
     * @async
     */

  }, {
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var options,
            searchRequest,
            esShardTimeout,
            response,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.requestIsStarting(options);

              case 3:
                _context.next = 5;
                return this.flatten();

              case 5:
                searchRequest = _context.sent;
                this.history = [searchRequest];
                esShardTimeout = (0, _services.getInjectedMetadata)().getInjectedVar('esShardTimeout');
                _context.next = 10;
                return (0, _fetch2.fetchSoon)(searchRequest, _objectSpread({}, this.searchStrategyId && {
                  searchStrategyId: this.searchStrategyId
                }, {}, options), {
                  searchService: (0, _services.getSearchService)(),
                  config: (0, _services.getUiSettings)(),
                  esShardTimeout: esShardTimeout
                });

              case 10:
                response = _context.sent;

                if (!response.error) {
                  _context.next = 13;
                  break;
                }

                throw new _fetch2.RequestFailure(null, response);

              case 13:
                return _context.abrupt("return", response);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetch() {
        return _fetch.apply(this, arguments);
      }

      return fetch;
    }()
    /**
     *  Add a handler that will be notified whenever requests start
     *  @param  {Function} handler
     *  @return {undefined}
     */

  }, {
    key: "onRequestStart",
    value: function onRequestStart(handler) {
      this.requestStartHandlers.push(handler);
    }
  }, {
    key: "getSearchRequestBody",
    value: function () {
      var _getSearchRequestBody = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var searchRequest;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.flatten();

              case 2:
                searchRequest = _context2.sent;
                return _context2.abrupt("return", searchRequest.body);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getSearchRequestBody() {
        return _getSearchRequestBody.apply(this, arguments);
      }

      return getSearchRequestBody;
    }()
    /**
     * Completely destroy the SearchSource.
     * @return {undefined}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.requestStartHandlers.length = 0;
    }
    /** ****
     * PRIVATE APIS
     ******/

    /**
     *  Called by requests of this search source when they are started
     *  @param  {Courier.Request} request
     *  @param options
     *  @return {Promise<undefined>}
     */

  }, {
    key: "requestIsStarting",
    value: function requestIsStarting() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var handlers = _toConsumableArray(this.requestStartHandlers); // If callParentStartHandlers has been set to true, we also call all
      // handlers of parent search sources.


      if (this.inheritOptions.callParentStartHandlers) {
        var _searchSource = this.getParent();

        while (_searchSource) {
          handlers.push.apply(handlers, _toConsumableArray(_searchSource.requestStartHandlers));
          _searchSource = _searchSource.getParent();
        }
      }

      return Promise.all(handlers.map(function (fn) {
        return fn(_this, options);
      }));
    }
    /**
     * Used to merge properties into the data within ._flatten().
     * The data is passed in and modified by the function
     *
     * @param  {object} data - the current merged data
     * @param  {*} val - the value at `key`
     * @param  {*} key - The key of `val`
     * @return {undefined}
     */

  }, {
    key: "mergeProp",
    value: function mergeProp(data, val, key) {
      val = typeof val === 'function' ? val(this) : val;
      if (val == null || !key) return;

      var addToRoot = function addToRoot(rootKey, value) {
        data[rootKey] = value;
      };
      /**
       * Add the key and val to the body of the request
       */


      var addToBody = function addToBody(bodyKey, value) {
        // ignore if we already have a value
        if (data.body[bodyKey] == null) {
          data.body[bodyKey] = value;
        }
      };

      switch (key) {
        case 'filter':
          return addToRoot('filters', (data.filters || []).concat(val));

        case 'query':
          return addToRoot(key, (data[key] || []).concat(val));

        case 'fields':
          var _fields = _lodash.default.uniq((data[key] || []).concat(val));

          return addToRoot(key, _fields);

        case 'index':
        case 'type':
        case 'highlightAll':
          return key && data[key] == null && addToRoot(key, val);

        case 'searchAfter':
          return addToBody('search_after', val);

        case 'source':
          return addToBody('_source', val);

        case 'sort':
          var sort = (0, _normalize_sort_request.normalizeSortRequest)(val, this.getField('index'), (0, _services.getUiSettings)().get('sort:options'));
          return addToBody(key, sort);

        default:
          return addToBody(key, val);
      }
    }
    /**
     * Walk the inheritance chain of a source and return its
     * flat representation (taking into account merging rules)
     * @returns {Promise}
     * @resolved {Object|null} - the flat data of the SearchSource
     */

  }, {
    key: "mergeProps",
    value: function mergeProps() {
      var _this2 = this;

      var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      var searchRequest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        body: {}
      };
      Object.entries(this.fields).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        _this2.mergeProp(searchRequest, value, key);
      });

      if (this.parent) {
        this.parent.mergeProps(root, searchRequest);
      }

      return searchRequest;
    }
  }, {
    key: "getIndexType",
    value: function getIndexType(index) {
      if (this.searchStrategyId) {
        return this.searchStrategyId === 'default' ? undefined : this.searchStrategyId;
      } else {
        return index === null || index === void 0 ? void 0 : index.type;
      }
    }
  }, {
    key: "flatten",
    value: function flatten() {
      var searchRequest = this.mergeProps();
      searchRequest.body = searchRequest.body || {};
      var body = searchRequest.body,
          index = searchRequest.index,
          fields = searchRequest.fields,
          query = searchRequest.query,
          filters = searchRequest.filters,
          highlightAll = searchRequest.highlightAll;
      searchRequest.indexType = this.getIndexType(index);
      var computedFields = index ? index.getComputedFields() : {};
      body.stored_fields = computedFields.storedFields;
      body.script_fields = body.script_fields || {};

      _lodash.default.extend(body.script_fields, computedFields.scriptFields);

      var defaultDocValueFields = computedFields.docvalueFields ? computedFields.docvalueFields : [];
      body.docvalue_fields = body.docvalue_fields || defaultDocValueFields;

      if (!body.hasOwnProperty('_source') && index) {
        body._source = index.getSourceFiltering();
      }

      if (body._source) {
        // exclude source fields for this index pattern specified by the user
        var filter = (0, _public.fieldWildcardFilter)(body._source.excludes, (0, _services.getUiSettings)().get('metaFields'));
        body.docvalue_fields = body.docvalue_fields.filter(function (docvalueField) {
          return filter(docvalueField.field);
        });
      } // if we only want to search for certain fields


      if (fields) {
        // filter out the docvalue_fields, and script_fields to only include those that we are concerned with
        body.docvalue_fields = (0, _filter_docvalue_fields.filterDocvalueFields)(body.docvalue_fields, fields);
        body.script_fields = _lodash.default.pick(body.script_fields, fields); // request the remaining fields from both stored_fields and _source

        var remainingFields = _lodash.default.difference(fields, _lodash.default.keys(body.script_fields));

        body.stored_fields = remainingFields;

        _lodash.default.set(body, '_source.includes', remainingFields);
      }

      var esQueryConfigs = (0, _common.getEsQueryConfig)((0, _services.getUiSettings)());
      body.query = (0, _common.buildEsQuery)(index, query, filters, esQueryConfigs);

      if (highlightAll && body.query) {
        body.highlight = (0, _field_formats.getHighlightRequest)(body.query, (0, _services.getUiSettings)().get('doc_table:highlight'));
        delete searchRequest.highlightAll;
      }

      var translateToQuery = function translateToQuery(filter) {
        return filter && (filter.query || filter);
      }; // re-write filters within filter aggregations


      (function recurse(aggBranch) {
        if (!aggBranch) return;
        Object.keys(aggBranch).forEach(function (id) {
          var agg = aggBranch[id];

          if (agg.filters) {
            // translate filters aggregations
            var aggFilters = agg.filters.filters;
            Object.keys(aggFilters).forEach(function (filterId) {
              aggFilters[filterId] = translateToQuery(aggFilters[filterId]);
            });
          }

          recurse(agg.aggs || agg.aggregations);
        });
      })(body.aggs || body.aggregations);

      return searchRequest;
    }
  }]);

  return SearchSource;
}();

exports.SearchSource = SearchSource;