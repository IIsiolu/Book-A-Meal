exports.id = "main";
exports.modules = {

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
    return _react2.default.createElement('div', { className: 'container' }, _react2.default.createElement('div', { className: 'top-nav' }, _react2.default.createElement('h2', { className: 'logo' }, 'Book-A-Meal'), _react2.default.createElement('div', { className: 'right-nav' }, _react2.default.createElement('h2', { className: 'nav-text' }, ' ', _react2.default.createElement('a', { href: '#' }, 'About Us')), _react2.default.createElement('h2', { className: 'nav-text' }, ' ', _react2.default.createElement('a', { href: 'signin.html' }, 'Login')), _react2.default.createElement('h2', { className: 'nav-text' }, ' ', _react2.default.createElement('a', { href: 'signup.html' }, 'Sign-Up')))), _react2.default.createElement('div', { className: 'content' }, _react2.default.createElement('div', { className: 'info' }, _react2.default.createElement('div', { className: 'top-content' }, _react2.default.createElement('h1', { className: 'top-content-header' }, 'Booking a meal is what we love'), _react2.default.createElement('p', { className: 'top-content-header' }, '___________________________'), _react2.default.createElement('p', { className: 'topP' }, ' Donec elementum erat libero, ultricies molestie justo hendrerit vel. Nullam venenatis orci sit amet volutpat porttitor,')), _react2.default.createElement('div', { className: 'bottom-content' }, _react2.default.createElement('a', { href: 'signup.html' }, _react2.default.createElement('span', null, _react2.default.createElement('button', { className: 'loginBtn' }, ' Sign Up'))), _react2.default.createElement('a', { href: 'signin.html' }, _react2.default.createElement('span', null, _react2.default.createElement('button', { className: 'loginBtn' }, ' Log In'))))), _react2.default.createElement('div', { className: 'later' }, _react2.default.createElement('a', { href: 'home.html' }, 'i will create an account later'))));
};

LandingPage.propTypes = {};
var mapStateToProps = function mapStateToProps(state) {
    return {
        isAuthenticated: state.user.user ? !!state.user.user.token : false
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, { logout: _auth.logout })(LandingPage);

/***/ })

};
//# sourceMappingURL=bundle.map