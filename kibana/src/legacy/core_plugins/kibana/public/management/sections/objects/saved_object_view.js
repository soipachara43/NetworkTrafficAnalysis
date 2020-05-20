"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectEdition = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _object_view = require("./components/object_view");

var _in_app_url = require("./lib/in_app_url");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var SavedObjectEdition =
/*#__PURE__*/
function (_Component) {
  _inherits(SavedObjectEdition, _Component);

  function SavedObjectEdition(props) {
    var _this;

    _classCallCheck(this, SavedObjectEdition);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SavedObjectEdition).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "saveChanges",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref2) {
        var attributes, references, _this$props, savedObjectsClient, notifications, _this$state, object, type;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                attributes = _ref2.attributes, references = _ref2.references;
                _this$props = _this.props, savedObjectsClient = _this$props.savedObjectsClient, notifications = _this$props.notifications;
                _this$state = _this.state, object = _this$state.object, type = _this$state.type;
                _context.next = 5;
                return savedObjectsClient.update(object.type, object.id, attributes, {
                  references: references
                });

              case 5:
                notifications.toasts.addSuccess("Updated '".concat(attributes.title, "' ").concat(type, " object"));

                _this.redirectToListing();

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    var serviceRegistry = props.serviceRegistry,
        serviceName = props.serviceName;
    var _type = serviceRegistry.get(serviceName).service.type;
    _this.state = {
      object: undefined,
      type: _type
    };
    return _this;
  }

  _createClass(SavedObjectEdition, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props2 = this.props,
          id = _this$props2.id,
          savedObjectsClient = _this$props2.savedObjectsClient;
      var type = this.state.type;
      savedObjectsClient.get(type, id).then(function (object) {
        _this2.setState({
          object: object
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props3 = this.props,
          capabilities = _this$props3.capabilities,
          notFoundType = _this$props3.notFoundType,
          serviceRegistry = _this$props3.serviceRegistry,
          id = _this$props3.id,
          serviceName = _this$props3.serviceName,
          savedObjectsClient = _this$props3.savedObjectsClient;
      var type = this.state.type;
      var object = this.state.object;
      var _ref3 = capabilities.savedObjectsManagement,
          canEdit = _ref3.edit,
          canDelete = _ref3.delete;
      var canView = (0, _in_app_url.canViewInApp)(capabilities, type);
      var service = serviceRegistry.get(serviceName).service;
      return _react.default.createElement(_eui.EuiPageContent, {
        horizontalPosition: "center",
        "data-test-subj": "savedObjectsEdit"
      }, _react.default.createElement(_object_view.Header, {
        canEdit: canEdit,
        canDelete: canDelete,
        canViewInApp: canView,
        type: type,
        onDeleteClick: function onDeleteClick() {
          return _this3.delete();
        },
        viewUrl: service.urlFor(id)
      }), notFoundType && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react.default.createElement(_object_view.NotFoundErrors, {
        type: notFoundType
      })), canEdit && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react.default.createElement(_object_view.Intro, null)), object && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react.default.createElement(_object_view.Form, {
        object: object,
        savedObjectsClient: savedObjectsClient,
        service: service,
        editionEnabled: canEdit,
        onSave: this.saveChanges
      })));
    }
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _object$attributes;

        var _this$props4, id, savedObjectsClient, overlays, notifications, _this$state2, type, object, confirmed;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props4 = this.props, id = _this$props4.id, savedObjectsClient = _this$props4.savedObjectsClient, overlays = _this$props4.overlays, notifications = _this$props4.notifications;
                _this$state2 = this.state, type = _this$state2.type, object = _this$state2.object;
                _context2.next = 4;
                return overlays.openConfirm(_i18n.i18n.translate('kbn.management.objects.confirmModalOptions.modalDescription', {
                  defaultMessage: 'This action permanently removes the object from Kibana.'
                }), {
                  confirmButtonText: _i18n.i18n.translate('kbn.management.objects.confirmModalOptions.deleteButtonLabel', {
                    defaultMessage: 'Delete'
                  }),
                  title: _i18n.i18n.translate('kbn.management.objects.confirmModalOptions.modalTitle', {
                    defaultMessage: "Delete '{title}'?",
                    values: {
                      title: (object === null || object === void 0 ? void 0 : (_object$attributes = object.attributes) === null || _object$attributes === void 0 ? void 0 : _object$attributes.title) || 'saved Kibana object'
                    }
                  }),
                  buttonColor: 'danger'
                });

              case 4:
                confirmed = _context2.sent;

                if (!confirmed) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 8;
                return savedObjectsClient.delete(type, id);

              case 8:
                notifications.toasts.addSuccess("Deleted '".concat(object.attributes.title, "' ").concat(type, " object"));
                this.redirectToListing();

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _delete() {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "redirectToListing",
    value: function redirectToListing() {
      window.location.hash = '/management/kibana/objects';
    }
  }]);

  return SavedObjectEdition;
}(_react.Component);

exports.SavedObjectEdition = SavedObjectEdition;