"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDatatableRenderer = exports.datatableColumns = exports.datatable = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _visualization_container = require("../visualization_container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var datatable = {
  name: 'lens_datatable',
  type: 'render',
  inputTypes: ['lens_multitable'],
  help: _i18n.i18n.translate('xpack.lens.datatable.expressionHelpLabel', {
    defaultMessage: 'Datatable renderer'
  }),
  args: {
    title: {
      types: ['string'],
      help: _i18n.i18n.translate('xpack.lens.datatable.titleLabel', {
        defaultMessage: 'Title'
      })
    },
    columns: {
      types: ['lens_datatable_columns'],
      help: ''
    }
  },
  fn: function fn(data, args) {
    return {
      type: 'render',
      as: 'lens_datatable_renderer',
      value: {
        data: data,
        args: args
      }
    };
  }
};
exports.datatable = datatable;
var datatableColumns = {
  name: 'lens_datatable_columns',
  aliases: [],
  type: 'lens_datatable_columns',
  help: '',
  inputTypes: ['null'],
  args: {
    columnIds: {
      types: ['string'],
      multi: true,
      help: ''
    }
  },
  fn: function fn(input, args) {
    return _objectSpread({
      type: 'lens_datatable_columns'
    }, args);
  }
};
exports.datatableColumns = datatableColumns;

var getDatatableRenderer = function getDatatableRenderer(formatFactory) {
  return {
    name: 'lens_datatable_renderer',
    displayName: _i18n.i18n.translate('xpack.lens.datatable.visualizationName', {
      defaultMessage: 'Datatable'
    }),
    help: '',
    validate: function validate() {
      return undefined;
    },
    reuseDomNode: true,
    render: function () {
      var _render = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(domNode, config, handlers) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _reactDom.default.render(_react.default.createElement(DatatableComponent, _extends({}, config, {
                  formatFactory: formatFactory
                })), domNode, function () {
                  handlers.done();
                });

                handlers.onDestroy(function () {
                  return _reactDom.default.unmountComponentAtNode(domNode);
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function render(_x, _x2, _x3) {
        return _render.apply(this, arguments);
      }

      return render;
    }()
  };
};

exports.getDatatableRenderer = getDatatableRenderer;

function DatatableComponent(props) {
  var _Object$values = Object.values(props.data.tables),
      _Object$values2 = _slicedToArray(_Object$values, 1),
      firstTable = _Object$values2[0];

  var formatters = {};
  firstTable.columns.forEach(function (column) {
    formatters[column.id] = props.formatFactory(column.formatHint);
  });
  return _react.default.createElement(_visualization_container.VisualizationContainer, null, _react.default.createElement(_eui.EuiBasicTable, {
    className: "lnsDataTable",
    "data-test-subj": "lnsDataTable",
    columns: props.args.columns.columnIds.map(function (field) {
      var col = firstTable.columns.find(function (c) {
        return c.id === field;
      });
      return {
        field: field,
        name: col && col.name || ''
      };
    }).filter(function (_ref) {
      var field = _ref.field;
      return !!field;
    }),
    items: firstTable ? firstTable.rows.map(function (row) {
      var formattedRow = {};
      Object.entries(formatters).forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            columnId = _ref3[0],
            formatter = _ref3[1];

        formattedRow[columnId] = formatter.convert(row[columnId]);
      });
      return formattedRow;
    }) : []
  }));
}