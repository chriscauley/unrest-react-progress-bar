"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _useGlobalHook = _interopRequireDefault(require("use-global-hook"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _global = {
  reset: function reset(onSuccess) {
    this.results = [];
    this.onSuccess = onSuccess;
  }
};
var initialState = {
  name: null,
  completed: null,
  total: null,
  start: null,
  ticks: null
};
var actions = {
  display: function display(store, _ref) {
    var name = _ref.name,
        promises = _ref.promises,
        _ref$onSuccess = _ref.onSuccess,
        onSuccess = _ref$onSuccess === void 0 ? function () {} : _ref$onSuccess;

    _global.reset(onSuccess);

    store.setState({
      name: name,
      completed: 0,
      total: promises.length,
      start: new Date().valueOf(),
      ticks: 0
    });
    Promise.all(promises.map(function (promise) {
      return Promise.resolve(promise).then(store.actions.complete);
    })).then(function (results) {
      clearTimeout(_global.timeout);

      _global.onSuccess(results);

      store.setState(initialState);
    });
    store.actions.tick();
  },
  tick: function tick(store) {
    clearTimeout(_global.timeout);

    if (store.state.completed < store.state.total) {
      _global.timeout = setTimeout(function () {
        return store.actions.tock();
      }, 1000);
    }
  },
  tock: function tock(store) {
    store.setState({
      ticks: store.state.ticks + 1
    });
    store.actions.tick();
  },
  complete: function complete(store, result) {
    store.setState({
      completed: store.state.completed + 1
    });
    return result;
  }
};
var makeHook = (0, _useGlobalHook["default"])(_react["default"], {}, actions);

var _default = function _default(Component) {
  return function ProgressProvider(props) {
    var _makeHook = makeHook(),
        _makeHook2 = _slicedToArray(_makeHook, 2),
        state = _makeHook2[0],
        actions = _makeHook2[1];

    return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, props, {
      progress: _objectSpread(_objectSpread({}, state), {}, {
        actions: actions
      })
    }));
  };
};

exports["default"] = _default;