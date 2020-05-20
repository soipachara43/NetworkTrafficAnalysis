"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDataInit = void 0;

var _react = require("react");

var _data_migration = require("./data_migration");

var _contexts = require("../../contexts");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useDataInit = function useDataInit() {
  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      done = _useState4[0],
      setDone = _useState4[1];

  var _useState5 = (0, _react.useState)({}),
      _useState6 = _slicedToArray(_useState5, 2),
      retryToken = _useState6[0],
      setRetryToken = _useState6[1];

  var retry = (0, _react.useCallback)(function () {
    setRetryToken({});
    setDone(false);
    setError(null);
  }, []);

  var _useServicesContext = (0, _contexts.useServicesContext)(),
      _useServicesContext$s = _useServicesContext.services,
      objectStorageClient = _useServicesContext$s.objectStorageClient,
      history = _useServicesContext$s.history;

  var dispatch = (0, _contexts.useEditorActionContext)();
  (0, _react.useEffect)(function () {
    var load =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var results, newObject;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return (0, _data_migration.migrateToTextObjects)({
                  history: history,
                  objectStorageClient: objectStorageClient
                });

              case 3:
                _context.next = 5;
                return objectStorageClient.text.findAll();

              case 5:
                results = _context.sent;

                if (results.length) {
                  _context.next = 13;
                  break;
                }

                _context.next = 9;
                return objectStorageClient.text.create({
                  createdAt: Date.now(),
                  updatedAt: Date.now(),
                  text: ''
                });

              case 9:
                newObject = _context.sent;
                dispatch({
                  type: 'setCurrentTextObject',
                  payload: newObject
                });
                _context.next = 14;
                break;

              case 13:
                dispatch({
                  type: 'setCurrentTextObject',
                  // For backwards compatibility, we sort here according to date created to
                  // always take the first item created.
                  payload: results.sort(function (a, b) {
                    return a.createdAt - b.createdAt;
                  })[0]
                });

              case 14:
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](0);
                setError(_context.t0);

              case 19:
                _context.prev = 19;
                setDone(true);
                return _context.finish(19);

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 16, 19, 22]]);
      }));

      return function load() {
        return _ref.apply(this, arguments);
      };
    }();

    load();
  }, [dispatch, objectStorageClient, history, retryToken]);
  return {
    error: error,
    done: done,
    retry: retry
  };
};

exports.useDataInit = useDataInit;