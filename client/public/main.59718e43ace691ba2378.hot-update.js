exports.id = "main";
exports.modules = {

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

/***/ })

};
//# sourceMappingURL=bundle.map