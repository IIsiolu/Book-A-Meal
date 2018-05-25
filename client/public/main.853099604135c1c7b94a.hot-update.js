exports.id = "main";
exports.modules = {

/***/ "./client/src/components/forms/SignupForm.js":
/*!***************************************************!*\
  !*** ./client/src/components/forms/SignupForm.js ***!
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

var _validator = __webpack_require__(/*! validator */ "./node_modules/validator/index.js");

var _validator2 = _interopRequireDefault(_validator);

var _semanticUiReact = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _inlineError = __webpack_require__(/*! ../messages/inlineError */ "./client/src/components/messages/inlineError.js");

var _inlineError2 = _interopRequireDefault(_inlineError);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
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

/**
 * @class Login
 *
 * @extends {React.Component}
 */
var SignupForm = function (_Component) {
  _inherits(SignupForm, _Component);

  function SignupForm() {
    _classCallCheck(this, SignupForm);

    var _this = _possibleConstructorReturn(this, (SignupForm.__proto__ || Object.getPrototypeOf(SignupForm)).call(this));

    _this.onChange = function (e) {
      _this.setState({
        data: _extends({}, _this.state.data, _defineProperty({}, e.target.name, e.target.value))
      });
    };

    _this.onSubmit = function (e) {
      e.preventDefault();
      var errors = _this.validate(_this.state.data);
      _this.setState({ errors: errors });
      if (Object.keys(errors).length == 0) {
        _this.props.submit(_this.state.data);
      }
    };

    _this.state = {
      data: {
        email: '',
        password: '',
        firstname: '',
        lastname: ''
      },
      loading: false,
      errors: {}
    };
    return _this;
  }

  _createClass(SignupForm, [{
    key: 'validate',
    value: function validate(data) {
      var errors = {};
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      var letterRegex = /^[a-zA-Z]+$/;

      if (!emailRegex.test(data.email) || !data.email) errors.email = 'Invalid email';
      if (!data.password || data.password.length < 6) errors.password = "Can't be blank and must be minimum 6";
      if (!data.firstname || !letterRegex.test(data.firstname)) errors.firstname = 'firstname must be a valid letter';
      if (!data.lastname || !letterRegex.test(data.lastname)) errors.lastname = 'name must be a valid letter';
      return errors;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          data = _state.data,
          errors = _state.errors;

      return _react2.default.createElement(_semanticUiReact.Form, { onSubmit: this.onSubmit, loading: this.props.loading }, this.props.error && _react2.default.createElement(_semanticUiReact.Message, { negative: true }, _react2.default.createElement(_semanticUiReact.Message.Header, null, ' Something went wrong '), _react2.default.createElement('p', null, this.props.error, ' ')), _react2.default.createElement(_semanticUiReact.Form.Field, { error: !!errors.email }, _react2.default.createElement('label', { htmlFor: 'email' }, ' Email '), _react2.default.createElement('input', {
        type: 'email',
        id: 'email', name: 'email',
        value: data.email,
        onChange: this.onChange,
        placeholder: 'example@example.com' }), errors.email && _react2.default.createElement(_inlineError2.default, { text: errors.email })), _react2.default.createElement(_semanticUiReact.Form.Field, { error: !!errors.password }, _react2.default.createElement('label', { htmlFor: 'password' }, ' Password '), _react2.default.createElement('input', {
        type: 'password',
        id: 'password',
        name: 'password',
        placeholder: 'Make it secure',
        value: data.password,
        onChange: this.onChange
      }), errors.password && _react2.default.createElement(_inlineError2.default, { text: errors.password })), _react2.default.createElement(_semanticUiReact.Form.Field, { error: !!errors.firstname }, _react2.default.createElement('label', { htmlFor: 'firstname' }, ' First Name '), _react2.default.createElement('input', {
        type: 'text',
        id: 'firstname', name: 'firstname',
        value: data.firstname,
        onChange: this.onChange,
        placeholder: 'example@example.com' }), errors.firstname && _react2.default.createElement(_inlineError2.default, { text: errors.firstname })), _react2.default.createElement(_semanticUiReact.Form.Field, { error: !!errors.lastname }, _react2.default.createElement('label', { htmlFor: 'lastname' }, ' First Name '), _react2.default.createElement('input', {
        type: 'text',
        id: 'lastname', name: 'lastname',
        value: data.lastname,
        onChange: this.onChange,
        placeholder: 'example@example.com' }), errors.lastname && _react2.default.createElement(_inlineError2.default, { text: errors.lastname })), _react2.default.createElement(_semanticUiReact.Button, {
        type: 'submit',
        primary: true
      }, 'Signup'));
    }
  }]);

  return SignupForm;
}(_react.Component);

SignupForm.propTypes = {
  submit: _propTypes2.default.func.isRequired
};

exports.default = SignupForm;

/***/ }),

/***/ "./client/src/components/forms/index.js":
/*!**********************************************!*\
  !*** ./client/src/components/forms/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignupForm = exports.LoginForm = undefined;

var _LoginForm = __webpack_require__(/*! ./LoginForm */ "./client/src/components/forms/LoginForm.js");

var _LoginForm2 = _interopRequireDefault(_LoginForm);

var _SignupForm = __webpack_require__(/*! ./SignupForm */ "./client/src/components/forms/SignupForm.js");

var _SignupForm2 = _interopRequireDefault(_SignupForm);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.LoginForm = _LoginForm2.default;
exports.SignupForm = _SignupForm2.default;

/***/ }),

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
exports.default = (0, _reactRedux.connect)(mapStateToProps, { logIn: logIn })(SignupPage);

/***/ }),

/***/ "./client/src/components/pages/index.js":
/*!**********************************************!*\
  !*** ./client/src/components/pages/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignupPage = exports.DashboardPage = exports.NotFoundPage = exports.LoginPage = exports.HomePage = undefined;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _HomePage = __webpack_require__(/*! ./HomePage */ "./client/src/components/pages/HomePage.js");

var _HomePage2 = _interopRequireDefault(_HomePage);

var _LoginPage = __webpack_require__(/*! ./LoginPage */ "./client/src/components/pages/LoginPage.js");

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _SignupPage = __webpack_require__(/*! ./SignupPage */ "./client/src/components/pages/SignupPage.js");

var _SignupPage2 = _interopRequireDefault(_SignupPage);

var _NotFoundPage = __webpack_require__(/*! ./NotFoundPage */ "./client/src/components/pages/NotFoundPage.js");

var _NotFoundPage2 = _interopRequireDefault(_NotFoundPage);

var _DashboardPage = __webpack_require__(/*! ./DashboardPage */ "./client/src/components/pages/DashboardPage.js");

var _DashboardPage2 = _interopRequireDefault(_DashboardPage);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.HomePage = _HomePage2.default;
exports.LoginPage = _LoginPage2.default;
exports.NotFoundPage = _NotFoundPage2.default;
exports.DashboardPage = _DashboardPage2.default;
exports.SignupPage = _SignupPage2.default;

/***/ })

};
//# sourceMappingURL=bundle.map