"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _connect = _interopRequireDefault(require("./connect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Bar = (0, _connect["default"])(function (props) {
  var _props$progress = props.progress,
      completed = _props$progress.completed,
      total = _props$progress.total,
      name = _props$progress.name,
      start = _props$progress.start;

  if (!total) {
    return null;
  }

  var elapsed = new Date().valueOf() - start;
  var style = {
    width: 100 * (completed / total) + '%'
  };

  var css = _objectSpread({
    frame: 'fixed bottom-0 left-0 w-full',
    wrapper: 'container mx-auto relative',
    text: 'py-2 px-4 z-10 relative flex justify-between',
    bar: 'rounded border h-full w-full bg-gray-400 absolute top-0 z-0',
    done: 'left-0 h-full bg-green-400'
  }, props.css);

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: css.frame
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: css.wrapper
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: css.text
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: css.name
  }, name), /*#__PURE__*/_react["default"].createElement("span", {
    className: css.progress
  }, completed, " / ", total), /*#__PURE__*/_react["default"].createElement("span", {
    className: css.elapsed
  }, parseInt(elapsed / 1000), "s")), /*#__PURE__*/_react["default"].createElement("div", {
    className: css.bar
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: css.done,
    style: style
  }))));
});
var _default = {
  Bar: Bar,
  connect: _connect["default"]
};
exports["default"] = _default;