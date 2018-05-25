exports.id = "main";
exports.modules = {

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
  user: {
    role: null
  }
};
var user = function user() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case actionsTypes.LOADING:
      return _extends({}, state, {
        loading: true
      });
    case actionsTypes.USER_SIGN_UP:
      return _extends({}, state, {
        loading: false,
        error: null
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