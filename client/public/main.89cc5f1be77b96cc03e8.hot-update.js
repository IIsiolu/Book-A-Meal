exports.id = "main";
exports.modules = {

/***/ "./client/src/index.jsx":
/*!******************************!*\
  !*** ./client/src/index.jsx ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _jwtDecode = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _App = __webpack_require__(/*! ./App */ "./client/src/App.js");

var _App2 = _interopRequireDefault(_App);

var _store = __webpack_require__(/*! ./store */ "./client/src/store.js");

var _store2 = _interopRequireDefault(_store);

var _auth = __webpack_require__(/*! ./actions/auth */ "./client/src/actions/auth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _store2.default)();

if (localStorage.myUserT) {
  var user = localStorage.getItem('myUserT');
  var decode = (0, _jwtDecode2.default)(user);
  var pass = _extends({}, decode, { token: user });
  // store.dispatch(userLoggedIn(pass));
  console.log(pass);
}

_reactDom2.default.render(_react2.default.createElement(
  _reactRouterDom.BrowserRouter,
  null,
  _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_App2.default, null)
  )
), document.getElementById('root'));

/***/ })

};
//# sourceMappingURL=bundle.map