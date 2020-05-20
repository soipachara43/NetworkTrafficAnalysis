"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find = exports.remove = exports.update = exports.get = exports.create = void 0;

var _constants = require("../../common/lib/constants");

var _fetch = require("../../common/lib/fetch");

var _legacy = require("../legacy");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getApiPath = function getApiPath() {
  var basePath = (0, _legacy.getCoreStart)().http.basePath.get();
  return "".concat(basePath).concat(_constants.API_ROUTE_CUSTOM_ELEMENT);
};

var create = function create(customElement) {
  return _fetch.fetch.post(getApiPath(), customElement);
};

exports.create = create;

var get = function get(customElementId) {
  return _fetch.fetch.get("".concat(getApiPath(), "/").concat(customElementId)).then(function (_ref) {
    var element = _ref.data;
    return element;
  });
};

exports.get = get;

var update = function update(id, element) {
  return _fetch.fetch.put("".concat(getApiPath(), "/").concat(id), element);
};

exports.update = update;

var remove = function remove(id) {
  return _fetch.fetch.delete("".concat(getApiPath(), "/").concat(id));
};

exports.remove = remove;

var find =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(searchTerm) {
    var validSearchTerm;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            validSearchTerm = typeof searchTerm === 'string' && searchTerm.length > 0;
            return _context.abrupt("return", _fetch.fetch.get("".concat(getApiPath(), "/find?name=").concat(validSearchTerm ? searchTerm : '', "&perPage=10000")).then(function (_ref3) {
              var customElements = _ref3.data;
              return customElements;
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function find(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.find = find;