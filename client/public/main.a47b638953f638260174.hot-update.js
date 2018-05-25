exports.id = "main";
exports.modules = {

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
      history.push('/');
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

/***/ }),

/***/ "./client/src/components/pages/HomePage.js":
/*!*************************************************!*\
  !*** ./client/src/components/pages/HomePage.js ***!
  \*************************************************/
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

var HomePage = function HomePage(_ref) {
  var isAuthenticated = _ref.isAuthenticated,
      logout = _ref.logout;
  return _react2.default.createElement('div', null, _react2.default.createElement('h1', null, ' Home Page '), isAuthenticated ? _react2.default.createElement('button', { onClick: function onClick() {
      return logout();
    } }, ' Logout') : _react2.default.createElement(_reactRouterDom.Link, { to: '/login' }, 'Login'));
};

HomePage.propTypes = {
  isAuthenticated: _propTypes2.default.bool.isRequired,
  logout: _propTypes2.default.func.isRequired
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.user.token
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, { logout: _auth.logout })(HomePage);

/***/ }),

/***/ "./client/src/reducers/user.js":
/*!*************************************!*\
  !*** ./client/src/reducers/user.js ***!
  \*************************************/
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

var _actionsTypes = __webpack_require__(/*! ../actions/actionsTypes */ "./client/src/actions/actionsTypes.js");

var actionsTypes = _interopRequireWildcard(_actionsTypes);

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

var initialState = {
  loading: false,
  error: null,
  user: null
};
var user = function user() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case actionsTypes.LOADING:
      return _extends({}, state, {
        loading: true
      });
    case actionsTypes.USER_LOGGED_IN:
      return _extends({}, state, {
        user: action.user,
        error: null,
        loading: false
      });
    case actionsTypes.USER_ERROR:
      return _extends({}, state, {
        error: action.error,
        loading: false
      });
    default:
      return state;
  }
};

exports.default = user;

/***/ })

};
//# sourceMappingURL=bundle.map