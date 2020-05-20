"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkPreview = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _createCallApmApi = require("../../../../../../services/rest/createCallApmApi");

var _helper = require("./helper");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fetchTransaction = (0, _lodash.debounce)(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(filters, callback) {
    var transaction;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _createCallApmApi.callApmApi)({
              pathname: '/api/apm/settings/custom_links/transaction',
              params: {
                query: (0, _helper.convertFiltersToQuery)(filters)
              }
            });

          case 2:
            transaction = _context.sent;
            callback(transaction);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(), 1000);

var getTextColor = function getTextColor(value) {
  return value ? 'default' : 'subdued';
};

var LinkPreview = function LinkPreview(_ref2) {
  var label = _ref2.label,
      url = _ref2.url,
      filters = _ref2.filters;

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      transaction = _useState2[0],
      setTransaction = _useState2[1];

  (0, _react.useEffect)(function () {
    /*
      React throwns "Can't perform a React state update on an unmounted component"
      It happens when the Custom Link flyout is closed before the return of the api request.
      To avoid such case, sets the isUnmounted to true when component unmount and check its value before update the transaction.
    */
    var isUnmounted = false;
    fetchTransaction(filters, function (_transaction) {
      if (!isUnmounted) {
        setTransaction(_transaction);
      }
    });
    return function () {
      isUnmounted = true;
    };
  }, [filters]);

  var _replaceTemplateVaria = (0, _helper.replaceTemplateVariables)(url, transaction),
      formattedUrl = _replaceTemplateVaria.formattedUrl,
      error = _replaceTemplateVaria.error;

  return _react.default.createElement(_eui.EuiPanel, {
    betaBadgeLabel: "Preview",
    paddingSize: "l"
  }, _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: getTextColor(label),
    className: "eui-textBreakWord",
    "data-test-subj": "preview-label"
  }, label ? label : _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.default.label', {
    defaultMessage: 'Elastic.co'
  })), _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: getTextColor(url),
    className: "eui-textBreakWord",
    "data-test-subj": "preview-url"
  }, url ? _react.default.createElement(_eui.EuiLink, {
    href: formattedUrl,
    target: "_blank",
    "data-test-subj": "preview-link"
  }, formattedUrl) : _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.default.url', {
    defaultMessage: 'https://www.elastic.co'
  })), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.linkPreview.descrition', {
    defaultMessage: 'Test your link with values from an example transaction document based on the filters above.'
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, error && _react.default.createElement(_eui.EuiToolTip, {
    position: "top",
    content: error
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "alert",
    color: "warning",
    "data-test-subj": "preview-warning"
  })))));
};

exports.LinkPreview = LinkPreview;