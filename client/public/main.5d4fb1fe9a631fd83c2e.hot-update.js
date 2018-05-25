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

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__(/*! semantic-ui-css/semantic.min.css */ "./node_modules/semantic-ui-css/semantic.min.css");

var _jwtDecode = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

__webpack_require__(/*! ./static/css/style.css */ "./client/src/static/css/style.css");

var _routes = __webpack_require__(/*! ./components/routes */ "./client/src/components/routes/index.js");

var _pages = __webpack_require__(/*! ./components/pages */ "./client/src/components/pages/index.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Documentation
 * stateless component
 */

var App = function App(_ref) {
  var location = _ref.location;
  return _react2.default.createElement('div', null, _react2.default.createElement(_reactRouterDom.Route, { location: location, path: '/', exact: true, component: _pages.LandingPage }), _react2.default.createElement(_reactRouterDom.Route, { path: '/login', exact: true, component: _pages.LoginPage }), _react2.default.createElement(_reactRouterDom.Route, { path: '/signup', exact: true, component: _pages.SignupPage }), _react2.default.createElement(_routes.AdminRoute, { path: '/dashboard', exact: true, component: _pages.DashboardPage }), _react2.default.createElement(_routes.UserRoute, { path: '/user', exact: true, component: _pages.DashboardPage }));
};
// url loader solved issue with semantic


App.propTypes = {
  location: _propTypes2.default.shape({
    pathname: _propTypes2.default.string.isRequired
  }).isRequired
};

exports.default = App;

/***/ }),

/***/ "./client/src/components/pages/LandingPage.js":
/*!****************************************************!*\
  !*** ./client/src/components/pages/LandingPage.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _auth = __webpack_require__(/*! ../../actions/auth */ "./client/src/actions/auth.js");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var LandingPage = function LandingPage(_ref) {
    var history = _ref.history;
    return _react2.default.createElement('div', { className: 'container' }, _react2.default.createElement('div', { className: 'top-nav' }, _react2.default.createElement('h2', { className: 'logo' }, 'Book-A-Meal'), _react2.default.createElement('div', { className: 'right-nav' }, _react2.default.createElement('h2', { className: 'nav-text' }, ' ', _react2.default.createElement('a', { href: '#' }, 'About Us')), _react2.default.createElement('h2', { className: 'nav-text' }, ' ', _react2.default.createElement('a', { href: 'signin.html' }, 'Login')), _react2.default.createElement('h2', { className: 'nav-text' }, ' ', _react2.default.createElement('a', { href: 'signup.html' }, 'Sign-Up')))), _react2.default.createElement('div', { className: 'coverContainer' }, _react2.default.createElement('img', { className: 'coverImg', src: '../static/images/menuRes.jpg' })), _react2.default.createElement('div', { className: 'content' }, _react2.default.createElement('div', { className: 'info' }, _react2.default.createElement('div', { className: 'top-content' }, _react2.default.createElement('h1', { className: 'top-content-header' }, 'Booking a meal is what we love'), _react2.default.createElement('p', { className: 'top-content-header' }, '___________________________'), _react2.default.createElement('p', { className: 'topP' }, ' Donec elementum erat libero, ultricies molestie justo hendrerit vel. Nullam venenatis orci sit amet volutpat porttitor,')), _react2.default.createElement('div', { className: 'bottom-content' }, _react2.default.createElement('a', { href: 'signup.html' }, _react2.default.createElement('span', null, _react2.default.createElement('button', { className: 'loginBtn' }, ' Sign Up'))), _react2.default.createElement('a', { href: 'signin.html' }, _react2.default.createElement('span', null, _react2.default.createElement('button', { className: 'loginBtn' }, ' Log In'))))), _react2.default.createElement('div', { className: 'later' }, _react2.default.createElement('a', { href: 'home.html' }, 'i will create an account later'))));
};

LandingPage.propTypes = {};
var mapStateToProps = function mapStateToProps(state) {
    return {
        isAuthenticated: state.user.user ? !!state.user.user.token : false
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, { logout: _auth.logout })(LandingPage);

/***/ }),

/***/ "./client/src/components/pages/index.js":
/*!**********************************************!*\
  !*** ./client/src/components/pages/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LandingPage = exports.SignupPage = exports.DashboardPage = exports.NotFoundPage = exports.LoginPage = exports.HomePage = undefined;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _HomePage = __webpack_require__(/*! ./HomePage */ "./client/src/components/pages/HomePage.js");

var _HomePage2 = _interopRequireDefault(_HomePage);

var _LoginPage = __webpack_require__(/*! ./LoginPage */ "./client/src/components/pages/LoginPage.js");

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _SignupPage = __webpack_require__(/*! ./SignupPage */ "./client/src/components/pages/SignupPage.js");

var _SignupPage2 = _interopRequireDefault(_SignupPage);

var _NotFoundPage = __webpack_require__(/*! ./NotFoundPage */ "./client/src/components/pages/NotFoundPage.js");

var _NotFoundPage2 = _interopRequireDefault(_NotFoundPage);

var _DashboardPage = __webpack_require__(/*! ./DashboardPage */ "./client/src/components/pages/DashboardPage.js");

var _DashboardPage2 = _interopRequireDefault(_DashboardPage);

var _LandingPage = __webpack_require__(/*! ./LandingPage */ "./client/src/components/pages/LandingPage.js");

var _LandingPage2 = _interopRequireDefault(_LandingPage);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.HomePage = _HomePage2.default;
exports.LoginPage = _LoginPage2.default;
exports.NotFoundPage = _NotFoundPage2.default;
exports.DashboardPage = _DashboardPage2.default;
exports.SignupPage = _SignupPage2.default;
exports.LandingPage = _LandingPage2.default;

/***/ })

};
//# sourceMappingURL=bundle.map