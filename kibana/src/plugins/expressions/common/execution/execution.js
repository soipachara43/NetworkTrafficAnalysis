"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Execution = void 0;

var _lodash = require("lodash");

var _container = require("./container");

var _util = require("../util");

var _common = require("../../../kibana_utils/common");

var _common2 = require("../../../data/common");

var _common3 = require("../../../inspector/common");

var _error = require("../expression_types/specs/error");

var _ast = require("../ast");

var _expression_types = require("../expression_types");

var _get_by_alias = require("../util/get_by_alias");

var _execution_contract = require("./execution_contract");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const createDefaultInspectorAdapters = () => ({
  requests: new _common3.RequestAdapter(),
  data: new _common3.DataAdapter()
});

class Execution {
  /**
   * Dynamic state of the execution.
   */

  /**
   * Initial input of the execution.
   *
   * N.B. It is initialized to `null` rather than `undefined` for legacy reasons,
   * because in legacy interpreter it was set to `null` by default.
   */

  /**
   * Execution context - object that allows to do side-effects. Context is passed
   * to every function.
   */

  /**
   * AbortController to cancel this Execution.
   */

  /**
   * Whether .start() method has been called.
   */

  /**
   * Future that tracks result or error of this execution.
   */

  /**
   * Contract is a public representation of `Execution` instances. Contract we
   * can return to other plugins for their consumption.
   */
  get result() {
    return this.firstResultFuture.promise;
  }

  get inspectorAdapters() {
    return this.context.inspectorAdapters;
  }

  constructor(params) {
    this.params = params;

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "input", null);

    _defineProperty(this, "context", void 0);

    _defineProperty(this, "abortController", new AbortController());

    _defineProperty(this, "hasStarted", false);

    _defineProperty(this, "firstResultFuture", new _common.Defer());

    _defineProperty(this, "contract", new _execution_contract.ExecutionContract(this));

    _defineProperty(this, "expression", void 0);

    const {
      executor
    } = params;

    if (!params.ast && !params.expression) {
      throw new TypeError('Execution params should contain at least .ast or .expression key.');
    } else if (params.ast && params.expression) {
      throw new TypeError('Execution params cannot contain both .ast and .expression key.');
    }

