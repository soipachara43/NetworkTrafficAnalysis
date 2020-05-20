"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intializeSavedObject = intializeSavedObject;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Initialize saved object
 */
function intializeSavedObject(_x, _x2, _x3) {
  return _intializeSavedObject.apply(this, arguments);
}

function _intializeSavedObject() {
  _intializeSavedObject = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(savedObject, savedObjectsClient, config) {
    var esType, resp, respMapped;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            esType = config.type; // ensure that the esType is defined

            if (esType) {
              _context.next = 3;
              break;
            }

            throw new Error('You must define a type name to use SavedObject objects.');

          case 3:
            if (savedObject.id) {
              _context.next = 12;
              break;
            }

            // just assign the defaults and be done
            _lodash.default.assign(savedObject, savedObject.defaults);

            _context.next = 7;
            return savedObject.hydrateIndexPattern();

          case 7:
            if (!(typeof config.afterESResp === 'function')) {
              _context.next = 11;
              break;
            }

            _context.next = 10;
            return config.afterESResp(savedObject);

          case 10:
            savedObject = _context.sent;

          case 11:
            return _context.abrupt("return", savedObject);

          case 12:
            _context.next = 14;
            return savedObjectsClient.get(esType, savedObject.id);

          case 14:
            resp = _context.sent;
            respMapped = {
              _id: resp.id,
              _type: resp.type,
              _source: _lodash.default.cloneDeep(resp.attributes),
              references: resp.references,
              found: !!resp._version
            };
            _context.next = 18;
            return savedObject.applyESResp(respMapped);

          case 18:
            if (!(typeof config.init === 'function')) {
              _context.next = 21;
              break;
            }

            _context.next = 21;
            return config.init.call(savedObject);

          case 21:
            return _context.abrupt("return", savedObject);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _intializeSavedObject.apply(this, arguments);
}