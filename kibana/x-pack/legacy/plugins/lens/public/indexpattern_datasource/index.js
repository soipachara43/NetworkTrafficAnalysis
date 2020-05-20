"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexPatternDatasource = void 0;

var _public = require("../../../../../../src/plugins/kibana_utils/public");

var _indexpattern = require("./indexpattern");

var _rename_columns = require("./rename_columns");

var _auto_date = require("./auto_date");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IndexPatternDatasource =
/*#__PURE__*/
function () {
  function IndexPatternDatasource() {
    _classCallCheck(this, IndexPatternDatasource);
  }

  _createClass(IndexPatternDatasource, [{
    key: "setup",
    value: function setup(core, _ref) {
      var dataSetup = _ref.data,
          expressions = _ref.expressions,
          editorFrame = _ref.editorFrame;
      expressions.registerFunction(_rename_columns.renameColumns);
      expressions.registerFunction((0, _auto_date.getAutoDate)({
        data: dataSetup
      }));
      editorFrame.registerDatasource(core.getStartServices().then(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            coreStart = _ref3[0],
            data = _ref3[1].data;

        return (0, _indexpattern.getIndexPatternDatasource)({
          core: coreStart,
          storage: new _public.Storage(localStorage),
          data: data
        });
      }));
    }
  }]);

  return IndexPatternDatasource;
}();

exports.IndexPatternDatasource = IndexPatternDatasource;