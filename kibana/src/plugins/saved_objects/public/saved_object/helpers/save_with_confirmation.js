"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveWithConfirmation = saveWithConfirmation;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _constants = require("../../constants");

var _confirm_modal_promise = require("./confirm_modal_promise");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Attempts to create the current object using the serialized source. If an object already
 * exists, a warning message requests an overwrite confirmation.
 * @param source - serialized version of this object what will be indexed into elasticsearch.
 * @param savedObject - a simple object that contains properties title and displayName, and getEsType method
 * @param options - options to pass to the saved object create method
 * @param services - provides Kibana services savedObjectsClient and overlays
 * @returns {Promise} - A promise that is resolved with the objects id if the object is
 * successfully indexed. If the overwrite confirmation was rejected, an error is thrown with
 * a confirmRejected = true parameter so that case can be handled differently than
 * a create or index error.
 * @resolved {SavedObject}
 */
function saveWithConfirmation(_x, _x2, _x3, _x4) {
  return _saveWithConfirmation.apply(this, arguments);
}

function _saveWithConfirmation() {
  _saveWithConfirmation = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(source, savedObject, options, services) {
    var savedObjectsClient, overlays, confirmMessage, title, confirmButtonText;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            savedObjectsClient = services.savedObjectsClient, overlays = services.overlays;
            _context.prev = 1;
            _context.next = 4;
            return savedObjectsClient.create(savedObject.getEsType(), source, options);

          case 4:
            return _context.abrupt("return", _context.sent);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);

            if (!((0, _lodash.get)(_context.t0, 'res.status') === 409)) {
              _context.next = 14;
              break;
            }

            confirmMessage = _i18n.i18n.translate('savedObjects.confirmModal.overwriteConfirmationMessage', {
              defaultMessage: 'Are you sure you want to overwrite {title}?',
              values: {
                title: savedObject.title
              }
            });
            title = _i18n.i18n.translate('savedObjects.confirmModal.overwriteTitle', {
              defaultMessage: 'Overwrite {name}?',
              values: {
                name: savedObject.displayName
              }
            });
            confirmButtonText = _i18n.i18n.translate('savedObjects.confirmModal.overwriteButtonLabel', {
              defaultMessage: 'Overwrite'
            });
            return _context.abrupt("return", (0, _confirm_modal_promise.confirmModalPromise)(confirmMessage, title, confirmButtonText, overlays).then(function () {
              return savedObjectsClient.create(savedObject.getEsType(), source, _objectSpread({
                overwrite: true
              }, options));
            }).catch(function () {
              return Promise.reject(new Error(_constants.OVERWRITE_REJECTED));
            }));

          case 14:
            _context.next = 16;
            return Promise.reject(_context.t0);

          case 16:
            return _context.abrupt("return", _context.sent);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 7]]);
  }));
  return _saveWithConfirmation.apply(this, arguments);
}