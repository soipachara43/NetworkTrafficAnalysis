"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormattedIp = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _draggable_wrapper = require("../drag_and_drop/draggable_wrapper");

var _helpers = require("../drag_and_drop/helpers");

var _empty_value = require("../empty_value");

var _links = require("../links");

var _parse_query_value = require("../timeline/body/renderers/parse_query_value");

var _data_provider = require("../timeline/data_providers/data_provider");

var _provider = require("../timeline/data_providers/provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var getUniqueId = function getUniqueId(_ref) {
  var contextId = _ref.contextId,
      eventId = _ref.eventId,
      fieldName = _ref.fieldName,
      address = _ref.address;
  return "formatted-ip-data-provider-".concat(contextId, "-").concat(fieldName, "-").concat(address, "-").concat(eventId);
};

var tryStringify = function tryStringify(value) {
  try {
    return JSON.stringify(value);
  } catch (_) {
    return "".concat(value);
  }
};

var getDataProvider = function getDataProvider(_ref2) {
  var contextId = _ref2.contextId,
      eventId = _ref2.eventId,
      fieldName = _ref2.fieldName,
      address = _ref2.address;
  return {
    enabled: true,
    id: (0, _helpers.escapeDataProviderId)(getUniqueId({
      contextId: contextId,
      eventId: eventId,
      fieldName: fieldName,
      address: address
    })),
    name: "".concat(fieldName, ": ").concat((0, _parse_query_value.parseQueryValue)(address)),
    queryMatch: {
      field: fieldName,
      value: (0, _parse_query_value.parseQueryValue)(address),
      operator: _data_provider.IS_OPERATOR
    },
    excluded: false,
    kqlQuery: '',
    and: []
  };
};

var NonDecoratedIpComponent = function NonDecoratedIpComponent(_ref3) {
  var contextId = _ref3.contextId,
      eventId = _ref3.eventId,
      fieldName = _ref3.fieldName,
      truncate = _ref3.truncate,
      value = _ref3.value;
  return _react.default.createElement(_draggable_wrapper.DraggableWrapper, {
    dataProvider: getDataProvider({
      contextId: contextId,
      eventId: eventId,
      fieldName: fieldName,
      address: value
    }),
    key: "non-decorated-ip-draggable-wrapper-".concat(getUniqueId({
      contextId: contextId,
      eventId: eventId,
      fieldName: fieldName,
      address: value
    })),
    render: function render(dataProvider, _, snapshot) {
      return snapshot.isDragging ? _react.default.createElement(_draggable_wrapper.DragEffects, null, _react.default.createElement(_provider.Provider, {
        dataProvider: dataProvider
      })) : _typeof(value) !== 'object' ? (0, _empty_value.getOrEmptyTagFromValue)(value) : (0, _empty_value.getOrEmptyTagFromValue)(tryStringify(value));
    },
    truncate: truncate
  });
};

var NonDecoratedIp = _react.default.memo(NonDecoratedIpComponent);

var AddressLinksComponent = function AddressLinksComponent(_ref4) {
  var addresses = _ref4.addresses,
      contextId = _ref4.contextId,
      eventId = _ref4.eventId,
      fieldName = _ref4.fieldName,
      truncate = _ref4.truncate;
  return _react.default.createElement(_react.default.Fragment, null, (0, _fp.uniq)(addresses).map(function (address) {
    return _react.default.createElement(_draggable_wrapper.DraggableWrapper, {
      dataProvider: getDataProvider({
        contextId: contextId,
        eventId: eventId,
        fieldName: fieldName,
        address: address
      }),
      key: "address-links-draggable-wrapper-".concat(getUniqueId({
        contextId: contextId,
        eventId: eventId,
        fieldName: fieldName,
        address: address
      })),
      render: function render(_, __, snapshot) {
        return snapshot.isDragging ? _react.default.createElement(_draggable_wrapper.DragEffects, null, _react.default.createElement(_provider.Provider, {
          dataProvider: getDataProvider({
            contextId: contextId,
            eventId: eventId,
            fieldName: fieldName,
            address: address
          })
        })) : _react.default.createElement(_links.IPDetailsLink, {
          "data-test-sub": "ip-details",
          ip: address
        });
      },
      truncate: truncate
    });
  }));
};

var AddressLinks = _react.default.memo(AddressLinksComponent);

var FormattedIpComponent = function FormattedIpComponent(_ref5) {
  var contextId = _ref5.contextId,
      eventId = _ref5.eventId,
      fieldName = _ref5.fieldName,
      truncate = _ref5.truncate,
      value = _ref5.value;

  if ((0, _fp.isString)(value) && !(0, _fp.isEmpty)(value)) {
    try {
      var addresses = JSON.parse(value);

      if ((0, _fp.isArray)(addresses)) {
        return _react.default.createElement(AddressLinks, {
          addresses: addresses,
          contextId: contextId,
          eventId: eventId,
          fieldName: fieldName,
          truncate: truncate
        });
      }
    } catch (_) {} // fall back to formatting it as a single link
    // return a single draggable link


    return _react.default.createElement(AddressLinks, {
      addresses: [value],
      contextId: contextId,
      eventId: eventId,
      fieldName: fieldName,
      truncate: truncate
    });
  } else {
    return _react.default.createElement(NonDecoratedIp, {
      contextId: contextId,
      eventId: eventId,
      fieldName: fieldName,
      truncate: truncate,
      value: value
    });
  }
};

var FormattedIp = _react.default.memo(FormattedIpComponent);

exports.FormattedIp = FormattedIp;