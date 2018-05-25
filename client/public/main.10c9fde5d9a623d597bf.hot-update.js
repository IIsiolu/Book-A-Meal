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
  return _react2.default.createElement('div', null, _react2.default.createElement(_reactRouterDom.Route, { path: '/', exact: true, component: _pages.HomePage }), _react2.default.createElement(_reactRouterDom.Route, { path: '/login', exact: true, component: _pages.LoginPage }), _react2.default.createElement(_reactRouterDom.Route, { path: '/adminpage', exact: true, component: _pages.Dashboard, onEnter: requireAuth() }), _react2.default.createElement(_reactRouterDom.Route, { path: '*', exact: true, component: _pages.NotFoundPage }));
};
var requireAuth = function requireAuth(nextState, replace) {
  if (localStorage.myUserT) {
    var user = localStorage.getItem('myUserT');
    var decode = (0, _jwtDecode2.default)(user);
    if (!decode.role === 'admin') {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    // const pass = { ...decode, token: user };
    console.log(pass);
  } else {
    return false;
  }
};

exports.default = App;

/***/ }),

/***/ "./client/src/actions/auth.js":
/*!************************************!*\
  !*** ./client/src/actions/auth.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.logIn = exports.connectin = exports.userError = exports.userLoggedIn = undefined;

var _actionsTypes = __webpack_require__(/*! ./actionsTypes */ "./client/src/actions/actionsTypes.js");

var actionTypes = _interopRequireWildcard(_actionsTypes);

var _axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var _axios2 = _interopRequireDefault(_axios);

var _api = __webpack_require__(/*! ../api */ "./client/src/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

var userLoggedIn = exports.userLoggedIn = function userLoggedIn(user) {
  return {
    type: actionTypes.USER_LOGGED_IN,
    user: user
  };
};

var userError = exports.userError = function userError(error) {
  return {
    type: actionTypes.USER_ERROR,
    error: error
  };
};

var connectin = exports.connectin = function connectin(loading) {
  return {
    type: actionTypes.LOADING
  };
};

var logIn = exports.logIn = function logIn(credentials, history) {
  return function (dispatch) {
    console.log({
      credentials: credentials
    });
    dispatch(connectin(true));
    _axios2.default.post('/api/v1/auth/login', credentials).then(function (res) {
      localStorage.setItem('myUserT', res.data.token);
      dispatch(userLoggedIn(res.data));
      history.push('/adminpage');
    }).catch(function (error) {
      if (error.response) {
        console.log({
          err: 'error in login',
          error: error.response
        });
        var myError = error.response.data.errorMessage ? error.response.data.errorMessage[0] : error.response.data.message;
        dispatch(userError(myError));
      } else {
        var _myError = 'poor internet connection';
        dispatch(userError(_myError));
      }
    });
  };
};

var logout = exports.logout = function logout(history) {
  return function (dispatch) {
    localStorage.clear();
    history.push('/');
    dispatch(userLoggedIn({}));
  };
};

/***/ })

};
//# sourceMappingURL=bundle.map