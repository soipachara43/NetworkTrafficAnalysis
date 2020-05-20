"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectsPublicPlugin = void 0;

require("./index.scss");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SavedObjectsPublicPlugin =
/*#__PURE__*/
function () {
  function SavedObjectsPublicPlugin() {
    _classCallCheck(this, SavedObjectsPublicPlugin);
  }

  _createClass(SavedObjectsPublicPlugin, [{
    key: "setup",
    value: function setup() {}
  }, {
    key: "start",
    value: function start() {}
  }]);

  return SavedObjectsPublicPlugin;
}();

exports.SavedObjectsPublicPlugin = SavedObjectsPublicPlugin;