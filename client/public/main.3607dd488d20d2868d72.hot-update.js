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

var App = function App() {
  return _react2.default.createElement('div', null, _react2.default.createElement(_reactRouterDom.Route, { path: '/', exact: true, component: _pages.HomePage }), _react2.default.createElement(_reactRouterDom.Route, { path: '/login', exact: true, component: _pages.LoginPage }), _react2.default.createElement(_routes.AdminRoute, { path: '/dashboard', exact: true, component: _pages.DashboardPage }), _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/adpage', render: function render() {
      return requireAuth() ? _react2.default.createElement(_pages.DashboardPage, null) : _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' });
    } }));
};
// url loader solved issue with semantic

var requireAuth = function requireAuth() {
  console.log('require auth called');
  if (localStorage.myUserT) {
    var user = localStorage.getItem('myUserT');
    var decode = (0, _jwtDecode2.default)(user);
    if (decode.role === 'admin') {
      console.log('user is admin');
      return true;
      // const pass = { ...decode, token: user };
      // console.log(pass);
    }
    console.log('not an admin');
    return false;
  }
  console.log('no token to check admin');
  return false;
};

exports.default = App;

/***/ }),

/***/ "./client/src/components/routes/adminRoutes.js":
/*!*****************************************************!*\
  !*** ./client/src/components/routes/adminRoutes.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

var AdminRoute = function AdminRoute(_ref) {
  var isAuthenticated = _ref.isAuthenticated,
      Component = _ref.component,
      rest = _objectWithoutProperties(_ref, ['isAuthenticated', 'component']);

  return _react2.default.createElement(_reactRouterDom.Route, _extends({}, rest, {
    render: function render(props) {
      return isAuthenticated ? _react2.default.createElement(Component, props) : _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' });
    }
  }));
};
AdminRoute.proptypes = {
  component: _propTypes2.default.func.isRequired
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.user.role === 'admin'
  };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps)(AdminRoute);

/***/ }),

/***/ "./client/src/components/routes/index.js":
/*!***********************************************!*\
  !*** ./client/src/components/routes/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminRoute = exports.UserRoute = undefined;

var _userRoutes = __webpack_require__(/*! ./userRoutes */ "./client/src/components/routes/userRoutes.js");

var _userRoutes2 = _interopRequireDefault(_userRoutes);

var _adminRoutes = __webpack_require__(/*! ./adminRoutes */ "./client/src/components/routes/adminRoutes.js");

var _adminRoutes2 = _interopRequireDefault(_adminRoutes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.UserRoute = _userRoutes2.default;
exports.AdminRoute = _adminRoutes2.default;

/***/ }),

/***/ "./client/src/components/routes/userRoutes.js":
/*!****************************************************!*\
  !*** ./client/src/components/routes/userRoutes.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
    var target = {};for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
    }return target;
}

var UserRoute = function UserRoute(_ref) {
    var Component = _ref.component,
        rest = _objectWithoutProperties(_ref, ['component']);

    return _react2.default.createElement('div', null, _react2.default.createElement('p', null, ' hello thrtr '));
};

exports.default = UserRoute;

/***/ })

};
//# sourceMappingURL=bundle.map