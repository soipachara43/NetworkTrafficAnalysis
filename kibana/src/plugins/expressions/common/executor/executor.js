"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Executor = exports.FunctionsRegistry = exports.TypesRegistry = void 0;

var _container = require("./container");

var _expression_functions = require("../expression_functions");

var _execution = require("../execution/execution");

var _expression_type = require("../expression_types/expression_type");

var _expression_types = require("../expression_types");

var _specs = require("../expression_types/specs");

var _specs2 = require("../expression_functions/specs");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TypesRegistry {
  constructor(executor) {
    this.executor = executor;
  }

  register(typeDefinition) {
    this.executor.registerType(typeDefinition);
  }

  get(id) {
    return this.executor.state.selectors.getType(id);
  }

  toJS() {
    return this.executor.getTypes();
  }

  toArray() {
    return Object.values(this.toJS());
  }

}

exports.TypesRegistry = TypesRegistry;

class FunctionsRegistry {
  constructor(executor) {
    this.executor = executor;
  }

  register(functionDefinition) {
    this.executor.registerFunction(functionDefinition);
  }

  get(id) {
    return this.executor.state.selectors.getFunction(id);
  }

  toJS() {
    return this.executor.getFunctions();
  }

  toArray() {
    return Object.values(this.toJS());
  }

}

exports.FunctionsRegistry = FunctionsRegistry;

class Executor {
  static createWithDefaults(state) {
    const executor = new Executor(state);

    for (const type of _specs.typeSpecs) executor.registerType(type);

    for (const func of _specs2.functionSpecs) executor.registerFunction(func);

    return executor;
  }

  constructor(state) {
    _defineProperty(this, "state", void 0);

    _defineProperty(this, "functions", void 0);

    _defineProperty(this, "types", void 0);

    this.state = (0, _container.createExecutorContainer)(state);
    this.functions = new FunctionsRegistry(this);
    this.types = new TypesRegistry(this);
  }

  registerFunction(functionDefinition) {
    const fn = new _expression_functions.ExpressionFunction(typeof functionDefinition === 'object' ? functionDefinition : functionDefinition());
    this.state.transitions.addFunction(fn);
  }

  getFunction(name) {
    return this.state.get().functions[name];
  }

  getFunctions() {
    return { ...this.state.get().functions
    };
  }

  registerType(typeDefinition) {
    const type = new _expression_type.ExpressionType(typeof typeDefinition === 'object' ? typeDefinition : typeDefinition());
    this.state.transitions.addType(type);
  }

  getType(name) {
    return this.state.get().types[name];
  }

  getTypes() {
    return { ...this.state.get().types
    };
  }

  extendContext(extraContext) {
    this.state.transitions.extendContext(extraContext);
  }

  get context() {
    return this.state.selectors.getContext();
  }

  async interpret(ast, input, options) {
    switch ((0, _expression_types.getType)(ast)) {
      case 'expression':
        return await this.interpretExpression(ast, input, options);

      case 'string':
      case 'number':
      case 'null':
      case 'boolean':
        return ast;

      default:
        throw new Error(`Unknown AST object: ${JSON.stringify(ast)}`);
    }
  }

  async interpretExpression(ast, input, options) {
    const execution = this.createExecution(ast, undefined, options);
    execution.start(input);
    return await execution.result;
  }
  /**
   * Execute expression and return result.
   *
   * @param ast Expression AST or a string representing expression.
   * @param input Initial input to the first expression function.
   * @param context Extra global context object that will be merged into the
   *    expression global context object that is provided to each function to allow side-effects.
   */


  async run(ast, input, context) {
    const execution = this.createExecution(ast, context);
    execution.start(input);
    return await execution.result;
  }

  createExecution(ast, context = {}, {
    debug
  } = {}) {
    const params = {
      executor: this,
      context: { ...this.context,
        ...context
      },
      debug
    };
    if (typeof ast === 'string') params.expression = ast;else params.ast = ast;
    const execution = new _execution.Execution(params);
    return execution;
  }

  fork() {
    const initialState = this.state.get();
    const fork = new Executor(initialState);
    /**
     * Synchronize registry state - make any new types, functions and context
     * also available in the forked instance of `Executor`.
     */

    this.state.state$.subscribe(({
      types,
      functions,
      context
    }) => {
      const state = fork.state.get();
      fork.state.set({ ...state,
        types: { ...types,
          ...state.types
        },
        functions: { ...functions,
          ...state.functions
        },
        context: { ...context,
          ...state.context
        }
      });
    });
    return fork;
  }

}

exports.Executor = Executor;