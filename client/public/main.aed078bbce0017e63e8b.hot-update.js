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
  return _react2.default.createElement('div', null, _react2.default.createElement(_reactRouterDom.Route, { location: location, path: '/', exact: true, component: _pages.HomePage }), _react2.default.createElement(_reactRouterDom.Route, { path: '/login', exact: true, component: _pages.LoginPage }), _react2.default.createElement(_reactRouterDom.Route, { path: '/signup', exact: true, component: _pages.SignupPage }), _react2.default.createElement(_routes.AdminRoute, { path: '/dashboard', exact: true, component: _pages.DashboardPage }), _react2.default.createElement(_routes.UserRoute, { path: '/user', exact: true, component: _pages.DashboardPage }));
};
// url loader solved issue with semantic


App.propTypes = {
  location: _propTypes2.default.shape({
    pathname: _propTypes2.default.string.isRequired
  }).isRequired
};

exports.default = App;

/***/ })

};
//# sourceMappingURL=bundle.map