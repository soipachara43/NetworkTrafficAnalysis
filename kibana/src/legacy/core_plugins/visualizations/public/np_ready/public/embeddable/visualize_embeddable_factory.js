"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualizeEmbeddableFactory = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../../plugins/embeddable/public");

var _disabled_lab_embeddable = require("./disabled_lab_embeddable");

var _visualize_embeddable = require("./visualize_embeddable");

var _types = require("../types");

var _constants = require("./constants");

var _services = require("../services");

var _wizard = require("../wizard");

var _saved_vis = require("../saved_visualizations/_saved_vis");

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

var VisualizeEmbeddableFactory =
/*#__PURE__*/
function (_EmbeddableFactory) {
  _inherits(VisualizeEmbeddableFactory, _EmbeddableFactory);

  function VisualizeEmbeddableFactory() {
    var _this;

    _classCallCheck(this, VisualizeEmbeddableFactory);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VisualizeEmbeddableFactory).call(this, {
      savedObjectMetaData: {
        name: _i18n.i18n.translate('visualizations.savedObjectName', {
          defaultMessage: 'Visualization'
        }),
        includeFields: ['visState'],
        type: 'visualization',
        getIconForSavedObject: function getIconForSavedObject(savedObject) {
          return (0, _services.getTypes)().get(JSON.parse(savedObject.attributes.visState).type).icon || 'visualizeApp';
        },
        getTooltipForSavedObject: function getTooltipForSavedObject(savedObject) {
          return "".concat(savedObject.attributes.title, " (").concat((0, _services.getTypes)().get(JSON.parse(savedObject.attributes.visState).type).title, ")");
        },
        showSavedObject: function showSavedObject(savedObject) {
          var typeName = JSON.parse(savedObject.attributes.visState).type;
          var visType = (0, _services.getTypes)().get(typeName);

          if (!visType) {
            return false;
          }

          if ((0, _services.getUISettings)().get('visualize:enableLabs')) {
            return true;
          }

          return visType.stage !== 'experimental';
        }
      }
    }));

    _defineProperty(_assertThisInitialized(_this), "type", _constants.VISUALIZE_EMBEDDABLE_TYPE);

    return _this;
  }

  _createClass(VisualizeEmbeddableFactory, [{
    key: "isEditable",
    value: function () {
      var _isEditable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", (0, _services.getCapabilities)().visualize.save);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function isEditable() {
        return _isEditable.apply(this, arguments);
      }

      return isEditable;
    }()
  }, {
    key: "getDisplayName",
    value: function getDisplayName() {
      return _i18n.i18n.translate('visualizations.displayName', {
        defaultMessage: 'visualization'
      });
    }
  }, {
    key: "createFromObject",
    value: function () {
      var _createFromObject = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(vis, input, parent) {
        var savedVisualizations, visId, editUrl, isLabsEnabled, indexPattern, indexPatterns, editable;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                savedVisualizations = (0, _services.getSavedVisualizationsLoader)();
                _context2.prev = 1;
                visId = vis.id;
                editUrl = visId ? (0, _services.getHttp)().basePath.prepend("/app/kibana".concat(savedVisualizations.urlFor(visId))) : '';
                isLabsEnabled = (0, _services.getUISettings)().get('visualize:enableLabs');

                if (!(!isLabsEnabled && vis.type.stage === 'experimental')) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", new _disabled_lab_embeddable.DisabledLabEmbeddable(vis.title, input));

              case 7:
                indexPattern = vis.data.indexPattern;
                indexPatterns = indexPattern ? [indexPattern] : [];
                _context2.next = 11;
                return this.isEditable();

              case 11:
                editable = _context2.sent;
                return _context2.abrupt("return", new _visualize_embeddable.VisualizeEmbeddable((0, _services.getTimeFilter)(), {
                  vis: vis,
                  indexPatterns: indexPatterns,
                  editUrl: editUrl,
                  editable: editable,
                  appState: input.appState,
                  uiState: input.uiState
                }, input, parent));

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](1);
                console.error(_context2.t0); // eslint-disable-line no-console

                return _context2.abrupt("return", new _public.ErrorEmbeddable(_context2.t0, input, parent));

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 15]]);
      }));

      function createFromObject(_x, _x2, _x3) {
        return _createFromObject.apply(this, arguments);
      }

      return createFromObject;
    }()
  }, {
    key: "createFromSavedObject",
    value: function () {
      var _createFromSavedObject = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(savedObjectId, input, parent) {
        var savedVisualizations, savedObject, vis;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                savedVisualizations = (0, _services.getSavedVisualizationsLoader)();
                _context3.prev = 1;
                _context3.next = 4;
                return savedVisualizations.get(savedObjectId);

              case 4:
                savedObject = _context3.sent;
                _context3.t0 = _types.Vis;
                _context3.t1 = savedObject.visState.type;
                _context3.next = 9;
                return (0, _saved_vis.convertToSerializedVis)(savedObject);

              case 9:
                _context3.t2 = _context3.sent;
                vis = new _context3.t0(_context3.t1, _context3.t2);
                return _context3.abrupt("return", this.createFromObject(vis, input, parent));

              case 14:
                _context3.prev = 14;
                _context3.t3 = _context3["catch"](1);
                console.error(_context3.t3); // eslint-disable-line no-console

                return _context3.abrupt("return", new _public.ErrorEmbeddable(_context3.t3, input, parent));

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 14]]);
      }));

      function createFromSavedObject(_x4, _x5, _x6) {
        return _createFromSavedObject.apply(this, arguments);
      }

      return createFromSavedObject;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // TODO: This is a bit of a hack to preserve the original functionality. Ideally we will clean this up
                // to allow for in place creation of visualizations without having to navigate away to a new URL.
                (0, _wizard.showNewVisModal)({
                  editorParams: ['addToDashboard']
                });
                return _context4.abrupt("return", undefined);

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return VisualizeEmbeddableFactory;
}(_public.EmbeddableFactory);

exports.VisualizeEmbeddableFactory = VisualizeEmbeddableFactory;