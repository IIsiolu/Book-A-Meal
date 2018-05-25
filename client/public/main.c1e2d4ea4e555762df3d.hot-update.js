exports.id = "main";
exports.modules = {

/***/ "./client/src/components/pages/SignupPage.js":
/*!***************************************************!*\
  !*** ./client/src/components/pages/SignupPage.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _forms = __webpack_require__(/*! ../forms */ "./client/src/components/forms/index.js");

var _actions = __webpack_require__(/*! ../../actions */ "./client/src/actions/index.js");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
// import { Link } from 'react-router-dom';


var SignupPage = function (_Component) {
    _inherits(SignupPage, _Component);

    function SignupPage() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SignupPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SignupPage.__proto__ || Object.getPrototypeOf(SignupPage)).call.apply(_ref, [this].concat(args))), _this), _this.submit = function (data) {
            return _this.props.signup(data, _this.props.history);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SignupPage, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', null, _react2.default.createElement('h1', null, ' Signup page '), _react2.default.createElement(_forms.SignupForm, _extends({ submit: this.submit }, this.props)));
        }
    }]);

    return SignupPage;
}(_react.Component);

SignupPage.propTypes = {
    history: _propTypes2.default.shape({
        push: _propTypes2.default.func.isRequired
    }).isRequired,
    signup: _propTypes2.default.func.isRequired
};
var mapStateToProps = function mapStateToProps(state) {
    return {
        error: state.user.error,
        loading: state.user.loading
    };
};
// mapstate for states, dispatch functions
exports.default = (0, _reactRedux.connect)(mapStateToProps, { signup: _actions.signup })(SignupPage);

/***/ })

};
//# sourceMappingURL=bundle.map