exports.id = "main";
exports.modules = {

/***/ "./client/src/App.js":
/*!***************************!*\
  !*** ./client/src/App.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

__webpack_require__(/*! semantic-ui-css/semantic.min.css */ "./node_modules/semantic-ui-css/semantic.min.css");

var _jwtDecode = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _pages = __webpack_require__(/*! ./components/pages */ "./client/src/components/pages/index.js");

__webpack_require__(/*! ./static/css/style.css */ "./client/src/static/css/style.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Documentation
 * stateless component
 */

// url loader solved issue with semantic
var App = function App() {
  return _react2.default.createElement('div', null, _react2.default.createElement(_reactRouterDom.Route, { path: '/', exact: true, component: _pages.HomePage }), _react2.default.createElement(_reactRouterDom.Route, { path: '/login', exact: true, component: _pages.LoginPage }), _react2.default.createElement(_reactRouterDom.Route, { path: '/adminpage', exact: true, component: _pages.Dashboard, render: function render() {
      return requireAuth;
    } }));
};
var requireAuth = function requireAuth() {
  if (localStorage.myUserT) {
    var user = localStorage.getItem('myUserT');
    var decode = (0, _jwtDecode2.default)(user);
    if (!decode.role === 'admin') {
      console.log('not for admin');
      return _react2.default.createElement(Redirect, { to: '/login' });
    }
    // const pass = { ...decode, token: user };
    // console.log(pass);
  } else {
    console.log('no token for admin');
    return _react2.default.createElement(Redirect, { to: '/login' });
  }
};

exports.default = App;

/***/ })

};
//# sourceMappingURL=bundle.map