    this.expression = params.expression || (0, _ast.formatExpression)(params.ast);
    const ast = params.ast || (0, _ast.parseExpression)(this.expression);
    this.state = (0, _container.createExecutionContainer)({ ...executor.state.get(),
      state: 'not-started',
      ast
    });
    this.context = {
      getInitialInput: () => this.input,
      variables: {},
      types: executor.getTypes(),
      abortSignal: this.abortController.signal,
      ...(params.context || {}),
      inspectorAdapters: params.context && params.context.inspectorAdapters ? params.context.inspectorAdapters : createDefaultInspectorAdapters()
    };
  }
  /**
   * Stop execution of expression.
   */


  cancel() {
    this.abortController.abort();
  }
  /**
   * Call this method to start execution.
   *
   * N.B. `input` is initialized to `null` rather than `undefined` for legacy reasons,
   * because in legacy interpreter it was set to `null` by default.
   */


  start(input = null) {
    if (this.hasStarted) throw new Error('Execution already started.');
    this.hasStarted = true;
    this.input = input;
    this.state.transitions.start();
    const {
      resolve,
      reject
    } = this.firstResultFuture;
    this.invokeChain(this.state.get().ast.chain, input).then(resolve, reject);
    this.firstResultFuture.promise.then(result => {
      this.state.transitions.setResult(result);
    }, error => {
      this.state.transitions.setError(error);
    });
  }

  async invokeChain(chainArr, input) {
    if (!chainArr.length) return input;

    for (const link of chainArr) {
      // if execution was aborted return error
      if (this.context.abortSignal && this.context.abortSignal.aborted) {
        return (0, _util.createError)(new _common2.AbortError('The expression was aborted.'));
      }

      const {
        function: fnName,
        arguments: fnArgs
      } = link;
      const fn = (0, _get_by_alias.getByAlias)(this.state.get().functions, fnName);

      if (!fn) {
        return (0, _util.createError)({
          message: `Function ${fnName} could not be found.`
        });
      }

      let args = {};
      let timeStart;

      try {
        // `resolveArgs` returns an object because the arguments themselves might
        // actually have a `then` function which would be treated as a `Promise`.
        const {
          resolvedArgs
        } = await this.resolveArgs(fn, input, fnArgs);
        args = resolvedArgs;
        timeStart = this.params.debug ? (0, _common.now)() : 0;
        const output = await this.invokeFunction(fn, input, resolvedArgs);

        if (this.params.debug) {
          const timeEnd = (0, _common.now)();
          link.debug = {
            success: true,
            fn,
            input,
            args: resolvedArgs,
            output,
            duration: timeEnd - timeStart
          };
        }

        if ((0, _expression_types.getType)(output) === 'error') return output;
        input = output;
      } catch (rawError) {
        const timeEnd = this.params.debug ? (0, _common.now)() : 0;
        const error = (0, _util.createError)(rawError);
        error.error.message = `[${fnName}] > ${error.error.message}`;

        if (this.params.debug) {
          link.debug = {
            success: false,
            fn,
            input,
            args,
            error,
            rawError,
            duration: timeStart ? timeEnd - timeStart : undefined
          };
        }

        return error;
      }
    }

    return input;
  }

  async invokeFunction(fn, input, args) {
    const normalizedInput = this.cast(input, fn.inputTypes);
    const output = await fn.fn(normalizedInput, args, this.context); // Validate that the function returned the type it said it would.
    // This isn't required, but it keeps function developers honest.

    const returnType = (0, _expression_types.getType)(output);
    const expectedType = fn.type;

    if (expectedType && returnType !== expectedType) {
      throw new Error(`Function '${fn.name}' should return '${expectedType}',` + ` actually returned '${returnType}'`);
    } // Validate the function output against the type definition's validate function.


    const type = this.context.types[fn.type];

    if (type && type.validate) {
      try {
        type.validate(output);
      } catch (e) {
        throw new Error(`Output of '${fn.name}' is not a valid type '${fn.type}': ${e}`);
      }
    }

    return output;
  }

  cast(value, toTypeNames) {
    // If you don't give us anything to cast to, you'll get your input back
    if (!toTypeNames || toTypeNames.length === 0) return value; // No need to cast if node is already one of the valid types

    const fromTypeName = (0, _expression_types.getType)(value);
    if (toTypeNames.includes(fromTypeName)) return value;
    const {
      types
    } = this.state.get();
    const fromTypeDef = types[fromTypeName];

    for (const toTypeName of toTypeNames) {
      // First check if the current type can cast to this type
      if (fromTypeDef && fromTypeDef.castsTo(toTypeName)) {
        return fromTypeDef.to(value, toTypeName, types);
      } // If that isn't possible, check if this type can cast from the current type


      const toTypeDef = types[toTypeName];
      if (toTypeDef && toTypeDef.castsFrom(fromTypeName)) return toTypeDef.from(value, types);
    }

    throw new Error(`Can not cast '${fromTypeName}' to any of '${toTypeNames.join(', ')}'`);
  } // Processes the multi-valued AST argument values into arguments that can be passed to the function


  async resolveArgs(fnDef, input, argAsts) {
    const argDefs = fnDef.args; // Use the non-alias name from the argument definition

    const dealiasedArgAsts = (0, _lodash.reduce)(argAsts, (acc, argAst, argName) => {
      const argDef = (0, _get_by_alias.getByAlias)(argDefs, argName);

      if (!argDef) {
        throw new Error(`Unknown argument '${argName}' passed to function '${fnDef.name}'`);
      }

      acc[argDef.name] = (acc[argDef.name] || []).concat(argAst);
      return acc;
    }, {}); // Check for missing required arguments.

    for (const argDef of Object.values(argDefs)) {
      const {
        aliases,
        default: argDefault,
        name: argName,
        required
      } = argDef;
      if (typeof argDefault !== 'undefined' || !required || typeof dealiasedArgAsts[argName] !== 'undefined') continue;

      if (!aliases || aliases.length === 0) {
        throw new Error(`${fnDef.name} requires an argument`);
      } // use an alias if _ is the missing arg


      const errorArg = argName === '_' ? aliases[0] : argName;
      throw new Error(`${fnDef.name} requires an "${errorArg}" argument`);
    } // Fill in default values from argument definition


    const argAstsWithDefaults = (0, _lodash.reduce)(argDefs, (acc, argDef, argName) => {
      if (typeof acc[argName] === 'undefined' && typeof argDef.default !== 'undefined') {
        acc[argName] = [(0, _ast.parse)(argDef.default, 'argument')];
      }

      return acc;
    }, dealiasedArgAsts); // Create the functions to resolve the argument ASTs into values
    // These are what are passed to the actual functions if you opt out of resolving

    const resolveArgFns = (0, _lodash.mapValues)(argAstsWithDefaults, (asts, argName) => {
      return asts.map(item => {
        return async (subInput = input) => {
          const output = await this.params.executor.interpret(item, subInput, {
            debug: this.params.debug
          });
          if ((0, _error.isExpressionValueError)(output)) throw output.error;
          const casted = this.cast(output, argDefs[argName].types);
          return casted;
        };
      });
    });
    const argNames = (0, _lodash.keys)(resolveArgFns); // Actually resolve unless the argument definition says not to

    const resolvedArgValues = await Promise.all(argNames.map(argName => {
      const interpretFns = resolveArgFns[argName];
      if (!argDefs[argName].resolve) return interpretFns;
      return Promise.all(interpretFns.map(fn => fn()));
    }));
    const resolvedMultiArgs = (0, _lodash.zipObject)(argNames, resolvedArgValues); // Just return the last unless the argument definition allows multiple

    const resolvedArgs = (0, _lodash.mapValues)(resolvedMultiArgs, (argValues, argName) => {
      if (argDefs[argName].multi) return argValues;
      return (0, _lodash.last)(argValues);
    }); // Return an object here because the arguments themselves might actually have a 'then'
    // function which would be treated as a promise

    return {
      resolvedArgs
    };
  }

}

exports.Execution = Execution;