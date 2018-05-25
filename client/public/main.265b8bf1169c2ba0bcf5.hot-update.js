exports.id = "main";
exports.modules = {

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

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var HomePage = function HomePage(_ref) {
    var isAuthenticated = _ref.isAuthenticated;
    return _react2.default.createElement('div', null, _react2.default.createElement('h1', null, ' Home Page '), isAuthenticated ? _react2.default.createElement('button', null, ' Logout') : _react2.default.createElement(_reactRouterDom.Link, { to: '/login' }, 'Login'));
};

HomePage.propTypes = {
    isAuthenticated: _propTypes2.default.bool.isRequired
};
var mapStateToProps = function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(HomePage);

/***/ })

};
//# sourceMappingURL=bundle.map