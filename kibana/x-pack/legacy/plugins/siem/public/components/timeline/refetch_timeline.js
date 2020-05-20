"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineRefetch = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("../../store/actions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TimelineRefetchComponent = function TimelineRefetchComponent(_ref) {
  var id = _ref.id,
      inputId = _ref.inputId,
      inspect = _ref.inspect,
      loading = _ref.loading,
      refetch = _ref.refetch;
  var dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(function () {
    dispatch(_actions.inputsActions.setQuery({
      id: id,
      inputId: inputId,
      inspect: inspect,
      loading: loading,
      refetch: refetch
    }));
  }, [dispatch, id, inputId, loading, refetch, inspect]);
  return null;
};

var TimelineRefetch = _react.default.memo(TimelineRefetchComponent);

exports.TimelineRefetch = TimelineRefetch;