exports.id = "main";
exports.modules = {

/***/ "./client/src/index.jsx":
/*!******************************!*\
  !*** ./client/src/index.jsx ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _App = __webpack_require__(/*! ./App */ "./client/src/App.js");

var _App2 = _interopRequireDefault(_App);

var _store = __webpack_require__(/*! ./store */ "./client/src/store.js");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _store2.default)();

if (localStorage.myUserT) {
  // console.log(jwt.decode(localStorage.myUserT));
  // localStorage.getItem('myUserT')
  var user = {
    token: localStorage.myUserT
  };
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

/***/ }),

/***/ "./node_modules/buffer-equal-constant-time/index.js":
false,

/***/ "./node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js":
false,

/***/ "./node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js":
false,

/***/ "./node_modules/jsonwebtoken/decode.js":
false,

/***/ "./node_modules/jsonwebtoken/index.js":
false,

/***/ "./node_modules/jsonwebtoken/lib/JsonWebTokenError.js":
false,

/***/ "./node_modules/jsonwebtoken/lib/NotBeforeError.js":
false,

/***/ "./node_modules/jsonwebtoken/lib/TokenExpiredError.js":
false,

/***/ "./node_modules/jsonwebtoken/lib/timespan.js":
false,

/***/ "./node_modules/jsonwebtoken/sign.js":
false,

/***/ "./node_modules/jsonwebtoken/verify.js":
false,

/***/ "./node_modules/jwa/index.js":
false,

/***/ "./node_modules/jws/index.js":
false,

/***/ "./node_modules/jws/lib/data-stream.js":
false,

/***/ "./node_modules/jws/lib/sign-stream.js":
false,

/***/ "./node_modules/jws/lib/tostring.js":
false,

/***/ "./node_modules/jws/lib/verify-stream.js":
false,

/***/ "./node_modules/lodash.includes/index.js":
false,

/***/ "./node_modules/lodash.isboolean/index.js":
false,

/***/ "./node_modules/lodash.isinteger/index.js":
false,

/***/ "./node_modules/lodash.isnumber/index.js":
false,

/***/ "./node_modules/lodash.isplainobject/index.js":
false,

/***/ "./node_modules/lodash.isstring/index.js":
false,

/***/ "./node_modules/lodash.once/index.js":
false,

/***/ "./node_modules/safe-buffer/index.js":
false,

/***/ "./node_modules/xtend/immutable.js":
false,

/***/ "buffer":
false,

/***/ "crypto":
false

};
//# sourceMappingURL=bundle.map