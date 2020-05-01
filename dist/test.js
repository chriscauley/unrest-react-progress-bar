"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _connect = _interopRequireDefault(require("./connect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var wait = function wait(seconds) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(seconds + 'resolved');
    }, seconds * 1000);
  });
};

var Test = (0, _connect["default"])(function (props) {
  var display = props.progress.actions.display;

  var click = function click() {
    return display({
      name: 'Bees!!!!',
      promises: [3, 2, 3, 4, 3, 5, 1, 100].map(wait),
      onSuccess: function onSuccess(results) {
        return console.log(results);
      } // eslint-disable-line

    });
  };

  return /*#__PURE__*/_react["default"].createElement("button", {
    onClick: click
  }, "Do it!");
});
var _default = {
  Test: Test
};
exports["default"] = _default;