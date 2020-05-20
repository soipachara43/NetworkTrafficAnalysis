"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGetUserSavedObjectPermissions = exports.useCurrentUser = exports.useBasePath = exports.useTimeZone = exports.useDateFormat = void 0;

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _react = require("react");

var _i18n = require("@kbn/i18n");

var _constants = require("../../../common/constants");

var _kibana_react = require("./kibana_react");

var _toasters = require("../../components/toasters");

var _utils = require("../../containers/case/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useDateFormat = function useDateFormat() {
  return (0, _kibana_react.useUiSetting)(_constants.DEFAULT_DATE_FORMAT);
};

exports.useDateFormat = useDateFormat;

var useTimeZone = function useTimeZone() {
  var timeZone = (0, _kibana_react.useUiSetting)(_constants.DEFAULT_DATE_FORMAT_TZ);
  return timeZone === 'Browser' ? _momentTimezone.default.tz.guess() : timeZone;
};

exports.useTimeZone = useTimeZone;

var useBasePath = function useBasePath() {
  return (0, _kibana_react.useKibana)().services.http.basePath.get();
};

exports.useBasePath = useBasePath;

var useCurrentUser = function useCurrentUser() {
  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      user = _useState2[0],
      setUser = _useState2[1];

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var security = (0, _kibana_react.useKibana)().services.security;
  var fetchUser = (0, _react.useCallback)(function () {
    var didCancel = false;

    var fetchData =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!(security != null)) {
                  _context.next = 8;
                  break;
                }

                _context.next = 4;
                return security.authc.getCurrentUser();

              case 4:
                response = _context.sent;

                if (!didCancel) {
                  setUser((0, _utils.convertToCamelCase)(response));
                }

                _context.next = 9;
                break;

              case 8:
                setUser({
                  username: _i18n.i18n.translate('xpack.siem.getCurrentUser.unknownUser', {
                    defaultMessage: 'Unknown'
                  }),
                  email: '',
                  fullName: '',
                  roles: [],
                  enabled: false,
                  authenticationRealm: {
                    name: '',
                    type: ''
                  },
                  lookupRealm: {
                    name: '',
                    type: ''
                  },
                  authenticationProvider: ''
                });

              case 9:
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);

                if (!didCancel) {
                  (0, _toasters.errorToToaster)({
                    title: _i18n.i18n.translate('xpack.siem.getCurrentUser.Error', {
                      defaultMessage: 'Error getting user'
                    }),
                    error: _context.t0.body && _context.t0.body.message ? new Error(_context.t0.body.message) : _context.t0,
                    dispatchToaster: dispatchToaster
                  });
                  setUser(null);
                }

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 11]]);
      }));

      return function fetchData() {
        return _ref.apply(this, arguments);
      };
    }();

    fetchData();
    return function () {
      didCancel = true;
    };
  }, [security]);
  (0, _react.useEffect)(function () {
    fetchUser();
  }, []);
  return user;
};

exports.useCurrentUser = useCurrentUser;

var useGetUserSavedObjectPermissions = function useGetUserSavedObjectPermissions() {
  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      savedObjectsPermissions = _useState4[0],
      setSavedObjectsPermissions = _useState4[1];

  var uiCapabilities = (0, _kibana_react.useKibana)().services.application.capabilities;
  (0, _react.useEffect)(function () {
    var capabilitiesCanUserCRUD = typeof uiCapabilities.siem.crud === 'boolean' ? uiCapabilities.siem.crud : false;
    var capabilitiesCanUserRead = typeof uiCapabilities.siem.show === 'boolean' ? uiCapabilities.siem.show : false;
    setSavedObjectsPermissions({
      crud: capabilitiesCanUserCRUD,
      read: capabilitiesCanUserRead
    });
  }, [uiCapabilities]);
  return savedObjectsPermissions;
};

exports.useGetUserSavedObjectPermissions = useGetUserSavedObjectPermissions;