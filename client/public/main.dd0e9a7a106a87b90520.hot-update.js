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
exports.logIn = exports.connectin = exports.userError = exports.userLoggedIn = undefined;

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

/***/ })

};
//# sourceMappingURL=bundle.map