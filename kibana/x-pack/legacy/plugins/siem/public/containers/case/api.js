"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionLicense = exports.pushToService = exports.pushCase = exports.deleteCases = exports.patchComment = exports.postComment = exports.patchCasesStatus = exports.patchCase = exports.postCase = exports.getCases = exports.getCaseUserActions = exports.getReporters = exports.getTags = exports.getCasesStatus = exports.getCase = void 0;

var _kibana = require("../../lib/kibana");

var _types = require("./types");

var _constants = require("./constants");

var _utils = require("./utils");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getCase =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(caseId) {
    var includeComments,
        signal,
        response,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            includeComments = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
            signal = _args.length > 2 ? _args[2] : undefined;
            _context.next = 4;
            return _kibana.KibanaServices.get().http.fetch("".concat(_constants.CASES_URL, "/").concat(caseId), {
              method: 'GET',
              query: {
                includeComments: includeComments
              },
              signal: signal
            });

          case 4:
            response = _context.sent;
            return _context.abrupt("return", (0, _utils.convertToCamelCase)((0, _utils.decodeCaseResponse)(response)));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getCase(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getCase = getCase;

var getCasesStatus =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(signal) {
    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _kibana.KibanaServices.get().http.fetch("".concat(_constants.CASES_URL, "/status"), {
              method: 'GET',
              signal: signal
            });

          case 2:
            response = _context2.sent;
            return _context2.abrupt("return", (0, _utils.convertToCamelCase)((0, _utils.decodeCasesStatusResponse)(response)));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getCasesStatus(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getCasesStatus = getCasesStatus;

var getTags =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(signal) {
    var response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _kibana.KibanaServices.get().http.fetch("".concat(_constants.CASES_URL, "/tags"), {
              method: 'GET',
              signal: signal
            });

          case 2:
            response = _context3.sent;
            return _context3.abrupt("return", response !== null && response !== void 0 ? response : []);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getTags(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getTags = getTags;

var getReporters =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(signal) {
    var response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _kibana.KibanaServices.get().http.fetch("".concat(_constants.CASES_URL, "/reporters"), {
              method: 'GET',
              signal: signal
            });

          case 2:
            response = _context4.sent;
            return _context4.abrupt("return", response !== null && response !== void 0 ? response : []);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getReporters(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getReporters = getReporters;

var getCaseUserActions =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(caseId, signal) {
    var response;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _kibana.KibanaServices.get().http.fetch("".concat(_constants.CASES_URL, "/").concat(caseId, "/user_actions"), {
              method: 'GET',
              signal: signal
            });

          case 2:
            response = _context5.sent;
            return _context5.abrupt("return", (0, _utils.convertArrayToCamelCase)((0, _utils.decodeCaseUserActionsResponse)(response)));

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getCaseUserActions(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getCaseUserActions = getCaseUserActions;

var getCases =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(_ref7) {
    var _ref7$filterOptions, filterOptions, _ref7$queryParams, queryParams, signal, query, response;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _ref7$filterOptions = _ref7.filterOptions, filterOptions = _ref7$filterOptions === void 0 ? {
              search: '',
              reporters: [],
              status: 'open',
              tags: []
            } : _ref7$filterOptions, _ref7$queryParams = _ref7.queryParams, queryParams = _ref7$queryParams === void 0 ? {
              page: 1,
              perPage: 20,
              sortField: _types.SortFieldCase.createdAt,
              sortOrder: 'desc'
            } : _ref7$queryParams, signal = _ref7.signal;
            query = _objectSpread({
              reporters: filterOptions.reporters.map(function (r) {
                var _r$username;

                return (_r$username = r.username) !== null && _r$username !== void 0 ? _r$username : '';
              }).filter(function (r) {
                return r !== '';
              }),
              tags: filterOptions.tags
            }, filterOptions.status !== '' ? {
              status: filterOptions.status
            } : {}, {}, filterOptions.search.length > 0 ? {
              search: filterOptions.search
            } : {}, {}, queryParams);
            _context6.next = 4;
            return _kibana.KibanaServices.get().http.fetch("".concat(_constants.CASES_URL, "/_find"), {
              method: 'GET',
              query: query,
              signal: signal
            });

          case 4:
            response = _context6.sent;
            return _context6.abrupt("return", (0, _utils.convertAllCasesToCamel)((0, _utils.decodeCasesFindResponse)(response)));

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getCases(_x7) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getCases = getCases;

var postCase =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(newCase, signal) {
    var response;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _kibana.KibanaServices.get().http.fetch(_constants.CASES_URL, {
              method: 'POST',
              body: JSON.stringify(newCase),
              signal: signal
            });

          case 2:
            response = _context7.sent;
            return _context7.abrupt("return", (0, _utils.convertToCamelCase)((0, _utils.decodeCaseResponse)(response)));

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function postCase(_x8, _x9) {
    return _ref8.apply(this, arguments);
  };
}();

exports.postCase = postCase;

var patchCase =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(caseId, updatedCase, version, signal) {
    var response;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _kibana.KibanaServices.get().http.fetch(_constants.CASES_URL, {
              method: 'PATCH',
              body: JSON.stringify({
                cases: [_objectSpread({}, updatedCase, {
                  id: caseId,
                  version: version
                })]
              }),
              signal: signal
            });

          case 2:
            response = _context8.sent;
            return _context8.abrupt("return", (0, _utils.convertToCamelCase)((0, _utils.decodeCasesResponse)(response)));

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function patchCase(_x10, _x11, _x12, _x13) {
    return _ref9.apply(this, arguments);
  };
}();

exports.patchCase = patchCase;

var patchCasesStatus =
/*#__PURE__*/
function () {
  var _ref10 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(cases, signal) {
    var response;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _kibana.KibanaServices.get().http.fetch(_constants.CASES_URL, {
              method: 'PATCH',
              body: JSON.stringify({
                cases: cases
              }),
              signal: signal
            });

          case 2:
            response = _context9.sent;
            return _context9.abrupt("return", (0, _utils.convertToCamelCase)((0, _utils.decodeCasesResponse)(response)));

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function patchCasesStatus(_x14, _x15) {
    return _ref10.apply(this, arguments);
  };
}();

exports.patchCasesStatus = patchCasesStatus;

var postComment =
/*#__PURE__*/
function () {
  var _ref11 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(newComment, caseId, signal) {
    var response;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _kibana.KibanaServices.get().http.fetch("".concat(_constants.CASES_URL, "/").concat(caseId, "/comments"), {
              method: 'POST',
              body: JSON.stringify(newComment),
              signal: signal
            });

          case 2:
            response = _context10.sent;
            return _context10.abrupt("return", (0, _utils.convertToCamelCase)((0, _utils.decodeCaseResponse)(response)));

          case 4:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function postComment(_x16, _x17, _x18) {
    return _ref11.apply(this, arguments);
  };
}();

exports.postComment = postComment;

var patchComment =
/*#__PURE__*/
function () {
  var _ref12 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11(caseId, commentId, commentUpdate, version, signal) {
    var response;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _kibana.KibanaServices.get().http.fetch("".concat(_constants.CASES_URL, "/").concat(caseId, "/comments"), {
              method: 'PATCH',
              body: JSON.stringify({
                comment: commentUpdate,
                id: commentId,
                version: version
              }),
              signal: signal
            });

          case 2:
            response = _context11.sent;
            return _context11.abrupt("return", (0, _utils.convertToCamelCase)((0, _utils.decodeCaseResponse)(response)));

          case 4:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function patchComment(_x19, _x20, _x21, _x22, _x23) {
    return _ref12.apply(this, arguments);
  };
}();

exports.patchComment = patchComment;

var deleteCases =
/*#__PURE__*/
function () {
  var _ref13 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12(caseIds, signal) {
    var response;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _kibana.KibanaServices.get().http.fetch(_constants.CASES_URL, {
              method: 'DELETE',
              query: {
                ids: JSON.stringify(caseIds)
              },
              signal: signal
            });

          case 2:
            response = _context12.sent;
            return _context12.abrupt("return", response === 'true' ? true : false);

          case 4:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function deleteCases(_x24, _x25) {
    return _ref13.apply(this, arguments);
  };
}();

exports.deleteCases = deleteCases;

var pushCase =
/*#__PURE__*/
function () {
  var _ref14 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13(caseId, push, signal) {
    var response;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _kibana.KibanaServices.get().http.fetch("".concat(_constants.CASES_URL, "/").concat(caseId, "/_push"), {
              method: 'POST',
              body: JSON.stringify(push),
              signal: signal
            });

          case 2:
            response = _context13.sent;
            return _context13.abrupt("return", (0, _utils.convertToCamelCase)((0, _utils.decodeCaseResponse)(response)));

          case 4:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function pushCase(_x26, _x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();

exports.pushCase = pushCase;

var pushToService =
/*#__PURE__*/
function () {
  var _ref15 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee14(connectorId, casePushParams, signal) {
    var response, _ref16, _response$serviceMess;

    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _kibana.KibanaServices.get().http.fetch("/api/action/".concat(connectorId, "/_execute"), {
              method: 'POST',
              body: JSON.stringify({
                params: casePushParams
              }),
              signal: signal
            });

          case 2:
            response = _context14.sent;

            if (!(response.status === 'error')) {
              _context14.next = 5;
              break;
            }

            throw new Error((_ref16 = (_response$serviceMess = response.serviceMessage) !== null && _response$serviceMess !== void 0 ? _response$serviceMess : response.message) !== null && _ref16 !== void 0 ? _ref16 : i18n.ERROR_PUSH_TO_SERVICE);

          case 5:
            return _context14.abrupt("return", (0, _utils.decodeServiceConnectorCaseResponse)(response.data));

          case 6:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));

  return function pushToService(_x29, _x30, _x31) {
    return _ref15.apply(this, arguments);
  };
}();

exports.pushToService = pushToService;

var getActionLicense =
/*#__PURE__*/
function () {
  var _ref17 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee15(signal) {
    var response;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return _kibana.KibanaServices.get().http.fetch("/api/action/types", {
              method: 'GET',
              signal: signal
            });

          case 2:
            response = _context15.sent;
            return _context15.abrupt("return", response);

          case 4:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));

  return function getActionLicense(_x32) {
    return _ref17.apply(this, arguments);
  };
}();

exports.getActionLicense = getActionLicense;