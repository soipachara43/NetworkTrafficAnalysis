"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmbeddableFactory = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../../src/legacy/core_plugins/embeddable_api/public/np_ready/public");

var _embeddable = require("./embeddable");

var _persistence = require("../../persistence");

var _common = require("../../../../../../plugins/lens/common");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EmbeddableFactory =
/*#__PURE__*/
function (_AbstractEmbeddableFa) {
  _inherits(EmbeddableFactory, _AbstractEmbeddableFa);

  function EmbeddableFactory(getStartServices) {
    var _this;

    _classCallCheck(this, EmbeddableFactory);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EmbeddableFactory).call(this, {
      savedObjectMetaData: {
        name: _i18n.i18n.translate('xpack.lens.lensSavedObjectLabel', {
          defaultMessage: 'Lens Visualization'
        }),
        type: _persistence.DOC_TYPE,
        getIconForSavedObject: function getIconForSavedObject() {
          return 'lensApp';
        }
      }
    }));
    _this.getStartServices = getStartServices;

    _defineProperty(_assertThisInitialized(_this), "type", _persistence.DOC_TYPE);

    return _this;
  }

  _createClass(EmbeddableFactory, [{
    key: "isEditable",
    value: function () {
      var _isEditable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref, capabilities;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getStartServices();

              case 2:
                _ref = _context.sent;
                capabilities = _ref.capabilities;
                return _context.abrupt("return", capabilities.visualize.save);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function isEditable() {
        return _isEditable.apply(this, arguments);
      }

      return isEditable;
    }()
  }, {
    key: "canCreateNew",
    value: function canCreateNew() {
      return false;
    }
  }, {
    key: "getDisplayName",
    value: function getDisplayName() {
      return _i18n.i18n.translate('xpack.lens.embeddableDisplayName', {
        defaultMessage: 'lens'
      });
    }
  }, {
    key: "createFromSavedObject",
    value: function () {
      var _createFromSavedObject = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(savedObjectId, input, parent) {
        var _ref2, savedObjectsClient, coreHttp, indexPatternService, timefilter, expressionRenderer, store, savedVis, promises, indexPatterns;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.getStartServices();

              case 2:
                _ref2 = _context3.sent;
                savedObjectsClient = _ref2.savedObjectsClient;
                coreHttp = _ref2.coreHttp;
                indexPatternService = _ref2.indexPatternService;
                timefilter = _ref2.timefilter;
                expressionRenderer = _ref2.expressionRenderer;
                store = new _persistence.SavedObjectIndexStore(savedObjectsClient);
                _context3.next = 11;
                return store.load(savedObjectId);

              case 11:
                savedVis = _context3.sent;
                promises = savedVis.state.datasourceMetaData.filterableIndexPatterns.map(
                /*#__PURE__*/
                function () {
                  var _ref3 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2(_ref4) {
                    var id;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            id = _ref4.id;
                            _context2.prev = 1;
                            _context2.next = 4;
                            return indexPatternService.get(id);

                          case 4:
                            return _context2.abrupt("return", _context2.sent);

                          case 7:
                            _context2.prev = 7;
                            _context2.t0 = _context2["catch"](1);
                            return _context2.abrupt("return", null);

                          case 10:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, null, [[1, 7]]);
                  }));

                  return function (_x4) {
                    return _ref3.apply(this, arguments);
                  };
                }());
                _context3.next = 15;
                return Promise.all(promises);

              case 15:
                _context3.t0 = function (indexPattern) {
                  return Boolean(indexPattern);
                };

                indexPatterns = _context3.sent.filter(_context3.t0);
                _context3.t1 = _embeddable.Embeddable;
                _context3.t2 = timefilter;
                _context3.t3 = expressionRenderer;
                _context3.t4 = savedVis;
                _context3.t5 = coreHttp.basePath.prepend((0, _common.getEditPath)(savedObjectId));
                _context3.next = 24;
                return this.isEditable();

              case 24:
                _context3.t6 = _context3.sent;
                _context3.t7 = indexPatterns;
                _context3.t8 = {
                  savedVis: _context3.t4,
                  editUrl: _context3.t5,
                  editable: _context3.t6,
                  indexPatterns: _context3.t7
                };
                _context3.t9 = input;
                _context3.t10 = parent;
                return _context3.abrupt("return", new _context3.t1(_context3.t2, _context3.t3, _context3.t8, _context3.t9, _context3.t10));

              case 30:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createFromSavedObject(_x, _x2, _x3) {
        return _createFromSavedObject.apply(this, arguments);
      }

      return createFromSavedObject;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(input) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", new _public.ErrorEmbeddable('Lens can only be created from a saved object', input));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function create(_x5) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return EmbeddableFactory;
}(_public.EmbeddableFactory);

exports.EmbeddableFactory = EmbeddableFactory;