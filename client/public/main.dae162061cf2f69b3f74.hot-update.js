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

var _jwtDecode = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _App = __webpack_require__(/*! ./App */ "./client/src/App.js");

var _App2 = _interopRequireDefault(_App);

var _store = __webpack_require__(/*! ./store */ "./client/src/store.js");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _store2.default)();

if (localStorage.myUserT) {
  console.log(_jwtDecode2.default.decode(localStorage.myUserT));
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

/***/ "./node_modules/jwt-decode/lib/atob.js":
/*!*********************************************!*\
  !*** ./node_modules/jwt-decode/lib/atob.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The code was extracted from:
 * https://github.com/davidchambers/Base64.js
 */

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
  this.message = message;
}

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

function polyfill (input) {
  var str = String(input).replace(/=+$/, '');
  if (str.length % 4 == 1) {
    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0, output = '';
    // get next character
    buffer = str.charAt(idx++);
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
}


module.exports = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;


/***/ }),

/***/ "./node_modules/jwt-decode/lib/base64_url_decode.js":
/*!**********************************************************!*\
  !*** ./node_modules/jwt-decode/lib/base64_url_decode.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var atob = __webpack_require__(/*! ./atob */ "./node_modules/jwt-decode/lib/atob.js");

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
    var code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = '0' + code;
    }
    return '%' + code;
  }));
}

module.exports = function(str) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }

  try{
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
};


/***/ }),

/***/ "./node_modules/jwt-decode/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/jwt-decode/lib/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var base64_url_decode = __webpack_require__(/*! ./base64_url_decode */ "./node_modules/jwt-decode/lib/base64_url_decode.js");

function InvalidTokenError(message) {
  this.message = message;
}

InvalidTokenError.prototype = new Error();
InvalidTokenError.prototype.name = 'InvalidTokenError';

module.exports = function (token,options) {
  if (typeof token !== 'string') {
    throw new InvalidTokenError('Invalid token specified');
  }

  options = options || {};
  var pos = options.header === true ? 0 : 1;
  try {
    return JSON.parse(base64_url_decode(token.split('.')[pos]));
  } catch (e) {
    throw new InvalidTokenError('Invalid token specified: ' + e.message);
  }
};

module.exports.InvalidTokenError = InvalidTokenError;


/***/ }),

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