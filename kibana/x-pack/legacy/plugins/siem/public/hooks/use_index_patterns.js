"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIndexPatterns = void 0;

var _react = require("react");

var _kibana = require("../lib/kibana");

var _toasters = require("../components/toasters");

var i18n = _interopRequireWildcard(require("./translations"));

var _api = require("./api/api");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useIndexPatterns = function useIndexPatterns() {
  var refreshToggle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      indexPatterns = _useState2[0],
      setIndexPatterns = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      isLoading = _useState4[0],
      setIsLoading = _useState4[1];

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var savedObjects = (0, _kibana.useKibana)().services.savedObjects;
  (0, _react.useEffect)(function () {
    var isSubscribed = true;
    setIsLoading(true);

    function fetchIndexPatterns() {
      return _fetchIndexPatterns.apply(this, arguments);
    }

    function _fetchIndexPatterns() {
      _fetchIndexPatterns = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return (0, _api.getIndexPatterns)(savedObjects);

              case 3:
                data = _context.sent;

                if (isSubscribed) {
                  setIndexPatterns(data);
                  setIsLoading(false);
                }

                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);

                if (isSubscribed) {
                  (0, _toasters.errorToToaster)({
                    title: i18n.INDEX_PATTERN_FETCH_FAILURE,
                    error: _context.t0,
                    dispatchToaster: dispatchToaster
                  });
                  setIsLoading(false);
                }

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));
      return _fetchIndexPatterns.apply(this, arguments);
    }

    fetchIndexPatterns();
    return function () {
      isSubscribed = false;
    };
  }, [refreshToggle]);
  return [isLoading, indexPatterns];
};

exports.useIndexPatterns = useIndexPatterns;