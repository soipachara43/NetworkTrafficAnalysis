"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withUptimeGraphQL = withUptimeGraphQL;

var _react = _interopRequireWildcard(require("react"));

var _reactApollo = require("react-apollo");

var _format_error_list = require("../../lib/helper/format_error_list");

var _contexts = require("../../contexts");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * This HOC abstracts the task of querying our GraphQL endpoint,
 * which eliminates the need for a lot of boilerplate code in the other components.
 *
 * @type T - the expected result's type
 * @type P - any props the wrapped component will require
 * @param WrappedComponent - the consuming component
 * @param query - the graphQL query
 */
function withUptimeGraphQL(WrappedComponent, query) {
  return (0, _reactApollo.withApollo)(function (props) {
    var _useContext = (0, _react.useContext)(_contexts.UptimeRefreshContext),
        lastRefresh = _useContext.lastRefresh;

    var _useState = (0, _react.useState)(true),
        _useState2 = _slicedToArray(_useState, 2),
        loading = _useState2[0],
        setLoading = _useState2[1];

    var _useState3 = (0, _react.useState)(undefined),
        _useState4 = _slicedToArray(_useState3, 2),
        data = _useState4[0],
        setData = _useState4[1];

    var _useState5 = (0, _react.useState)(undefined),
        _useState6 = _slicedToArray(_useState5, 2),
        errors = _useState6[0],
        setErrors = _useState6[1];

    var updateState = function updateState(loadingVal, dataVal, errorsVal) {
      setLoading(loadingVal);
      setData(dataVal);
      setErrors(errorsVal);
    };

    var client = props.client,
        implementsCustomErrorState = props.implementsCustomErrorState,
        variables = props.variables;

    var fetch = function fetch() {
      setLoading(true);
      client.query({
        fetchPolicy: 'network-only',
        query: query,
        variables: variables
      }).then(function (result) {
        updateState(result.loading, result.data, result.errors);
      }, function (result) {
        updateState(false, undefined, result.graphQLErrors);
      });
    };

    (0, _react.useEffect)(function () {
      fetch();
      /**
       * If the `then` handler in `fetch`'s promise is fired after
       * this component has unmounted, it will try to set state on an
       * unmounted component, which indicates a memory leak and will trigger
       * React warnings.
       *
       * We counteract this side effect by providing a cleanup function that will
       * reassign the update function to do nothing with the returned values.
       */

      return function () {
        // this component is planned to be deprecated, for the time being
        // we will want to preserve this for the reason above.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        updateState = function updateState() {};
      };
    }, [variables, lastRefresh]);

    if (!implementsCustomErrorState && errors && errors.length > 0) {
      return _react.default.createElement(_react.Fragment, null, (0, _format_error_list.formatUptimeGraphQLErrorList)(errors));
    }

    return _react.default.createElement(WrappedComponent, _extends({}, props, {
      loading: loading,
      data: data,
      errors: errors
    }));
  });
}